
import {useMutation } from "@apollo/client"
import { useState } from "react"
import {LOGIN} from "../../utils/mutations"
import Auth from '../../utils/auth'

const Login = () =>{
    const [userForm, userFormState] = useState({email:'',password:''})
    const [login, {error}] = useMutation(LOGIN)
    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        userFormState({...userForm, [name]:value});
    }
    const handleFormSubmit = async(event)=>{
        event.preventDefault()
        console.log(userForm)
        try{
            const {data} = await login({
                variables:{...userForm}
            })
            console.log(data)
            Auth.logIn(data.login.token)
        }catch(error){
            console.error(error)
        }
    }
    return (
        <>
        <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <label>username</label>
                <input 
                type="text"
                name="email"
                placeholder="username"
                onChange={handleInputChange}
                value={userForm.email}
                ></input>
                <br></br>
                <label>password</label>
                <input 
                type="password"
                name="password"
                value={userForm.password}
                onChange={handleInputChange}
                placeholder="password"
                ></input>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    )
}

export default Login;

