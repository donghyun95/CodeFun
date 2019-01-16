import React, { Component } from 'react';
import './Title.scss';
import { connect } from 'react-redux';
import Actions from '../../../actions/actionType';
import { Link } from "react-router-dom"
class index extends Component {

    state = {
        Titleinput: this.props.title,
        status: false
    }

    Titleinput = null;

    componentDidMount() {
        this.setState({
            Titleinput: this.props.title
        });
    }

    constructor(props) {
        super(props);
        this.decideTitle = this.decideTitle.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.convertInput = this.convertInput.bind(this);
        this.handleChangeEv = this.handleChangeEv.bind(this);
        this.handleKeyUpEv = this.handleKeyUpEv.bind(this);
    }

    decideTitle() {
        if(this.state.Titleinput.length > 0 && this.state.Titleinput.length < 31 ){
            
            this.props.modifyTitle(this.state.Titleinput);
            this.setState({
                status: false
            });
            document.removeEventListener('click',this.handleDocumentClick);
        } else {
            alert('1글자이상 30자미만으로적어주세요')   
        }
    }

    handleDocumentClick(ev) {
        if(ev.target !== this.Titleinput) {
            this.decideTitle();
        }
    }

    convertInput() {
        const { userId, LoginuserId } = this.props;
        if (userId === LoginuserId) {
            this.setState({
                Titleinput: this.props.title,
                status: true
            });
            document.addEventListener('click',this.handleDocumentClick);             
        }
    }
    
    handleChangeEv(ev) {
        this.setState({
            ...this.state,
            Titleinput: ev.target.value
        });
    }
    
    handleKeyUpEv(ev) {
        if (ev.keyCode === 13) {
            this.decideTitle();
        }
    }

    render() {
        const { title, userId } = this.props;
        return (
            <div className={'TitleBox'} onClick={(ev)=>{ev.stopPropagation();}}>
                {this.state.status ?
                    <div>
                        <input className='TitleInput' onChange={this.handleChangeEv}  value={this.state.Titleinput} onKeyUp={this.handleKeyUpEv} autoFocus ref={(ref)=>this.Titleinput=ref} ></input>
                    </div>
                :   <div className='Title' onDoubleClick={this.convertInput}>
                        <span>{title}</span>
                    </div>
                }
                <div className='UserId'>
                    <span>A PEN BY</span>
                      {userId === " " ? <span>{userId}</span> : 
                    <Link to={`/userFind/${userId}`}>{userId}</Link>}
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

export {index};
export default connect(mapStateToProps, mapDispatchToProps)(index);

