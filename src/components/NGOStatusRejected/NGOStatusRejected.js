import React, {Component} from 'react';
import "./NGOStatusRejected.css"

import axios from 'axios';



class NGOStatusRejected extends Component{
    

    render(){
  
        return(
            <div className="divoftext">
          <h1>
              Your request to join is unfortunately <b>rejected</b>.
          </h1>
          <h4>
               You can register again but with correct information. 
          </h4>
          <h5>
              For more details, contact:
          </h5>
<h6>admin@littledeeds.com<br></br>021-1234567</h6>
</div>
);
    }
}
export default NGOStatusRejected ;