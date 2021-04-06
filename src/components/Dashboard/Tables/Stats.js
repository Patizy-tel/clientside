import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

const useStyles = makeStyles({
    depositContext: {
        flex: 1
    }
});

export default function Stats() {
    const classes = useStyles();

    const [report,
        setReport] = useState()
    const  [task ,setTask]  =  useState ()
    const [dept , setDept] =  useState()
    const  [emp , setEmp] = useState()


    useEffect(() => {
        const fetchData = async () => {
          const reports = await  axios(`https://mytaskserver.herokuapp.com/api/reports/totalReports`);
          const tasks = await  axios(`https://mytaskserver.herokuapp.com/api/task/totalTasks`);
          const depts = await  axios(`https://mytaskserver.herokuapp.com/api/departments/totalDepartments`);
          const emps = await  axios(`https://mytaskserver.herokuapp.com/api/employee/totalEmployee`);

             
          setReport(reports.data);
          setDept(depts.data)
          setEmp(emps.data)
          setTask(tasks.data)
            
          
        };
        
     
        fetchData();
      }, []);


      console.log(report)
      console.log(task)
      console.log(dept)
      console.log(emp)
     

    return (
        <div style={{
            display: 'flex'
        }}>

            <div
                style={{
                padding: 2,
                boxShadow: "2px 2px 2px 2px #888888"
            }}>
                <h1>TOTAL<br></br> DEPARTMENT</h1>
                <Typography component="p" variant="h4">
                    {dept}
                </Typography>
                <Typography color="textSecondary" className={classes.depositContext}>
                {new Date().toDateString()}
                </Typography>
                <div></div>

            </div>

            <div
                style={{
                padding: 20,
                boxShadow: "2px 2px 2px 2px #888888"
            }}>
                <h1>TOTAL EMPLOYEES</h1>
                <Typography component="p" variant="h4">
                    {emp}
                </Typography>
                <Typography color="textSecondary" className={classes.depositContext}>
                {new Date().toDateString()}
                </Typography>
                <div></div>

            </div>

            <div
                style={{
                padding: 20,
                boxShadow: "2px 2px 2px 2px #888888"
            }}>
                <h1>TOTAL TASKS</h1>
                <Typography component="p" variant="h4">
                   {task}
                </Typography>
                <Typography color="textSecondary" className={classes.depositContext}>
                   {new Date().toDateString()}
                </Typography>
                <div></div>

            </div>

            <div
                style={{
                padding: 20,
                boxShadow: "2px 2px 2px 2px #888888"
            }}>
                <h1>TOTAL REPORTS</h1>
                <Typography component="p" variant="h4">
                    {report}
                </Typography>
                <Typography color="textSecondary" className={classes.depositContext}>
                {new Date().toDateString()}
                </Typography>
                <div></div>

            </div>

        </div>
    );
}