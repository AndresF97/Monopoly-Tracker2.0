
import UserForms from "../components/UserFormSwitcher"
import { useState } from "react"

const HomePage = ()=>{
    const [createGame, createGameState] = useState(false)
    return (
        <>
        <h1>Home Page!</h1>
        { createGame ? (
            <>
            <UserForms/>
            <button onClick={()=> createGameState(false)}>Go Back!</button>
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

