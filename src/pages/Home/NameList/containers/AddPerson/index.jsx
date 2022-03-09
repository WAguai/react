import React, { Component } from 'react';
import { Button,Input,Row,Col } from 'antd'
import { addPerson } from '../../../../../redux/actions/person';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
class AddPerson extends Component {
  addPerson=() => {
    const {name,sex,id,number}=this;
    console.log(name.input.value,sex.input.value,id.input.value,number.input.value);
    const personObj={
      key:nanoid(),
      name:name.input.value,
      sex:sex.input.value,
      id:id.input.value,
      number:number.input.value
    }
    console.log(personObj)
    this.props.addPerson(personObj)
  }
  render() {
    return (
      <div>
        <Input.Group >
          <Row gutter={8}>
            <Col span={5}>
              <Input type="text" placeholder="请输入姓名" ref={(c) => {this.name = c;}}/>
            </Col>
            <Col span={5}>
              <Input type="text" placeholder="请输入性别" ref={(c) => {this.sex = c;}}/>
            </Col>
            <Col span={5}>
              <Input type="text" placeholder="请输入学号" ref={(c) => {this.id = c;}}/>
            </Col>
            <Col span={5}>
              <Input type="text" placeholder="请输入联系方式" ref={(c) => {this.number = c;}}/>
            </Col>
            <Button type="primary" onClick={this.addPerson}>确定</Button>
          </Row>
        </Input.Group>
      </div>);
  }
}

export default connect(
  state =>(
    {
      count:state.persons.length,
    }),
    {
      addPerson:addPerson
    }
)
(AddPerson)
