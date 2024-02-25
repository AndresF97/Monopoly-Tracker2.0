
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
                    <button className="px-4 py-2 font-bold bg-[#EC2027] rounded text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] my-3"  type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}

export default Login;

