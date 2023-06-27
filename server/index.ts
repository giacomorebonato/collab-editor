import { createServer } from './create-server.js'

try {
  const server = await createServer()

  await server.start()
} catch (error) {
  console.error('Error starting server')

  throw error
}
