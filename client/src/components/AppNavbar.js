import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

class AppNavbar extends Component {
    state={
        isOpen:false,
        modalRegister:false,
        modaleLogin:false
    }
    toggle=()=>{
        this.setState({
            isOpen:!this.state.isOpen
        });
    }
    toggleRegister=(e)=>{
        e.preventDefault();
        this.setState({
            modalRegister:!this.state.modalRegister
        });
    }
    toggleLogin=(e)=>{
        e.preventDefault();
        this.setState({
            modalLogin:!this.state.modalLogin
        });
    }
    render() {
        return (
            <div>
                <Navbar color="dark" dark light expand="sm">
                <NavbarBrand href="/">Youtube Video Downloader</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                    <NavLink href="/components/">History</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="https://github.com/DefaultLol?tab=repositories">GitHub</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                        Download one video
                        </DropdownItem>
                        <DropdownItem>
                        Download playlist
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="" onClick={this.toggleRegister}>Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="" onClick={this.toggleLogin}>Login</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
            <LoginModal toggleLogin={this.toggleLogin} modalLogin={this.state.modalLogin} />
            <RegisterModal toggleRegister={this.toggleRegister} modalRegister={this.state.modalRegister} />
            </div>
        )
    }
}

export default AppNavbar;
