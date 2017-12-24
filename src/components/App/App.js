import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Menu from '../Menu/Menu'
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading'
import WantToRead from '../WantToRead/WantToRead'
import Read from '../Read/Read'
import './App.scss'

class BooksApp extends React.Component { 
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
        read: books.filter((read) => read.shelf === "read")
      })
      
      //Remove Loading
      ele.classList.add("available");
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
              <CurrentlyReading currently={books.currentlyReading} />
            )}/>

            <Route exact path="/lendo-atualmente" render={() => (
              <CurrentlyReading currently={books.currentlyReading} />
            )}/>

            <Route exact path="/quero-ler" render={() => (
              <WantToRead wantToRead={books.wantToRead} />
            )}/>

            <Route exact path="/eu-ja-li" render={() => (
              <Read read={books.read} />
            )}/>

          </div>
        </div>

        <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
      </div>
    )
  }
}

export default BooksApp
