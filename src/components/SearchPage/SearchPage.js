import React, { Component } from "react";
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from '../../BooksAPI'

export default class SearchPage extends Component {

    state = {
        query: '',
        books: []
    }

    updateQuery = (query, bookSearch) => {
        if (!query) {
            this.setState({query: '', books: []})
        } else {
            this.setState({ query })

            BooksAPI.search(query).then(books => {
                
                if (books.error) {
                    books = []
                }

                books.map(result => {
                    result.shelf = 'none'
                    bookSearch.forEach(myBook => {
                      if(result.id === myBook.id){
                        result.shelf = myBook.shelf
                      } 
                    })
                    return result
                })
                
                this.setState({ books })
            });
        }
    }

    render() {
        const { bookSearch, onUpdateBook } = this.props
        const { query, books } = this.state

        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to="/" className="close-search">
                            Close
                        </Link>
                        <div className="search-books-input-wrapper">
                            <input
                                type="text" 
                                placeholder="Search by title or author"
                                value={query}
                                onChange={(event) => this.updateQuery(event.target.value, bookSearch)} 
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid" />
                    </div>
                </div>

                {books === 0 && query && (
                    <h2 className="not-found">Sorry, no results matching that title <strong>( {query} )</strong>. ¯\_(ツ)_/¯</h2>
                )}

                {books.length > 0 &&
                    <h2 className="not-found">
                        Total books found <strong>( {books.length} )</strong> with the term <strong>( {query} )</strong>
                    </h2>
                }

                <div className="bookshelf">
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.sort(sortBy('title')).map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                    <div className="book-top">
                                        {/* Image */}
                                        <div className="book-cover">
                                            <img style={{
                                            width: 128,
                                            height: 193
                                            }} src={book.imageLinks.thumbnail} alt={book.title}/>
                                        </div>
                                        {/* Changer */}
                                        <div className="book-shelf-changer">
                                            <select onChange={(event) =>
                                                onUpdateBook(event.target.value, book)} value={book.shelf}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="read">Read</option>
                                                <option value="currentlyReading">Currently reading</option>
                                                <option value="wantToRead">Want to read</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* Title\Authors */}
                                    <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{(!book.authors ? '' : 
                                            book.authors.map((author) => (
                                                <p key={author}>{author}</p>
                                            )))
                                        }
                                        </div>
                                    </div>
                                </li>
                            ) 
                            )}
                        </ol>
                    </div>
                </div>
         </div>
        );
    }
}
