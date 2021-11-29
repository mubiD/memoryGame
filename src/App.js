// this code was adapted from codeboost.com

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import MemoryGame from './components/MemoryGame';
import Login from './components/Login';
import Help from './components/Help';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App(props) {

  // in the code below the state of this component is being initialized using useState
  const [options, setOptions] = useState(null)
  const [highScore, setHighScore] = useState(0)

  // the code below accesses the components lifecycle and state at various points within the lifecycle chain.
  // the code takes the highest score from MemoryGame(state) and saves it in a variable called savedScore.
  // this is then taken and inserted as a state variabl 
  useEffect(() => {
    const json = sessionStorage.getItem('memorygamehighscore')
    const savedScore = JSON.parse(json)
    if (savedScore) {
      setHighScore(savedScore)
    }
  }, [])

  return (
    
    <div className="main m-5 d-flex flex-column container">
      <BrowserRouter>
      <div className="">
      <h1 className="m-5">MEMORY GAME</h1>
        <div className="m-5 text-muted bg-light">High Score: {highScore}</div>
        <Login /> 
        <div className="m-5">
          {/* the code ternary operator below checks whether the state variable 'options' is = null. 
          if it is null, itll display the div containing the buttons (Easy, Meidum and Hard). 
          else itll display the buttons (start over or main menu*/}
          {options === null ? (
            <div className="m-5">
              <h2>Choose a difficulty to begin!</h2>
              <button onClick={() => setOptions(12)}>Easy</button>
              <button onClick={() => setOptions(18)}>Medium</button>
              <button onClick={() => setOptions(24)}>Hard</button>
            </div>
          ) : (
            <div>
              <button onClick={() => {
                  const prevOptions = options
                  setOptions(null)
                  setTimeout(() => {
                    setOptions(prevOptions)
                  }, 5)
                }} 
              >
                Start Over
              </button>
              <button onClick={() => setOptions(null)}>Main Menu</button>
            </div>
          )}
        </div>
      </div>

      {/* the ternary below renders MemoryGame with its state as props */}
      {options ? (
        <MemoryGame
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      ) : (
        <h3>Enjoy!</h3>
      )}

      {/* a browser router to navigate to help component */}
      
      
        <Link to="/Help">get help</Link>
        <Switch>
          <Route path="/Help" component={Help} />
        </Switch>
        </BrowserRouter>
    </div>
    
  )
};
