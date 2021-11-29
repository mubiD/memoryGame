import React from 'react';

// this is a stateful login component

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {username: ''}
        this.handleChange = this.handleChange.bind(this);
        this.setName = this.setName.bind(this);
    }

    // this fxn handles the change in the input where users may insert their name 
    // the user inserted name is then saved into state
    handleChange(event){
        this.setState({ username: event.target.value });
        let name = ({ username: event.target.value });
        // the variable 'name' needs to be lifted up to App so that it can be passed to memory game
        console.log(name)
      };
    
    // this fxn sets the inserted user name to sessionStorage so that it may retrived for future use
    setName = e => {
        let name = (e.target.value)
        const nameJson = JSON.stringify(name)
        sessionStorage.setItem('playerName', nameJson)
        alert(` Hi ${name} and welcome to our minigame`)
    }

    render(){

        return(
            <div>
                <form>
                    <h2>Enter Player Name</h2>
                    <input 
                    name="username"
                    value ={this.state.username}
                    onChange={this.handleChange}>

                    </input>
                    <button
                    className="button "
                    type = "submit"
                    value ={this.state.username}
                    onClick={this.setName}>
                        Enter
                    </button>
                </form>
        </div>
        )
    }
};

export default Login;

