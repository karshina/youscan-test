import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Welcome to Movie Theater</h2>
        </div>
        <div className='App-main'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
