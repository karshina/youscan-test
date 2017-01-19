import React, { Component } from 'react'
import { apiKey } from '../lib/api'
import { fetchConfig } from '../actions'
import { connect } from 'react-redux'

import './App.css'

class App extends Component {

  componentDidMount() {
    if (apiKey !== null) {
      this.props.actions.fetchConfig()
    }
  }

  render() {
    let content = ''

    if (apiKey === null) {
      content = (
        <div className='App-initial-setup-dialog'>
          <h1>Initial Setup Action Required</h1>
          <p>Due to security purposes I do not want to store the API KEY in source code. As a quick and dirty solution I decided to use localStorage within the local browser session.</p>
          <p>To make the application work (even in production) you need to open Web Inspector and run the following command in web console:</p>

          <code>localStorage.setItem('api_key', 'API_KEY')</code>

          <p>Where <code>'API_KEY'</code> would be the key you obtain from these guys <a href="https://themoviedb.org">https://themoviedb.org</a></p>
        </div>
      )
    } else if (this.props.configLoading) {
      content = (<p>Loading configuration...</p>)
    } else {
      content = this.props.children
    }

    return (
      <div className='App'>
        <div className='App-header'>
          <div className='App-container'>
            <h2>Welcome to Movie Theater</h2>
          </div>
        </div>
        <div className='App-main App-container'>
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    configLoading: state.loading.config
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      fetchConfig: () => dispatch(fetchConfig())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
