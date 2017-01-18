import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './List.css'

class List extends Component {
  render() {
    return (
      <div className='List'>
        {this.props.movies.map(movie => {
          return (
            <div key={movie.id} className='List-movie'>
              <Link to={'/movies/' + movie.id}>{movie.title}</Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movies: state.app.movies
  }
}

export default connect(mapStateToProps)(List)
