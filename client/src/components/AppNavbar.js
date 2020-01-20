import React, { Component,Fragment } from 'react';
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
  } from 'reactstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import {clearErrors} from '../actions/errorActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../actions/authActions';

class AppNavbar extends Component {
    state={
        isOpen:false,
        modalRegister:false,
        modaleLogin:false,
        er:null,
        el:null
    }
    toggle=()=>{
        this.setState({
            isOpen:!this.state.isOpen
        });
    }
    toggleRegister=(e)=>{
        console.log(e);
        e.preventDefault();
        this.props.clearErrors();
        this.setState({
            modalRegister:!this.state.modalRegister,
            er:e
        });
    }
    toggleLogin=(e)=>{
        e.preventDefault();
        this.props.clearErrors();
        this.setState({
            modalLogin:!this.state.modalLogin,
            el:e
        });
    }
    onLogout=(e)=>{
        e.preventDefault();
        this.props.logout();
    }
    render() {
        const {user}=this.props;
        const authLinks=(
            <Fragment>
                <NavItem>
                    <span className='navbar-text mr-3'>
                        <strong>{user ? `Welcome ${user.username}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <NavLink href="" onClick={this.onLogout}>Logout</NavLink>
                </NavItem>
            </Fragment>
        )
        const guestLinks=(
            <Fragment>
                <NavItem>
                    <NavLink href="" onClick={this.toggleRegister}>Register</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="" onClick={this.toggleLogin}>Login</NavLink>
                </NavItem>
            </Fragment>
        )
        return (
            <div>
                <Navbar color="dark" dark light expand="sm">
                <NavbarBrand href="/">Youtube Video Downloader</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {this.props.isAuthenticated ? (<NavItem>
                    <NavLink href="/history">History</NavLink>
                    </NavItem>):null}
                    <NavItem>
                    <NavLink href="https://github.com/DefaultLol?tab=repositories">GitHub</NavLink>
                    </NavItem>
                    {this.props.isAuthenticated ? (<UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem href="/home">
                            Download one video
                        </DropdownItem>
                        <DropdownItem>
                            Download playlist
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>):null}
                </Nav>
                <Nav navbar>
                    {(this.props.isAuthenticated && this.props.finish) && authLinks}
                    {(!this.props.isAuthenticated && this.props.finish) && guestLinks}
                </Nav>
                </Collapse>
            </Navbar>
            <LoginModal evt={this.state.el} toggleLogin={this.toggleLogin} modalLogin={this.state.modalLogin} />
            <RegisterModal evt={this.state.er} toggleRegister={this.toggleRegister} modalRegister={this.state.modalRegister} />
            </div>
        )
    }
}

AppNavbar.proptype={
    clearErros:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
    logout:PropTypes.func.isRequired
}


const mapStateToProps=(state)=>({
    isAuthenticated:state.auth.isAuthenticated,
    user:state.auth.user,
    error:state.error,
    finish:state.auth.finish
});

export default connect(mapStateToProps,{clearErrors,logout})(AppNavbar);
