import React, { Component } from 'react'
import { Input,Row,Col,Button } from 'antd';
import { connect } from 'react-redux';
import {addScrapbook} from '../../../redux/actions/photos'
import { pinyin } from 'pinyin-pro';
class AddScrapbook extends Component {
  addScrapbook=() => {
    const {name}=this;
    const scrapbookName=pinyin(name.input.value,{ toneType: 'none' })
    this.props.addScrapbook(scrapbookName)
    alert('创建成功')
  }
  render() {
    
    return (
      <div>
        <Input.Group >
          <Row gutter={8}>
            <Col span={5}>
              <Input type="text" placeholder="请输入相册名" ref={(c) => {this.name = c;}}/>
            </Col>
            <Button type="primary" onClick={this.addScrapbook}>创建</Button>
          </Row>
        </Input.Group>
      </div>
    )
  }
}

export default connect(
  state=>({
    scrapbooks:state.scrapbooks,
  }),
  {
    addScrapbook:addScrapbook
  }

)(AddScrapbook)
