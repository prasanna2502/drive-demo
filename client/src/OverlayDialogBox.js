import React from 'react';
import TransferOwnershipAPI from "./DataAccessLayer/TransferOwnershipAPI";

class OverlayDialogBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemId: props.itemId,
            parentDirectoryItem: props.parentDirectoryItem
        }
        this.closeDialog = this.closeDialog.bind(this);
        this.transferOwnership = this.transferOwnership.bind(this);
    }

    closeDialog(){
        this.state.parentDirectoryItem.closeConfirmationDialog(null);
    }

    async transferOwnership() {
        const email = document.querySelector("#emailEnteredByUser").value;
        try {
            const result = await TransferOwnershipAPI.performTransfer(this.state.itemId, email);
            if(result)
                this.state.parentDirectoryItem.closeConfirmationDialog("Successfully transferred ownership", "success");
        }catch (e) {
            this.state.parentDirectoryItem.closeConfirmationDialog("Failed to transfer ownership. Please try again","error");
        }
    }


    render (){
        return(<div id="overlay">
            <div id="dialogBox">
                <div id="dialogMessage">Enter the email address to transfer ownership to: </div>
                <input type="email" id="emailEnteredByUser"/>
                <button onClick={this.transferOwnership} >Ok</button> <button onClick={this.closeDialog} >Cancel</button>
            </div>
        </div>);
    }

}

export default OverlayDialogBox;