import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchMovies, updateSearch } from '../actions'
import TextField from 'material-ui/TextField'
import debounce from 'lodash/debounce'
import './List.css'

class List extends Component {
  componentDidMount() {
    this.props.actions.fetchMovies()
  }

  handleSearch = debounce((e, newValue) => {
    this.props.actions.updateSearch(newValue)
  }, 500)

  render() {
    return (
      <div className='List'>
        <div className='List-search'>
          <TextField hintText="Search for movies..." defaultValue={this.props.search} onChange={this.handleSearch} />
        </div>

        { this.props.loading ? <div>Loading...</div> :

          this.props.movies.map(movie => {
            return (
              <div key={movie.id} className='List-movie'>
                <Link to={'/movies/' + movie.id}>{movie.title}</Link>
              </div>
            )
          })
        }
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
      updateSearch: (query) => dispatch(updateSearch(query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
