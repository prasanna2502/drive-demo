import React from "react";
import User from "./user";

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mainPage: props.mainPage
        }
    }

    renderUser(){
        return <User mainPage={this.state.mainPage}/>;
    }
    render() {
        return (
            <div className="header-section">
                <div id="header-title">
                    <img src="/assets/cloud-storage-logo.png" class="header-logo"/>
                    Personal Google Drive
                </div>
                {this.renderUser()}
            </div>
        );
    }
}

export default Header;
