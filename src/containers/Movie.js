import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './Movie.css'

class Movie extends Component {
  render() {
    return (
      <div className='Movie'>
        This is a movie page: {this.props.movie.title}<br />
        <Link to='/movies'>Back to list</Link>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.params.id, 10)
  return {
    movie: state.app.movies.find(movie => {
      return movie.id === id
    })
  }
}

export default connect(mapStateToProps)(Movie)
