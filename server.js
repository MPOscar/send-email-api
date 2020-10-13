const express = require('express')
const app = express()
const port = process.env.PORT || 5000
var cors = require('cors');
//init middleware first
app.use(require('./middleware/logger'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.get('/', (req, res) => {
  res.send('Welcome to ExpressCRUD')
})
app.use('/api/users', require('./routes/api/users'))
app.use('/api/email', require('./routes/api/email'))
app.get('*', (req, res) => {
  res.status(404).send('Not found')
})

app.use(cors({
  origin: '*'
}));

//listen on port
app.listen(port, () => console.log(`Listening on ${port}`))
 
