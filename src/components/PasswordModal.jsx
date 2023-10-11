function PasswordModal({ password, setPassword, closeModal }) {
  const handleChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Enter Password</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            closeModal()
          }}
        >
          <label>
            Password:
            <input type='password' value={password} onChange={handleChange} />
          </label>
          <button type='submit'>Submit</button>
        </form>
        {/* No need for a "Close" button; modal closes when the password is correct */}
      </div>
    </div>
  )
}

export default PasswordModal
