import UserForms from "../components/UserFormSwitcher"
import GameForm from "../components/GameForm"
import { useState } from "react"
import Auth from "../utils/auth"
import MonopolyMan from "../assets/images/monopolyMain.png"


const HomePage = () => {
    console.log(Auth.loggedIn())
    const [createGame, createGameState] = useState(false)
    return (
        <section className="text-center m-5">
        <div class="flex justify-center items-center">
            <img className="mr-5 ml-5 w-40 h-30" src={MonopolyMan}></img>
        </div>
        <br></br>
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
                        <>
                         <button  className="px-4 py-2 font-bold bg-[#EC2027] rounded-full text-white" onClick={() => createGameState(true)}>Create Game!</button>
                        <br></br>
                        </>
                       
                    )

                    }
                </>
            )}

        </ section>
    )
}

export default HomePage;

