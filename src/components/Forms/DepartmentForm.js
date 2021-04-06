import React , {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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




  const [newDepartment ,setDepartment] = useState({

    'departmentName':'',
    
  })




function handleSubmit (e){
  
  e.preventDefault()

  var d = new Date()



  
const departmentData = {


  name:newDepartment.departmentName.toUpperCase() ,
   id:'DPT' + Math.random().toString(36).substr(2, 16) +d.getMilliseconds()
  
}

  axios.post('https://mytaskserver.herokuapp.com/api/departments' , departmentData)
       .then(resp=>{
        console.log(resp.data)

        alert('Added New Deparment Sucessfully')
        window.location.href = '/departments'


       }).catch(err=>[

        alert(err.message)


       ])
}










  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add New Department 
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="departmentName"
                name="departmentName"
                variant="outlined"
                required
                fullWidth
                value={newDepartment.departmentName}
                onChange={e => setDepartment({
                ...newDepartment,
                departmentName: e.target.value
            })}
                id="departmentName"
                label="Department Name "
                autoFocus
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
            Add Department
          </Button>
        </form>
      </div>

    </Container>
  );
}