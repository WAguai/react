import { action,observable,makeObservable } from "mobx";
export default class CalendarStore{

  lastDates=[]
  lastWeekdays=[]
  dates=[]
  weekdays=[]
  
  addDate(value){
    const date=value.year()*10000+(value.month()+1)*100+value.date()
    if(this.dates.findIndex(item=>item===date)===-1){
      this.dates.push(date)
    }
  }
  deleteDate(value){
    const date=value.year()*10000+(value.month()+1)*100+value.date()
    if(this.dates.findIndex(item=>item===date)!==-1){
      this.dates.splice(this.dates.findIndex(item=>item===date),1)
    }
  }
  emptyDate(){
    this.dates=[]
  }
  addWeekday(weekday){
    if(this.weekdays.findIndex(item=>item===weekday)===-1){
      this.weekdays.push(weekday)
    }
  }
  deleteWeekday(weekday){
    this.weekdays.splice(this.weekdays.findIndex(item=>item===weekday),1)
  }
  emptyWeekday(){
    this.weekdays=[]
  }
  output(){
    this.dates.sort((a,b)=>a-b)
    var outputDays=''
    var dateStart=this.dates[0],
          dateEnd=this.dates[0]
    for(let i=0;i<this.dates.length;i++){
      if(this.dates[i]+1===this.dates[i+1]){
        dateEnd=this.dates[i+1]
      }
      else{
        if(dateEnd-dateStart===0){
          const yearEnd=Math.floor(dateEnd/10000),
                monthEnd=Math.floor(dateEnd/100)%100,
                dayEnd=dateEnd%100;
          outputDays=outputDays+`${yearEnd}年${monthEnd}月${dayEnd}日; `
        }
        else{
          const yearEnd=Math.floor(dateEnd/10000),
                monthEnd=Math.floor(dateEnd/100)%100,
                dayEnd=dateEnd%100;
          const yearStart=Math.floor(dateStart/10000),
                monthStart=Math.floor(dateStart/100)%100,
                dayStart=dateStart%100;
          outputDays=outputDays+`${yearStart}年${monthStart}月${dayStart}日 - ${yearEnd}年${monthEnd}月${dayEnd}日; `
        }
        dateStart=this.dates[i+1]
        dateEnd=this.dates[i+1]
      }
    }

    const weekdays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const chineseWeekdays=['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
    this.weekdays.sort((a,b)=>{
      return weekdays.findIndex(item=>item===a)-weekdays.findIndex(item=>item===b)
    })
    var outputWeekdays=''
    var weekdayStart=weekdays.findIndex(item=>item===this.weekdays[0]),
        weekdayEnd=weekdays.findIndex(item=>item===this.weekdays[0])
    for(let i=0;i<this.weekdays.length;i++){
      if(weekdays.findIndex(item=>item===this.weekdays[i])+1 === weekdays.findIndex(item=>item===this.weekdays[i+1])){
        weekdayEnd=weekdays.findIndex(item=>item===this.weekdays[i+1])
      }
      else{
        if(weekdayEnd-weekdayStart===0){
          outputWeekdays=outputWeekdays+`${chineseWeekdays[weekdayEnd]}; `
        }
        else{
          outputWeekdays=outputWeekdays+`${chineseWeekdays[weekdayStart]} - ${chineseWeekdays[weekdayEnd]}; `
        }
        weekdayStart=weekdays.findIndex(item=>item===this.weekdays[i+1])
        weekdayEnd=weekdays.findIndex(item=>item===this.weekdays[i+1])
      }
    }
    console.log(outputWeekdays,outputDays)
    return {outputWeekdays,outputDays}

  }
  constructor(){
    makeObservable(this,{
      lastDates:observable,
      lastWeekdays:observable,
      dates:observable,
      weekdays:observable,
      addDate:action.bound,
      deleteDate:action.bound,
      emptyDate:action.bound,
      addWeekday:action.bound,
      deleteWeekday:action.bound,
      emptyWeekday:action.bound,
      output:action.bound
    })
  }
}
