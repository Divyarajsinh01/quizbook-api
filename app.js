const express = require('express')
const app = express()
require('./db/mongoose')//

const userRouter = require('./routes/user')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)


app.listen(port, ()=>{
    console.log('sever connected on ', port)
})
