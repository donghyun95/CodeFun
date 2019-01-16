import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './postedList.scss';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import PostItem from './postItem';

import {connect} from 'react-redux';
import Actions from '../../actions/actionType';
class postedList extends Component {
    static defaultProps = {
        postList : [],
        pending: false,
        isLast : false,
        loginUser : null
    }

    constructor(props) {
        super(props);
        this.newPostReceive = this.newPostReceive.bind(this);
        this.InfiniteScroll = this.InfiniteScroll.bind(this);
    }

    Timer = null;
    componentDidMount() {
        if(sessionStorage.getItem('token')){
            this.props.checkLogin(sessionStorage.getItem('token'));
        }
        this.props.InitialRequest();
        document.addEventListener('scroll',this.InfiniteScroll);
        this.Timer = setInterval(this.newPostReceive,5000);
    }
    
    componentWillUnmount() {
        document.removeEventListener('scroll',this.InfiniteScroll);
        clearInterval(this.Timer);
    }

    componentDidUpdate() {
        if(window.innerHeight >= document.body.clientHeight){
            if(this.props.postList.length > 0 && !this.props.pending){
                this.props.postRequest("old",this.props.postList[this.props.postList.length-1]._id).catch((error)=>{alert('포스트를 가져오는데 실패하였습니다.');});   
            }
        }
    }
    
    shouldComponentUpdate(nextProps) {
        return this.props.postList.length !== nextProps.postList.length;   
    }

    newPostReceive() {
        if(this.props.postList.length){
            this.props.postRequest("new",this.props.postList[0]._id).catch((error)=>{alert('포스트를 가져오는데 실패하였습니다.')});
        }
    }


    InfiniteScroll() {
        if(document.body.clientHeight - window.pageYOffset - window.innerHeight < 250 && !this.props.isLast && !this.props.pending){
            this.props.postRequest("old",this.props.postList[this.props.postList.length-1]._id).catch((error)=>{alert('포스트를 가져오는데 실패하였습니다.');});
        }
    }

    render() {
        const list = this.props.postList.map((item)=>{
            const itemDate = new Date(item.createDate).toLocaleString('ko-KR');
            return (
                    <PostItem key={item._id}  Title={item.content.Title} userId={item.content.userId} projectId={item._id} starlength={item.stars.length} 
                    loginUser={this.props.loginUser} isStared={item.stars.includes(this.props.loginUser)} createDate={itemDate}></PostItem>
                )
        });

        return (
            <div className={cx('postedList')}>
                <div className={cx('postedList__home')}>
                    <span className={cx('backBtn')} onClick={()=>{this.props.history.goBack();}}>
                        <FontAwesomeIcon icon={faArrowLeft} size="2x"></FontAwesomeIcon>
                    </span>
                    <Link to='/'>CODE FUN</Link>
                </div>
                <div className={cx('postedList__body')}>
                        {list}
                </div>
                <div className={cx('postedList__footer')}>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    postList : state.Board.postList,
    pending: state.Board.pending,
    isLast : state.Board.isLast,
    loginUser : state.UserInfo.USER
});

const mapDispatchToProps = (dispatch) => ({
    InitialRequest : () => dispatch(Actions.boardInitialRequestThunk()),
    postRequest : (type,projectId) => dispatch(Actions.boardRequestThunk(type,projectId)),
    checkLogin: (token) => dispatch(Actions.checkLoginThunk(token))
});

export { postedList };
export default connect(mapStateToProps,mapDispatchToProps)(postedList);