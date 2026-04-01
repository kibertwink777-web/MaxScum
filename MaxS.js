express = require('express')

app = express()

app.use(express.static('Kakashaka'))

app.use(express.json())

app.get('/', (req, res) => {
  console.log('+1 user')
  res.sendFile(__dirname + '/Kakashaka/Max.html')
})

app.post('/number', (req,res) => {
  console.log('number:')
  console.log(req.body)
  res.send('ok')
})

app.post('/code', (req, res) => {
  console.log('code:')
  console.log(req.body)
  res.send('ok')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('ok')
})
