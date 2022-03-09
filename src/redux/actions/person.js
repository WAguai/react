import { ADDPERSON,DELETEPERSON } from "../constant"
export const addPerson = personObj => ({type:ADDPERSON,data:personObj})
export const deletePerson = personObj => ({type:DELETEPERSON,data:personObj})
