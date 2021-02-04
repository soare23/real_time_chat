import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function ChatWindow(props) {
  const [message, setMessage] = useState();
  const [chat, setChat] = useState({ username: '', message: '' });
  const classes = useStyles();
  let username = props.location.state.username;

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message);
      setMessage(message);
    });
  }, []);

  function onTextChange(e) {
    setChat({ ...chat, username, message: e.target.value });
  }

  function onMessageSubmit(e) {
    e.preventDefault();
    const { username, message } = chat;
    socket.emit('chat', { username, message });
    setChat({ username, message: '' });
  }

  console.log(chat);

  return (
    <div>
      <h3>{message}</h3>
      <div className="card">
        <form onSubmit={onMessageSubmit}>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={chat.message}
            label="Message"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            type="submit"
            size="small"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;
