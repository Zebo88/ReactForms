import React, { useState } from "react";

const API_URL = "https://fsa-jwt-practice.herokuapp.com/signup";

export default function SignUpForm({ token, setToken }){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [type, setType] = useState('password');

  async function handleSubmit(event){
    event.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: { username },
          password: { password },
        }),
      });
      const result = await response.json();
      console.log("Result: ", result);
      setToken(result.token);

    } catch (error) {
      setError(error.message);
    }

  };

  const handleToggle = () => {
    if (type==='password'){
       setType('text');
    } else {
       setType('password');
    }
 }
  
  return (
    <>
      <h2>Sign Up</h2>
      { error && <p>{ error }</p>}

      <p>Please enter your username and password</p>
      <form onSubmit={ handleSubmit }>
        <label>
          <input 
            id="UN" 
            type="text" 
            value={ username } 
            onChange={ (e) => setUsername(e.target.value) }
            placeholder="Username"
          />
        </label>
        <br/>
        <label>
          <input 
            id="PW" 
            type={type} 
            value={ password } 
            onChange={ (e) => setPassword(e.target.value)}
            placeholder="Password"
           />
           <label htmlFor="checkbox" className="showPW">Show Password</label>
           <input className="checkbox" name="checkbox" type="checkbox" onClick={handleToggle}/>
        </label>
        <br/>
        <button type="submit">Submit</button>
      </form>
    </>

  );
}