import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';


class Home extends Component {


	constructor(){
		super(); 
		this.state = {
			device: [],
			details: {}
		}
	}


	componentDidMount() { 
		
		axios.get(`http://35.237.107.174:8080/data/`)
		.then((res) => {
			this.setState({
				device: res.data

			}); 

		})
		.catch((error)=>{
			console.log(error); 
		});

	}



	showData()  {
		return this.state.device.map((elem, index) => 

			<div className = "data col-sm-4" key={index}>
				<div> 
					<h6> Device Number: {elem.id} 
					<div style = {{float: "right"}}>
							<Link to={`/history/${elem.id}`}>History</Link> 
					 	</div>

						
					</h6>
					<h6> IP Address: {elem.ipAddr}
					<div style = {{float: "right"}}>
					
					 <img src = "/images/printer.jpg" />
					 </div>
						
					</h6> 	
					 <button onClick = { ()=> {this.message(elem.message)}} className = {this.buttonStatus(elem.message)}> Status </button>
					 <div style = {{float: "right"}}> 
						<button onClick = { ()=> {this.showDetails(elem.id)}} className = "btn btn-sm btn-primary"> Details </button>	
					 	</div>
				</div>
			</div>
			)
	}
	message(message){
		console.log(message)
			if(message == "SUCCESS"){
			swal(
	  			'System is up and running',
	  			'',
	  			'success'
				)
			}else if (message == "IP_DEST_HOST_UNREACHABLE"){
				swal(
					'System is not working',
					"",
					'error'
					)
			}else {
				swal('System is shutdown',
					"",
					'warning')
			}	

	}
	buttonStatus(message){
		const prefix = 'btn btn-sm btn-'
		if(message == "SUCCESS"){
			return prefix + 'success'

		}
		else if(message == "IP_DEST_HOST_UNREACHABLE"){
			return prefix + 'danger'
			
		}
		else{
			return prefix + 'warning'
			
		}
	}

	deviceImage(id){
			axios.get(`http://35.237.107.174:8080/data/${id}`)
		.then((res) => {
			const prefix = './images/'
			if (res.data.type == "printer"){
				return prefix + 'printer.jpg'
		}
		else {
			return prefix + 'computer.jpg'
		}

		})
		.catch((error)=>{
			console.log(error); 
		})



	}

	showDetails(id){
		axios.get(`http://35.237.107.174:8080/data/${id}`)
		.then((res) => {
			let details = `<h5> ID: ${res.data.id}<br>
			Mac Address: ${res.data.macaddr}<br> 
			IP Address: ${res.data.ipaddr}<br>
			Company: ${res.data.company}<br>
			Type: ${res.data.type}<br>
			Speed: ${res.data.rtt} ms per packet <br> </h5>
			`
			swal({
				
				html: details
				}
			)
		})
		.catch((error)=>{
			console.log(error); 
		})


	}






	render(){
		
		return(
			<div>
				<div className = "row">
					<div className = "col-sm-12 text-center">
						<h2> We need a title that goes here </h2>
					</div>
				</div>
				<div className = "container">
					<div className = "row">
							{this.showData()}

					</div>
					
				</div>
					
				
				
			</div>
		)
	}

}

export default Home; 