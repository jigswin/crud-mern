import React from 'react'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

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
        console.log(email,password);
        let result = await fetch("http://localhost:5000/login",{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json();
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/profile");
        }else{
            alert("pls enter correct details");
        }  
    }

    return(
        <div className='register'>
            <h1>Login</h1>
            <input type="text" className='InputBox' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" className='InputBox' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type="button" onClick={collectData} className='InputButton'>Submit</button>
        </div>
    )
}

export default Login