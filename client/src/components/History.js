import React, { Component } from 'react';
import {Container,Form,FormGroup,Input,Button} from 'reactstrap';
import {connect} from 'react-redux';
import {loadHistory} from '../actions/historyActions';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom'

class History extends Component {
    state={
        videos:[],
        stay:0,
        time:0
    }
    componentDidUpdate(prevProps){
        if(!this.props.isAuthenticated && this.props.finish){
            this.setState({
                stay:1
            });
        }
        else if(this.props.isAuthenticated && this.props.finish && this.state.time!==1){
            this.props.loadHistory(this.props.user._id);
            this.setState({
                stay:2,
                time:1
            });
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        this.props.loadHistory(this.props.user._id);
        console.log(this.props.videos);
    }
    render() {
        if(this.state.stay===2){
            return (
                <div>
                    <Container>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <h3 className="text-center" style={{marginBottom:'2rem'}}>Download History</h3>
                                <Input type="text" name="title" placeholder="Enter title of video"  />
                                <Button color="dark" style={{marginTop:'1rem'}} block>Search</Button>
                            </FormGroup>
                        </Form>
                        <div className="row">
                            {this.props.history.videos.map(video=>(
                                <div className="card ml-4" style={{width: "20rem", height:"20rem"}} key={video._id}>
                                    <p className="text-center"><img src={video.thumbnail} className="card-img-top" alt="..." style={{width:"315px",height:"160px"}} /></p>
                                    <div className="card-body text-center">
                                    <p className="card-title"><strong>{video.title}</strong></p>
                                    <a href={''+video.linkMp3+'.mp3'} className="btn btn-primary" download>Link Mp3</a>
                                    <a href={''+video.linkMp4+'.mp4'} className="btn btn-primary" style={{marginLeft:"2%"}} download>Link Mp4</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )
        }
        else if(this.state.stay===1){
            return (<Redirect to="/" />)
        }
        else{
            return (<div></div>)
        }
    }
}

History.propType={
    loadingHistory:PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({
    history:state.history,
    user:state.auth.user,
    isAuthenticated:state.auth.isAuthenticated,
    finish:state.auth.finish,
});

export default connect(mapStateToProps,{loadHistory})(History);
