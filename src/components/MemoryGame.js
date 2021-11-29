// this code was adapted from codeboost.com

import React, { useState, useEffect } from "react";

import Card from './Card.js'

import 'bootstrap/dist/css/bootstrap.min.css';

// this is the memorygame component

function MemoryGame({options, setOptions, highScore, setHighScore}) {
  // it uses useState to initialize and set the state variables for this component
    const [game, setGame] = useState([])
    const [flippedCount, setFlippedCount] = useState(0)
    const [flippedIndexes, setFlippedIndexes] = useState([])
  
    const colors = [
      '#6B4573',
      '#E58124',
      '#EFFF0A',
      '#001427',
      '#B3FFFC',
      '#C6C6E6',
      '#FE5F55',
      '#537A5A',
      '#35A7FF',
      '#EBE1DF',
      '#BC6CA7',
      '#BFD833',
    ]
  
    // useEffect allows access to the variables at various points in the component lifecycle 
    // this fxn creates a new game array and then offers two options for the colors at the back of the cards.
    useEffect(() => {
      const newGame = []
      for (let i = 0; i < options / 2; i++) {
        const firstOption = {
          id: 2 * i,
          colorId: i,
          color: colors[i],
          flipped: false,
        }
        const secondOption = {
          id: 2 * i + 1,
          colorId: i,
          color: colors[i],
          flipped: false,
        }
  
        // the card color configurations are then pushed to the newGame array
        newGame.push(firstOption)
        newGame.push(secondOption)
      }
  
      // the newGame array is then shuffled and the shuffled game is set to state
      const shuffledGame = newGame.sort(() => Math.random() - 0.5)
      setGame(shuffledGame)
    }, [])
  
    // this fxn checks and tracks the amount of clicks that occurs in each game and awards the player a score according to the amount of clicks
    useEffect(() => {
      const finished = !game.some(card => !card.flipped)
      if (finished && game.length > 0) {
        setTimeout(() => {
          const bestPossible = game.length
          let multiplier
    
          // this code block provides the difference in difficulty levels
          if (options === 12) {
            multiplier = 5
          } else if (options === 18) {
            multiplier = 2.5
          } else if (options === 24) {
            multiplier = 1
          }
    
          // this code block calculates the score 
          const pointsLost = multiplier * (0.66 * flippedCount - bestPossible)
    
          let score
          if (pointsLost < 100) {
            score = 100 - pointsLost
          } else {
            score = 0
          }
    
          // this code block calculates if the score is a highscore or not and pushes it to sessionStorage 
          if (score > highScore) {
            setHighScore(score)
            const json = JSON.stringify(score)
            sessionStorage.setItem('memorygamehighscore', json)
          }
          
          // this code block lets the player know if they won 
          const newGame = alert(`You Win!, SCORE:  ${score}. New Game?`)
          if (newGame) {
            const gameLength = game.length
            setOptions(null)
            setTimeout(() => {
              setOptions(gameLength)
            }, 5)
          } else {
            setOptions(null)
          }
        }, 500)
      }
    }, [game])
  
    // this code block ensures that only two blocks can be clicked on per turn
    if (flippedIndexes.length === 2) {
      const match = game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId
    
      // this checks if the colors that were revealed match, and if they do, the flipped index stays true. ie) remains displayed
      if (match) {
        const newGame = [...game]
        newGame[flippedIndexes[0]].flipped = true
        newGame[flippedIndexes[1]].flipped = true
        setGame(newGame)
    
        // if they do not match, they are flipped back
        const newIndexes = [...flippedIndexes]
        newIndexes.push(false)
        setFlippedIndexes(newIndexes)
      } else {
        const newIndexes = [...flippedIndexes]
        newIndexes.push(true)
        setFlippedIndexes(newIndexes)
      }
    }
  
    // this code block displays the cards using the .map() method and contains logic to start the game
    // the cards are rendered using state/props
    if (game.length === 0) return <div>loading...</div>
    else {
      return (
        <div id="cards" className="mx-auto my-5">
          {game.map((card, index) => (
            <div className="card" key={index}>
              <Card
                id={index}
                color={card.color}
                game={game}
                flippedCount={flippedCount}
                setFlippedCount={setFlippedCount}
                flippedIndexes={flippedIndexes}
                setFlippedIndexes={setFlippedIndexes}
              />
            </div>
          ))}
        </div>
      )
    }
  };

  export default MemoryGame;