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
    'email':'',
    departmentName:''
  })
  const [data, setData] = React.useState({departments:[]});





useEffect(() => {
  const fetchData = async () => {
    const result = await axios(
      'http://localhost:5000/api/departments',
      );
    setData({departments: result.data});
  };

  fetchData();
}, []);


if(!data){


  return 'Loading'
}



function handleSubmit (e){

  e.preventDefault()




  const userData = {


    name:newUser.name,
    username:newUser.username,
    email:newUser.email,
    role:"DEPARTMENTHEAD",
    password:newUser.username,
    departmentName:newUser.departmentName
  }
  
  axios.post('http://localhost:5000/api/departmentsHeads' , userData)
       .then(resp=>{


        alert('Added New Deparment Head Sucessfully')
        window.location.href = '/departments'
    

    

       }).catch(err=>[

        alert('error')


       ])
}










  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Department Head
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
                type='email'
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



            <Grid item xs={12}>

            <InputLabel htmlFor="age-native-simple">Department Name</InputLabel>
            <Select
              native
              value={newUser.departmentName}  onChange={e=>setUser({ ...newUser ,departmentName:e.target.value})} 
              inputProps={{
                name: 'department head',
                id: 'age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              {data.departments.map((team) => <option key={team.id} value={team.name}>{team.name}</option>)}
            </Select>
        
                   </Grid>
          
          </Grid>

         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Department Head
          </Button>
        </form>
      </div>

    </Container>
  );
}