import { Switch } from "react-router-dom"

const initialState = {
  customers : [],
  user:null,
  services:[] 
}

const reducer = (prevState = initialState,action) => {
    console.log(action);
    switch (action.type){
      case "DELETE_CUSTOMER":
        const updatedCustomers = prevState.customers.filter(c=>{
          if(c.id !== action.payload.customerId){
            return c
          }
        })
        return {...prevState, customers:updatedCustomers}
      case "SAVE_CUSTOMER":
        if(action.payload.edit){
          const updatedCustomers = prevState.customers.map(c=>{
            if(c.id === action.payload.customer.id){
              return action.payload.customer
            }
            return c
          })
          return {...prevState, customers:updatedCustomers}
        }else{
          return {...prevState, customers:[...prevState.customers,action.payload.customer]}
        }
      case "FETCH_CUSTOMERS":
        return {...prevState, customers : action.payload.customers}
      default:
        return {...prevState}
    }
}

export default reducer