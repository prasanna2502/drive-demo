import React from 'react';
import axios from 'axios';

class LoginApi extends React.Component {

    static async initiateLogin(){
        const result = await axios.get('/api/initiate-login');
        if(result.data)
            return result.data.authUrl;
    }

    static async postLogin(code) {
        const result = await axios.get('/api/after-login', {params: {code: code}});
        return result.data;
    }

    static async getProfile(){
        const result = await axios.get('/api/drive/user-profile');
        if (result.data)
            return result.data.user;
    }

    static async signOut(){
        const result = await axios.post('/api/logout', {});
        if(result.data)
            return result.data;
    }
}

export default LoginApi;