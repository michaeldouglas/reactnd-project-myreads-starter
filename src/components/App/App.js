import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import Menu from '../Menu/Menu'
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading'
import './App.scss'

class BooksApp extends React.Component { 
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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
              <div>Lendo atualmente</div>
            )}/>

            <Route exact path="/quero-ler" render={() => (
              <div>Quero Ler</div>
            )}/>

            <Route exact path="/eu-ja-li" render={() => (
              <div>Eu já li</div>
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
