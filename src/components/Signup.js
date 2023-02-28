import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword:""})
  const navigate = useNavigate();



  const handleSubmit = async (e)=>{
    e.preventDefault(); 
    const {name, password, email } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
  
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name, email, password}),
  });
  const json = await response.json()
  console.log(json)
  if (json.success){
    // save the auth token and redirect
    localStorage.setItem('token', json.authtoken);
    navigate("/");
    props.showAlert("Account Created Successfully", "success")

  } else{
    props.showAlert("Invalid Credentails", "danger")
  }
}

const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}

  return (
    <div className='container'>
      <h1 className='text-center mb-5'> SIGN UP PAGE </h1>
      <form onSubmit={handleSubmit}>

  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/> 
  </div>

  <div className="form-group my-2">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" /> 
  </div>

  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>

  <div className="form-group my-2">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
