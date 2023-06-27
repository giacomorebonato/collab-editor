import { Database } from '@hocuspocus/extension-database'
import { Server as HocusPocusServer } from '@hocuspocus/server'
import { FastifyInstance } from 'fastify'

const editorData = new Map<string, Buffer>()

export const editorApi = (
  app: FastifyInstance,
  _options: any,
  done: () => void,
) => {
  const hocusPocusServer = HocusPocusServer.configure({
    extensions: [
      new Database({
        fetch: async (data) => {
          if (editorData.has(data.document.name)) {
            return editorData.get(data.document.name)!
          }

          return null
        },
        store: async (data) => {
          editorData.set(data.documentName, data.state)

          app.log.info(`Document ${data.documentName} saved`)
        },
      }),
    ],
  })

  app.get('/editor/:docName', { websocket: true }, (connection, request) => {
    hocusPocusServer.handleConnection(connection.socket, request.raw)
  })

  done()
}
