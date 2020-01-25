import React, { Component } from 'react';
import {Container,Form,FormGroup,Input,Button,ListGroup,ListGroupItem} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadingPlaylist,getPlaylist} from '../actions/playlistActions';
import {Redirect} from 'react-router-dom';
class Playlist extends Component {
    state={
        videos:[],
        url:'',
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
            this.setState({
                stay:2,
                time:1
            });
        }
    }
    onChange=(e)=>{
        this.setState({
            url:e.target.value
        });
    }
    onDownloadAll=()=>{
        let x=document.getElementsByClassName("mp3");
        for(let i=0;i<x.length;i++){
            console.log(x[i]);
            x[i].click();
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const {url}=this.state;
        const user_id=this.props.user._id
        this.props.getPlaylist(url,user_id);
    }
    render() {
        if(this.state.stay===2 && this.props.isAuthenticated){
            const {isLoading,videos}=this.props.playlist;
            return (
                <div>
                    <Container>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <h3 className="text-center" style={{marginBottom:'2rem'}}>Download Playlist</h3>
                                <Input type="text" name="title" placeholder="Enter playlist URL" onChange={this.onChange} />
                                <Button color="dark" style={{marginTop:'1rem'}} block>Download</Button>
                                {isLoading && <p className="text-center" style={{marginTop:"2rem"}}><i className="fa fa-refresh fa-spin" style={{fontSize:"80px",color:"#00bfff"}}></i><br /><span>Genrating Link</span></p>}
                            </FormGroup>
                        </Form>
                        {videos && <ListGroup>
                            {videos.map(video=>(
                                <ListGroupItem><span><img src={video.thumbnail} style={{width:"60px",height:"50px",marginRight:"3%"}} /></span>{video.title}
                                <div style={{float:"right"}}>
                                    <Button href={''+video.linkMp3+'.mp3'} color="primary" className="mp3">Mp3 Link</Button>
                                    <a> </a>
                                    <Button href={''+video.linkMp4+'.mp4'} color="danger">Mp4 Link</Button>
                                </div>
                                </ListGroupItem>
                            ))}
                        </ListGroup>}
                         {videos && <Button color="dark" onClick={this.onDownloadAll} block>Download All</Button>}
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

Playlist.proptype={
    loadingPlaylist:PropTypes.func.isRequired,
    getPlaylist:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool.isRequired,
    finish:PropTypes.bool.isRequired
}

const mapStateToProps=(state)=>({
    playlist:state.playlist,
    user:state.auth.user,
    isAuthenticated:state.auth.isAuthenticated,
    finish:state.auth.finish
});

export default connect(mapStateToProps,{loadingPlaylist,getPlaylist})(Playlist);
