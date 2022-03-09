import { nanoid } from 'nanoid';
import {ADDPERSON, DELETEPERSON} from '../constant'
const initeState=[
  {
    key: nanoid(),
    name: '徐程鸿',
    sex: '男',
    id: '2020212205147',
    number: '13305781873',
  },
  {
    key: nanoid(),
    name: '邹成明',
    sex: '男',
    id: '2020212205155',
    number: '13305781873',
  },]
export default function person(preState=initeState,action){
  const {type,data}=action
  switch(type){
    case ADDPERSON:
      return [data,...preState]
    case DELETEPERSON:
      const newState=preState.filter((obj)=>{
        return obj.key!== data.key;
      })
      return newState
    default:
      return preState
  }
}