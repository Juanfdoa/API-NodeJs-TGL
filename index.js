const express = require('express')
const appointmentRouter = require('./src/routes/appointment')
const userRouter = require('./src/routes/user')
const authRouter = require('./src/routes/auth')
const app = express()
const port = 3000

app.use(express.json())

app.use('/auth', authRouter)
app.use('/appointment', appointmentRouter)
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})