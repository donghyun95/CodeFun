import React, { Component } from 'react';
import './Title.scss';
import { connect } from 'react-redux';
import Actions from '../../../actions/actionType';

class index extends Component {

    state = {
        Titleinput: this.props.title,
        status: false
    }

    Titleinput = null;


    decideTitle = () => {
        if(this.state.Titleinput.length > 0 && this.state.Titleinput.length < 31 ){
            
            this.props.modifyTitle(this.state.Titleinput);
            this.setState({
                ...this.state,
                status: false
            });
            document.removeEventListener('click',this.decideTitle);
        } else {
            alert('1글자이상 30자미만으로적어주세요')   
        }
    }

    convertInput = (ev) => {
        const { userId, LoginuserId } = this.props;
        if (userId === LoginuserId) {
            this.setState({
                ...this.state,
                status: true
            });
            document.addEventListener('click',this.decideTitle);             
        }
    }
    
    handleChangeEv = (ev) => {
        this.setState({
            ...this.state,
            Titleinput: ev.target.value
        });
    }
    
    handleKeyUpEv = (ev) => {
        if (ev.keyCode === 13) {
            this.decideTitle();
        }
    }

    
    
    render() {
        const { title, userId } = this.props;
        return (
            <div className={'TitleBox'}>
                {this.state.status ?
                    <div>
                        <input className='TitleInput' onChange={this.handleChangeEv} value={this.state.Titleinput} onKeyUp={this.handleKeyUpEv} autoFocus ></input>
                    </div>
                :   <div className='Title' onDoubleClick={this.convertInput}>
                        <span>{title}</span>
                    </div>
                }
                <div className='UserId'>
                    <span>A PEN BY</span><span>{userId}</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    title: state.Project.Title,
    userId: state.Project.userId,
    LoginuserId: state.UserInfo.USER
});
const mapDispatchToProps = (dispatch) => ({
    modifyTitle: (value) => dispatch(Actions.changetitle(value))
});


export default connect(mapStateToProps, mapDispatchToProps)(index);

