import React, { useState, useEffect } from 'react'
import './Description.css'
import { useStateValue } from './StateProvider.js'

function Description(props){
    const [{job}, dispatch] = useStateValue()
    const [description, setDescription] = useState(job.description)

    useEffect(() => {
        props.save({type: 'description', description:description})
    }, [description])

    return(
        <div className="description">
            <br /><br />
            <div className="description__header">Description of Work</div>
            <textarea className="description__body"
                value={description}
                onChange={e => {setDescription(e.target.value)}}

            >
            </textarea>
        </div>
    )
}

export default Description;