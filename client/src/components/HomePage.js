import React, { Component } from 'react';
import {Container,Row,Col} from 'reactstrap';
import logo from '../img/logo.png';

class HomePage extends Component {
    render() {
        return (
            <div>
                <Container>
                    <h2 className="text-center"><img src={logo} style={{width:"40px",height:"25px"}} /> Youtube Downloader with MP3 support</h2>
                    <p className="text-center" style={{marginTop:"2rem"}}><strong>Simple Registration give u access to download videos in mp3 with history option.</strong></p>
                    <hr style={{marginTop:"2rem"}} />
                    <Row>
                        <Col xs="2"></Col>
                        <Col className="text-center" xs="4"><div style={{fontSize: "8rem"}}><i className="fa fa-history fa-10x"></i></div></Col>
                        <Col xs="1"></Col>
                        <Col className="text-center" xs="4"><div style={{fontSize: "8rem"}}><i className="fa fa-fighter-jet" aria-hidden="true"></i></div></Col>
                    </Row>
                    <Row>
                        <Col xs="2"></Col>
                        <Col className="text-center" xs="4"><p><strong>History</strong></p><br/>
                            <p style={{marginTop:"-6%"}}>History option that save every download in database for each user.</p>
                        </Col>
                        <Col xs="1"></Col>
                        <Col className="text-center" xs="4"><p><strong>Speed</strong></p><br />
                        <p style={{marginTop:"-6%"}}>Fast Mp4 support download with auto Mp3 conversion.</p>
                        </Col>
                    </Row>
                    <hr style={{marginTop:"5%"}}/>
                    <p className="text-center">© {new Date().getFullYear()}-youtube-video-downloader</p>
                </Container>
            </div>
        )
    }
}

export default HomePage;
