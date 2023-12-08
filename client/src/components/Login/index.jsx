import {useMutation } from "@apollo/client"
import { useState } from "react"
import {LOGIN} from "../../utils/mutations"
import Auth from '../../utils/auth'

const Login = () =>{
    const [userForm, userFormState] = useState({email:'',password:''})
    const [login, {error}] = useMutation(LOGIN)
    const handleInputChange = (event) =>{
        const {name, value} = event;
        console.log(value)
        userFormState({...userForm, [name]:value});
    }
    const handleFormSubmit = async(event)=>{
        event.preventDefault()
    }
    return (
        <>
        <h2>Login</h2>
            <form>
                <label>username</label>
                <input 
                type="text"
                name="email"
                placeholder="username"
                onChange={handleInputChange}
                value={userForm.email}
                ></input>
                <label>password</label>
                <input 
                type="password"
                name="password"
                value={userForm.password}
                onChange={handleInputChange}
                placeholder="password"
                ></input>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </>
    )
}

export default Login;