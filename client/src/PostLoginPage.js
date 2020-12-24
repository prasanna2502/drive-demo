import React from "react";
import LoginApi from "./DataAccessLayer/LoginApi";
import QueryHelper from "./helpers/QueryHelper";
import { Redirect } from 'react-router-dom';

class PostLoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirectOnSuccess: false,
            isRedirectOnFailure: false,
            user: null
        }
    }
    async componentDidMount() {
        const queryParameters = QueryHelper.getQueryParmeters(this.props);
        if(queryParameters.code) {
            try {
                const result = await LoginApi.postLogin(queryParameters.code);
                if(result.user)
                    this.setState({user: result.user,
                        isRedirectOnSuccess: true
                    });
                else
                    this.setState({
                        isRedirectOnSuccess: false
                    });
            }catch (e) {
                this.setState({
                    isRedirectOnSuccess: false
                });
            }
        }
    }

    render() {
        if(this.state.isRedirectOnSuccess)
            return(<Redirect to={{
                pathname: "/files",
                state: {profile: this.state.user}
            }}
            />);
        else if(this.state.isRedirectOnFailure)
            return (<Redirect
                to={{
                    pathname: "/",
                    state: {message: "Unexpected error found", error: "error"}
                }}
            />);
        else
            return (<div></div>);
    }
}

export default PostLoginPage;