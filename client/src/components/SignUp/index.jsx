import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_USER } from "../../utils/mutations"
import Auth from "../../utils/auth"
const Signup = ({ setErrorMessage, setShowErr}) => {
    const [userForm, userFormState] = useState({ username: '', email: '', password: '' })
    const [AddUser, { error }] = useMutation(ADD_USER);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        userFormState({ ...userForm, [name]: value })
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await AddUser({
                variables: { ...userForm }
            })
            console.log(data)
            Auth.logIn(data.addUser.token)
        } catch (error) {
            console.error(error)
            setErrorMessage("Something went wrong please check your password/email")
            setShowErr(true)
        }

    }
    return (
        <>
            <h2 className="text-xl mb-3 underline underline-offset-4">Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                {/* CLEAN EMAIL FORM */}
                {/* <label>email</label>
                <input 
                type="text"
                name="email"
                placeholder="email"
                value={userForm.email}
                onChange={handleInputChange}
                ></input>
                <br></br> */}
                <div className="relative mb-3">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        id="email"
                        className="peer min-h-[auto] w-full bg-slate-50 rounded px-3 py-0.5 border-b-2 leading-[1.6] border-gray-300 text-gray-900 focus:outline-none placeholder-transparent focus:border-rose-600"
                        value={userForm.email}
                        onChange={handleInputChange}
                    ></input>
                    <label
                        htmlFor="email"
                        className="absolute left-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm"
                    >Email</label>
                </div>
                <div className="relative mb-3">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="peer min-h-[auto] w-full bg-slate-50 rounded px-3 py-0.5 border-b-2 leading-[1.6] border-gray-300 text-gray-900 focus:outline-none placeholder-transparent focus:border-rose-600"
                        placeholder="Username"
                        value={userForm.username}
                        onChange={handleInputChange}
                    ></input>
                    <label
                        htmlFor="username"
                        className="absolute left-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm"
                    >Username</label>
                </div>
                <div className="relative mb-2">
                    <input
                        type="password"
                        name="password"
                        id="passsword"
                        className="peer min-h-[auto] w-full bg-slate-50 rounded px-3 py-0.5 border-b-2 leading-[1.6] border-gray-300 text-gray-900 focus:outline-none placeholder-transparent focus:border-rose-600"
                        placeholder="password"
                        value={userForm.password}
                        onChange={handleInputChange}
                    ></input>
                    <label
                    htmlFor="password"
                    className="absolute left-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm"
                    >Password</label>
                </div>
                {/* CLEAN USERNAME FORM */}
                {/* <label>username</label>
                <input 
                type="text"
                name="username"
                placeholder="username"
                value={userForm.username}
                onChange={handleInputChange}
                ></input>
                <br></br> */}
                {/* CLEAN PASSWORD FORM */}
                {/* <label>password</label>
                <input 
                type="password"
                name="password"
                placeholder="password"
                value={userForm.password}
                onChange={handleInputChange}
                ></input> */}
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