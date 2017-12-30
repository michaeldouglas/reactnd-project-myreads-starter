import React, { Component } from "react";

export default class Read extends Component {

  state = {
    value: ''
  }

  render() {
    const { read, onUpdateBook } = this.props

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Lendo atualmente</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            {read.map((data) => (
                <li key={data.id}>
                  <div className="book">
                    <div className="book-top">
                      {/* Image */}
                      <div className="book-cover">
                        <img style={{
                          width: 128,
                          height: 193
                        }} src={data.imageLinks.thumbnail} alt={data.title}/>
                      </div>
                      {/* Changer */}
                      <div className="book-shelf-changer">
                        <select onChange={(event) => onUpdateBook(event.target.value, data)} value={this.state.value}>
                          <option value="none" disabled>Move to...</option>
                          <option value="read">Eu já li</option>
                          <option value="currentlyReading">Lendo atualmente</option>
                          <option value="wantToRead">Quero ler</option>
                        </select>
                      </div>
                    </div>
                    {/* Title\Authors */}
                    <div className="book-title">{data.title}</div>
                    <div className="book-authors">{data.authors.map((author) => (
                      <p key={author}>{author}</p>
                    ))}</div>
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
