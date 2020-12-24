import React from "react";
import Cookies from "universal-cookie";

class CookiesHelper extends React.Component{
    static isUserLoggedIn(){
        const cookies = new Cookies();
        const token = cookies.get("driveDemoSessionId");
        return token ? true : false;
    }

    static deleteCookie(){
        const cookies = new Cookies();
        cookies.remove("driveDemoSessionId");
    }
}

export default CookiesHelper;