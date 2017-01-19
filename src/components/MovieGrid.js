import React from 'react'
import { Link } from 'react-router'
import { GridList, GridTile } from 'material-ui/GridList'
import FavButton from '../components/FavButton'

import './MovieGrid.css'

export default function MovieGrid({ movies, fav, config, context, onFavClick }) {
  if (empty(movies)) {
    return (<p>No movies found</p>)
  }

  const gridListStyle = {
    width: 800,
  }
  const cols = 4
  const cellHeight = 313

  return (
    <GridList cellHeight={cellHeight} cols={cols} style={gridListStyle}>
      {movies.map(movie => (
        <GridTile
          key={movie.id}
          className='List-grid-tile'
          title={<Link to={'/' + context + '/' + movie.id}>{movie.title}</Link>}
          subtitle={printGenres(movie.human_genres)}
          actionIcon={<FavButton color="white" added={fav.indexOf(movie.id) !== -1} onClick={onFavClick.bind(this, movie)} />}
        >
          <div className='List-movie-thumb'>
            <Link to={'/' + context + '/' + movie.id}>
              <img src={getMovieThumbUrl(config, movie)} alt={movie.title} style={{height: cellHeight}} />
            </Link>
          </div>
        </GridTile>
      ))}
    </GridList>
  )
}

function getMovieThumbUrl(config, movie) {
  return config.images.secure_base_url + 'w342' + movie.poster_path
}

function printGenres(genres) {
  if (empty(genres)) {
    return '–'
  }
  return genres.map(g => {
    return g.name
  }).join('/')
}

function empty(something) {
  return !something || something.length === 0
}
