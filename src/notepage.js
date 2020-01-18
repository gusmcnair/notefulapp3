import React from 'react';
import './styles.css'
import NoteDisplay from './notedisplay'
import NotesContext from './NOTES_context.js';


export default class NotePage extends React.Component {
    static contextType = NotesContext;

    render(){
        const contextValue = this.context.notes;
        const noteInfo = (this.props.location.pathname).replace(/\/notes\//, "")
        let thisNote = ""
        for(let i = 0; i < contextValue.length; i ++){
            if (contextValue[i].id == noteInfo){
                thisNote = contextValue[i];
            }
        }
        return(
                <ul>
                    <NoteDisplay 
                        key={thisNote.id}
                        id={thisNote.id}
                        name={thisNote.notename}
                        modified={thisNote.date_created}
                        
                        />
                        <p>{thisNote.notecontents}</p>
                        </ul>
        );
    }
}