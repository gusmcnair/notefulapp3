import React from 'react';
import { Route, Switch } from "react-router-dom";
import HeaderBanner from './header-banner';
import NotePage from './notepage.js';
import FolderPage from './folderpage.js';
import MainPage from './mainpage.js';
import NoteSidebar from './notesidbar.js';
import MainSidebar from './mainsidebar.js';
import './styles.css';
import NotesContext from './NOTES_context.js';
import AddNewFolder from './newfolder.js';
import AddNewNote from './newnote.js';
import MainSectionError from './mainsectionerror.js';
import SidebarSectionError from './sidebarsectionerror.js';


class App extends React.Component{

  constructor(){
    super();
    this.state = {
    "folders": [],
    "notes": [],
  }     
};


  handleFoldersSetState = (apiFolders) => {
    this.setState({
      folders: apiFolders,
    })
  }

  handleNotesSetState = (apiNotes) => {
    this.setState({
      notes: apiNotes,
    })
  }

deleteNote = (noteId) => {
  const newNoteList = this.state.notes.filter(note =>
    note.id !== noteId)
    this.setState({
      notes: newNoteList,
    })
}

addFolder = (response) => {
  const newFolderList = this.state.folders.concat({id: response.id, listname: response.listname})
  this.setState({
    folders: newFolderList
  })
    } 
  
addNote = (response) => {
  const newNoteList = this.state.notes.concat({id: response.id, notename: response.notename, date_created: response.date_created, list_id: response.list_id, notecontents: response.notecontents})
  this.setState({
    notes: newNoteList
  })
}
  

componentDidMount(){
  fetch("http://localhost:8000/api/lists")
  .then(response =>  {
    if (response.ok)
      return response.json();
})
  .then(response => this.handleFoldersSetState(response))
  .catch(err => console.log(err));

  fetch("http://localhost:8000/api/notes")
  .then(response => {
    if(response.ok)
      return response.json();
  })
  .then(response => this.handleNotesSetState(response))
  .catch(err => console.log(err));
}
  
render(){  
  const contextValue = {
    notes: this.state.notes,
    folders: this.state.folders,
    deleteNote: this.deleteNote,
    addFolder: this.addFolder,
    addNote: this.addNote,
  }  
  return (
    <>
    <HeaderBanner />
    <main className='App'>
      <NotesContext.Provider value={contextValue}>
      <Switch>
        <section className="sidebar">
        <SidebarSectionError>
          <Route exact path="/" render={props =>
          (<MainSidebar {...contextValue}/>)}/>
          <Route path="/folder/:folderId" component={MainSidebar} />
          <Route path="/notes" component={NoteSidebar} />
          <Route path="/addnewfolder" component={MainSidebar} />
          <Route path="/addnewnote" component={MainSidebar} />
          </SidebarSectionError>
        </section>
      </Switch>
      <Switch>
        <section className="main-page">
        <MainSectionError>
          <Route exact path="/" render={props =>
          (<MainPage {...contextValue}/>)} />
         <Route path="/folder/:folderId" component={FolderPage} />
         <Route path="/notes/:noteId" component={NotePage} />
         <Route path="/addnewfolder" component={AddNewFolder} />
         <Route path="/addnewnote" component={AddNewNote} />
         </MainSectionError>
        </section>
      </Switch>
      </NotesContext.Provider>
    </main>
    </>
  );
}
}

export default App;