import React, { Component } from 'react';
import './userFind.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ProjectItem from './proejectItem';
import {connect} from 'react-redux';
import Actions from '../../actions/actionType';
class userFind extends Component {

    state = {
        userId: null,
        ProjectList: []
    }

    componentDidMount() {
        if(sessionStorage.getItem('token')){
            this.props.checkLogin(sessionStorage.getItem('token'));
        }
        axios.get(`/api/findOneUser/${this.props.match.params.userId}`).then((respone)=>{
            console.log(respone);
            this.setState({
                ProjectList: respone.data.ProjectList,
                userId: respone.data.userId
            });    
        }).catch((err)=>{alert('해당유저는 존재하지않습니다.'); this.props.history.push('/');});
    }

    handleRemove = (index,projectId) => {
        return ()=>{
            axios.delete(`/api/projectDelete/${projectId}`).then(()=>{
                this.setState({...this.state,
                    ProjectList: [...this.state.ProjectList.slice(0,index),...this.state.ProjectList.slice(index+1)]
                });
                alert('성공적으로 삭제했습니다.');
            }).catch((err)=> {alert('삭제에 실패했습니다.');});
        }
    }


    render() {
        let a = new Date("2019-01-09T09:11:43.698Z").toUTCString();
        const UserHasProjectList = this.state.ProjectList.map((item,index)=>{
            const itemDate = new Date(item.createDate).toLocaleString('ko-KR', { timeZone: 'UTC' });
            
        return <ProjectItem key={item._id} starNum={item.stars.length} isOwner={this.props.LogInuser === this.props.match.params.userId} projectID={item._id} projectTitle={item.content.Title} handleRemove={this.handleRemove(index,item._id)} 
        creator={this.props.match.params.userId} createdDate={itemDate}></ProjectItem>})
        return (
            <div className="userFindBox">
                <div className="userFind__container">
                    <div className="userFind__Header">
                        <Link to='/'>CODE FUN</Link>
                    </div>
                    <div className="userFind__Body">
                        <div className="userFind__container__userName">
                            <div>
                                {this.props.match.params.userId} 님의 프로젝트 목록입니다.
                            </div>
                        </div>
                        <div className="userFind__container__project">
                            {UserHasProjectList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    LogInuser : state.UserInfo.USER ,
});

const mapDispatchToProps = (dispatch) => ({
    checkLogin: (token) => dispatch(Actions.checkLoginThunk(token))
});


export default connect(mapStateToProps,mapDispatchToProps)(userFind);