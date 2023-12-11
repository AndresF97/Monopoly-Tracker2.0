import { ME } from "../utils/queries"
import { useState } from "react"
import { useQuery } from "@apollo/client"
const GameHistory = () => {

    const { loading, data } = useQuery(ME, {
        fetchPolicy: "no-cache"
    })
    const gameList = data?.me?.gameMaster || []
    const [swicthPage, swicthPageState]  = useState(false)
    const [currentGameId, currentGameIdState] = useState('')
    const swicthToPlayerForm = ()=>{
        console.log('hello')
    }
    return (
        <>
            <h1>Game History</h1>
            {loading ? (
                <h1>loading</h1>
            ) : (
                <section>
                    <ul>
                    {gameList?.map((game) => {
                        // add link to create a new page for adding/updating player
                        return (
                            <li key={game._id} data-id={game._id} onClick={swicthToPlayerForm}>
                                <h2 >{game.name}</h2>
                            </li>
                        )

                    })}
                    </ul>
                </section>
            )}
            {/* create swicth case to check for if user wants to change part of the page to a diffrent component.
             past props of the game id and the state for the page to that commponent */}

        </>
    )
}

export default GameHistory;