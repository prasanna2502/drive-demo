import React, { Component } from 'react';
import CookiesHelper from "./helpers/CookiesHelper";
import { Redirect } from 'react-router-dom';
import LoginApi from "./DataAccessLayer/LoginApi";
import Bus from './Utils/Bus';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: props.location.state ? props.location.state.message : null,
            type: props.location.state ? props.location.state.type : null
        }
    }
  async signIn(){
      try {
          const loginUrl = await LoginApi.initiateLogin();
          if(loginUrl)
              window.location.href = loginUrl;
          else
              return (<Redirect
                  to={{
                      pathname: "/",
                      state: { message: "Unexpected error. Please try again", type: "error" }
                  }}
              />);
      }catch (e) {
          return (<Redirect
              to={{
                  pathname: "/",
                  state: { message: "Unexpected error. Please try again", type: "error" }
              }}
          />);
      }
  }
  render() {
    if(CookiesHelper.isUserLoggedIn())
      return(
          <Redirect
              to={{
                pathname: "/files"
              }}
          />);
    else {
        if(this.state.message)
            Bus.emit('flash', {message: this.state.message, type: this.state.type});

        return (
            <div id="signIn">
                <button type="button" onClick={this.signIn}>
                    <img src="https://www.iconfinder.com/data/icons/social-media-2210/24/Google-512.png" alt=""/>
                    <b>SignIn</b>
                </button>
            </div>
        );
    }
  }
}

export default Welcome;
