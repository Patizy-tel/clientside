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
import {Link} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';


import axios from 'axios'

const columns = [
  { id: 'title', label: 'title', minWidth: 170 },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
  },
];

function createData(title, description) {
  return { title, description };
}

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

export default function MyTasksTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState({tasks:[]});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {
    const fetchData = async () => {
      const result = await  axios.get(`http://localhost:5000/api/reports/head/${localStorage.getItem('username')}`);
        
      setData({tasks: result.data});
    };
 
    fetchData();
  }, []);
  console.log(data)

  return (
    <Paper className={classes.root}>


      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              
               <TableCell>Title </TableCell>
               <TableCell>Description</TableCell>
               <TableCell>From </TableCell>
               <TableCell>  Date</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {data.tasks.map(task => {
              return (
                <TableRow hover tabIndex={-1} key={task._id}>          
                      <TableCell>
                        {task.title}
                      </TableCell>
                      <TableCell>
                        {task.description}
                      </TableCell>


                      <TableCell>
                      {task.creator}
                      </TableCell>


                      <TableCell>
                      {task.date}
                      </TableCell>


                     
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