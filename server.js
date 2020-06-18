const express = require('express')
const cors = require('cors')
const uuid = require('uuid').v4

const app = express()
app.use(express.json())
app.use(cors())

let quotes = [
  {
    id: uuid(),
    author: 'Dr. Seuss',
    text: "Don't cry because it's over, smile because it happened.",
  },
  {
    id: uuid(),
    author: 'Frank Zappa',
    text: "So many books, so little time.",
  },
  {
    id: uuid(),
    author: 'Oscar Wilde',
    text: "Be yourself, everyone else is already taken.",
  },
]

function getAllQuotes(req, res) {
  res.json(quotes)
}

function getQuoteById(req, res) {
  res.json(quotes.find(friend => friend.id === req.params.id))
}

function postNewQuote(req, res) {
  const quote = { id: uuid(), ...req.body }
  quotes.push(quote)
  res.json(quote)
}

function deleteQuoteById(req, res) {
  quotes = quotes.filter(friend => friend.id !== req.params.id)
  res.json(req.params.id)
}

function replaceQuoteById(req, res) {
  const { id } = req.params
  const updatedQuote = { id, ...req.body }
  quotes = quotes.map(q => {
    if (q.id === id) {
      return updatedQuote
    }
    return q
  })
  res.json(updatedQuote)
}

////////////// ENDPOINTS //////////////
////////////// ENDPOINTS //////////////
////////////// ENDPOINTS //////////////
app.get('/api/quotes', getAllQuotes)
app.get('/api/quotes/:id', getQuoteById)
app.post('/api/quotes', postNewQuote)
app.delete('/api/quotes/:id', deleteQuoteById)
app.put('/api/quotes/:id', replaceQuoteById)

app.listen(3333, () => console.log(
  'Quotes server listening on port 3333!',
))
