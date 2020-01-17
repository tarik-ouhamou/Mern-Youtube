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

class AppNavbar extends Component {
    state={
        isOpen:false
    }
    toggle=()=>{
        this.setState({
            isOpen:!this.state.isOpen
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
                    <NavLink href="https://github.com/DefaultLol">GitHub</NavLink>
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
                        <NavLink href="/components/">Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/components/">Login</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
            </div>
        )
    }
}

export default AppNavbar;
