import React, { Component } from 'react';
import {Container,Form,FormGroup,Label,Input,Button} from 'reactstrap';
import {downloadVideo,loadingVideo} from '../actions/homeActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Home extends Component {
    state={
        url:''
    }
    onSubmitForm=(e)=>{
        e.preventDefault();
        const newUrl={
            url:this.state.url
        }
        this.props.loadingVideo();
        this.props.downloadVideo(newUrl);
    }
    onChangeUrl=(e)=>{
        this.setState({
            url:e.target.value
        });
    }
    render() {
        return (
            <div>
                <Container>
                    <Form onSubmit={this.onSubmitForm}>
                        <FormGroup>
                            <h3 className="text-center" style={{marginBottom:'2rem'}}>Download One Video</h3>
                            <Input type="text" name="url" id="url" placeholder="Enter youtube video url" onChange={this.onChangeUrl} />
                            <Button color="dark" style={{marginTop:'2rem'}} block>Download</Button>
                            {this.props.state.loading && <p className="text-center" style={{marginTop:"2rem"}}><i className="fa fa-refresh fa-spin" style={{fontSize:"80px",color:"#00bfff"}}></i><br /><span>Genrating Link</span></p>}
                        </FormGroup>
                    </Form>
                    {this.props.state.linkMp3 && <div className="text-center"><a href={''+this.props.state.linkMp3+'.mp3'} download>Mp3 Link</a></div>}
                    {this.props.state.linkMp4 && <div className="text-center"><a href={''+this.props.state.linkMp4+'.mp4'} download>Mp4 Link</a></div>}
                    
                </Container>
            </div>
        )
    }
}

Home.proptype={
    downloadVideo:PropTypes.func.isRequired,
    loadingVideo:PropTypes.func.isRequired,
    loadingEnd:PropTypes.func.isRequired
}
const mapStateToProps=(state)=>({
    state:state.home
});

export default connect(mapStateToProps,{downloadVideo,loadingVideo})(Home);
