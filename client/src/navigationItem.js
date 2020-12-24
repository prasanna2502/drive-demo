import React from "react";

class NavigationItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            directoryId: props.item.id,
            directoryName: props.item.name,
            parentDirectory: props.parentDirectory
        }
        this.navigateToDirectory = this.navigateToDirectory.bind(this);
    }

    navigateToDirectory(){
        this.state.parentDirectory.renderNewDirectory(this.state.directoryId, this.state.directoryName);
    }

    render(){
        if (this.state.directoryName === ">")
            return (<div className="navigationMarker"> > </div>);
        else
            return(<div className="navigationItem" onClick={this.navigateToDirectory}>{this.state.directoryName} </div>);
    }
}

export default NavigationItem;