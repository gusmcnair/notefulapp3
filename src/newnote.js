import React from 'react';
import './styles.css';
import NotesContext from './NOTES_context.js';

export default class AddNewNote extends React.Component {
    static contextType = NotesContext;


    constructor(props){
        super(props);
        this.notename = React.createRef();
        this.notecontents = React.createRef();
        this.folderId = React.createRef();
        this.state = {
            notename: {value: ''},
            notecontents: {value: ''},
            folderId: {value: 'trill'},
        }
    }

    updateNoteName(userInput){
        this.setState({notename: {value: userInput}});
    }

    updateNoteContents(userInput){
        this.setState({notecontents: {value: userInput}});
    }

    updateFolder(){
        this.setState({folderId: {value: this.folderId.current.value}});
    }

    validateNoteName() {
        const noteName = this.state.notename.value.trim();
        if (noteName.length === 0){
            return "Note name is required to submit."
        }
    }

    validateNoteContents() {
        const noteContents = this.state.notecontents.value.trim();
        if(noteContents.length === 0){
            return "Note may not be empty."
        }
    }


    handleSubmit(event, addNote){
        event.preventDefault();
        this.updateFolder();
        const newNoteName = this.state.notename.value;
        const newNoteContent = this.state.notecontents.value;
        let newNoteFolderId = "";
        this.context.folders.map((folder) =>
            folder.listname == this.state.folderId.value ? newNoteFolderId = folder.id : newNoteFolderId === "")
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ today.getDate();
        fetch("http://localhost:8000/api/notes/", {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                notename: newNoteName,
                list_id: newNoteFolderId,
                notecontents: newNoteContent,
            })
        })
        .then(response => {
            if(response.ok)
                return response.json()
        })
        .then(response => addNote(response))
        .catch(err => console.log(err));
        this.notename.current.value = ""; 
        this.notecontents.current.value = ""; 
        this.notename.current.focus();
    }

    componentDidMount(){
       this.notename.current.focus()
    }

    render(){
        const noteNameError = this.validateNoteName();
        const noteContentsError = this.validateNoteContents();

        return(
            <NotesContext.Consumer>
                {(context => (
                    <form onSubmit={ e => this.handleSubmit(e, context.addNote)}>
                        <label htmlFor="notename">Note Name</label>
                        <input name="notename" id="notename" type="text" aria-label="Name for note" aria-required="true" aria-describedby="note-name-explain" ref={this.notename} onChange={e => this.updateNoteName(e.target.value)}/>
                        <label htmlFor="notecontents">Note Contents</label>
                        <textarea rows="5" name="notecontents" id="notecontents" aria-label="Body copy for note" aria-required="true" aria-describedby="note-contents-explain" ref={this.notecontents} onChange={e => this.updateNoteContents(e.target.value)}/>
                        <label htmlFor="note-folder">Folder</label>
                        <select name="folderId" id="folderId" type="select" aria-label="Folder to place note in" aria-required="false" ref={this.folderId} onChange={e => this.updateFolder(e.target.value)}>
                            {this.context.folders.map((folder) => 
                                <option>
                                    {folder.listname}
                                </option>
                            )}
                        </select>
                        <button name="submit-button" disabled={this.validateNoteName() || this.validateNoteContents()} id="submit-button">Submit</button>
                        <p id="note-name-explain">{noteNameError}</p>
                        <p id="note-contents-explain">{noteContentsError}</p>
                    </form>
                ))}
            </NotesContext.Consumer>
        )
    }
}