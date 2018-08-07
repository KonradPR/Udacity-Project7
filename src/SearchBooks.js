import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends Component {

  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
    updateBooks: PropTypes.func.isRequiredred
  }


 state = {
   query: '',
   searchedBooks: []
 }

 updateQuery = (query) => {

if(query){
   BooksAPI.search(query).then((books)=>{
    if(books.constructor === Array){
    this.setState({query:query,
      searchedBooks:books})
    }else{
      this.setState({
        query:query,
        searchedBooks:[]
      })
    }
  })
}else{
  this.setState({
    query:'',
    searchedBooks:[]
  })
}
}


render () {

  return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">

          <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event)=>{this.updateQuery(event.target.value)}}/>

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {
          this.state.searchedBooks.map((book)=> (
            <div key={book.id}><Book
              book={book}
              updateShelf={this.props.updateShelf}
              updateBooks={this.props.updateBooks}
            /></div>
          ))
        }
        </ol>
      </div>
    </div>
  )
}
}

export default SearchBooks
