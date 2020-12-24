import React from "react";
import qs from "qs";

class QueryHelper extends React.Component {
    static getQueryParmeters(props){
        if(props.location.search) {
            const parametersString = props.location.search.substring(1);
            const parameters = qs.parse(parametersString);
            return parameters;
        }
    }
}

export default QueryHelper;