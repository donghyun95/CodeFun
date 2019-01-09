import React, { Component } from 'react';
import './postedList.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
class postItem extends Component {
    state = {
        isStared : this.props.isStared,
        starNum: this.props.starlength
    }
    //projectId, starlength, userId, Title


    starClicked = () => {
        if(!sessionStorage.getItem('token') || !this.props.loginUser){
            return alert('로그인해주세요.');
        }
        this.setState((State)=>({
            isStared: !State.isStared,
            starNum: State.isStared ? State.starNum-1 : State.starNum+1
        }));
        
        axios({
            method: 'get',
            url: `/api/star/${this.props.projectId}/${this.props.loginUser}`,
            headers : {
                'x-access-token': sessionStorage.getItem('token')
            }
        }).catch((err)=>alert('별주기 실패하였습니다.'));
    }

    render() {
        console.log(this.props.isStared);
        return (
            <div className={cx("postItem")}>
                <Link to={`/project/${this.props.projectId}`}>
                    <div className={cx("postItem__Title")}>
                        {this.props.Title}
                    </div>
                </Link>
                <div className={cx("postItem__Bottom")}>
                    <div>
                        <span className={cx("NostarColor",{starColor2:this.state.isStared})} onClick={this.starClicked} >
                            <FontAwesomeIcon icon={faStar}/>
                        </span>
                        <span className={cx("starNum")}>
                            {this.state.starNum}
                        </span>
                    </div>
                    <Link to={`/userFind/${this.props.userId}`}>
                        <span>
                            By {this.props.userId}
                        </span>
                    </Link>
                </div>
            </div>
        );
    }
}




export default postItem;