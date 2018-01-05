import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Menu from '../Menu/Menu'
import Shelf from '../Shelf/Shelf'
import SearchPage from '../SearchPage/SearchPage'
import './App.scss'

class BooksApp extends Component {
  
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount(){
    const ele = document.getElementById('ipl-progress-indicator')

    BooksAPI.getAll().then(books => {
      this.setState({ books });

      this.setState({
        currentlyReading: books.filter((currentlyReading) => currentlyReading.shelf === "currentlyReading"),
        wantToRead: books.filter((wantToRead) => wantToRead.shelf === "wantToRead"),
        read: books.filter((read) => read.shelf === "read"),
        bookSearch: books
      })
      
      //Remove Loading
      ele.classList.add("available");
      //ele.outerHTML = '';
    });
  }

  updateBook = (value, book) => {
    const ele = document.getElementById('ipl-progress-indicator')
    ele.classList.remove("available");

    BooksAPI.update(book, value).then(books => {
      BooksAPI.getAll().then(books => {
        this.setState({ books });
  
        this.setState({
          currentlyReading: books.filter((currentlyReading) => currentlyReading.shelf === "currentlyReading"),
          wantToRead: books.filter((wantToRead) => wantToRead.shelf === "wantToRead"),
          read: books.filter((read) => read.shelf === "read"),
          bookSearch: books
        })
        
        //Remove Loading
        ele.classList.add("available");
      });
    });
  }

  render() {
    const books = this.state
    
    return (
      <div className="app">
        
        <Menu />

        <div className="list-books">
          <div className="list-books-content">
            
            {/* Currently Reading */}
            <Route exact path="/" render={() => (
              <div>
                <Shelf
                  title="Currently reading"
                  onUpdateBook={this.updateBook}
                  listOfBooks={books.currentlyReading}
                  shelf="currentlyReading"
                />
                <Shelf
                  title="Want to read"
                  onUpdateBook={this.updateBook}
                  listOfBooks={books.wantToRead}
                  shelf="wantToRead"
                />
                <Shelf
                  title="Read"
                  onUpdateBook={this.updateBook}
                  listOfBooks={books.read}
                  shelf="read"
                />
              </div>
            )}/>

            <Route exact path="/lendo-atualmente" render={() => (
              <Shelf
                title="Currently reading"
                onUpdateBook={this.updateBook}
                listOfBooks={books.currentlyReading}
                shelf="currentlyReading"
              />
            )}/>

            <Route exact path="/quero-ler" render={() => (
              <Shelf
                title="Want to read"
                onUpdateBook={this.updateBook}
                listOfBooks={books.wantToRead}
                shelf="wantToRead"
              />
            )}/>

            <Route exact path="/eu-ja-li" render={() => (
              <Shelf
                title="Read"
                onUpdateBook={this.updateBook}
                listOfBooks={books.read}
                shelf="read"
              />
            )}/>

            <Route exact path="/search" render={() => (
              <SearchPage 
                onUpdateBook={this.updateBook}
                bookSearch={books.bookSearch}
              />
            )}/>

          </div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
