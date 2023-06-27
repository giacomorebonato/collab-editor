import { env } from '../env.js'
import { FastifyInstance } from 'fastify'
import Os from 'node:os'

function getIPAddress() {
  const interfaces = Os.networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName]

    if (!iface) {
      continue
    }

    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      )
        return alias.address
    }
  }
  return '0.0.0.0'
}

export const qrCode = async (
  app: FastifyInstance,
  _options: any,
  done: () => void,
) => {
  if (env.NODE_ENV === 'development') {
    const QR = await import('qrcode')

    app.addHook('onReady', async () => {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          await QR.toString(`http://${getIPAddress()}:${process.env.PORT}`),
        )
      }
    })
  }

  done()
}
