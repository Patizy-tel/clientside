import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {Link} from  'react-router-dom'


import axios from 'axios'

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'role',
    label: 'Role',
    minWidth: 170,
  },
  { id: 'department', label: 'Department', minWidth: 100 },
];


const rows = [
];

const useStyles = makeStyles((theme) =>({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  button: {
    margin: theme.spacing(2),
  },
}));

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState({employees:[]});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:5000/api/employee/${localStorage.getItem('id')}`);
      setData({employees: result.data});
    };
 
    fetchData();
  }, []);
  console.log(data)
function DeleteIT (x,y){
  axios.delete(`http://localhost:5000/api/employee/${x}`)
       .then(resp=>{

         
          axios.delete(`http://localhost:5000/api/users/${y}`)
               .then(resps=>{


                alert('success')
                window.location.href = '/employees'
                


               })

       })





}
  return (
    <Paper className={classes.root}>

    <Link to='/add-employee'>
    
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddIcon>add</AddIcon>}
      >
        Add New Employee
      </Button>

      </Link>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell>
            No#
            
            </TableCell>
             
                <TableCell>
                NAME
                </TableCell>
                
                <TableCell>
                EMAIL
                </TableCell>
                
                <TableCell>
                DATE Added
                </TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {data.employees.map((employee ,i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={employee.id}>   
                
                
                <TableCell>
                {i +1}
              </TableCell>
                      <TableCell>
                        {employee.name}
                      </TableCell>
                      <TableCell>
                        {employee.email}
                      </TableCell>
                      <TableCell>
                        {employee.date}
                      </TableCell>

                      <TableCell><Button color="primary"  onClick={() => {
                        DeleteIT(employee._id ,employee.username)
                    }}>Delete</Button></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}