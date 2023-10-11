import './App.css'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CesniNetworkScreen from './screens/CesniNetworkScreen'
import MakamScreen from './screens/MakamScreen'
import MakamNetworkScreen from './screens/MakamNetworkScreen'
import { useState, useEffect } from 'react'
import AhenkNavbar from './components/Navbar'
import PasswordModal from './components/PasswordModal'

function App() {
  const [screen, setScreen] = useState('3d')
  const [password, setPassword] = useState('')
  const [isModalOpen, setModalOpen] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const sessionStartTime = localStorage.getItem('sessionStartTime')
    if (sessionStartTime) {
      const currentTime = new Date().getTime()
      const sessionDuration = 60 * 60 * 1000

      if (currentTime - sessionStartTime > sessionDuration) {
        setModalOpen(true)
      } else {
        setModalOpen(false)
      }
    } else {
      setModalOpen(true)
    }
  }, [])

  function handleScreen(e) {
    if (e.target.value === '2d') {
      setScreen('2d')
    } else {
      setScreen('3d')
    }
  }

  const correctPassword = import.meta.env.VITE_REACT_APP_PASSWORD

  const closeModal = () => {
    if (password === correctPassword) {
      localStorage.setItem('sessionStartTime', new Date().getTime())
      setModalOpen(false)
    }
    setError(true)
  }

  return (
    <div className='App'>
      {isModalOpen ? (
        <PasswordModal
          password={password}
          setPassword={setPassword}
          closeModal={closeModal}
          error={error}
        />
      ) : (
        <>
          <AhenkNavbar />
          <Container fluid>
            <Router>
              <Routes>
                <Route
                  path='/'
                  element={
                    <CesniNetworkScreen
                      handleScreen={handleScreen}
                      screen={screen}
                    />
                  }
                />
                <Route
                  path='/makam/*'
                  element={
                    <MakamScreen handleScreen={handleScreen} screen={screen} />
                  }
                />
                <Route path='/makam_network' element={<MakamNetworkScreen />} />
              </Routes>
            </Router>
          </Container>
        </>
      )}
    </div>
  )
}

export default App
