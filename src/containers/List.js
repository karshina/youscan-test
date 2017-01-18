import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchMovies, updateSearch } from '../actions'
import './List.css'

class List extends Component {
  componentDidMount() {
    this.props.actions.fetchMovies()
  }

  handleSearch(e) {
    this.props.actions.updateSearch(e.target.value)
  }

  render() {
    if (this.props.loading) {
      return (
        <div className='List'>
          <div>Loading...</div>
        </div>
      )
    }

    return (
      <div className='List'>
        <div className='List-search'>
          <input type="text" placeholder="Search for movies..." value={this.props.search} onChange={this.handleSearch.bind(this)} />
        </div>

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
    search: state.app.search,
    movies: state.app.movies,
    loading: state.loading.movies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      fetchMovies: () => dispatch(fetchMovies()),
      updateSearch: () => dispatch(updateSearch())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
