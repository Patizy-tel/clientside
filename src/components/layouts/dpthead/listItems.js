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
      <Link to="/employees">
      <DashboardIcon />
      
      </Link>
        
      </ListItemIcon>


      <Link to='/employees'>
      <ListItemText primary="employees" />
      </Link>
      
    </ListItem>

    <ListItem button>
  
      <ListItemIcon>
      <Link to='/tasks'>
        <BarChartIcon />

        </Link>
      </ListItemIcon>

     
      <Link to='/tasks'>

      <ListItemText primary="tasks" />
      
      </Link>
      
    </ListItem>


    
    <ListItem button>


    <ListItemIcon>

    <Link to='/reports'>
    <LayersIcon />
    
    </Link>
     
    </ListItemIcon>

    <Link  to="/reports">
    <ListItemText primary="Reports" />
    </Link>
 
  </ListItem>

  </div>
);

