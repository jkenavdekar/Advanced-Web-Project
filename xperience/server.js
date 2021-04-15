import connectDB from './backend/config/db.js'
import dotenv  from 'dotenv'
import userRoutes from './backend/routes/userRoute.js'
import eventRoutes from './backend/routes/eventRoute.js'

import express from 'express'


connectDB()

dotenv.config()

const app = express()

//Creating API for user
app.use('/api/users', userRoutes)
app.use('/api/events', eventRoutes)


const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))
