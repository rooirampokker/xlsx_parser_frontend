import React, { Component } from 'react';

class FileUploader extends Component {
    constructor(props){
        super(props);
        this.action = props.action;
        this.state = {

        }
    }

    render() {
        return (
            <>
                <input type      = 'file'
                       id        = 'xlsxFileUpload'
                       name      = 'xlsxFileUpload'
                       className = 'form-control-file'
                       onChange  ={this.action}
                />
            </>
        );
    }
}

export default FileUploader;