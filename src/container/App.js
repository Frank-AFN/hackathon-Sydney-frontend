/**
 * Created by zhangyy on 2/24/17.
 */


import React, { Component } from 'react';
import Table from '../components/table'
import {connect} from 'react-redux'

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {

    return (
      <div>
        <Table/>
      </div>
    );
  }
}

export default (App);