import axios from 'axios';
import React from 'react';

class FetchFilesAPI extends React.Component{

    static async fetchFiles(params){
        const result = await axios.get('/api/drive/files', {params: params});
        if(result.data)
            return result.data;
    }

}

export default  FetchFilesAPI;