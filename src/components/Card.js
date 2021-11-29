// this code was adapted from codeboost.com

import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";

import 'bootstrap/dist/css/bootstrap.min.css';

// this fxn contains the logic for the cards to fuction and has state
export default function Card({
    id,
    color,
    game,
    flippedCount,
    setFlippedCount,
    flippedIndexes,
    setFlippedIndexes,
  }) {
    // useState is used to initialize the state
    const [flipped, set] = useState(false)
    // useSpring is used to facilitate the animation of the cards flipping
    const {transform, opacity} = useSpring({
      // this ternary operator checks if the card is flipped, and if it is, its opacity goes from true to false
      opacity: flipped ? 1 : 0,
      // this contains the logic for the animation 
      transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
      config: {mass: 5, tension: 500, friction: 80},
    }
    )
  // this accesses the components state at various positions in the lifecycle and updates the state accordingly
    useEffect(() => {
      if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
        setTimeout(() => {
          set(state => !state)
          setFlippedCount(flippedCount + 1)
          setFlippedIndexes([])
        }, 1000)
      } else if (flippedIndexes[2] === false && id === 0) {
        setFlippedCount(flippedCount + 1)
        setFlippedIndexes([])
      }
    }, [flippedIndexes])
  
    // this fxn checks the amount of times the card was flipped before and sets it to state. it then creates and adds the result to an array. it then sets the outcome to state
    const onCardClick = () => {
      if (!game[id].flipped && flippedCount % 3 === 0) {
        set(state => !state)
        setFlippedCount(flippedCount + 1)
        const newIndexes = [...flippedIndexes]
        newIndexes.push(id)
        setFlippedIndexes(newIndexes)
      } else if (
        flippedCount % 3 === 1 &&
        !game[id].flipped &&
        flippedIndexes.indexOf(id) < 0
      ) {
        set(state => !state)
        setFlippedCount(flippedCount + 1)
        const newIndexes = [...flippedIndexes]
        newIndexes.push(id)
        setFlippedIndexes(newIndexes)
      }
    }
  
    return (
      <div onClick={onCardClick}>
        <a.div
          className="c back"
          style={{
            opacity: opacity.interpolate(o => 1 - o),
            transform,
          }}
        />
        <a.div
          className="c front"
          style={{
            opacity,
            transform: transform.interpolate(t => `${t} rotateX(180deg)`),
            background: color,
          }}
        />
      </div>
    )
  }