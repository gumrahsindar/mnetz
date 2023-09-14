import './App.css'
import { Container } from 'react-bootstrap'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import CesniNetworkScreen from './screens/CesniNetworkScreen'
import MakamScreen from './screens/MakamScreen'
import MakamNetworkScreen from './screens/MakamNetworkScreen'
import { useState } from 'react'
import AhenkNavbar from './components/Navbar'

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
    <div className='App'>
      <AhenkNavbar />
      <Container fluid>
        <Router>
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
            <Route path='/makam_network' element={<MakamNetworkScreen />} />
          </Routes>
        </Router>
      </Container>
    </div>
  )
}

export default App
