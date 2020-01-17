import React, { Component } from 'react';
import {Container,Modal,ModalHeader,ModalBody,Form,FormGroup,Input,Label,Button} from 'reactstrap';

class LoginModal extends Component {
    constructor(props){
        super(props);
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
                            <Form>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" placeholder="Email" 
                                         />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" 
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

export default LoginModal;
