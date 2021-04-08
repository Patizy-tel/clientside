import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import jwt_decode from "jwt-decode";
import Container from '@material-ui/core/Container';
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import logo  from '../logo2.png'


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory()

    const [newUser,
        setUser] = useState({'username': '', 'password': ''})

    const userData = {

        username: newUser.username,
        password: newUser.password
    }

    function checkRole() {

        let role = localStorage.getItem('role')

        switch (role) {
            case 'ADMIN':
                return window.location.href = '/home'
            case 'DEPARTMENTHEAD':
                return window.location.href = '/employees'
            case 'EMPLOYEE':
                return window.location.href = '/mytasks'
            default:
                break

        }

    }

    checkRole()

    function handleSubmit(e) {

        e.preventDefault()

        axios
            .post('https://mytaskserver.herokuapp.com/api/users/login', userData)
            .then(resp => {

                localStorage.setItem('token', resp.data.token)

                let decoded = jwt_decode(resp.data.token)

                localStorage.setItem('role', decoded.role)
                localStorage.setItem('username', decoded.username)
                localStorage.setItem('id', decoded.id)

                checkRole()

            })
            .catch(err => [alert(err.message)])
    }

    return (

      <div  style={{
       
        background: 'linear - gradient(90 deg, rgba(2, 0, 36, 1)0 %, rgba(9, 9, 121, 1)35 %, rgba(0, 212, 255, 1)100 %)'
    }}>
      
        <Container
            component="main"
            maxWidth="xs"
            >
            <CssBaseline/>
            <div className={classes.paper}  >


            <Typography component="h1" variant="h5"  style={{marginTop:0}}>
       Sherwood weekly planner
        </Typography>
                <Typography component="h1" variant="h5">
                    <img src={logo} height="200" />
                </Typography>


                <form className={classes.form}  style={{marginTop:20}} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        style={{marginTop:20}}
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        value={newUser.username}
                        onChange={e => setUser({
                        ...newUser,
                        username: e.target.value
                    })}
                        autoComplete="username"
                        autoFocus/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={newUser.password}
                        onChange={e => setUser({
                        ...newUser,
                        password: e.target.value
                    })}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>

        
      </div>
    );
}