express = require('express')

app = express()

app.use(express.static('Kakashaka'))

app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Kakashaka/Max.html')
})

app.post('/number', (req,res) => {
  console.log(req.body)
})

app.post('/code', (req, res) => {
  console.log(req.body)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('ok')
})
