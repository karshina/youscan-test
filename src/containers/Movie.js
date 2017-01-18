import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchMovie } from '../actions'
import './Movie.css'

class Movie extends Component {
  componentDidMount() {
    this.props.actions.fetchMovie(this.props.params.id)
  }

  render() {
    if (this.props.loading) {
      return (
        <div className='Movie'>
          <div>Loading the Movie...</div>
        </div>
      )
    }

    return (
      <div className='Movie'>
        This is a movie page: {this.props.movie.title}<br />
        <Link to='/movies'>Back to list</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movie: state.app.movie,
    loading: state.loading.movie,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      fetchMovie: (id) => dispatch(fetchMovie(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
