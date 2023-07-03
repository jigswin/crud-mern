import React from 'react'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/profile");
        }
    },[])
    const collectData = async () => {
        console.log(name,email,password);
        let result = await fetch("http://localhost:5000/register",{
            method:"post",
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json();
        localStorage.setItem("user",JSON.stringify(result));
        navigate("/profile");
    }

    return(
        <div className='register'>
            <h1>Register</h1>
            <input type="text" className='InputBox' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" className='InputBox' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" className='InputBox' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type="button" onClick={collectData} className='InputButton'>Submit</button>
        </div>
    )
}

export default Signup