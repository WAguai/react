import React, { Component } from 'react';
import AppPerson from './containers/AddPerson'
import ListPerson from './containers/ListPerson';
export default class NameList extends Component {
  render() {
    return (
    <div>
      <AppPerson></AppPerson>
      <ListPerson></ListPerson>
    </div>
    );
  }
}
