import React from "react";


class  DirectoryHeader extends React.Component{
    render() {
        return (
            <li className="header-row">
                <div id="fileName">Name</div>
                <div id="lastModified">Last Modified</div>
                <div id="OwnedBy">Owned By</div>
                <div id="transferOwnership">Transfer Ownership</div>
            </li>
        );
    }
}

export default DirectoryHeader;
