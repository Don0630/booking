import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { APP_NAME } from '@booking/shared'
import usersRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)

app.get('/', (_req, res) => {
  res.json({ success: true, data: APP_NAME, message: 'Server is running!' })
})

app.listen(5000, () => {
  console.log(`${APP_NAME} server running on http://localhost:5000`)
})
