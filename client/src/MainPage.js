import React from 'react';
import './css/index.css';
import Header from "./header";
import Directories from "./directories";
import LoginApi from "./DataAccessLayer/LoginApi";
import CookiesHelper from "./helpers/CookiesHelper";
import {Redirect} from "react-router-dom";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        if(props.profile)
            this.state = {
                userName: props.profile.displayName,
                userEmail: props.profile.emailAddress,
                redirectToHome: false
            }
        else
            this.state = {
                userName: null,
                userEmail: null,
                redirectToHome: false
            }
    }

    async componentDidMount() {
        if(!this.state.userName) {
            try {
                const userData = await LoginApi.getProfile();
                if (userData)
                    this.setState({
                        userName: userData.displayName,
                        userEmail: userData.emailAddress
                    });
                else
                    this.setState({
                        redirectToHome: true
                    })
            }catch (e) {
                this.setState({
                    redirectToHome: true
                })
            }

        }
    }
    
    render(){
        if(!this.state.redirectToHome && CookiesHelper.isUserLoggedIn())
            return (
                <div className="main-section">
                    <Header mainPage={this}/>
                    <Directories/>
                </div>
            );
        else
            return <Redirect
                to={{
                    pathname: "/",
                    state: { message: "Unexpected error. Please try again", type: "error" }
                }}
            />
    };
}
export default MainPage;
