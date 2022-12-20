import React, {Component} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component
{
	
	constructor(props)
	{
		super(props)
		
		let {id} = props.params;
		
		this.state = {
			id: id,
			employee: {}
			}
	}
	
	componentDidMount(){
		EmployeeService.getEmployeeById(this.state.id).then( res => {
			this.setState({employee: res.data});
		})
	}
	
	render(){
		return(
		<div>
		  
		   <div className = "card col-md-6 offset-md-3">
		    <h3 className = "text-center"> View Employee Details</h3>
		     <div className = "card-body">
		     
			   <div className = "row" >
			    <label className="col-sm" style={{ backgroundColor: 'yellow'}}>Employee First Name:</label>
			    <div className="col-sm" style={{ backgroundColor: 'pink'}}> {this.state.employee.firstName} </div>
			   </div>
			    
			   <div className = "row">
			    <label className="col-sm" style={{ backgroundColor: 'yellow'}}>Employee Last Name:</label>
			    <div className="col-sm" style={{ backgroundColor: 'pink'}}> {this.state.employee.lastName} </div>
			   </div>
			 
			   <div className = "row">
			     <label className="col-sm" style={{ backgroundColor: 'yellow'}}>Employee Email Address:</label>
			     <div className="col-sm" style={{ backgroundColor: 'pink'}}> {this.state.employee.emailId} </div> 
			   </div>
			
		    </div>
		   </div>
		 
		</div>
		)
	}
	
}

export const withParams = Component => props => {
    let params = useParams();
	let navigate = useNavigate();
    return <Component  {...props} params={params}  navigate={navigate} />;
}

export default withParams(ViewEmployeeComponent);