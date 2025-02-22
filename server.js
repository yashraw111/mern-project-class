const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000

// use //...........
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// mongo connect //..................
require('./config/db').dbConnect()

// import routes //.................
const adminRoute = require('./routes/admin.route')
const catRoute = require('./routes/category.route')

// routing //.......................
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/admin',adminRoute)
app.use('/api/category',catRoute)



app.listen(PORT, () => console.log(`Example app listening on PORT http://localhost:${PORT}`))