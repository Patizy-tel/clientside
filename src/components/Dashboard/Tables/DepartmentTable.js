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
import {Link} from 'react-router-dom'


import axios from 'axios'

const columns = [
  { id: 'name', label: 'Department ID', minWidth: 170 },
  {
    id: 'deptHad',
    label: 'Department Head',
    minWidth: 170,
  },
  
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

  
  const [data, setData] = React.useState({departments:[]});
  const [data2, setData2] = React.useState({departments:[]});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://mytaskserver.herokuapp.com/api/departments',
        );

        const result2 = await axios(
          'https://mytaskserver.herokuapp.com/api/departmentsHeads',
          );
  
    
      setData({departments: result.data});

      setData2({departments:result2.data})
    };
 
    fetchData();
  }, []);




 function DeleteIT (x ,y ,z){


  axios.delete(`https://mytaskserver.herokuapp.com/api/departmentsHeads/${x}`)
       .then(resp=>{

         
          axios.delete(`https://mytaskserver.herokuapp.com/api/departments/${y}`)
               .then(resps=>{


                axios.delete(`https://mytaskserver.herokuapp.com/api/users/${z}`)
                     .then(resp =>{
                      alert('success')
                      window.location.href = '/departments'

                     })

                


               })

       })





  }



  console.log(data)

  return (
    <Paper className={classes.root}>

    <Link  to="/add-department">
    
  
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddIcon>add</AddIcon>}
      >
        Add New Department
      </Button>


      </Link>



      <Link  to="/add-department-head">
    
  
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddIcon>add</AddIcon>}
      >
        Add New Department Head
      </Button>


      </Link>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.departments.map(department => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={department._id}>          
                      <TableCell>
                        {department._id}
                      </TableCell>
                      <TableCell>
                        {department.name}
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





      <TableContainer className={classes.container}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell>No#</TableCell>
          <TableCell>Department Name</TableCell>
          <TableCell>Department Head</TableCell>
          <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data2.departments.map((department ,i) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={department._id}>  
              
              <TableCell>{i+1}</TableCell>
                    <TableCell>
                      {department.departmentName}
                    </TableCell>
                    <TableCell>
                      {department.name}
                    </TableCell>

                    <TableCell><Button color="primary"  onClick={() => {
                      DeleteIT(department._id ,department.departmentName ,department.username)
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