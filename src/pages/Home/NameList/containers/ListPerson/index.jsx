import React, { Component } from 'react';
import { Table, Space } from 'antd';
import { connect } from 'react-redux';
import { deletePerson } from '../../../../../redux/actions/person';

class ListPerson extends Component {
  deletePerson = (record,e) => {
    console.log(record)
    if(window.confirm('确定删除吗?')){
      this.props.deletePerson(record)
    }
  }
  render() {
      const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
        },
        {
          title: '学号',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '联系方式',
          key: 'number',
          dataIndex: 'number',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a>修改</a>
              <a onClick={(e)=>this.deletePerson(record,e)}>删除</a>
            </Space>
          ),
        },
      ];
      const data = this.props.persons
  
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default connect(
  state =>(
    {
      persons:state.persons,
    }),
    {
      deletePerson:deletePerson
    }
)
(ListPerson)
