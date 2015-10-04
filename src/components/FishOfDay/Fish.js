/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './Fish.css';
import withStyles from '../../decorators/withStyles';
import Costs from './Costs.js';
import Link from '../Link';

@withStyles(styles)
class Fish extends Component {

  render() {
    return (
      <a href={"/fish/" + this.props.children.replace(' ', '-')} onClick={Link.handleClick}>
  <div className={"col-md-3 fish " + this.props.children.replace(' ', '-')}>
      {this.props.children}
      <Costs small='$10' medium='$20' large='$30'/>
      </div>
      </a >
    );
  }

}

export default Fish;
