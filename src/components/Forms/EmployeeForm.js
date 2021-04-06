import React , {useState ,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'
import {useHistory} from 'react-router'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history =  useHistory()




  const [newUser ,setUser] = useState({

    'name':'',
    'username':'' ,
    'password':'',
    'email':''
  })



  


const userData = {


  name:newUser.name,
  username:newUser.username,
  password:newUser.username, 
  email:newUser.email,
  role:"EMPLOYEE", 
  departmentHead:localStorage.getItem('username'),
  departmentUser:localStorage.getItem('id')

}

function handleSubmit (e){

  e.preventDefault()
  console.log(userData)

  axios.post('https://mytaskserver.herokuapp.com/api/employee' , userData)
       .then(resp=>{
        console.log(userData)

        alert('Added New Employee Sucessfully')
         window.location.href = '/employees'
    


       }).catch(err=>[

        alert(err.message)


       ])
}










  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add New Employee
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                value={newUser.name}
                onChange={e => setUser({
                ...newUser,
                name: e.target.value
            })}
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                value={newUser.username}
                onChange={e => setUser({
                ...newUser,
                username: e.target.value
            })}
                label="User name"
                name="username"
             
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                type='type'
                fullWidth
                value={newUser.email}
                onChange={e => setUser({
                ...newUser,
                email: e.target.value
            })}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
         

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Employee
          </Button>
        </form>
      </div>

    </Container>
  );
}