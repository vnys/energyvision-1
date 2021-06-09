import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Heading } from '@equinor/energyvision-components'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Heading size="md" level="h1">
          Learn React
        </Heading>
      </header>
    </div>
  )
}

export default App
