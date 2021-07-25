import './App.css';
import { useState, useEffect } from 'react';//using State

import Axios from 'axios'


function App() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");// "" -> means it's an empty string
	const [title, setTitle] = useState("");
	const [passwordList, setPasswordList] = useState([]);//empty list

	useEffect(() => {
		//wait for response then
		Axios.get("http://localhost:3001/showpasswords").then((response) => {
			//console.log(response.data);
			setPasswordList(response.data);
		});
	}, []);


	const addPassword = () => {
		Axios.post("http://localhost:3001/addpassword", {
		email: email, password: password, title: title,
		});
  	};

	
	const decyptPassword = (encryption) => {
		Axios.post("http://localhost:3001/decryptpassword", {
			password: encryption.password,
			iv: encryption.iv,
		}).then((response)=> {
			//console.log(response.data);
			setPasswordList(passwordList.map((val) => {
				return val.id === encryption.id 
					? {		//if true, return this (will happen only for one unique)
						id: val.id, 
						password: val.password, 
						title: response.data, 
						iv: val.iv
					  }
					: val;//else return this
				})
			);
		});
	};
	  

	return (
		<div className="App">
			{/* for adding passwords */}
			<div className="AddingPassword">
				<label for="username">Username/Email:</label>
				<input type="text" placeholder="email@example.com" onChange={(event) => {setEmail(event.target.value)}} required/>

				<label for="pass">Password:</label>
				<input type="password" placeholder="thisisatestpassword" id="myInput" onChange={(event) => {setPassword(event.target.value)}} required/>
				{/* onChange causes it to put whatever value is put in the field by the user whenever there's a change (it's called again when ther's change to the input) */}


				<label for="title">Website Name:</label>
				<input type="text" placeholder="www.example.com" onChange={(event) => {setTitle(event.target.value)}} required/>
				
				<button onClick={addPassword}>Add Password!</button>
			</div>

			{/* for displaying passwords */}
			<div className="Passwords">
				{passwordList.map((val, key) => {
					//return <h1> {val.title} </h1>;
					return (
						<div 
							className="password" 
							onClick={() => {
								decyptPassword({
									password: val.password, iv: val.iv, id: val.id
								});
							}}
							key = {key}
						>
							<h3>{val.title}</h3>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
