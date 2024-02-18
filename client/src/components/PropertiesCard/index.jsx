import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROPERTY_TO_PLAYTER, REMOVE_PROPERTY_FROM_PLAYER } from "../../utils/mutations";
const PropertiesCard = ({ playerProperties, takenProperties, playerId }) => {
    // TODO:
    // WORK adding images
    // WORK getting the CSS started (tailwind)
    const [addPropertyToPlayer, {error}] = useMutation(ADD_PROPERTY_TO_PLAYTER);
    const [removePropertyFromPlayer, {err}] = useMutation(REMOVE_PROPERTY_FROM_PLAYER)
    const [propertyId,setSelectedPropertyId] =useState('')
    const [showProperties, setShowProperties] = useState(false)
    const addPropertyToPlayerFunc = async (event)=>{
        event.preventDefault();
        try{
            const {data} = await addPropertyToPlayer({
                variables:{propertyId,playerId}
            })
            window.location.reload()
        }catch(err){
            console.error(err)
        }
    }
    const deletePropertyFunc = async (event)=>{
        let propertyId = event.target.getAttribute('data-propertyid');
        try{
            const {data} = await removePropertyFromPlayer({
                variables:{propertyId, playerId}
            })
            console.log(data)
            window.location.reload();
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        if(takenProperties){
            setSelectedPropertyId(takenProperties[0]?._id)
            console.log(playerProperties[0])
        }
    },[takenProperties])
    return (
        <section>
            {showProperties ? (
                <>
                    <label>Player property</label>
                    <ul>
                        {playerProperties?.map((item) => {
                            return (
                                <li key={Math.floor(Math.random() * 100) + item.properties[0].name}>{item.properties[0].name} <button data-propertyid={item._id} onClick={(event)=>{event.preventDefault(); deletePropertyFunc(event)}}>Delete</button></li>
                            )
                        })}
                    </ul>
                    <label>New Property for user </label>
                    <br></br>
                    <select onChange={ (event)=>{setSelectedPropertyId(event.target.value)}}>
                        {takenProperties?.map((propertie) => {
                            return (
                                <option
                                    key={Math.floor(Math.random() * 100) + propertie.name}
                                    data-color={propertie.hex}
                                    value={propertie._id}>
                                    {propertie.name}
                                </option>
                            )
                        })}
                    </select>
                    <br></br>
                    <button onClick={(event) => { event.preventDefault(); setShowProperties(false) }}>Hide propreties</button>
                    <button onClick={(event)=>{addPropertyToPlayerFunc(event)}}>Add propertie</button>
                </>
            ) : (
                <>
                    <br></br>
                    <button onClick={(event) => { event.preventDefault(); setShowProperties(true) }}>Show propreties</button>
                </>
            )}
        </section>
    )
}

export default PropertiesCard;