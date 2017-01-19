import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleMovieFav } from '../actions'
import MovieGrid from '../components/MovieGrid'
import MainNav from '../components/MainNav'

import './Favorites.css'

class Favorites extends Component {
  handleFavClick(movie) {
    this.props.actions.toggleMovieFav(movie)
  }

  render() {
    const { movies, fav, config } = this.props

    return (
      <div className='Favorites App-container'>
        <MainNav active='favorites' />
        { this.props.loading ? (
          <div>Loading...</div>
        ) : (
          <MovieGrid {...{movies, fav, config}} context="favorites" onFavClick={this.handleFavClick.bind(this)} />
        ) }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: false, // maybe async favorites load in future
    movies: state.fav,
    fav: state.fav.map(m => { return m.id }),
    config: state.app.config,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      toggleMovieFav: (movie) => dispatch(toggleMovieFav(movie))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
