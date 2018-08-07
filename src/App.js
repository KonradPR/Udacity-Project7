import React from 'react';
import { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'


class BooksApp extends Component {

  constructor(props) {
      super(props);
      this.updateBooks = this.updateBooks.bind(this);
  }

  state =  {
    books: []
  }




updateBooks() {
  BooksAPI.getAll().then((books) => {
    this.setState({books});
  })
}

  componentDidMount() {
    this.updateBooks();
  }

  changeShelf(book, shelf) {
    BooksAPI.update(book,shelf);
  }
  createBook(book) {

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={(e)=>{}}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" selected={book.shelf==='currentlyReading' ? "selected" : null} >Currently Reading</option>
                <option value="wantToRead" selected={book.shelf==='wantToRead' ? "selected" : null}  >Want to Read</option>
                <option value="read" selected={book.shelf==='read' ? "selected" : null}  >Read</option>
                <option value="none" selected={book.shelf==='none' ? "selected" : null}  >None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.author}</div>
        </div>
      </li>
    )

  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
            <ListBooks
            books={this.state.books}
            updateShelf={this.changeShelf}
            updateBooks={this.updateBooks}/>
        )}/>
        <Route exact path="/search" render={() => (
            <SearchBooks
            updateShelf={this.changeShelf}
            updateBooks={this.updateBooks}/>
        )}/>
      </div>
    )
  }

}

export default BooksApp
