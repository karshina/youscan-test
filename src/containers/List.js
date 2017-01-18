import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchMovies, updateSearch, setPage } from '../actions'
import TextField from 'material-ui/TextField'
import debounce from 'lodash/debounce'
import ReactPaginate from 'react-paginate'

import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

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
  };

  getMovieThumbUrl(movie) {
    return this.props.config.images.secure_base_url + 'w342' + movie.poster_path
  }

  render() {
    let Movies = ""
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

    if (!this.props.loading && this.props.movies.length > 0) {
      const gridListStyle = {
        width: 800,
      }

      Movies = (
        <GridList cellHeight={413} cols={3} style={gridListStyle}>
          {this.props.movies.map(movie => (
            <GridTile
              key={movie.id}
              className='List-grid-tile'
              title={<Link to={'/movies/' + movie.id}>{movie.title}</Link>}
              subtitle={movie.human_genres && movie.human_genres.length ? movie.human_genres.map(g => {return g.name}).join('/') : '–'}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <Link to={'/movies/' + movie.id}>
                <img src={this.getMovieThumbUrl(movie)} alt={movie.title} />
              </Link>
            </GridTile>
          ))}
        </GridList>
      )
    }

    return (
      <div className='List App-container'>
        <div className='List-search'>
          <TextField className='List-search-input' fullWidth={true} hintText="Search for movies..." defaultValue={this.props.query} onChange={this.handleSearch} />
        </div>
        { this.props.loading ? <div>Loading...</div> : Movies }
        {Pagination}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    query: state.app.query,
    movies: state.app.movies,
    config: state.app.config,
    page: state.app.page,
    pageCount: state.app.pageCount,
    loading: state.loading.movies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      fetchMovies: () => dispatch(fetchMovies()),
      updateSearch: (query) => dispatch(updateSearch(query)),
      setPage: (num) => dispatch(setPage(num))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
