import React, {Component} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom"
import EmployeeService from '../services/EmployeeService'

class UpdateEmployeeComponent extends Component{
	
	constructor(props){
		super(props);
		
		let {id} = props.params;
		let {navigate} = this.props;
        this.state = {
            id: id,
            firstName:'',
            lastName: '',
            emailId:'',

        }
	this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
		this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
		this.changeEmailHandler =  this.changeEmailHandler.bind(this);
		
		this.updateEmployee = this.updateEmployee.bind(this);
	}
	
	componentDidMount(){
		EmployeeService.getEmployeeById(this.state.id).then( (res) => {
			let employee = res.data;
			this.setState({
			firstName: employee.firstName,
		    lastName: employee.lastName,
			emailId: employee.emailId
			});
		});
	}

	changeFirstNameHandler = (event) =>{
		this.setState({firstName: event.target.value})
	}
	
	changeLastNameHandler = (event) =>{
		this.setState({lastName: event.target.value})
	}
	
	changeEmailHandler = (event) =>{
		this.setState({emailId: event.target.value})
	}
	
	updateEmployee = (e) =>{
		e.preventDefault();
		let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
		console.log('employee =>' +JSON.stringify(employee));
		
		EmployeeService.updateEmployee(employee, this.state.id).then( (res) => {
			this.props.navigate('/employees'); 
		});
	}


  render(){
	  return(
	  <div>
	      <div className = "container">
		    <div className = "row">
		       <div className = "card col-md-6 offset-md-3 offset-md-3">
			     <h3 className = "text-center"> Update Employee </h3>
			       <div className = "card-body">
				     <form>
					   
					   <div className = "form-group">
					    <label>First Name </label>
						 <input placeholder="First Name" name="firstName" className="form-control" 
						   value={this.state.firstName} onChange={this.changeFirstNameHandler} />
					   </div>
					   
					   <div className = "form-group">
					    <label>Last Name </label>
						 <input placeholder="last Name" name="lastName" className="form-control" 
						   value={this.state.lastName} onChange={this.changeLastNameHandler} />
					   </div>
					   
					   <div className = "form-group">
					    <label>Email ID </label>
						 <input placeholder="Email ID" name="emailId" className="form-control" 
						   value={this.state.emailId} onChange={this.changeEmailHandler} />
					   </div>
					   
					   <button className="btn btn-success" onClick={this.updateEmployee}>Update</button>
					  
					    <Link to="/"> 
  					     <button className="btn btn-danger">Cancel Up</button>
                        </Link>
						
					 </form>
				   </div>
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

export default withParams(UpdateEmployeeComponent);