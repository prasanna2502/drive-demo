import React from "react";
import LoginApi from "./DataAccessLayer/LoginApi";
import {Redirect} from "react-router-dom";
import Bus from './Utils/Bus';

class User  extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            mainPage: props.mainPage,
            isLoggedOut: false
        }
        this.signOut = this.signOut.bind(this);
    }

    async signOut(){
        try {
            const result = await LoginApi.signOut();
            if (result.loggedOut) {
                this.setState({isLoggedOut: true})
            }
            else
                Bus.emit({message: "Unexpected error. Please try again. ", type: "error"});
        }
        catch(e){
            Bus.emit({message: "Unexpected error. Please try again. ", type: "error"});
        }
    }
    render(){
        if(!this.state.isLoggedOut)
            return (
                <div className="username">
                    <div id="user-id">
                        Welcome {this.state.mainPage.state.userName}!
                    </div>
                    <div id="sign-out" onClick={this.signOut}>SignOut</div>
                </div>
            );
        else
            return (<Redirect
                to={{
                    pathname: "/",
                    state: {message: "Signed Out Successfully!", type: "success"}
                }}
            />);
    }
}

export default User;