import UserForms from "../components/UserFormSwitcher"
import { useState } from "react"
import Auth from "../utils/auth"

const HomePage = () => {
    console.log(Auth.loggedIn())
    const [createGame, createGameState] = useState(false)
    return (
        <>
        <h1>Home Page!</h1>
            {Auth.loggedIn() ? (
                <>
                    <h1>You're logged in!</h1>
                </>
            ) : (
                <>
                    {createGame ? (
                        <>
                            <UserForms />
                            <button onClick={() => createGameState(false)}>Go Back!</button>
                        </>
                    ) : (
                        <button onClick={() => createGameState(true)}>Create Game!</button>
                    )

                    }
                </>
            )}

        </>
    )
}

export default HomePage;

