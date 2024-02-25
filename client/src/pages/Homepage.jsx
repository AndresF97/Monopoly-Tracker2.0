import UserForms from "../components/UserFormSwitcher"
import GameForm from "../components/GameForm"
import { useState } from "react"
import Auth from "../utils/auth"
import MonopolyMan from "../assets/images/MTLogo.png"


const HomePage = () => {
    console.log(Auth.loggedIn())
    const [createGame, createGameState] = useState(false)
    return (
        <section className="text-center m-5 flex justify-center items-center ">
            <br></br>
            {Auth.loggedIn() ? (
                <>
                    <h1>You're logged in!</h1>
                    <GameForm />
                </>
            ) : (
                <>
                    {createGame ? (
                        <section className="border-2 border-gray-950 h-60 w-80 bg-green-300 p-3">
                            <UserForms />
                            <br></br>
                            <button onClick={() => createGameState(false)}>Go Back!</button>
                        </section>
                    ) : (
                        <section className="border-2 border-gray-950 w-50 h-50 bg-green-300">
                            {/* <button className="px-4 py-2 font-bold bg-[#EC2027] rounded-full text-white" onClick={() => createGameState(true)}>Create Game!</button> */}
                            <br></br>
                            <div>
                                <div
                                    className="relative overflow-hidden bg-cover bg-no-repeat"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    <div className="flex justify-center items-center ">
                                        <img className="mr-5 ml-5 w-50 h-30 border " src={MonopolyMan}></img>
                                    </div>
                                </div>
                                <div class="p-6">
                                    <button
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        className="px-4 py-2 font-bold bg-[#EC2027] rounded text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" onClick={() => createGameState(true)}>Create Game!</button>
                                </div>
                            </div>

                        </section>

                    )

                    }
                </>
            )
            }

        </ section >
    )
}

export default HomePage;

