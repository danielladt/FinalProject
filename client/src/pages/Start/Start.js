import React, { Component } from 'react';
import auth from '../../utils/auth'

class Start extends Component {

  handleLogin = (e) => {
    // parameters need to be coming from the form
    auth.login('blah', 'foo')
  }
  handleGuest = () => {
    
  }
  handleSignup = (e) => {
    // parameters need to be coming from the form
    auth.register('andrew', 'pass')
  }

  render(){
    
    return(
      <div style={{textAlign: 'center'}}>
        <button onClick={this.handleSignup} className='btn btn-primary'>Signup</button>
        <button onClick={this.handleLogin} className='btn btn-primary'>Login</button>
        <button onClick={this.handleGuest} className='btn btn-primary'>Guest</button>
      </div>
    )
  }
}

export default Start;