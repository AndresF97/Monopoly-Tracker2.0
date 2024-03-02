
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
            <h2 className="text-xl mb-1">Login</h2>
            <form onSubmit={handleFormSubmit}>
                {/* <label>username</label>
                <input
                    type="text"
                    name="email"
                    placeholder="username"
                    onChange={handleInputChange}
                    value={userForm.email}
                ></input> */}
                <div class="relative mb-3" data-te-input-wrapper-init>
                    <input
                        type="email"
                        name="email"
                        class="peer block min-h-[auto] w-full rounded border-0 bg-slate-50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-500 dark:placeholder:text-neutral-500 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInputEmail"
                        onChange={handleInputChange}
                        value={userForm.email}
                        placeholder="Email" />
                    <label
                        for="Email"
                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-500 dark:peer-focus:text-primary"
                    >Email
                    </label>
                </div>
                {/* <br></br> */}
                <div class="relative mb-3" data-te-input-wrapper-init>
                    <input
                        type="password"
                        name="password"
                        value={userForm.password}
                        onChange={handleInputChange}
                        class="peer block min-h-[auto] w-full rounded border-0 bg-slate-50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-500 dark:placeholder:text-neutral-500 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInputPassword"
                    />
                    <label
                        for="exampleFormControlInputPassword"
                        class="pointer-events-none peer-placeholder-shown:leading-[3.75] absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-500 dark:peer-focus:text-primary"
                    >Password
                    </label>

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

