import React, { Component } from 'react';
import {ListGroup,ListGroupItem, Container,Button} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadHistory} from '../actions/historyActions';
import PropTypes from 'prop-types';

class Player extends Component {
    constructor(props){
        super(props);
        this.state={
            play:false,
            pause:false,
            stay:0,
            time:0,
            currentAudio:''
        }
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

    play = (url) => {
        console.log(url);
        if(this.audio!=undefined){
            this.audio.pause();
        }
        if(this.state.currentAudio!==url){
            this.audio=new Audio(url);
        }
        this.setState({
            play: true,
            pause: false,
            currentAudio:url
        });
        this.audio.play();
    }
        
    pause = () => {
        this.setState({
            play: false,
            pause: true
        });
        this.audio.pause();
    }
    render() {
        if(this.state.stay===2 && this.props.isAuthenticated){
            const {videos,isLoading}=this.props.history;
            return (
                <div>
                    <Container>
                        <h3 className="text-center" style={{marginBottom:'2rem'}}>Personal Playlist</h3>
                        {isLoading && <p className="text-center"><i className="fa fa-refresh fa-spin" style={{fontSize:"80px",color:"#00bfff",marginTop:"10%"}}></i></p>}
                        {this.state.play && 
                        <p className="text-center">
                            <i className="fa fa-spinner fa-spin" style={{fontSize:"20px",color:"#00bfff",marginRight:'1%'}}></i>
                            <strong>Currently Playing {this.state.currentAudio.split('http://localhost:5000/mp3/')}</strong><br />
                            <p className="text-center" style={{marginTop:"1rem"}}><Button color="danger" onClick={this.pause}><i class="fa fa-pause"></i> Pause</Button></p>
                        </p>}
                        {this.state.pause && 
                        <p className="text-center">
                            <i className="fa fa-spinner fa-spin" style={{fontSize:"20px",color:"#00bfff",marginRight:'1%'}}></i>
                            <strong>Currently Paused {this.state.currentAudio.split('http://localhost:5000/mp3/')}</strong><br />
                            <p className="text-center" style={{marginTop:"1rem"}}><Button color="danger" onClick={()=>this.play(this.state.currentAudio)}><i className="fa fa-play"></i> Resume</Button></p>
                        </p>}
                        {videos && <ListGroup>
                            {videos.map(video=>(
                                <ListGroupItem><span><img src={video.thumbnail} style={{width:"60px",height:"50px",marginRight:"3%"}} /></span>{video.title}
                                <div style={{float:"right"}}>
                                    <Button color="primary" onClick={()=>this.play('http://localhost:5000/mp3/'+video.fileName+'.mp3')}><i classNName="fa fa-play"></i> Play</Button>
                                    <a> </a>
                                </div>
                                </ListGroupItem>
                            ))}
                            </ListGroup>}
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

Player.propType={
    loadingHistory:PropTypes.func.isRequired,
}

const mapStateToProps=(state)=>({
    history:state.history,
    user:state.auth.user,
    isAuthenticated:state.auth.isAuthenticated,
    finish:state.auth.finish,
});

export default connect(mapStateToProps,{loadHistory})(Player);
