import express, { Request, Response } from 'express'
import carRoutes from './routes/car.routes'
const app = express()

app.use(express.json())

app.use('/api', carRoutes)

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

export default app