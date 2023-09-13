import './App.css'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CesniNetworkScreen from './screens/CesniNetworkScreen'
import MakamScreen from './screens/MakamScreen'
import MakamNetworkScreen from './screens/MakamNetworkScreen'
import { useState } from 'react'

function App() {
  const [screen, setScreen] = useState('3d')

  function handleScreen(e) {
    if (e.target.value === '2d') {
      setScreen('2d')
    } else {
      setScreen('3d')
    }
  }

  return (
    <Router>
      <div className='App'>
        <Container fluid>
          <Routes>
            <Route
              path='/'
              element={
                <CesniNetworkScreen
                  routing='https://recepgul82.pythonanywhere.com/cesni_all/?format=json'
                  handleScreen={handleScreen}
                  screen={screen}
                />
              }
              exact
            />
            <Route
              path='/makam'
              element={
                <MakamScreen
                  routing='https://recepgul82.pythonanywhere.com/makam_all/?format=json'
                  handleScreen={handleScreen}
                  screen={screen}
                />
              }
            />
            <Route
              path='/makam_network'
              element={<MakamNetworkScreen />}
              exact
            />
          </Routes>
        </Container>
      </div>
    </Router>
  )
}

export default App
