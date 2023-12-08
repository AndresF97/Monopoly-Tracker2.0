import Login from "../Login"
import Signup from "../SignUp"
import { useState } from "react"

const UserForms = () =>{
    const [formSwitch, formSwitchState] = useState(false)
    return (
        <>
        {formSwitch ? (
            <>
                <Signup/>
                <button onClick={()=> formSwitchState(false)}>Log in</button>
            </>
        ):(
            <>
                <Login/>
                <button onClick={()=> formSwitchState(true)}>Sign up</button>
            </>
        )}
        </>
    )
}

export default UserForms;
