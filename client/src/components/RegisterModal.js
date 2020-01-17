import React, { Component } from 'react';
import {Container,Modal,ModalHeader,ModalBody,Form,FormGroup,Input,Label,Button} from 'reactstrap';

class RegisterModal extends Component {
    constructor(props){
        super(props);
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
                            <Form >
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="username" placeholder="Username" 
                                        />  
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="text" name="email" id="email" placeholder="Email" 
                                        />  
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" 
                                        />  
                                </FormGroup>
                                <FormGroup>
                                    <Label for="confirmPass">Confirm Password</Label>
                                    <Input type="password" name="confirmPass" id="confirmPass" placeholder="Confirm Password" 
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

export default RegisterModal;
