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




  const [newTask ,setTask] = useState({

    'title':'',
    'HeadName':'',
    'description':'' 
  })

  const [data, setData] = useState([])



  useEffect(() => {
    const fetchData = async () => {
      const result =  await axios(`https://mytaskserver.herokuapp.com/api/departmentsHeads`);
      
      setData(result.data);
    };
  
    fetchData();
  }, []);
  


const taskData = {


  title:newTask.title,
  HeadName:newTask.HeadName,
  description:newTask.description,
  creator:localStorage.getItem('username')


}

function handleSubmit (e){

  e.preventDefault()
  console.log(taskData)


  axios.post('https://mytaskserver.herokuapp.com/api/reports' , taskData)
       .then(resp=>{

        alert('Created New Task Sucessfully!')
        window.location.href = '/myreport'
    

    

       }).catch(err=>[

        alert(err.message)


       ])
}

if(!data){

return '....loading'
}


console.log(data)







  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create New Report
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="title"
                required
                fullWidth
                value={newTask.title}
                onChange={e => setTask({
                ...newTask,
                title: e.target.value
            })}
                id="title"
                label="Title"
                autoFocus
              />
            </Grid>
           
            <Grid item xs={12}>

            <InputLabel htmlFor="age-native-simple">Head Name</InputLabel>
            <Select
              native
              value={newTask.HeadName}  onChange={e=>setTask({ ...newTask ,HeadName:e.target.value})} 
              inputProps={{
                name: 'employee name',
                id: 'age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              {data.map((team) => <option key={team.id} value={team.username}>{team.username}</option>)}
            </Select>
        
                   </Grid>
            <Grid item xs={12}>
            <TextField
              id="standard-multiline-static"
              label="Task Description"
              multiline
              rows={4}
              fullWidth
              defaultValue="Task Description"
              name="description"
              value={newTask.description}
                onChange={e => setTask({
                ...newTask,
                description: e.target.value
            })}
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
            Submit Report
          </Button>
        </form>
      </div>

    </Container>
  );
}