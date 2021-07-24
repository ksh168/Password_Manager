import './App.css';
import { useState } from 'react';//using State

import Axios from 'axios'


function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')// '' -> means it's a string
  const [title, setTitle] = useState('')

  const addPassword = () => {
    Axios.post('http://localhost:3001/addpassword', {
    email: email, password: password, title: title,
    });
  };


  return (
    <div className="App">
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
    </div>
  );
}

export default App;
