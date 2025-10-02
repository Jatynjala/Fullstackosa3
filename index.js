const express = require('express')
const morgan = require("morgan")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

let notes = [
  {
    id:"1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id:"2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id:"3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id:"4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('dist/index.html')
})

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/info', (request, response) => {
  const part1 = '<p>Phonebook has info for '
  const part2 = notes.length
  const part3 = ' people<\p>'
  const part4 = new Date()
  const res = part1 + part2 + part3 + part4
  response.send(res)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const minCeiled = Math.ceil(1)
  const maxFloored = Math.floor(100)
  return String(Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled))
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
  console.log("checking")

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  console.log("checking")
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  console.log("generating")
  const note = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  console.log("finding name")
  n = notes.find(noe => noe.name === note.name)
  console.log("search done")
  if (!n) {
    notes = notes.concat(note)
    response.json(note)
  }
  return response.status(400).json({ 
      error: 'name already exists' 
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})