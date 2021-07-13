import React from 'react';
var __html = require('./homepage.html');
var template = { __html: __html };


class App extends React.Component {
  render() {
    return <div dangerouslySetInnerHTML={template} />
  }
}

export default App;