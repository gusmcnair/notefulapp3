import React, { Fragment } from 'react';
import NoteDisplay from './notedisplay'
import { Link } from 'react-router-dom';
import './styles.css'

class MainPage extends React.Component {

    render(){
        return(
            <Fragment>
            <ul className="notes-list">
                {this.props.notes.map((SingleNote) =>
                    <NoteDisplay 
                        key={SingleNote.id + "__" + SingleNote.notename}
                        id={SingleNote.id}
                        name={SingleNote.notename}
                        modified={SingleNote.date_created}
                        all={SingleNote}
                        />
                )}
                </ul>
                <div className="item-container">
                <Link className="add-item"
                    to={{
                        pathname: "/addnewnote"
                    }}>
                    <p>+ Note</p>
                </Link>
                </div>
                </Fragment>
        );
    }
}

export default MainPage;