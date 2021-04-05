import React from 'react';
import axios from  'axios'
import './App.css';
import { BrowserRouter, Switch ,Route} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import PrivateRoute from './PrivateRoute';
import Dashboard from './components/layouts/admin/Dashboard';
import DashboardHead from './components/layouts/dpthead/Dashboard'
import EmployeeForm from './components/Forms/EmployeeForm';
import EmployeeTable from './components/Dashboard/Tables/EmployeeTable';
import DashboardEmp from './components/layouts/Employee/Dashboard';





// LocalstorageService

// Add a request interceptor
axios.interceptors.request.use(
  config => {

          const token = localStorage.getItem('token');


     if (token) {
       config.headers['x-access-token'] = `${token}`   
     }

      // config.headers['Content-Type'] = 'application/json';

   
      return config;
   },
  error => {
      Promise.reject(error)
  });



//Add a response interceptor

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
 




  return Promise.reject(error);
});






function App (){

  
    return (
      <BrowserRouter>
        <Switch>


        <Route restricted={true} component={SignIn} path="/" exact />
        <Route restricted={true} component={SignUp} path="/sign-up" exact />   




          <PrivateRoute restricted={false} component={Dashboard} path="/home" exact />
          <PrivateRoute restricted={true} component={Dashboard} path="/department" exact />     
          <PrivateRoute restricted={true} component={DashboardHead} path="/add-employee" exact />
          <PrivateRoute restricted={true} component={Dashboard} path="/add-department-head" exact />
          <PrivateRoute restricted={true} component={Dashboard} path="/add-department" exact />
          <PrivateRoute restricted={true} component={DashboardHead} path="/add-task" exact />
          <PrivateRoute restricted={true} component={DashboardHead} path="/employees" exact />
          <PrivateRoute restricted={true} component={Dashboard} path="/departments" exact />
          <PrivateRoute restricted={true} component={DashboardHead} path="/reports" exact />
          <PrivateRoute restricted={true} component={DashboardHead} path="/tasks" exact />
          <PrivateRoute restricted={true} component={DashboardEmp} path="/mytasks" exact />
          <PrivateRoute restricted={true} component={DashboardEmp} path='/myreport' exact />
           <PrivateRoute restricted={true} component={DashboardEmp} path='/addreport'  exact/>





        </Switch>
      </BrowserRouter>
    );
  
}


export default App;