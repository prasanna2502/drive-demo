import React, { Component } from 'react';
import CookiesHelper from "../helpers/CookiesHelper";
import { Redirect, Route } from 'react-router-dom';

class ProtectedRoute extends Component {
    render() {
        const { component: Component, ...props } = this.props

        return (
            <Route
                {...props}
                render={props => (
                    CookiesHelper.isUserLoggedIn() ?
                        <Component {...props} /> :
                        <Redirect to='/' />
                )}
            />
        )
    }
}

export default ProtectedRoute;