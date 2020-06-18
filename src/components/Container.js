import React, { useState, useEffect } from 'react'
import Form from './Form'
import axios from 'axios'

const quotesURL = 'http://localhost:3333/api/quotes'

const initialFormState = {
  id: '',
  text: '',
  author: '',
}

export default function Container() {
  ////////////// STATES //////////////
  ////////////// STATES //////////////
  ////////////// STATES //////////////
  const [quotes, setQuotes] = useState([])
  const [formValues, setFormValues] = useState(initialFormState)

  ////////////// NETWORK HELPERS //////////////
  ////////////// NETWORK HELPERS //////////////
  ////////////// NETWORK HELPERS //////////////
  const getQuotes = () => {
    axios.get(quotesURL)
      .then(response => {
        setQuotes(response.data)
      })
      .catch(handleError)
  }

  const postQuote = ({ text, author }) => {
    axios.post(quotesURL, { text, author })
      .then(res => setQuotes(quotes.concat(res.data)))
      .catch(handleError)
      .finally(resetForm)
  }

  const putQuote = ({ id, text, author }) => {
    axios.put(`${quotesURL}/${id}`, { text, author })
      .then(res => {
        setQuotes(quotes.map(quote => {
          return quote.id === id ? res.data : quote
        }))
      })
      .catch(handleError)
      .finally(resetForm)
  }

  const deleteQuote = (id) => {
    axios.delete(`${quotesURL}/${id}`)
      .then(res => { // eslint-disable-line
        setQuotes(quotes.filter(quote => quote.id !== id))
      })
      .catch(handleError)
      .finally(resetForm)
  }

  ////////////// OTHER HELPERS //////////////
  ////////////// OTHER HELPERS //////////////
  ////////////// OTHER HELPERS //////////////
  const editQuote = (id) => {
    const quote = quotes.find(q => q.id === id)
    setFormValues({ ...quote })
  }

  const handleError = err => { debugger } // eslint-disable-line

  const resetForm = () => setFormValues(initialFormState)

  ////////////// SIDE EFFECTS //////////////
  ////////////// SIDE EFFECTS //////////////
  ////////////// SIDE EFFECTS //////////////
  useEffect(() => getQuotes(), [])

  return (
    <div className='container'>
      <h3>Quotes</h3>
      <ul>
        {
          quotes.map((q, i) => (
            <li key={q.id}>
              <div>{q.text} ({q.author})</div>
              <button data-cy={`editBtn${i}`} onClick={() => editQuote(q.id)}>Edit</button>
              <button data-cy={`deleteBtn${i}`} onClick={() => deleteQuote(q.id)}>Delete</button>
            </li>
          ))
        }
      </ul>
      <Form
        values={formValues}
        setValues={setFormValues}
        submitHandlers={{ postQuote, putQuote }}
        reset={resetForm}
      />
    </div>
  )
}
