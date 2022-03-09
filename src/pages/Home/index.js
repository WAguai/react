import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  PlusOutlined,
  PictureOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './index.css'
import MyNavLink from '../../components/MyNavLink';
import NameList from './NameList';
import Photos from './Photos';
import AddScrapbook from './AddScrapbook';
import Calendar from './MyCalendar';
import Honor from './Honor';
import todoList from './TodoList'

import { connect } from 'react-redux';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Home extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <div>     
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="/home/namelist" icon={<UserOutlined />}>
              <MyNavLink to='/home/namelist'>班级名单</MyNavLink>
            </Menu.Item>
            <Menu.Item key="/home/honor"  icon={<TrophyOutlined />}>
              <MyNavLink to='/home/honor'>班级荣誉</MyNavLink>
            </Menu.Item>
            <Menu.Item key="/home/todoList"  icon={<TrophyOutlined />}>
              <MyNavLink to='/home/todoList'>任务清单</MyNavLink>
            </Menu.Item>
            <Menu.Item key="/home/calendar"  icon={<TrophyOutlined />}>
              <MyNavLink to='/home/calendar'>日历</MyNavLink>
            </Menu.Item>
            <SubMenu key="/home/photos" icon={<PictureOutlined/>} title="班级照片">
              {this.props.scrapbooks.map((scrapbook) => {
                return (
                <Menu.Item key={"/home/photos/"+scrapbook.name} >
                  <MyNavLink to={"/home/photos/"+scrapbook.name}>{scrapbook.name}</MyNavLink>
                </Menu.Item>)
              })}
              <Menu.Item key="/home/addScrapbook" icon={<PlusOutlined/>}>
                <MyNavLink to='/home/addScrapbook'>添加相册</MyNavLink>
              </Menu.Item>
              
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route path="/home/namelist" component={NameList}/>
                {this.props.scrapbooks.map((scrapbook) => {
                  return (<Route path={"/home/photos/"+scrapbook.name} key={"/home/photos/"+scrapbook.name} component={Photos}/>)
                })}
                <Route path="/home/todoList" component={todoList}></Route>
                <Route path="/home/addScrapbook" component={AddScrapbook}/>
                <Route path="/home/calendar" component={Calendar}/>
                <Route path="/home/honor" component={Honor}/>
                <Redirect to='/home/namelist'></Redirect>    
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
      </div>  
    );
  }
}

export default connect(
  state=>({
    scrapbooks:state.scrapbooks
  }),
  {}
)(Home)

