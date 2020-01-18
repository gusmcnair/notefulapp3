import React from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';
import NotesContext from './NOTES_context.js';



class NoteSidebar extends React.Component {
    static contextType = NotesContext;

    render(){
        const contextValue = this.context;
        const noteInfo = (this.props.location.pathname).replace(/\/notes\//, "");
        let thisFolderId = "";
        for(let i = 0; i < contextValue.notes.length; i++){if (noteInfo === contextValue.notes[i].id){thisFolderId = contextValue.notes[i].folderId}}
        let folderName = "";
        for(let i = 0; i < contextValue.folders.length; i ++){if (thisFolderId === contextValue.folders[i].id){folderName = contextValue.folders[i].name}}
        return(
            <div>
             <div className="item-container">
                <button onClick={this.props.history.goBack} className="add-item"><p> &lt; Back </p></button>
            </div>
            <h3>
                {folderName}
            </h3>
            </div>
        );
    }
}

export default withRouter(NoteSidebar);