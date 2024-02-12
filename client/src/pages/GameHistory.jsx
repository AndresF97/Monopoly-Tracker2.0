import { ME, ALL_PROPERTIES } from "../utils/queries"
import { DELETE_GAME, REMOVE_ONE_PLAYER_FROM_GAME, UPDATE_PLAYER_INFO} from "../utils/mutations"
import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import PlayerForm from "../components/PlayerForm"
import TokenList from "../assets/tokenList.json"

const GameHistory = () => {
    // TODO:
    // DISPLAY PROPERTIES AND CREATE TWO SEPERATE ARRAYS TO HOLD AVILABLE PROPERTIES AND NONE AVILABLE PLAYER PROPERTIES
    // TO GET THE ARRAYS TO ACTUALLY WORK WE MUST COMPARE THE AVILABLE PROPERTIES
    // ARRAY OF INFORMATION SHOULD AND TH EAVILABLE TOKENS AS WELL SHOULD BE AVIALABLE
    // ADD TOKEN IMAGE ASSETS TO THE USER
    // WORK ON PLAYERFORM COMPENET TO RENDER TOKEN OPTION THE USER IS USING 
    // CREATE A FORM TO ADD PROPERTIES INSTEAD OF BEEN PART OF THE UPADTEFORM
    const { loading, data } = useQuery(ME, {
        fetchPolicy: "no-cache"
    })
    const data2 = useQuery(ALL_PROPERTIES, {
        fetchPolicy: "no-cache"
    })
    
    const [deleteGame,{error}] = useMutation(DELETE_GAME)
    const [removeOnePlayerFromGame, {erro}] = useMutation(REMOVE_ONE_PLAYER_FROM_GAME)
    const [upddatePlayerInfo, {err}] = useMutation(UPDATE_PLAYER_INFO)
    // console.log(data?.me)
    const gameList = data?.me?.gameMaster || [];
    const currentProperties = data2?.data?.allProperties || []
    // console.log(currentProperties)
    const [currentGameId, setcurrentGameIdState] = useState('')
    const [currentGameName, setCurrentGameName] = useState('')
    let [createPlayeForm,setCreatePlayerForm] = useState([])
    let [selectedGame,setSelectedGame]= useState([]);
    let [takenProperties, setTakenPropeties] = useState([])
    let [playersLength, setPlayersLenth] = useState(0)

    const updatePlayerFunc = (event)=>{
        event.preventDefault()
        console.log(event.target.parentNode.querySelector('.playerMoney').value)
        // CREATE A VARIABLE TO STORE UPDATED MONEY 

        // CREATE A VARIABLE TO STORE UPDATED POSITION
    }

    const onAddBtnClick = event => {
        playersLength = playersLength + 1
        setPlayersLenth(playersLength)
        console.log(createPlayeForm)
        if(createPlayeForm.length > 5 || playersLength > 5){
            alert("Thats to many player forms")
            return
        }
        setCreatePlayerForm(createPlayeForm.concat(<PlayerForm tokenList={TokenList} key={Math.floor(Math.random()* 100)} currentGameId={currentGameId}></PlayerForm>));
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
        playersLength = selectedGame[0].savedPlayers.length
        setPlayersLenth(playersLength)
        // console.log(playersLength)
        // console.log(selectedGame)
        
    }
    const deleteGameFunc = async (event) =>{
        event.stopPropagation()
        console.log(event.target.getAttribute('data-id'))
        let gameId = event.target.getAttribute('data-id')
        try{
            const {data} = await deleteGame({
                variables:{gameId}
            })
            window.location.reload()

        }catch(error){
            console.error(error)
        }

    }
    const removePlayerForm = () =>{
        // if(createPlayeForm.length){
            playersLength = playersLength - 1
            setPlayersLenth(playersLength)
            setCreatePlayerForm(createPlayeForm.splice(-1))
        // }
        if(createPlayeForm < 1){
            
            setCreatePlayerForm(createPlayeForm = [] )
        }

    }
    const deletePlayer = async (event)=>{
        let playerId = event.target.getAttribute('data-playerid')
        let gameId = currentGameId
        try{
            const {data} = await removeOnePlayerFromGame({
                variables:{gameId,playerId}
            })
            window.location.reload()
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        if(selectedGame[0]?.savedPlayers){

        console.log(selectedGame[0]?.savedPlayers)
        }
    })
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
                                             {/* have to add functionality to delete a a game */}
                                             <button data-id={game._id} onClick={(event)=>{deleteGameFunc(event)}}>Delete</button>
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
                        
                    {selectedGame[0].savedPlayers?.map((player)=>{
                        return (
                            <li key={player._id}>
                                <form>
                                    <p>Name: {player.name}</p>
                                    <p>Token: {player.token}</p>
                                    <label>Money</label>
                                    <br></br>
                                    <input
                                    type="text"
                                    placeholder={player.money}
                                    className="playerMoney"
                                    ></input>
                                    <br></br>
                                    <label>Position</label>
                                    <br></br>
                                    <input
                                    type="text"
                                    placeholder={player.position}
                                    ></input>
                                    <br></br>
                                    {/* MIGHT NEED TO CHANGE THIS TO RENDER IN A DIFFERENT AREA SUCH AS */}
                                    {/* SUCH AS HAVING THE ADD PRPETY FUNCTIONALITY SOMEWHERE ELSE */}
                                    <label>New Property for user </label>
                                    <br></br>
                                    <select>
                                    {currentProperties?.map((propertie)=>{
                                        return (
                                            <option 
                                            key={Math.floor(Math.random()* 100) + propertie.name}
                                            data-color={propertie.hex} 
                                            value={propertie.name}>
                                            {propertie.name}
                                            </option>
                                        )
                                    })}
                                    </select>
                                    <br></br>
                                    <button data-playerid={player._id} onClick={(event) => {updatePlayerFunc(event)}}>Update</button>
                                    <button data-playerid={player._id} onClick={(event)=> deletePlayer(event)}>Delete</button>
                                </form>
                            </li>
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
                {(createPlayeForm.length > 0 ) ?(
                    // add  functionality to remove a form
                    <button onClick={removePlayerForm}>Remove Form</button>
                ):(
                    <></>
                )}
            
                <button onClick={()=>{window.location.reload()}}>
                    Go Back
                </button>
            </section>
        )}

   

        </>
    )
}

export default GameHistory;