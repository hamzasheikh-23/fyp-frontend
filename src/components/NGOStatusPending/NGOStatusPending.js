import React, {Component} from 'react';
import "./NGOStatusPending.css"

import axios from 'axios';



class NGOStatusPending extends Component{
    

    render(){
  
        return(
            <div className="divoftext">
          <h1>
              Your request to join is <b>pending</b> approval.
          </h1>
          <h4>
               Visit again soon. 
          </h4>
          <h5>
              For more details, contact:
          </h5>
<h6>admin@littledeeds.com<br></br>021-1234567</h6>
</div>
);
    }
}
export default NGOStatusPending ;