import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchMovies, updateSearch, setPage } from '../actions'
import TextField from 'material-ui/TextField'
import debounce from 'lodash/debounce'
import ReactPaginate from 'react-paginate'
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

  render() {
    let Movies = ""
    let Pagination = ""

    if (this.props.pageCount > 1) {
      Pagination = (
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
      )
    }

    if (!this.props.loading) {

      Movies = (
        <div className="List-movies">
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

    return (
      <div className='List'>
        <div className='List-search'>
          <TextField hintText="Search for movies..." defaultValue={this.props.search} onChange={this.handleSearch} />
        </div>
        { this.props.loading ? <div>Loading...</div> : Movies }
        {Pagination}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    search: state.app.search,
    movies: state.app.movies,
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
