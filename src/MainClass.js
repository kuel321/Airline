
import React, { Component } from 'react'
import Body from './components/Home';

export default class MainClass extends Component {
    constructor(){
    super()
    this.state = {
        username: '',
    }

    }

    setUsername = () => {
        const user = sessionStorage.userData;
        this.setState({
            username: user
        })
    }

  render() {
    return (
      <div><Body setUsername={this.setUsername} /></div>
    )
  }
}
