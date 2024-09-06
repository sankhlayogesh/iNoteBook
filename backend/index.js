const connectTOMongo = require('./db');
var cors = require('cors')
const express = require('express')

connectTOMongo();

const app = express()
const port = 5000

app.use(cors())
// app.get('/', (req, res) => {
//   res.send('Hello yog sa!')
// })

// Mount the express.json() middleware to parse JSON requests
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})                            