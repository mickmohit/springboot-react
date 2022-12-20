import React, {Component} from 'react'
import EmployeeService from '../services/EmployeeService'
import {Link, useNavigate  } from "react-router-dom";


class ListEmployeeComponent extends Component
{
	constructor(props){
		super(props)
		let {navigate} = this.props;
		this.state = {
			   employees: []
		}
	
	   this.editEmployee =  this.editEmployee.bind(this);
	   this.deleteEmployee = this.deleteEmployee.bind(this);
	   this.viewEmployee =  this.viewEmployee.bind(this);
	}
	
	 editEmployee(id){
		 this.props.navigate(`/update-employee/${id}`);
	 }
	 
	 deleteEmployee(id){
		EmployeeService.deleteEmployee(id).then(res => {
			this.setState({employees:  this.state.employees.filter(employee => employee.id !== id)});
		});
	 }
	 
	 viewEmployee(id){
		 this.props.navigate(`/view-employee/${id}`);
	 }
	 
	componentDidMount(){
		EmployeeService.getEmployees().then((res) =>{
			this.setState({ employees: res.data});
		});
	}
	
	
	
	render(){
		return(
		
			<div>
			  <h2 className = "text-center">Employee List</h2>
			  <div className = "row">
			    
				<Link to="/add-employee"><button className="btn btn-primary">Add Employee</button> </Link>
				
			  </div>
			  <div className = "row">
			       <table className = "table table-striped table-bordered">
			       <thead>
				    <tr>
				     <th> Employee First Name</th>
					 <th> Employee Last Name</th>
					 <th> Employee Email</th>
					 <th> Actions </th>
				    </tr>
				   </thead>
				 
				   <tbody>
				   {
					   this.state.employees.map(
						   employee =>
						   <tr key = {employee.id}>
						      <td> {employee.firstName} </td>
							  <td> {employee.lastName} </td>
							  <td> {employee.emailId} </td>
							  <td> 
							    <button onClick = { () => this.editEmployee(employee.id)} className="btn btn-primary">Update</button>
								<button style={{marginLeft: "10px"}} onClick = { () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
								<button style={{marginLeft: "10px"}} onClick = { () => this.viewEmployee(employee.id)} className="btn btn-info">View</button>
							  </td>
							  
						   </tr>
					   )
				   }
				   </tbody>
				   </table>
					 
				</div>
			</div>
		)
	}
}

export const withNavigate = Component => props => {
    let navigate = useNavigate();
    return <Component {...props} navigate={navigate} />
}

export default withNavigate(ListEmployeeComponent)