import { TrpcClient } from '@client/trpc-client.js'
import { debounce } from 'radash'
import { useCallback } from 'react'
import { Form, Input } from 'react-daisyui'
import { toast } from 'react-toastify'
import { P, match } from 'ts-pattern'

export const ProfileForm = () => {
  const getProfile = TrpcClient.auth.getProfile.useQuery({
    from: 'db',
  })
  const updateProfile = TrpcClient.auth.updateProfile.useMutation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateProfileDebounced = useCallback(
    debounce(
      { delay: 1_000 },
      (params: Parameters<typeof updateProfile.mutateAsync>[0]) => {
        updateProfile.mutateAsync(params).then(() => {
          toast('Profile saved', {
            position: 'bottom-right',
            autoClose: 1_000,
          })
        })
      },
    ),
    [updateProfile],
  )

  return match(getProfile)
    .with(
      {
        isLoading: true,
      },
      () => {
        return <span className='loading loading-spinner loading-lg' />
      },
    )
    .with(
      {
        isSuccess: true,
        data: P.not(P.nullish),
      },
      () => {
        return (
          <Form
            className='max-w-md'
            onChange={(e) => {
              const formData = new FormData(
                (e.target as HTMLFormElement).closest('form')!,
              )

              const formEntries = Object.fromEntries(formData.entries())

              updateProfileDebounced(formEntries as any)
            }}
          >
            <div className='form-control'>
              <label htmlFor='name' className='label'>
                Name
              </label>
              <Input
                id='name'
                name='name'
                type='text'
                defaultValue={getProfile.data!.name!}
              />
            </div>
            <div className='form-control'>
              <label htmlFor='surname' className='label'>
                Surname
              </label>
              <Input
                id='surname'
                name='surname'
                type='text'
                defaultValue={getProfile.data!.surname!}
              />
            </div>
          </Form>
        )
      },
    )
    .otherwise(() => {
      return null
    })
}
