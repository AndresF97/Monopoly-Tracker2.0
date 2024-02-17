import { useState } from 'react'
import PropertiesCard from '../PropertiesCard'
import { useMutation } from '@apollo/client'
import { REMOVE_ONE_PLAYER_FROM_GAME, UPDATE_PLAYER_INFO } from "../../utils/mutations"

const PlayerCard = ({ player, currentGameId, takenProperties }) => {
    // create current Player State to use in the update
    const [currentPlayer, setCurrentPlayer] = useState({_id: player._id,name: player.name,token:player.token,money:player.money,position:player.position})
    const [removeOnePlayerFromGame, { error }] = useMutation(REMOVE_ONE_PLAYER_FROM_GAME)
    const [updatePlayerInfo, {err}] = useMutation(UPDATE_PLAYER_INFO)
    const [showPlayerUpdateForm, setShowPlayerUpdateForm] = useState(false)
    const deletePlayer = async (event) => {
        let playerId = currentPlayer._id
        let gameId = currentGameId
        try {
            const { data } = await removeOnePlayerFromGame({
                variables: { gameId, playerId }
            })
            window.location.reload()
        } catch (err) {
            console.error(err)
        }
    }
    const updatePlayerFunc = async (event) => {
        event.preventDefault()
        try{
            console.log(currentPlayer)
            currentPlayer.money = parseInt(currentPlayer.money)
            const {data} = await updatePlayerInfo({
                variables:{...currentPlayer,playerId:currentPlayer._id}
            })
            console.log(data)
            window.location.reload()

        }catch(err){
            console.error(err)
        }
    }
    const handleInputChange= (event)=>{
        const {name, value } = event.target
        setCurrentPlayer({...currentPlayer, [name]:value})
    }
    return (
        <>
            <form>
                <p>Name: {currentPlayer.name}</p>
                <p>Token: {currentPlayer.token}</p>

                {showPlayerUpdateForm ? (
                    <>
                        <label>Money</label>
                        <br></br>
                        <input
                            type="text"
                            placeholder={currentPlayer.money}
                            name='money'
                            value={currentPlayer.money}
                            onChange={handleInputChange}
                        ></input>
                        <br></br>
                        <label>Position</label>
                        <br></br>
                        <input
                            type="text"
                            placeholder={currentPlayer.position}
                            name='position'
                            value={currentPlayer.position}
                            onChange={handleInputChange}
                        ></input>
                        <br></br>
                    </>

                ) : (
                    <>
                        <p>Money:{currentPlayer.money}</p>
                        <p>Position:{currentPlayer.position}</p>
                    </>
                )}

                <PropertiesCard playerProperties={player.playerPropreties} takenProperties={takenProperties} playerId={currentPlayer._id}/>
                <br></br>
                {showPlayerUpdateForm ? (
                    <>
                        <button onClick={(event) => { updatePlayerFunc(event) }}>Update</button>
                        <button onClick={(event)=>{ event.preventDefault(); setShowPlayerUpdateForm(false)}}>Player info</button>
                    </>
                ) : (
                    <>

                        <button onClick={(event)=>{ event.preventDefault(); setShowPlayerUpdateForm(true)}}>Update Player Info</button>
                        <button onClick={(event) => deletePlayer(event)}>Delete</button>
                    </>
                )}

            </form>
        </>
    )
}


export default PlayerCard;