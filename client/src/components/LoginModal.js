import React, { Component } from 'react';
import {Container,Modal,ModalHeader,ModalBody,Form,FormGroup,Input,Label,Button,Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {login} from '../actions/authActions';
import {clearErrors} from '../actions/errorActions';
import PropTypes from 'prop-types';
 
class LoginModal extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            msg:null
        }
    }

    componentDidUpdate(prevProps){
        const {error}=this.props;
        if(error!=prevProps.error){
            if(error.id=="LOGIN_FAIL"){
                this.setState({
                    msg:error.msg.msg
                });
            }
            else{
                this.setState({
                    msg:null
                });
            }
        }
    }
    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const {email,password}=this.state;
        const user={
            email,
            password
        }
        this.props.login(user);
    }

    render() {
        return (
            <div>
                <Container>
                    <Modal isOpen={this.props.modalLogin} toggle={this.props.toggleLogin}>
                        <ModalHeader cssModule={{'modal-title': 'w-100 text-center'}}>
                            Login Form
                        </ModalHeader>
                        <ModalBody>
                            {this.state.msg ? (
                                <Alert color='danger'>{this.state.msg}</Alert>
                            ) : null}
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange}
                                         />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange}
                                         />
                                </FormGroup>
                                <Button color="dark" style={{marginTop:'2rem'}} block >Login</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </Container>
            </div>
        )
    }
}

LoginModal.proptype={
    login:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool.isRequired,
    error:PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({
    isAuthenticated:state.auth.isAuthenticated,
    error:state.error
});

export default connect(mapStateToProps,{login,clearErrors})(LoginModal);
