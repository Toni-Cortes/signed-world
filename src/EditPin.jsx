import axios from 'axios'
import {useState,useEffect} from 'react'



function EditPin({id, triggerRefresh, setIsEditing}) {
    
    const [name, setName] = useState("")
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [location, setLocation] = useState({ lat: null, lng: null });

    function handleClose(e){
        if (e.target === e.currentTarget) { 
        setIsEditing(false); 
        }
    }
    
    useEffect(() => {
      
        axios.get(`http://localhost:8000/messages/${id}`)
        .then((response) => {
            setName(response.data.name);
            console.log(name)
            setMessage(response.data.message);
            setLocation(response.data.location);
            setToken(response.data.token);
        })
        .catch(err => {
            console.log(err);
        });

    }, [id])

    function handleSubmit(e){

        e.preventDefault();

        let newPin = {
            name,
            message,
            token,
            location,
            currentDate: new Date().toLocaleString()
        }

        axios.put(`http://localhost:8000/messages/${id}`, newPin)
        .then(()=>{
            
            alert("Pin updated")
            triggerRefresh();
            setIsEditing(false);
            
        })
        .catch((err)=>{
            console.log(err)
        })

    }
    
    
  return (
    <div className='editPinContainer' onClick={handleClose}>
        <h2>Edit your pin</h2>
        <form className='editPinForm' onSubmit={handleSubmit}>
            <label>
                Name
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </label>
            <label>
                Message
                <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} />
            </label>

            
            <button>Save</button>
            <br />
            <p>Warning: Pin&apos;s date we&apos;ll be updated.</p>
        </form >
    </div>
  )
}

export default EditPin