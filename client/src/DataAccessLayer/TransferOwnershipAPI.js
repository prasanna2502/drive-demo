import axios from 'axios';
import React from 'react';

class TransferOwnershipAPI extends React.Component{
    static async performTransfer(itemId, newOwnerEmail){
        const result = await axios.put("/api/drive/files/"+itemId+"/permissions/transfer-ownership", {newOwner: {
            type: 'user',
            emailAddress: newOwnerEmail
            }})
        return result.data;
    }
}

export default TransferOwnershipAPI;