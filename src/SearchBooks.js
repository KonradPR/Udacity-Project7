import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends Component {

  static propTypes = {
    addedBooks: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    updateBooks: PropTypes.func.isRequired,

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
console.log(this.state.searchedBooks)
let booksToDisplay = this.state.searchedBooks;
booksToDisplay=booksToDisplay.map((book)=>{
  for(let i = 0;this.props.addedBooks.length>i;i++){
    if(this.props.addedBooks[i].id==book.id){
    return this.props.addedBooks[i];
    }
    return book;
  }
})
console.log(booksToDisplay)
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
          booksToDisplay.map((book)=> (
            <div key={book.title}><Book
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
