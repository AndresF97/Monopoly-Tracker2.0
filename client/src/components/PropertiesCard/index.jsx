const PropertiesCard = ({playerProperties, takenProperties}) =>{
    return (
        <section>
        <h1>Boom Cards go here</h1>
        <label>Player property</label>
        <ul>
            {playerProperties?.map((item)=>{
                return (
                    <li key={Math.floor(Math.random()* 100) + item.properties[0].name}>{item.properties[0].name}</li>
                )
            })}
        </ul>
        <label>New Property for user </label>
        <br></br>
        <select>
        {takenProperties?.map((propertie)=>{
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
        </section>
    )
}

export default PropertiesCard;