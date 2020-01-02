import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import {store} from '../index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@material-ui/core/CircularProgress';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Notemaster
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function SignIn(props, state) {
  const classes = useStyles();

  

  const [errResponse, setErrResponse] = React.useState()
  // const [errors, setErrors] = React.useState(true);
  const [usernameErrors, setUsernameErrors] = React.useState(true);
  const [passwordErrors, setPasswordErrors] = React.useState(true);
  




  function validator(textValue, nameField) {

    if(lengthValidator(textValue) > 0){
      
      if(nameField === 'password'){
        setPasswordErrors(false)
      }else{

        setUsernameErrors(false)
  
      }
    }else{
    
          setUsernameErrors(true)
          setPasswordErrors(true)

    
        }
  
  }



  function lengthValidator(e) {
    return e.length
  }

  function errorFunction() {
 
    if(usernameErrors === false && passwordErrors === false ){

      return false
    }else{
      return true
    }
  }


  async function handleSubmit (e) {
    e.preventDefault();    
    const username = e.target.username.value
    const password = e.target.password.value
    await props.onAuth(username, password)  
    
    

    if (store.getState().token === null) {

      setErrResponse( Object.values(store.getState().response.data) )
      
    }
      
    if (store.getState().token){
      let welcomeMsg = 'Welcome '+username 
      toast.success(welcomeMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false
        });

        setTimeout(() => {
          props.history.push('/dashboard/')
        }, 5000);
      
      
    }
      

  }
  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {
          props.error ? 
        
        <Typography component="h1" color='error' variant="h5">
          {errResponse}
        </Typography>

          : null

        }

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="text"
            label="Username"
            name="username"
            autoFocus
            
         
            onChange = {event => {  
              validator(event.target.value, event.target.name)
              

          }}
          />
 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          
            onChange={event => {
              
                validator(event.target.value, event.target.name)
                errorFunction()
              

            }}
          />

 
        <ToastContainer />
            
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled= {errorFunction()}
            
          >
            {
              props.loading ? <CircularProgress color="secondary" /> : 'Sign In'
            }
            
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup/" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}


const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      error: state.error,
      token: state.token,
      response: state.response
  }
}

const mapDispatchToProps = dispatch => {

  return {
      onAuth: (username, password) => dispatch(actions.authLogin(username,password))

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)