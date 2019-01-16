import React, { Component } from 'react';
import axios from 'axios';
import Actions from '../../actions/actionType';
class userFindContainer extends Component {

    componentDidMount() {
        if(sessionStorage.getItem('token')){
            this.props.checkLogin(sessionStorage.getItem('token'));
        }
        axios.get(`/api/findOneUser/${this.props.match.params.userId}`).then((respone)=>{
            this.setState({
                ProjectList: respone.data.ProjectList,
                userId: respone.data.userId
            });    
        }).catch((err)=>{alert('해당유저는 존재하지않습니다.'); this.props.history.push('/');});
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default userFindContainer;