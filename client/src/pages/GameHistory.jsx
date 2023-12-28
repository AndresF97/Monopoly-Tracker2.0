import { ME } from "../utils/queries"
import { useState, Fragment } from "react"
import { useQuery } from "@apollo/client"
import PlayerForm from "../components/PlayerForm"
const GameHistory = () => {

    const { loading, data } = useQuery(ME, {
        fetchPolicy: "no-cache"
    })
    // console.log(data?.me)
    const gameList = data?.me?.gameMaster || []
    const [currentGameId, setcurrentGameIdState] = useState('')
    const [currentGameName, setCurrentGameName] = useState('')
    let [createPlayeForm,setCreatePlayerForm] = useState([])
    let [selectedGame,setSelectedGame]= useState([]);

    const onAddBtnClick = event => {
        if(createPlayeForm.length > 4){
            alert("Thats to many player forms")
            return
        }
        setCreatePlayerForm(createPlayeForm.concat(<PlayerForm key={Math.floor(Math.random()* 100)} currentGameId={currentGameId}></PlayerForm>));
    };

    const stateCurrentGameInfo = (event)=>{
        let gameName = event.target.textContent
        let gameId = event.target.getAttribute('data-id')
        setCurrentGameName(gameName)
        setcurrentGameIdState(gameId)
        const allGames = data?.me?.gameMaster
        let filterGame = allGames.filter((game)=> game.name === gameName)
        selectedGame = selectedGame.concat(filterGame)
        setSelectedGame(selectedGame)
        // console.log(selectedGame)
        
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
                <h4>Game your updating: {currentGameName}</h4>
                <div>
                    <h5>List of saved Players:</h5>
                    <ul>
                        {console.log(selectedGame[0].savedPlayers)}
                    {selectedGame[0].savedPlayers?.map((player)=>{
                        return (
                            <li>Name:{player.name}</li>
                        )
                    })}
                    </ul>
                </div>

                   <div>
                        {createPlayeForm}
                    </div>
                <button onClick={onAddBtnClick}>
                    Add Player
                </button>
            </section>
        )}

   

        </>
    )
}

export default GameHistory;