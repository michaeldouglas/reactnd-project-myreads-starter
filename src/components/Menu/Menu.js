import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../public/images/logo.png'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem} from 'reactstrap';
    

import './Menu.scss'

export default class Menu extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
        return (
            <div className="list-books-title">
                <Navbar id="navbar-center" color="faded" light expand="md" className="navbar navbar-default navbar-fixed-top list-books-titl">
                
                    <Link to="/" className="navbar-brand">
                        <img src={logo} alt="" className="img-responsive" /> My Books
                    </Link>

                    <NavbarToggler onClick={this.toggle} />

                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to="/lendo-atualmente" >Lendo atualmente</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/quero-ler" >Quero Ler</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/eu-ja-li" >Eu já li</Link>
                        </NavItem>
                        </Nav>
                    </Collapse>

                </Navbar>
            </div>
        )
    }
}