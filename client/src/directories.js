import React from "react";
import DirectoryHeader from "./directoryHeader";
import DirectoryItem from "./directoryItem";
import FetchFilesAPI from "./DataAccessLayer/FetchFilesAPI";
import Bus from './Utils/Bus';
import NavigationItem from "./navigationItem";

class Directories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rootDirectoryId: '',
            nextPageToken: '',
            files: [],
            dataLoaded: false,
            prevY: 0,
            showLoadingSymbol: true,
            parentDirectories:[{
                name: 'My Drive',
                id: ""
            }]
        }
        this.renderNewDirectory = this.renderNewDirectory.bind(this);
    }

    renderNewDirectory(directoryId, directoryName){
        const me = this;

        this.setState({
           rootDirectoryId: directoryId,
           nextPageToken: '',
           files:[],
           dataLoaded: false,
           prevY: 0,
           showLoadingSymbol: true,
           parentDirectories: this.getNewParentDirectoriesForNavigation(directoryId, directoryName)
        }, () => me.getFiles());
    }

    getNewParentDirectoriesForNavigation(directoryId, directoryName){
        let newParentDirectories = [];
        let isDirectoryFound = false;
        for(const directory of this.state.parentDirectories){
            newParentDirectories = [...newParentDirectories, directory];
            if(directory.id === directoryId) {
                isDirectoryFound = true;
                break;
            }
        }
        if(!isDirectoryFound)
            newParentDirectories = [...newParentDirectories, {
            name: ">"
            }, {
            id: directoryId,
            name: directoryName
            }];
        return newParentDirectories;
    }

    async getFiles(){
        if(this.state.dataLoaded && !this.state.nextPageToken) {
            this.setState({showLoadingSymbol: false});
            return;
        }

        try {
            // console.log(this.state);
            const filesData = await FetchFilesAPI.fetchFiles({pageToken: this.state.nextPageToken, parentFolder: this.state.rootDirectoryId});
            if (filesData.files) {
                this.setState({
                    nextPageToken: filesData.nextPageToken,
                    files: [...this.state.files, ...filesData.files,],
                    dataLoaded: true,
                    showLoadingSymbol: false
                });
            }else {
                Bus.emit('flash', {message: "No files found", type: "error"});
            }
        }catch (e) {
            Bus.emit('flash', {message: "Error in loading files. Please try again", type: "error"});
            this.setState({dataLoaded: true});
        }
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            this.setState({showLoadingSymbol: true});
            this.getFiles();
        }
        this.setState({ prevY: y });
    }

    async componentDidMount() {
        this.getFiles();

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    renderDirectoryItems(){
        if(this.state.dataLoaded){
            let i=0;
            const filesItems = this.state.files.map((file) =>
                <DirectoryItem fileData={file} key={file.id} parentDirectory={this} index={i++}/>
            );
            return(filesItems);
        }
    }

    renderLoading(){
        if(this.state.showLoadingSymbol)
            return (<svg id="loading" width="51px" height="50px" viewBox="0 0 51 50">

                <rect y="0" width="13" height="50" fill="#1fa2ff">
                    <animate attributeName="height" values="50;10;50" begin="0s" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="0;20;0" begin="0s" dur="1s" repeatCount="indefinite" />
                </rect>

                <rect x="19" y="0" width="13" height="50" fill="#12d8fa">
                    <animate attributeName="height" values="50;10;50" begin="0.2s" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="0;20;0" begin="0.2s" dur="1s" repeatCount="indefinite" />
                </rect>

                <rect x="38" y="0" width="13" height="50" fill="#06ffcb">
                    <animate attributeName="height" values="50;10;50" begin="0.4s" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="0;20;0" begin="0.4s" dur="1s" repeatCount="indefinite" />
                </rect>

            </svg>);
    }

    renderNavigation(){
        const navigationItems = this.state.parentDirectories.map((navigationItem) => {
            return(<NavigationItem item={navigationItem} parentDirectory={this}/>);

        });

        return(navigationItems);
    }

    render() {
        return (
            <div className="directory-section" id="directories">
                <div className="navigation">
                    {this.renderNavigation()}
                </div>
                <ul className="directories-list">
                    <DirectoryHeader/>
                    {this.renderDirectoryItems()}
                    {this.renderLoading()}
                </ul>
                <div ref={loadingRef => (this.loadingRef = loadingRef)} />
            </div>
        );
    }
}

export default Directories;