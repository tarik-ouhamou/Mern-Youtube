import React, { Component } from 'react';
import {Container,Form,FormGroup,Input,Button,Card,CardImg,CardBody,CardTitle,CardText} from 'reactstrap';
import {downloadVideo,loadingVideo} from '../actions/homeActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            url:'',
            stay:0,
            time:0
        }
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

    onSubmitForm=(e)=>{
        e.preventDefault();
        const info={
            url:this.state.url,
            user_id:this.props.user._id
        }
        this.props.loadingVideo();
        this.props.downloadVideo(info);
    }
    onChangeUrl=(e)=>{
        this.setState({
            url:e.target.value
        });
    }

    render() {
        console.log(this.state.stay);
        if(this.state.stay===2){
            const {description,title,thumbnail,loading,linkMp3,linkMp4}=this.props.home
            return (
                <div>
                    <Container>
                        <Form onSubmit={this.onSubmitForm}>
                            <FormGroup>
                                <h3 className="text-center" style={{marginBottom:'2rem'}}>Download One Video</h3>
                                <Input type="text" name="url" id="url" placeholder="Enter youtube video url" onChange={this.onChangeUrl} />
                                <Button color="dark" style={{marginTop:'2rem'}} block>Download</Button>
                                {loading && <p className="text-center" style={{marginTop:"2rem"}}><i className="fa fa-refresh fa-spin" style={{fontSize:"80px",color:"#00bfff"}}></i><br /><span>Genrating Link</span></p>}
                            </FormGroup>
                        </Form>
                        {linkMp3 && <div className="text-center offset-3"><div className="card" style={{width: "35rem"}}>
                        <img className="card-img-top" src={thumbnail} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={''+linkMp3+'.mp3'} className="btn btn-primary" download>Link Mp3</a>
                            <a href={''+linkMp4+'.mp4'} className="btn btn-primary" style={{marginLeft:"2%"}} download>Link Mp4</a>
                        </div>
                    </div> </div>}      
                    </Container>
                </div>
            )
        }
        else if(this.state.stay===1){
            return(
                <Redirect to="/" />
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
}

Home.proptype={
    downloadVideo:PropTypes.func.isRequired,
    loadingVideo:PropTypes.func.isRequired,
    loadingEnd:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}
const mapStateToProps=(state)=>({
    home:state.home,
    isAuthenticated:state.auth.isAuthenticated,
    finish:state.auth.finish,
    user:state.auth.user
});

export default connect(mapStateToProps,{downloadVideo,loadingVideo})(Home);
