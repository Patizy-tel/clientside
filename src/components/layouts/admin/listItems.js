import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import  {Link} from 'react-router-dom'

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
      <Link to="/home" >
      <DashboardIcon  style={{background:'blue'}} />
      
      </Link>
        
      </ListItemIcon>


      <Link to='/home'>
      <ListItemText primary="Dashboard" />
      </Link>
      
    </ListItem>
    <ListItem button>


      <ListItemIcon>

      <Link to='/departments'>
      <LayersIcon />
      
      </Link>
       
      </ListItemIcon>

      <Link  to="/departments">
      <ListItemText primary="Departments" />
      </Link>
   
    </ListItem>



  </div>
);

