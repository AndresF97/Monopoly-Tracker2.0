import UserForms from "../components/UserFormSwitcher"
import GameForm from "../components/GameForm"
import { useState } from "react"
import Auth from "../utils/auth"


const HomePage = () => {
    console.log(Auth.loggedIn())
    const [createGame, createGameState] = useState(false)
    return (
        <>
        <h1>Home Page!</h1>
        <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
            {Auth.loggedIn() ? (
                <>
                    <h1>You're logged in!</h1>
                    <GameForm/>
                </>
            ) : (
                <>
                    {createGame ? (
                        <>
                            <UserForms />
                            <button onClick={() => createGameState(false)}>Go Back!</button>
                        </>
                    ) : (
                        
                        <button  className="rounded-full" onClick={() => createGameState(true)}>Create Game!</button>
                    )

                    }
                </>
            )}

        </>
    )
}

export default HomePage;

