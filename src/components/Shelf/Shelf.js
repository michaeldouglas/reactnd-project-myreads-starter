import React, { Component } from "react"

export default class Shelf extends Component {
  
  state = {
    value: ''
  }

  render() {
    const { listOfBooks, onUpdateBook, title, shelf } = this.props

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            {listOfBooks.map((data) => (
                <li key={data.id}>
                  <div className="book">
                    <div className="book-top">
                    {/* Image */}
                    <div className="book-cover">
                      {(!data.imageLinks ? 
                        <img style={{
                          width: 128,
                          height: 193
                        }} src="https://www.mustangsplus.com/image.php?type=P&id=11762" alt={data.title}/>
                      :
                        <img style={{
                          width: 128,
                          height: 193
                        }} src={data.imageLinks.thumbnail} alt={data.title}/>
                      )}
                      </div>
                      {/* Changer */}
                      <div className="book-shelf-changer">
                        <select onChange={(event) => onUpdateBook(event.target.value, data)} value={shelf}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently reading</option>
                          <option value="wantToRead">Want to read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    {/* Title/Authors */}
                    <div className="book-title">{data.title}</div>
                    <div className="book-authors">{(!data.authors ? '' : 
                      data.authors.map((author) => (
                          <p key={author}>{author}</p>
                        )))}
                    </div>
                  </div>
                </li>
              ) 
            ).sort()}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
