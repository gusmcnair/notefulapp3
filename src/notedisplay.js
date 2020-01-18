import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './styles.css';
import NotesContext from './NOTES_context.js';
import PropTypes from 'prop-types';


class NoteDisplay extends React.Component{


    handleRemoveClick(noteId, deleteNote){
        fetch(`http://localhost:8000/api/notes/${noteId}`, {
            method: 'DELETE'
    })
        .then(response => {
            if(response.ok)
                return response})
        .then(response => deleteNote(noteId))
        .catch(err => console.log(err))
    }
    
    render(){
        return(
            <li>
            <NotesContext.Consumer>
            {(context => (
            <Fragment>
                <Link to={{
                    pathname: `/notes/${(this.props.id).toString()}`,
                    allInfo: this.props.all,
                    }}>
                    <h2>{this.props.name}</h2>
                </Link>
                <p>Modified {this.props.modified}</p>
                <button className="remove" onClick={() => {
                    if(this.props.history.location.pathname.charAt(1) === "n"){this.props.history.goBack()}
                    this.handleRemoveClick(
                        this.props.id, 
                        context.deleteNote,
                        )
                }}>Remove</button>
            
            </Fragment> ))}
            </NotesContext.Consumer>
            </li>
        )
    }
}


export default withRouter(NoteDisplay);