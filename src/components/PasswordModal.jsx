function PasswordModal({ password, setPassword, closeModal, error }) {
  const handleChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2 className='modal-title'>Enter Password</h2>
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
            />
          </label>
          {error && <p className='error-message'>Wrong Password</p>}
          <button className='modal-button' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default PasswordModal
