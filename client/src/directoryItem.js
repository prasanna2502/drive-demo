import React from "react";
import ReactTimeAgo from "react-time-ago";
import OverlayDialogBox from "./OverlayDialogBox";
import Bus from './Utils/Bus';

class DirectoryItem extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props.fileData);
        this.state = {
            itemId: props.fileData.id,
            fileName: props.fileData.name,
            lastModifiedTime: new Date(props.fileData.modifiedTime),
            lastModifiedByMe: props.fileData.modifiedByMe,
            ownedByMe: props.fileData.ownedByMe,
            ownedByUser: props.fileData.ownedByMe ? "me" : props.fileData.owners[0].displayName,
            isShared: props.fileData.shared,
            canTransferOwnership: props.fileData.ownedByMe ? true: false,
            thumbnail: props.fileData.iconLink,
            mimeType: props.fileData.mimeType,
            openConfirmationDialog: false,
            parentDirectory: props.parentDirectory,
            itemClass: props.index%2 ===0 ? 'row0 row' : 'row1 row',
            listOfSharedPeople: props.fileData.permissions
                .map((permission)=> permission.displayName)
        }
        this.openConfirmationDialog = this.openConfirmationDialog.bind(this);
        this.renderNewDirectory = this.renderNewDirectory.bind(this);
    }

    renderNewDirectory(){
        this.state.parentDirectory.renderNewDirectory(this.state.itemId, this.state.fileName);
    }

    renderThumbnail(){
        if(this.isAFolder())
            return(<svg x="0px" y="0px" focusable="false" viewBox="0 0 24 24" height="24px" width="24px" fill="#5f6368"><g><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path><path d="M0 0h24v24H0z" fill="none"></path></g></svg>);
        else
            return(
                <img className="fileImage" src={this.state.thumbnail} alt="thumbnail"/>
            );
    }

    isAFolder(){
        return this.state.mimeType === "application/vnd.google-apps.folder";
    }

    openConfirmationDialog(){
        this.setState({
            openConfirmationDialog: true
        })
    }

    renderTransferOwnership(){
        if(this.state.canTransferOwnership)
            return <div id='transferOwnership' onClick={this.openConfirmationDialog}><img src="/assets/transfer-ownership.png" class="transfer-ownership" /></div>;
    }

    renderOpenConfirmationDialog(){
        if(this.state.openConfirmationDialog)
            return <OverlayDialogBox itemId={this.state.itemId} parentDirectoryItem={this}/>
    }

    closeConfirmationDialog(message, type){
        this.setState({
            openConfirmationDialog: false
        })
        if(type){
            Bus.emit('flash', ({message: message, type: type}));
        }
    }

    renderSharedDetails(){
        if(this.state.isShared)
            return(
                <div class="share-icon">
                    <svg width="12px" height="12px" viewBox="0 0 16 16" focusable="false" className="sharedDetails" fill="">
                        <path d="M5,7 C6.11,7 7,6.1 7,5 C7,3.9 6.11,3 5,3 C3.9,3 3,3.9 3,5 C3,6.1 3.9,7 5,7 L5,7 Z M11,7 C12.11,7 13,6.1 13,5 C13,3.9 12.11,3 11,3 C9.89,3 9,3.9 9,5 C9,6.1 9.9,7 11,7 L11,7 Z M5,8.2 C3.33,8.2 0,9.03 0,10.7 L0,12 L10,12 L10,10.7 C10,9.03 6.67,8.2 5,8.2 L5,8.2 Z M11,8.2 C10.75,8.2 10.46,8.22 10.16,8.26 C10.95,8.86 11.5,9.66 11.5,10.7 L11.5,12 L16,12 L16,10.7 C16,9.03 12.67,8.2 11,8.2 L11,8.2 Z"></path>
                    </svg>
                    {this.renderToolTip()}
                </div>
            );
    }

    renderFileNameClass(){
        if(this.isAFolder())
            return("fileClickable");
    }

    renderToolTip(){
        if(this.state.isShared)
            return (<div class="tooltip" id="tooltip">
                <span className="tooltiptext">Shared between {this.state.listOfSharedPeople.join(", ")}</span>
            </div>);
    }

    render(){
        return(
            <li className={this.state.itemClass}>
                <div id="thumbnail">
                    {this.renderThumbnail()}
                </div>
                <div id="fileName" className={this.renderFileNameClass()}>
                    {this.state.fileName}
                    {this.renderSharedDetails()}
                </div>

                <div id="lastModified"> <ReactTimeAgo date={this.state.lastModifiedTime}/> by {this.state.ownedByUser}</div>
                <div id="OwnedBy">{this.state.ownedByUser}</div>
                {this.renderTransferOwnership()}
                {this.renderOpenConfirmationDialog()}
            </li>
        );
    }
}

export default DirectoryItem;
