import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

render() {

  return(<li>
    <div className="book">
      <div className="book-top">
      {this.props.book.imageLinks &&
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
      }
      {!this.props.book.imageLinks &&
        <div className="book-cover" style={{ width: 128, height: 193, backgroundColor: `gray` }}></div>
      }
        <div className="book-shelf-changer">
          <select onChange={(e)=>{this.props.updateShelf(this.props.book,e.target.value)
          this.props.updateBooks()}}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading" selected={this.props.book.shelf==='currentlyReading' ? "selected" : null} >Currently Reading</option>
            <option value="wantToRead" selected={this.props.book.shelf==='wantToRead' ? "selected" : null}  >Want to Read</option>
            <option value="read" selected={this.props.book.shelf==='read' ? "selected" : null}  >Read</option>
            <option value="none" selected={!this.props.book.shelf ? "selected" : null}  >None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{this.props.book.title}</div>
      <div className="book-authors">{this.props.book.author}</div>
    </div>
  </li>)
}

}

export default Book
