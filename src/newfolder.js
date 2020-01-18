import React from 'react';
import './styles.css';
import NotesContext from './NOTES_context.js';


export default class AddNewFolder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            foldername: {value: ''},
        }
        this.createFolder = React.createRef();
    }

    validateFolderName() {
        const folderName = this.state.foldername.value.trim();
        if (folderName.length === 0){
            return "Folder name is required to submit."
        }
    }

    updateFolderName(userInput){
        this.setState({foldername: {value: userInput}});
    }

    handleSubmit(event, addFolder){
        event.preventDefault();
        const newFolderName = this.state.foldername.value;
        console.log(newFolderName)
        fetch("http://localhost:8000/api/lists/", {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                listname: newFolderName,
            })
        })
        .then(response => {
            if(response.ok)
                return response.json()
        })
        .then(response => addFolder(response))
        .catch(err => console.log(err));
        this.createFolder.current.value = "";
        this.setState({foldername: {value: ""}});
        this.createFolder.current.focus()
    }

componentDidMount(){
    this.createFolder.current.focus()
}

render(){

    const folderError = this.validateFolderName();

    return(
        <NotesContext.Consumer>
            {(context => (
        <form onSubmit={e => this.handleSubmit(e, context.addFolder)}>
            <label htmlFor="create-folder">Create Folder</label>
            <input name="create-folder" id="create-folder" type="text" aria-label="Name of folder" aria-required="true" aria-describedby="required-explain" onChange={e => this.updateFolderName(e.target.value)} ref={this.createFolder}/>
            <button 
                disabled={this.validateFolderName()} 
                name="submit-button" 
                id="submit-button">
                    Submit
            </button>
            <p id ="required-explain">{folderError}</p>
        </form>
        ))}
        </NotesContext.Consumer>
    )
}
}