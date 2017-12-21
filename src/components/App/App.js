import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import Menu from '../Menu/Menu'
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading'
import WantToRead from '../WantToRead/WantToRead'
import Read from '../Read/Read'
import './App.scss'

class BooksApp extends React.Component { 
  state = {
    showSearchPage: false
  }

  componentDidMount(){
    const ele = document.getElementById('ipl-progress-indicator')
    if(ele){
      setTimeout(() => {
        ele.classList.add('available')
        setTimeout(() => {
          ele.outerHTML = ''
        }, 2000)
      }, 1000)
    }
  }

  render() {
    return (
      <div className="app">
        
        <Menu />

        <div className="list-books">
          <div className="list-books-content">
            
            {/* Currently Reading */}
            <Route exact path="/" render={() => (
              <CurrentlyReading />
            )}/>

            <Route exact path="/lendo-atualmente" render={() => (
              <CurrentlyReading />
            )}/>

            <Route exact path="/quero-ler" render={() => (
              <WantToRead />
            )}/>

            <Route exact path="/eu-ja-li" render={() => (
              <Read />
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
