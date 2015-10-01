/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

class Costs extends Component {

  render() {
    return (
      <div className="cost-bar">
      <div className="cost cost-left"> Small : $20 </div>
      <div className="cost cost-center"> Med : $20 </div>
      <div className="cost cost-right"> Large : $20 </div>
      </div>
    );
  }

}

export default Costs;
