import { useRef } from 'react'

function PasswordModal({ password, setPassword, closeModal, error, setError }) {
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const inputValue = e.target.value
    setPassword(inputValue)

    if (inputValue === '') {
      setError(false)
    }
  }

  const clearError = () => {
    if (error) {
      setError(false)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2 className='modal-title'>MakamNetz</h2>
        <form
          className='modal-form'
          onSubmit={(e) => {
            e.preventDefault()
            closeModal()
          }}
        >
          <label className='modal-label'>
            Password:
            <input
              className='modal-input'
              type='password'
              value={password}
              onChange={handleChange}
              onFocus={clearError}
              ref={inputRef}
            />
          </label>
          {error && inputRef.current && inputRef.current.value !== '' && (
            <p className='error-message'>Wrong Password</p>
          )}
          <button className='modal-button' type='submit'>
            Submit
          </button>
        </form>
        {/* No need for a "Close" button; modal closes when the password is correct */}
      </div>
    </div>
  )
}

export default PasswordModal
