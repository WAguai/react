// 引入combineReducer,组合所有reducer
import { combineReducers } from 'redux'
// 引入为Person组件服务的reducer
import persons from './person'
import scrapbooks from './photos'

// 汇总所有的reducer变为一个总的reducer
export default combineReducers({
  persons:persons,
  scrapbooks:scrapbooks
})
