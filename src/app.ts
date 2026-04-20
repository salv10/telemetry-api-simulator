import express, { Request, Response } from 'express'
import carRoutes from './routes/car.routes'
import telemetryRoutes from './routes/telemetry.routes'
const app = express()

app.use(express.json())

app.use('/api', carRoutes)

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

app.use('/api', telemetryRoutes)


export default app