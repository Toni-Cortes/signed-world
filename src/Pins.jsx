import Pin from "./Pin"
import axios from 'axios'
import { useState, useEffect } from 'react'


function Pins({token, refresh, triggerRefresh, setIsEditing, setEditId}) {

    

    const [pins, setPins] = useState([]);

    useEffect(() => {
        if (token) { 
            axios.get(`http://localhost:8000/messages?token=${token}`)
                .then((response) => {
                    setPins(response.data);
                    console.log('Pins fetched:', response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [token, refresh]);

    function deletePins(id){
        axios.delete(`http://localhost:8000/messages/${id}`)
        .then(() => {
            console.log("in .then()")
            triggerRefresh();
        })
        .catch(err => {
            console.log(err);
        });
    }

    function editPin(pinId){
        setEditId(pinId)
        setIsEditing(true)

    }
    return (
        <div className="pins">
            <h1>Your Pins</h1>
            {pins &&
                (
                    pins.map((onePin) => {
                        return (
                            
                            <div key={onePin.id} className="pinContainer">
                                <Pin pin={onePin}></Pin>

                                <div className="pinButtons">
                                    <button onClick={()=>{deletePins(onePin.id)}}>Delete</button>
                                    <button onClick={()=>{editPin(onePin.id)}}>Edit</button>
                               </div>

                            </div>
                        )
                    })
                )
            }

        </div>
    )
}

export default Pins