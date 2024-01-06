import React, { useCallback, useState } from "react";

const API_URL = "https://fsa-jwt-practice.herokuapp.com/authenticate";

export default function Authenticate({ token, setToken }){
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function handleClick(){
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const result = await response.json();
      setSuccessMessage(result.message);

    } catch (error) {
      setError(error.message);
    }

  };

  return (
    <>
      <h2>Authenticate</h2>
      {error && <p>{ error }</p>}
      {successMessage && <p>{ successMessage }</p>}

      <button onClick={handleClick}>Authenticate Token</button>
    </>
  );
}