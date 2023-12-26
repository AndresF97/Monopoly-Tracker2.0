import { ME } from "../utils/queries"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import PlayerForm from "../components/PlayerForm"
const GameHistory = () => {

    const { loading, data } = useQuery(ME, {
        fetchPolicy: "no-cache"
    })
    const gameList = data?.me?.gameMaster || []
    const [currentGameId, currentGameIdState] = useState('')
    const [currentGameName, setCurrentGameName] = useState('')
    let [createPlayeForm,setCreatePlayerForm] = useState([]) 

    const swicthToPlayerForm = (event)=>{
        // console.log(createPlayeForm[0])
        // if(createPlayeForm.length > 5){
        //     alert("Thats to many player forms")
        //     return
        // }createPlayeForm.push(<PlayerForm key={currentGameId} currentGameId={currentGameId}/>)
        // setCreatePlayerForm(createPlayeForm)
    }
    const stateCurrentGameInfo = (event)=>{
        let gameName = event.target.textContent
        let gameId = event.target.getAttribute('data-id')
    }
    return (
        <>
        {(currentGameName === '') ? (
            <section>
                     <h1>Game History</h1>
                     <>
                         {loading ? (
                             <h1>loading</h1>
                         ) : (
                             <section>
                                 <ul>
                                 {gameList?.map((game) => {
                                     // add link to create a new page for adding/updating player
                                     return (
                                         <li key={game._id} onClick={(event)=>{stateCurrentGameInfo(event)}}>
                                             <h2 data-id={game._id}>{game.name}</h2>
                                         </li>
                                     )
             
                                 })}
                                 </ul>
                             </section>
                         )}
                         </>
            </section>
        ):(
            <section>
                <h4>Game your updating:{currentGameName}</h4>
                <button onClick={()=> {swicthToPlayerForm()}}>
                    Add Player
                </button>
            </section>
        )}

   

        </>
    )
}

export default GameHistory;