import { useMutation } from "@apollo/client";
import {useState} from "react";
import {ADD_USER} from "../../utils/mutations"
import Auth from "../../utils/auth"
const Signup = () => {
    const [userForm, userFormState] = useState({username:'',email:'',password:''})
    const [AddUser, {error }] =  useMutation(ADD_USER);
    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        userFormState({...userForm, [name]:value})
    }
    const handleFormSubmit = async(event)=>{
        event.preventDefault()
        try{
            const {data} = await AddUser({
                variables:{...userForm}
            })
            console.log(data)
            Auth.logIn(data.addUser.token)
        }catch(error){
            console.error(error)
        }

    }
    return (
        <>
        <h2>Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                <label>email</label>
                <input 
                type="text"
                name="email"
                placeholder="email"
                value={userForm.email}
                onChange={handleInputChange}
                ></input>
                <br></br>
                <label>username</label>
                <input 
                type="text"
                name="username"
                placeholder="username"
                value={userForm.username}
                onChange={handleInputChange}
                ></input>
                <br></br>
                <label>password</label>
                <input 
                type="password"
                name="password"
                placeholder="password"
                value={userForm.password}
                onChange={handleInputChange}
                ></input>
                <div>
                    <button
                     className="px-4 py-2 my-3 font-bold bg-[#EC2027] rounded text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" 
                     type="submit"
                     >Submit</button>
                </div>
            </form>
        </>
    )
}



export default Signup;