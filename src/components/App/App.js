import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Menu from '../Menu/Menu'
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading'
import WantToRead from '../WantToRead/WantToRead'
import Read from '../Read/Read'
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
              <CurrentlyReading
                onUpdateBook={this.updateBook}
                currently={books.currentlyReading} 
              />
            )}/>

            <Route exact path="/lendo-atualmente" render={() => (
              <CurrentlyReading
                onUpdateBook={this.updateBook}
                currently={books.currentlyReading} 
              />
            )}/>

            <Route exact path="/quero-ler" render={() => (
              <WantToRead 
                onUpdateBook={this.updateBook}
                wantToRead={books.wantToRead}
              />
            )}/>

            <Route exact path="/eu-ja-li" render={() => (
              <Read 
                onUpdateBook={this.updateBook}
                read={books.read} 
              />
            )}/>

            <Route exact path="/search-page" render={() => (
              <SearchPage 
                onUpdateBook={this.updateBook}
                bookSearch={books.bookSearch}
              />
            )}/>

          </div>
        </div>

        <div className="open-search">
          <Link to="/search-page">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
