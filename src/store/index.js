import TodoStore from "./todoStore";
import CalendarStore from "./calendarStore"
const todoStore=new TodoStore()
const calendarStore=new CalendarStore()
const stores={
  todoStore,
  calendarStore
}
export default stores