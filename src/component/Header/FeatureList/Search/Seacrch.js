import React, { Component } from 'react';
import './Search.scss';
import axios from 'axios';
import UserItem from './userItem';
class Search extends Component {

    state = {
        SearchInput : "",
        receiveUserList: []
    }

    handleChange = (ev) => {
        const {state} = this;
        this.setState({
            ...state,
            SearchInput: ev.target.value
        });
        this.handleSearchUser(ev.target.value);
    }


    handleSearchUser = (value) => {
        axios.get(`/api/SearchUser/${value}`).then((respone)=>{
            this.setState({...this.state, receiveUserList: respone.data}); 
        }).catch((err)=>alert(err));
    }

    render() {
        const userIdList = this.state.receiveUserList.map((item)=>(<UserItem key={item._id} userName={item.userId} closeModal={this.props.closeModal}></UserItem>))

        return (
            <div className="SearchBox" onClick={(ev)=>{ev.stopPropagation();}}>
                <div>
                    <input value={this.state.SearchInput} onChange={this.handleChange} className="Search__input" placeholder="Search User"></input>
                </div>
                <div className="Search__userList">
                    {userIdList}
                </div>
            </div>
        );
    }
}

export default Search;