import logo from './logo.svg';
import './App.css';
import feathers from '@feathersjs/client';
import io from 'socket.io-client';
import React from 'react';

const socket = io('http://localhost:3030');
    // Initialize a Feathers app
const app = feathers();
    
    // Register socket.io to talk to our server
app.configure(feathers.socketio(socket));


class App extends React.Component {
  constructor(props) {
    super(props)
    this.props=props
    this.sendMessage = this.sendMessage.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {messages:<p></p>,myMessage:""}
  }
  async sendMessage() {
      await app.service('messages').create({
      text: this.state.myMessage
    });
  
    this.setState({myMessage:""})
  }
  addMessage(message) {
    this.setState({messages:<>{this.state.messages}<p>{message.text}</p></>})
  }
  async componentDidMount() {
      const messages = await app.service('messages').find();
      messages.forEach(this.addMessage);
      app.service('messages').on('created', this.addMessage);
  }
  handleMessageChange(e) {
    this.setState({myMessage:e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault()
    this.sendMessage()
  }
  render() {
  return <div className="App">
      {this.state.messages}
      <form onSubmit={this.handleSubmit}>
        <input id="username" type="text" placeholder="Message Text" value={this.state.myMessage} onChange={this.handleMessageChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  
}
}

export default App;
