import { useState } from 'react'
import PropertiesCard from '../PropertiesCard'
import { useMutation } from '@apollo/client'
import { REMOVE_ONE_PLAYER_FROM_GAME } from "../../utils/mutations"

const PlayerCard = ({ player, currentGameId, takenProperties }) => {
    // create current Player State to use in the update
    const [currentPlayer, setCurrentPlayer] = useState({_id: player._id,name: player.name,token:player.token,money:player.money,position:player.position})
    const [removeOnePlayerFromGame, { error }] = useMutation(REMOVE_ONE_PLAYER_FROM_GAME)
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
    const updatePlayerFunc = (event) => {
        event.preventDefault()
        // console.log(event.target.parentNode.querySelector('.playerMoney').value)
        console.log(currentPlayer)
        currentPlayer.money = parseInt(currentPlayer.money)
        // CREATE A VARIABLE TO STORE UPDATED MONEY 

        // CREATE A VARIABLE TO STORE UPDATED POSITION
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

                <PropertiesCard playerProperties={player.playerPropreties} takenProperties={takenProperties} />
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