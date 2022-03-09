import React, { Component } from 'react'
import { observer } from "mobx-react";
import {Divider,Input,Modal,Typography,Row,Col,Button} from 'antd'
import stores from '../../../store';


@observer
export default class todoList extends Component {
  state={visible:false,nowEditing:undefined,todoStore:stores.todoStore}
  handleGet=()=>{
    fetch("https://35940b6a-1458-4874-b62b-3a50592dee8a.mock.pstmn.io//nameList")
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      const {todoStore}=this.state
      data.name.map((item) => {
        todoStore.addTodo(item)
      })
    })
  }
  handlePost=() => {
    const {todoStore}=this.state
    fetch("https://35940b6a-1458-4874-b62b-3a50592dee8a.mock.pstmn.io//MockPost",{ //请求的服务器地址
          //  body:"name=mumu&&age=20",  //请求的数据
           body:{name:todoStore.todoList}, //第二种请求数据的方法json
           method:"POST", //请求方法
           headers:{  //请求头信息
               'Content-Type':'application/x-www-form-urlencoded' //用url编码形式处理数据
           }
       })
       .then(res=>res.json())
       .then(data=>{
         data.name.map((item) => {
            todoStore.addTodo(item)  
         })
       })
       .catch(err=>{    //错误打印
           console.log(err)
       })
  }
  handleChange=(item) => {
    item.finished=!item.finished
  }
  handleDelete=(item) => {
    const {todoStore}=this.state
    todoStore.finish(item.id)
  }
  handleEdit = (item) => {
    this.state.nowEditing=item
    this.setState({
      visible: true,
    });
  };
  handleAdd=() => {
    const {todoStore}=this.state
    const thing=this.thing.input.value
    todoStore.addTodo(thing)
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  
  revise=() => {
    const {todoStore}=this.state
    const newName=this.newName.input.value
    todoStore.change(this.state.nowEditing.id,newName)
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={this.revise}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <Input type="text" placeholder="请输入修改内容" ref={(c) => {this.newName = c;}}/>
        </Modal>
        <Row gutter={5} >
          <Col span={8}>
            <Input type="text" placeholder="请输入要添加的事件" ref={(c) => {this.thing = c;}}/>
          </Col>
          <Col span={8}>
            <Button onClick={this.handleAdd}>添加</Button>
          </Col>
          <Col span={8}>
            <Button onClick={this.handlePost}>postman post操作</Button>
            <Button onClick={this.handleGet}>postman get操作</Button>
          </Col>
        </Row>
        <Divider orientation="left">todoList</Divider>
        {this.state.todoStore.todoList.map((item) => {
          if(item.finished===false)
            return(
            <div key={item.id}>
              <Row gutter={5} justify="space-around">
                <Col span={4}>
                  <Typography.Text mark>{'未完成  '}</Typography.Text>{item.name}
                </Col>
                <Col span={4}></Col>
                <Col span={2}>
                  <Button onClick={()=>this.handleEdit(item)}>修改</Button>
                </Col>
                <Col span={6}>
                  <Button onClick={()=>this.handleChange(item)}>更改状态</Button>
                  <Button onClick={()=>this.handleDelete(item)}>删除</Button>
                </Col>
                <Divider ></Divider>
              </Row>
            </div>
          )
          else  
            return(
              <div key={item.name}>
              <Row gutter={5} justify="space-around">
                <Col span={4}>
                  <Typography.Text delete>{'已完成 '+item.name}</Typography.Text>
                </Col>
                <Col span={4}></Col>
                <Col span={2}>
                  <Button onClick={()=>this.handleEdit(item)}>修改</Button>
                </Col>
                <Col span={6}>
                  <Button onClick={()=>this.handleChange(item)}>更改状态</Button>
                  <Button onClick={()=>this.handleDelete(item)}>删除</Button>
                </Col>
                <Divider ></Divider>
              </Row>
            </div>
            )
         })}
          
      </div>
    )
  }
}
