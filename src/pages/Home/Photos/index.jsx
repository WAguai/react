import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image,Input,Button,Row,Col } from 'antd'
import { addPhoto } from '../../../redux/actions/photos';
import { nanoid } from 'nanoid';

class Photos extends Component {
  componentDidUpdate(prevProps){
    if(this.props.location.pathname!==prevProps.location.pathname){
      this.setState({fileList:this.findScrapBook()})
    }
  }
  findScrapBook=() => {
    const scrapbooks=this.props.scrapbooks
    const scrapbookName=this.props.location.pathname.split("/")[3]
    for(var i=0;i<scrapbooks.length;i=i+1){
      if(scrapbooks[i].name===scrapbookName){
        return scrapbooks[i].photos  
      }
    }
    return []
  }  
  addPhoto=() => { 

    const {name,url}=this;
    const scrapbookName=this.props.location.pathname.split("/")[3]
    const photoObj={
      id:nanoid(),
      name:name.input.value,
      url:url.input.value
    }
    this.props.addPhoto(scrapbookName,photoObj);
  }
  render() {
    const fileList = this.findScrapBook()
    return (
      <div>
        <Input.Group >
          <Row gutter={8}>
            <Col span={8}>
              <Input type="text" placeholder="请输入图片地址" ref={(c) => {this.url = c;}}/>
            </Col>
            <Col span={5}>
              <Input type="text" placeholder="请输入名称" ref={(c) => {this.name = c;}}/>
            </Col>
            <Button type="primary" onClick={this.addPhoto}>上传</Button>
          </Row>
        </Input.Group>
        <Image.PreviewGroup>
        <br />
          {
            fileList.map(item => {
              // console.log(item)
              return (<Image width={200} key={item.id} src={item.url} />)
            })
          }
        </Image.PreviewGroup>
      </div>
    );
  }
}

export default connect(
  state =>(
    {
      scrapbooks:state.scrapbooks,
    }),
    {
      addPhoto:addPhoto
    }
)(Photos)