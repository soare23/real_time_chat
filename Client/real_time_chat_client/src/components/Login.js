import React from 'react';
import io from 'socket.io-client';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

const socket = io.connect('http://localhost:4000');

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    // Send the username back to chat server
    socket.emit('new user', username);

    //Start loading animation
    setIsLoading(true);
    // Redirect to chat page and stop loading animation
    setTimeout(() => {
      setIsLoading(false);
      props.history.push({
        pathname: '/chat',
        state: { username: username },
      });
    }, 1000);
  }

  return (
    <div className="login-container">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className={classes.margin}>
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="Username"
                    onInput={(e) => setUsername(e.target.value)}
                    required
                  />
                </Grid>
              </Grid>
            </div>
            <div className="login-button-container">
              <Button variant="outlined" color="primary" type="submit">
                Join Chat
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
