import React from 'react'
import { connect } from 'react-redux'
import PaymentTable from '../components/payment/PaymentTable'
import PaymentSummary from '../components/payment/PaymentSummary'
import {fetchAppointemt } from '../actionCreators'

class Payment extends React.Component{

  state =  {
    SelectedServiceIds:[],
    confirmPayment:false
  }

  handleSubmit=(e,id)=>{
    e.preventDefault()
    this.setState({SelectedServiceIds:[...this.state.SelectedServiceIds,parseInt(id)]})
  }

  handleRemove = (id) =>{
    const indexToRemove = this.state.SelectedServiceIds.indexOf(id)
    const servicesId = [...this.state.SelectedServiceIds]
    servicesId.splice(indexToRemove,1)
    this.setState({SelectedServiceIds:servicesId})
  }

  confirmPayment = () =>{
    if(this.state.SelectedServiceIds.length > 0){
      this.setState(prevState => ({...prevState,confirmPayment:!prevState.confirmPayment}))
    }
  }

  componentDidMount(){
    console.log(this.props.match.params.id);
    this.props.fetchAppointemt(this.props.match.params.id)
  }

  render(){
    const {SelectedServiceIds} = this.state
    return (
      this.state.confirmPayment 
      ?
      <PaymentSummary
        SelectedServiceIds={SelectedServiceIds}
        history={this.props.history}
        confirmPayment={this.confirmPayment}
      />
      :
      <PaymentTable 
      SelectedServiceIds={SelectedServiceIds}
      confirmPayment={this.confirmPayment}
      handleSubmit ={this.handleSubmit}
      handleRemove={this.handleRemove}
      history={this.props.history}

      />
    )
     
  }


}


const mdp = (dispatch) => {
  return{
    fetchAppointemt: (id) => dispatch(fetchAppointemt(id))
  }
}


export default connect(null,mdp)(Payment)