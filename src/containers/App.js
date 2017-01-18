import React, { Component } from 'react'
import { apiKey } from '../lib/api'
import './App.css'

class App extends Component {
  render() {
    const setupDialog = (
      <div className='App-initial-setup-dialog App-container'>
        <h1>Initial Setup Action Required</h1>
        <p>Due to security purposes I don't want to store the API KEY in source code. As a quick and dirty solution I decided to use localStorage within the local browser session.</p>
        <p>To make the application work (even in production) you need to open Web Inspector and run the following command in web console:</p>

        <code>localStorage.setItem('api_key', 'API_KEY')</code>

        <p>Where <code>'API_KEY'</code> would be the key you obtain from these guys <a href="https://themoviedb.org">https://themoviedb.org</a></p>
      </div>
    )

    return (
      <div className='App'>
        <div className='App-header'>
          <div className='App-container'>
            <h2>Welcome to Movie Theater</h2>
          </div>
        </div>
        { apiKey === null ? setupDialog : <div className='App-main App-container'>
          {this.props.children}
        </div> }
      </div>
    );
  }
}

export default App;
