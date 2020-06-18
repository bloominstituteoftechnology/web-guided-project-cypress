import React from 'react'

export default function Form(props) {
  const {
    values,
    setValues,
    reset,
    submitHandlers: { postQuote, putQuote },
  } = props

  ////////////// EVENT HANDLERS //////////////
  ////////////// EVENT HANDLERS //////////////
  ////////////// EVENT HANDLERS //////////////
  const onCancel = evt => {
    evt.preventDefault()
    reset()
  }

  const onSubmit = evt => {
    evt.preventDefault()
    values.id
      ? putQuote(values)
      : postQuote(values)
  }

  const onChange = evt => {
    // pull these out of the event to avoid the `persist()`
    const { name, value } = evt.target
    setValues({ ...values, [name]: value })
  }

  ////////////// HELPER //////////////
  ////////////// HELPER //////////////
  ////////////// HELPER //////////////
  const isDisabled = () => {
    return !values.text.trim() || !values.author.trim()
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>{values.id ? 'Edit' : 'Add New'} Quote</h3>
      <input
        name='text'
        type='text'
        value={values.text}
        onChange={onChange}
        placeholder='Enter text'
      />
      <input
        name='author'
        type='text'
        value={values.author}
        onChange={onChange}
        placeholder='Enter author'
      />
      <button id='submitBtn' disabled={isDisabled()}>
        Submit {values.id ? 'Changes' : 'Quote'}
      </button>
      <button id='cancelBtn' onClick={onCancel}>Cancel</button>
    </form>
  )
}
