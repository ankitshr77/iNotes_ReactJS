import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""})
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault(); 
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email:credentials.email, password: credentials.password}),
      });
      const json = await response.json()
      console.log(json);
      
      if (json.success){
        // save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        props.showAlert("Logged In Successfully", "success")
        navigate("/");
        
      }
      else{
        props.showAlert("Invalid Details", "danger")

      }


    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <>
    <h1 className='text-center mb-5'> Please Login to Take Notes </h1>
    <div className='container form-control'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} value={credentials.email} name="email" id="email" aria-describedby="emailHelp"/>
   
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name="password" id="password"/>
  </div>
 
  <button type="submit" className="btn btn-primary" >Login</button>
</form>
</div>
    </>
  )
}

export default Login
