import React from 'react';

// this component contains instructions on how to play the game

export default function Help(){

   
        return(
    
            <div className="m-5">
                <div className="border border-dark rounded-3 p-3 m-auto bg-light">
                    <h1>How to play?</h1>
                    <ul>
                        <li className="list-group">Step One: Enter your Player Name</li>
                        <li className="list-group">Step Two: Choose your difficulty level</li>
                        <li className="list-group">Step Three: Click on the cards to reveal their color. The aim is to match them up with their corresponding color.</li>
                        <li className="list-group">Step Four: Don't forget to have fun!</li>
                    </ul>
                </div>
            </div>
        )
    
};

