import App from '../App';
import { connect } from 'react-redux';
import Actions from '../actions/actionType';
import React, { Component } from 'react';

class project extends Component {
    componentDidMount() {
        const { projectId } = this.props.match.params;
        if (sessionStorage.getItem('token')) {
            this.props.checkLogin(sessionStorage.getItem('token'))
                .catch((err) => { sessionStorage.removeItem('token'); alert(err); });
        }
        this.props.ProjectInit(projectId).catch((error) => { alert(error); this.props.history.push('/'); });
    }

    render() {
        return (
            <App {...this.props} />
        );
    }
}


const mapStateToProps = function (state) {
    return ({
        UserInfoUSER: state.UserInfo.USER,
        isModalOpen: state.Project.Modal.isModalOpen,
        projectUserId: state.Project.userId,
        Title: state.Project.Title,
    });
};

const mapDispatchToProps = function (dispatch) {
    return ({
        AppInit: (userId, Title) => dispatch(Actions.appinit(userId, Title)),
        ProjectInit: (projectId) => dispatch(Actions.projectRequestThunk(projectId)),
        checkLogin: (token) => dispatch(Actions.checkLoginThunk(token))
    });
};


export default connect(mapStateToProps, mapDispatchToProps)(project);