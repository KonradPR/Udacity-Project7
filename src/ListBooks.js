import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    updateBooks: PropTypes.func.isRequired
  }


  render() {

    const {books} = this.props

    let currentlyReading = books.filter((book) => book.shelf === 'currentlyReading');
    let wantToRead = books.filter((book) => book.shelf === 'wantToRead');
    let read = books.filter((book) => book.shelf === 'read');

    return(

      <div className="list-books">
        <div className="list-books-title">
          <h2>My Reads</h2>
        </div>

        <div className="list-books-content">
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                          currentlyReading.map((book)=> (
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
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                      wantToRead.map((book)=> (
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
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                      read.map((book)=> (
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
        </div>
        <Link className="open-search" to="/search">Add a book</Link>
      </div>
    )
  }
}

export default ListBooks
