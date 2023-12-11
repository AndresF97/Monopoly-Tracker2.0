import { ME } from "../utils/queries"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import PlayerForm from "../components/PlayerForm"
const GameHistory = () => {

    const { loading, data } = useQuery(ME, {
        fetchPolicy: "no-cache"
    })
    const gameList = data?.me?.gameMaster || []
    const [swicthPage, swicthPageState]  = useState(true)
    const [currentGameId, currentGameIdState] = useState('')
    const swicthToPlayerForm = (event)=>{
        swicthPageState(false)
        currentGameIdState(event.target.getAttribute("data-id"))
    }
    return (
        <>
         <h1>Game History</h1>
        {swicthPage?(
            <>
                {loading ? (
                    <h1>loading</h1>
                ) : (
                    <section>
                        <ul>
                        {gameList?.map((game) => {
                            // add link to create a new page for adding/updating player
                            return (
                                <li key={game._id} onClick={(event)=>{swicthToPlayerForm(event)}}>
                                    <h2 data-id={game._id}>{game.name}</h2>
                                </li>
                            )
    
                        })}
                        </ul>
                    </section>
                )}
                </>
        ):(
            <section>
             {/* create swicth case to check for if user wants to change part of the page to a diffrent component.
             past props of the game id and the state for the page to that commponent */}
            <PlayerForm swicthPage={swicthPage} swicthPageState={swicthPageState} currentGameId={currentGameId}/>
            </section>
        )}

        </>
    )
}

export default GameHistory;