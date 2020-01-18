import React from 'react';
import { NavLink } from 'react-router-dom';
import NotesContext from './NOTES_context.js';
import './styles.css'
import PropTypes from 'prop-types';


export default class Folder extends React.Component {
    static contextType = NotesContext;

    render() {
        const contextValue = this.context
        let total = 0;
        contextValue.notes.map((note) => {
            if (this.props.id == note.list_id) { total++ };
            return total;
        })
        return (
            <li>
                <NavLink to={{
                    pathname: `/folder/${this.props.id}`
                }}
                    activeClassName="selectedLink"
                >
                <h2>{this.props.name}</h2>
                <p>{total}</p>
                    </NavLink>
                </li >
     

        )
    }
}

Folder.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

