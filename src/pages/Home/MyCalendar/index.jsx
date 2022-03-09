import { Calendar, Select, Radio, Col, Row, Typography,Alert  } from 'antd';
import React, { Component } from 'react'
// import { SmileOutlined } from '@ant-design/icons';
import moment from 'moment'
import { observer } from "mobx-react";
import './index.css'
import stores from '../../../store';
@observer
export default class MyCalendar extends Component {
  state={
    calendarStore:stores.calendarStore,
    nowMonth:(new Date()).getMonth(),
    changeFlag:true,    // 用于强制刷新
    outputWeekdays:'',
    outputDays:''
  }
  onPanelChange=(value, mode)=>{
    // console.log(value,mode)
  } 
  handleWeekday=(e,value) => {    //用于选择星期后再次选择当星期下的日期
    const weekdays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const weekday=weekdays[value.weekday()]
    stores.calendarStore.deleteWeekday(weekday)
    stores.calendarStore.addDate(value)
  }
  onAddDate=(e,value) => {
    stores.calendarStore.addDate(value)
  }
  onDeleteDate(e,value){
    stores.calendarStore.deleteDate(value)
  }
  onChange=(value) => {
    console.log(value)
  }
  getDates=(value) => {
    console.log(value)
  }
  onSwitchMonth=(e,value)=>{
    this.setState({nowMonth:value.month()})
  }
  chooseWeekday=(e) => {
    const weekday=e.target.outerText
    const {weekdays}=stores.calendarStore
    if(weekdays.findIndex(item=>item===weekday)===-1){ //星期不在store中，则加入
      stores.calendarStore.addWeekday(weekday)
      e.target.className='choosedWeekday'
    }
    else{
      stores.calendarStore.deleteWeekday(weekday) //星期在store，则删除
      e.target.className='chooseWeekday'
    }
    this.setState({changeFlag:true})
  }
  handleEmpty=() => {
    stores.calendarStore.emptyDate()
    stores.calendarStore.emptyWeekday()
    stores.calendarStore.lastDates=[]
    stores.calendarStore.lastWeekdays=[]
    const choosedWeekdayButtons=Array.from(document.getElementsByClassName('choosedWeekday')) //HTMLCollection是活的
    const chooseWeekdayButtons=Array.from(document.getElementsByClassName('chooseWeekday'))   // 没被选的按钮
    // 修改星期按钮样式
    for(let i=0;i<choosedWeekdayButtons.length;i++){    
      const weekday=choosedWeekdayButtons[i].innerHTML
      if(stores.calendarStore.weekdays.findIndex(item=>item===weekday)===-1){ //若原本状态里没有此星期 则恢复星期按钮样式
        choosedWeekdayButtons[i].className='chooseWeekday'
        console.log(weekday)
      } 
    }
    for(let i=0;i<chooseWeekdayButtons.length;i++){
      const weekday=chooseWeekdayButtons[i].innerHTML
      if(stores.calendarStore.weekdays.findIndex(item=>item===weekday)!==-1){ //若原本状态里有此星期 则变回choosed星期按钮样式
        chooseWeekdayButtons[i].className='choosedWeekday'
      } 
    }
    this.setState({changeFlag:true})
  }
  handleCancel=() => {          //取消 恢复上次状态
    stores.calendarStore.dates=Array.from(stores.calendarStore.lastDates)
    stores.calendarStore.weekdays=Array.from(stores.calendarStore.lastWeekdays)
    const choosedWeekdayButtons=Array.from(document.getElementsByClassName('choosedWeekday')) //HTMLCollection是活的
    const chooseWeekdayButtons=Array.from(document.getElementsByClassName('chooseWeekday'))   // 没被选的按钮
    for(let i=0;i<choosedWeekdayButtons.length;i++){
      const weekday=choosedWeekdayButtons[i].innerHTML
      if(stores.calendarStore.weekdays.findIndex(item=>item===weekday)===-1){ //若原本状态里没有此星期 则恢复星期按钮样式
        choosedWeekdayButtons[i].className='chooseWeekday'
        console.log(weekday)
      } 
    }
    for(let i=0;i<chooseWeekdayButtons.length;i++){
      const weekday=chooseWeekdayButtons[i].innerHTML
      if(stores.calendarStore.weekdays.findIndex(item=>item===weekday)!==-1){ //若原本状态里有此星期 则变回choosed星期按钮样式
        chooseWeekdayButtons[i].className='choosedWeekday'
      } 
    }
    this.setState({changeFlag:true})
  }
  handleSure=() => {
    stores.calendarStore.lastDates=Array.from(stores.calendarStore.dates)
    stores.calendarStore.lastWeekdays=Array.from(stores.calendarStore.weekdays)
    const {outputDays,outputWeekdays}=stores.calendarStore.output()

    console.log(outputDays)
    this.setState({outputDays,outputWeekdays})
    // outputWeekday.message="星期:"+output.outPutWeekdays
    // outputDay.message="日期:"+output.outPutDate

    this.setState({changeFlag:true})
  }
  render() {
    moment.updateLocale('en', {
      weekdaysMin : [
      <button className='chooseWeekday' onClick={this.chooseWeekday}>Sun</button>, 
      <button className='chooseWeekday' onClick={this.chooseWeekday}>Mon</button>, 
      <button className='chooseWeekday' onClick={this.chooseWeekday}>Tue</button>, 
      <button className='chooseWeekday' onClick={this.chooseWeekday}>Wed</button>, 
      <button className='chooseWeekday' onClick={this.chooseWeekday}>Thu</button>, 
      <button className='chooseWeekday' onClick={this.chooseWeekday}>Fri</button>, 
      <button className='chooseWeekday' onClick={this.chooseWeekday}>Sat</button>
    ]
    });
    return (
      <div className="site-calendar-customize-header-wrapper">
        <Calendar
          fullscreen={false}
          headerRender={({ value, type, onChange, onTypeChange }) => {
            const start = 0;
            const end = 12;
            const monthOptions = [];

            const current = value.clone();
            const localeData = value.localeData();
            const months = [];
            for (let i = 0; i < 12; i++) {
              current.month(i);
              months.push(localeData.monthsShort(current));
            }
            for (let index = start; index < end; index++) {
              monthOptions.push(
                <Select.Option className="month-item" key={`${index}`}>
                  {months[index]}
                </Select.Option>,
              );
            }
            const month = value.month();
            const year = value.year();
            const options = [];
            for (let i = year - 10; i < year + 10; i += 1) {
              options.push(
                <Select.Option key={i} value={i} className="year-item">
                  {i}
                </Select.Option>,
              );
            }
            return (
              <div style={{ padding: 8 }}>
                <Typography.Title level={4}>选择日期</Typography.Title>
                <Row gutter={8}>
                  <Col>          
                    <Radio.Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                      <Radio.Button value="month">Month</Radio.Button>
                      <Radio.Button value="year">Year</Radio.Button>
                    </Radio.Group>
                  </Col>
                  <Col>
                    <Select
                      size="small"
                      dropdownMatchSelectWidth={false}
                      className="my-year-select"
                      onChange={newYear => {
                        const now = value.clone().year(newYear);
                        onChange(now);
                      }}
                      value={String(year)}
                    >
                      {options}
                    </Select>
                  </Col>
                  <Col>
                    <Select
                      size="small"
                      dropdownMatchSelectWidth={false}
                      value={String(month)}
                      onChange={(selectedMonth) => {
                        const newValue = value.clone();
                        newValue.month(parseInt(selectedMonth, 10));
                        this.onSwitchMonth('',newValue)
                        onChange(newValue);
                      }}
                    >
                      {monthOptions}
                    </Select>
                  </Col>
                </Row>
              </div>
            );
          }}
          onPanelChange={this.onPanelChange}

          dateFullCellRender={(value) => {
              if(this.state.nowMonth===value.month()){    //只能编辑当前年当前月
                const weekdays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
                if(stores.calendarStore.weekdays.findIndex(item=>item===weekdays[value.weekday()])!==-1){ //若为星期选中
                  stores.calendarStore.deleteDate(value)  //删除元素 为了只输出星期
                  return(
                    <div className="ant-picker-cell-inner ant-picker-calendar-date" onClick={(e)=>this.handleWeekday(e,value)}>
                      <div className='choosedDay'>
                        {value.date()}
                      </div>
                    </div>)
                }
                else if(stores.calendarStore.dates.findIndex(item=>(
                            item%100===value.date()                       //当天
                          && Math.floor(item/100)%100===value.month()+1   //当月
                          && Math.floor(item/10000)===value.year()        //当年
                        ))!==-1){
                  return(
                    <div className="ant-picker-cell-inner ant-picker-calendar-date" onClick={(e)=>this.onDeleteDate(e,value)}>
                      <div className='choosedDay'>
                        {value.date()}
                      </div>
                    </div>)
                }
                else{
                  return(
                    <div className="ant-picker-cell-inner ant-picker-calendar-date" onClick={(e)=>this.onAddDate(e,value)}>
                        <div className="ant-picker-calendar-date-value">
                          {value.date()}
                        </div>
                      </div>) 
                }  
              }
              else{   //剩余日期
                return(
                  <div className="ant-picker-cell-inner ant-picker-calendar-date" onClick={(e)=>this.onSwitchMonth(e,value)}>
                    <div className="ant-picker-calendar-date-value" >
                      {value.date()}
                    </div>
                  </div>) 
              }
          }}
        />
        <div>
          <button id='empty' onClick={this.handleEmpty}>清空</button>
          <button id="cancel" onClick={this.handleCancel}>取消</button>
          <button id="sure" onClick={this.handleSure}>确定</button>
        </div>
        <Alert id='outputWeekday' message={'星期: '+this.state.outputWeekdays}>{5555}</Alert >
        <Alert id='outputDay' message={'日期: '+this.state.outputDays}></Alert >
      </div>
    )
  }
}
