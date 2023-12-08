import Login from "../components/Login"
import Signup from "../components/SignUp"
import { useState } from "react"

const HomePage = ()=>{
    const [createGame, createGameState] = useState(false)
    const LogNSignSwicthBtn = () =>{}

    return (
        <>
        <h1>Home Page!</h1>
        { createGame ? (
            <>
            <Login/>
            <Signup/>
            </>
        ):(
            <button onClick={()=> createGameState(true)}>Create Game!</button>
        )

        }

        {/* create swicth case to make sure login or sign up are render depending what the user want to do */}
        </>
    )
}

export default HomePage;
