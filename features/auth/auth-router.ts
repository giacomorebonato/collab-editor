import { publicProcedure, router } from '@server/trpc-router.js'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { SessionUser } from './upsert-user-query.js'

export const authRouter = router({
  getProfile: publicProcedure
    .input(
      z.object({
        from: z.enum(['db', 'session']),
      }),
    )
    .query(async ({ ctx, input }): Promise<SessionUser> => {
      if (!ctx.request.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        })
      }

      if (input.from === 'db') {
        return ctx.db
          .select({
            id: ctx.Schema.users.id,
            email: ctx.Schema.users.email,
            name: ctx.Schema.users.name,
            surname: ctx.Schema.users.surname,
          })
          .from(ctx.Schema.users)
          .get()
      }

      return ctx.request.user as SessionUser
    }),
  updateProfile: publicProcedure
    .input(
      z.object({
        name: z.string(),
        surname: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.request.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        })
      }
      await ctx.db
        .update(ctx.Schema.users)
        .set({
          name: input.name,
          surname: input.surname,
        })
        .where(eq(ctx.Schema.users.id, ctx.request.user.id))
        .run()
    }),
  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.request.logOut()

    return {
      status: 'success',
    }
  }),
})
