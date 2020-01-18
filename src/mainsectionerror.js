import React from 'react';

export default class MainSectionError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false,
        };
      }


static getDerivedStateFromError(error) {
    return { hasError: true,
            };
  }

  render(){
      if(this.state.hasError){
      return(<h3>This page could not display the notes. Please try reloading.</h3>)
      } return this.props.children;
  }
}