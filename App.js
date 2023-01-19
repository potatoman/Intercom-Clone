import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './Messages';
import MessageInput from './MessageInput';
import './App.css';

function App(props) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  if (props.show) {
    return null
  }

  return (
    <div className="App">
      { socket ? (
        <div>
          <div className="chat-container">
            <Messages socket={socket} />
          </div>
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

class ChatButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState(state => ({
      show: !state.show
    }))
  }

  render () {
    return (
      <div className='flexbox'>
      <App show = {this.state.show} />
        <button  className='chatbutton'
        onClick={this.handleClick}>
        </button>
      </div>
      
    )
  }
}

export default ChatButton;