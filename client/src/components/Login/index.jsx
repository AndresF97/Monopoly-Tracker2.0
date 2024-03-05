
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { LOGIN } from "../../utils/mutations"
import Auth from '../../utils/auth'

const Login = () => {
    const [userForm, userFormState] = useState({ email: '', password: '' })
    const [login, { error }] = useMutation(LOGIN)
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        userFormState({ ...userForm, [name]: value });
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault()
        console.log(userForm)
        try {
            const { data } = await login({
                variables: { ...userForm }
            })
            console.log(data)
            Auth.logIn(data.login.token)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <h2 className="text-xl mb-1 underline underline-offset-4">Login</h2>
            <form onSubmit={handleFormSubmit}>
                {/* CLEAN EMAIL FORM */}
                {/* <label>username</label>
                <input
                    type="text"
                    name="email"
                    placeholder="username"
                    onChange={handleInputChange}
                    value={userForm.email}
                ></input> */}
                <div className="relative mb-3">
                <input
                    className="peer min-h-[auto] w-full bg-slate-50 rounded px-3 py-0.5 border-b-2 leading-[1.6] border-gray-300 text-gray-900 focus:outline-none placeholder-transparent focus:border-rose-600"
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={userForm.email}
                    id="email"
                ></input>
                <label
                htmlFor="email"
                className="absolute left-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm"
                >Email</label>
                    
                </div>         

                {/* CLEAN PASSWORD FORM*/}
                {/* <label>password</label>
                <input
                    type="password"
                    name="password"
                    value={userForm.password}
                    onChange={handleInputChange}
                    placeholder="password"
                ></input> */}
                <div className="relative">
                    <input
                        className="peer min-h-[auto] w-full bg-slate-50 rounded px-3 py-0.5 border-b-2 leading-[1.6] border-gray-300 text-gray-900 focus:outline-none placeholder-transparent focus:border-rose-600"
                        type="password"
                        name="password"
                        id="password"
                        value={userForm.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                    ></input>
                    <label
                        htmlFor="password"
                        className="absolute left-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm"
                    >Password</label>
                </div>

                <div>
                    <button className="px-4 py-2 font-bold bg-[#EC2027] rounded text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] my-3" type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}

export default Login;

