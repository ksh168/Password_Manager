import './App.css';
import { useState } from 'react';//using State

import Axios from 'axios'


function App() {

  const [password, setPassword] = useState('')// '' -> means it's a string
  const [title, setTitle] = useState('')

  const addPassword = () => {
    Axios.post('http://localhost:3001/addpassword', {
    password: password, title: title,
    });
  };

  return (
    <div className="App">
      <div className="AddingPassword">
        <input type="text" placeholder="Ex. thisisatestpassword" onChange={(event) => {setPassword(event.target.value)}} />
        {/* onChange causes it to put whatever value is put in the field by the user whenever there's a change (it's called again when ther's change to the input) */}
        
        <input type="text" placeholder="Ex. GitHub" onChange={(event) => {setTitle(event.target.value)}} />
        
        <button onClick={addPassword}>Add Password!</button>
      </div>
    </div>
  );
}

export default App;
