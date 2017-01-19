import React, { Component } from 'react'
import { fetchConfig } from '../actions'
import { connect } from 'react-redux'

import './App.css'

class App extends Component {

  componentDidMount() {
    this.props.actions.fetchConfig()
  }

  render() {
    let content = ''

    if (this.props.configLoading) {
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
