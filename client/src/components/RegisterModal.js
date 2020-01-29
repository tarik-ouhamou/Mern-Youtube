import React, { Component } from 'react';
import {Container,Modal,ModalHeader,ModalBody,Form,FormGroup,Input,Label,Button,Alert} from 'reactstrap';
import {register} from '../actions/authActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearErrors} from '../actions/errorActions';

class RegisterModal extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:'',
            confirmPass:'',
            msg:null
        }
    }

    componentDidUpdate(prevProps){
        const {error}=this.props;
        if(error!==prevProps.error){
            if(error.id==='REGISTER_FAIL'){
                this.setState({msg:error.msg.msg})
            }
            else{
                this.setState({msg:null});
            }
        }
    }

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit=async(e)=>{
        e.preventDefault();
        const {username,email,password,confirmPass}=this.state
        const user={
            username,
            email,
            password,
            confirmPass
        }

        this.props.register(user);
        const sleep = m => new Promise(r => setTimeout(r, m));
        await sleep(1900)
        if(this.props.isAuthenticated){
            this.props.toggleRegister(this.props.evt);
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Modal isOpen={this.props.modalRegister} toggle={this.props.toggleRegister}>
                        <ModalHeader cssModule={{'modal-title': 'w-100 text-center'}}>
                            Registeration Form
                        </ModalHeader>
                        <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        {this.props.isAuthenticated ? (
                            <Alert color='success'>Succefully Registered</Alert>
                        ) : null}
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="username" placeholder="Username" onChange={this.onChange} 
                                        />  
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="text" name="email" id="email" placeholder="Email" onChange={this.onChange} 
                                        />  
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} 
                                        />  
                                </FormGroup>
                                <FormGroup>
                                    <Label for="confirmPass">Confirm Password</Label>
                                    <Input type="password" name="confirmPass" id="confirmPass" placeholder="Confirm Password" onChange={this.onChange}
                                        />  
                                </FormGroup>
                                <Button color="dark" style={{marginTop:'2rem'}} block >Register</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </Container>
            </div>
        )
    }
}

RegisterModal.proptype={
    register:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
    error:PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({
    isAuthenticated:state.auth.isAuthenticated,
    error:state.error
});

export default connect(mapStateToProps,{register,clearErrors})(RegisterModal);
