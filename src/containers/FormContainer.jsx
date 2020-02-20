import React, {Component} from 'react';
import FileUploader  from '../components/FileUploader';
import Button  from '../components/Button';
import Dropdown  from '../components/Dropdown';
import GenericInput  from '../components/GenericInput';
import BootstrapTable from 'react-bootstrap-table-next';


class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            sheetNames: [],
            selectedSheet: '',
            genericInputValue: '',
            submitted: false
        }
        this.apiUrl             = 'http://localhost/xlsx_importer/xlsx_parser_backend/src/';
        this.dropdownName       = 'sheet_option';
        this.columns            = '';
        this.genericInputClass  = 'form-control';
        this.genericInputId     = 'dataStarts';
        this.genericInputType   = 'number';
        this.uploadSpreadsheet  = this.uploadSpreadsheet.bind(this);
        this.formSubmit         = this.formSubmit.bind(this);
        this.genericInputAction = this.genericInputAction.bind(this);
        this.getSelectedSheet   = this.getSelectedSheet.bind(this);

    }
/*
*
*/
    uploadSpreadsheet(e) {
        e.preventDefault();
        let formData  = new FormData();
        let myHeaders = new Headers();
        let fileField = document.querySelector("input[type='file']");

        myHeaders.delete('Content-Type');
        formData.append('uploadedFile', fileField.files[0]);

        fetch(this.apiUrl, {

            method: 'POST',
            body: formData,
            headers: myHeaders,
            credentials: 'include'
        })
            .then(
              response => response.json()
            )
            .then((response) => {
                this.setState({
                    sheetNames: response.payload,
                    selectedSheet: response.payload[0]
                });

            });
    }
/*
*
 */
    getSelectedSheet(e) {
        this.setState({
           selectedSheet: e.target.value
        });
    }
/*
*
*/
    genericInputAction(e) {
        this.setState({genericInputValue: e.target.value});
    }
/*
*
 */
    formSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        let myHeaders = new Headers();
        formData.append(this.dropdownName, this.state.selectedSheet);
        formData.append(this.genericInputId, this.state.genericInputValue);
        fetch(this.apiUrl, {
             method: 'POST',
             body: formData,
             headers: myHeaders,
             credentials: 'include'
         })
            .then(response => response.json())
            .then((response) => {
                console.log(response);
               this.columns = response.payload.columns;
               this.data    = response.payload.data;
               this.setState({submitted: true});
            })
    }
/*
*
*/
    render() {
        let dropDown = '';
        let submitButton = '';
        let dataGrid = '';
        let textBox = '';
        if (this.state.sheetNames.length) {
            dropDown =
                <Dropdown
                    name    = {this.dropdownName}
                    action  = {this.getSelectedSheet}
                    options = {this.state.sheetNames}
                />
            submitButton =
                <Button
                    title  = 'Submit'
                    action = {this.formSubmit}
                />
            textBox =
                <GenericInput
                    id     = {this.genericInputId}
                    class  = {this.genericInputClass}
                    type   = {this.genericInputType}
                    action = {this.genericInputAction}
                />
        }
        if (this.state.submitted) {
            dataGrid =
                <BootstrapTable
                    keyField='id'
                    columns={this.columns}
                    data={this.data}
                />
        }
        return (
            <form encType='multipart/form-data'>
                <FileUploader
                    action={this.uploadSpreadsheet}
                />
                {dropDown}
                {textBox}
                {submitButton}
                {dataGrid}
            </form>
        );
    }
}

export default FormContainer;