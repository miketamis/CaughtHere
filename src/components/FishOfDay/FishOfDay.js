/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import Fish from './Fish';

class FishOfDay extends Component {

  render() {
    return (
      <div>
        <span className="title"> Fish of the Day </span>
        <div className="row fishofday">
          <Fish>Groper</Fish>
          <Fish>Blue Cod</Fish>
          <Fish>Red Cod</Fish>
          <Fish>Clams</Fish>
        </div>
      </div>
    );
  }

}

export default FishOfDay;
