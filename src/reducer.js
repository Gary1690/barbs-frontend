import { Switch } from "react-router-dom"

const initialState = {
  customers : [],
  user:null,
  services:[] 
}

const reducer = (prevState = initialState,action) => {
    console.log(action);
    switch (action.type){
      case "FETCH_CUSTOMERS":
        return {...prevState, customers : action.payload.customers}
      default:
        return {...prevState}
    }
}

export default reducer