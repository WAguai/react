import { action,observable,makeObservable } from "mobx";
import { nanoid } from "nanoid";
class TodoStore{
  todoList=[
    {
      id:nanoid(),
      name:'健身',
      finished:false
    },
    {
      id:nanoid(),
      name:'敲代码',  
      finished:false
    },
    {
      id:nanoid(),
      name:'打游戏',
      finished:false
    }
  ]
  addTodo(name){
    this.todoList.push({
      id:nanoid(),
      name:name,
      finished:false
    })
  }
  finish(id){
    this.todoList.splice(this.todoList.findIndex(item=>item.id===id),1)
  }
  change(id,newName){
    this.todoList.forEach((item) => { 
      if(item.id===id){
        item.name=newName
      }
    })
  }
  constructor(){
    makeObservable(this,{
      todoList:observable,
      addTodo:action.bound,
      finish:action.bound,
      change:action.bound
    })
  }
}


export default TodoStore