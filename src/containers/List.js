import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMovies, updateSearch, setPage, toggleMovieFav } from '../actions'
import TextField from 'material-ui/TextField'
import debounce from 'lodash/debounce'
import ReactPaginate from 'react-paginate'
import MovieGrid from '../components/MovieGrid'
import MainNav from '../components/MainNav'

import './List.css'

class List extends Component {
  componentDidMount() {
    this.props.actions.fetchMovies()
  }

  handleSearch = debounce((e, newValue) => {
    this.props.actions.updateSearch(newValue)
  }, 500)

  handlePageClick = (data) => {
    this.props.actions.setPage(data.selected + 1)
  }

  handleFavClick(movie) {
    this.props.actions.toggleMovieFav(movie)
  }

  render() {
    let Pagination = ""

    if (this.props.pageCount > 1) {
      Pagination = (
        <div className='List-pagination-wrap'>
          <ReactPaginate previousLabel={"previous"}
                         nextLabel={"next"}
                         breakLabel={<a href="">...</a>}
                         breakClassName={"break-me"}
                         pageCount={this.props.pageCount}
                         forcePage={this.props.page-1}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.handlePageClick}
                         containerClassName={"pagination"}
                         subContainerClassName={"pages pagination"}
                         activeClassName={"active"} />
        </div>
      )
    }

    const { movies, fav, config } = this.props

    return (
      <div className='List App-container'>
        <MainNav active='movies' />
        <div className='List-search'>
          <TextField className='List-search-input' fullWidth={true} hintText="Search for movies..." defaultValue={this.props.query} onChange={this.handleSearch} />
        </div>

        { this.props.loading ? (
          <div>Loading...</div>
        ) : (
          <MovieGrid {...{movies, fav, config}} context="movies" onFavClick={this.handleFavClick.bind(this)} />
        ) }

        {Pagination}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { query, movies, config, page, pageCount } = state.app
  const fav = state.fav.map(m => { return m.id })

  return {
    loading: state.loading.movies,
    query,
    movies,
    config,
    page,
    pageCount,
    fav
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      fetchMovies: () => dispatch(fetchMovies()),
      updateSearch: (query) => dispatch(updateSearch(query)),
      setPage: (num) => dispatch(setPage(num)),
      toggleMovieFav: (movie) => dispatch(toggleMovieFav(movie))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
