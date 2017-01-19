import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchMovie, toggleMovieFav } from '../actions'
import FavButton from '../components/FavButton'
import MovieGrid from '../components/MovieGrid'

import './Movie.css'

class Movie extends Component {
  componentDidMount() {
    this.props.actions.fetchMovie(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.actions.fetchMovie(nextProps.params.id)
    }
  }

  getMovieThumbUrl(movie) {
    return this.props.config.images.secure_base_url + 'w342' + movie.poster_path
  }

  handleFavClick(movie) {
    this.props.actions.toggleMovieFav(movie)
  }

  join(arr, key) {
    if (arr.length === 0) {
      return '–'
    }
    return arr.map(obj => { return obj[key] }).join(', ')
  }

  render() {
    if (this.props.loading.movie) {
      return (
        <div className='Movie'>
          <div>Loading the Movie...</div>
        </div>
      )
    }


    const { movie, isFavorite, similar, fav, pathname, config } = this.props

    let context = (<i>None</i>)

    if (pathname.indexOf("/movies/") === 0) {
      context = (<Link to='/movies'>Movies List</Link>)
    } else if (pathname.indexOf("/favorites/") === 0) {
      context = (<Link to='/favorites'>Favorites</Link>)
    }

    return (
      <div className='Movie'>
        <div className='Movie-path'>
          {context} / <strong>{movie.title}</strong>
        </div>
        <table>
          <tbody>
            <tr>
              <td className="Movie-leftCol">
                <img src={this.getMovieThumbUrl(movie)} alt={movie.title} />
              </td>
              <td className="Movie-rightCol">
                <div className="Movie-rightCol-fav">
                  <FavButton color="black" added={isFavorite} onClick={this.handleFavClick.bind(this, movie)} />
                </div>
                <h1>{movie.title}</h1>
                <p><i>{movie.tagline}</i></p>
                <p>{movie.overview}</p>
                <p><strong>Status</strong>: {movie.status}</p>
                <p><strong>Release Date</strong>: {movie.release_date}</p>
                <p><strong>Popularity</strong>: {movie.popularity}</p>
                <p><strong>Genres</strong>: {this.join(movie.genres, 'name')}</p>
                <p><strong>Production Companies</strong>: {this.join(movie.production_companies, 'name')}</p>
                <p><strong>Production Countries</strong>: {this.join(movie.production_countries, 'name')}</p>
                <p><strong>Languages</strong>: {this.join(movie.spoken_languages, 'name')}</p>
                <p><strong>Runtime (minutes)</strong>: {movie.runtime}</p>
                <p><strong>Revenue, $</strong>: {movie.revenue}</p>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <h3>Similar movies</h3>
                {this.props.loading.similar ? (
                  <p>Loading...</p>
                ) : (
                  <MovieGrid movies={similar}
                             fav={fav}
                             config={config}
                             context="movies"
                             onFavClick={(movie) => this.handleFavClick(movie)} />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  let isFavorite = false
  const { movie, similar, config } = state.app

  if (movie) {
    isFavorite = (state.fav.find(m => { return m.id === movie.id }) !== undefined)
  }

  const fav = state.fav.map(m => { return m.id })

  return {
    loading: {
      movie: state.loading.movie,
      similar: state.loading.similar,
    },
    pathname: state.routing.locationBeforeTransitions.pathname,
    fav,
    similar,
    movie,
    config,
    isFavorite
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      fetchMovie: (id) => dispatch(fetchMovie(id)),
      toggleMovieFav: (movie) => dispatch(toggleMovieFav(movie))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
