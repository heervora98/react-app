import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import Nav from './features/navbar/nav'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav/>
        <Counter />
      </header>
    </div>
  );
}

export default App;
