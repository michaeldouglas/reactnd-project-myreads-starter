import React, { Component } from "react";

export default class Read extends Component {
  render() {
    const { read } = this.props

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
                        <select>
                          <option value="none" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    {/* Title\Authors */}
                    <div className="book-title">To Kill a Mockingbird</div>
                    <div className="book-authors">Harper Lee</div>
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
