import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <div className='App-container'>
            <h2>Welcome to Movie Theater</h2>
          </div>
        </div>
        <div className='App-main App-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
