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
      <Link to="/mytasks">
      <DashboardIcon />
      
      </Link>
        
      </ListItemIcon>


      <Link to='/mytasks'>
      <ListItemText primary="Dashboard" />
      </Link>
      
    </ListItem>
    <ListItem button>


      <ListItemIcon>

      <Link to='/myreport'>
      <LayersIcon />
      
      </Link>
       
      </ListItemIcon>

      <Link  to="/myreport">
      <ListItemText primary="Reports" />
      </Link>
   
    </ListItem>




  </div>
);

