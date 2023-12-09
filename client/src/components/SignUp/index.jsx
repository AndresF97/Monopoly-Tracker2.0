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
                    <button type="submit">Sing up</button>
                </div>
            </form>
        </>
    )
}



export default Signup;