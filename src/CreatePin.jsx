import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';



function CreatePin() {

    const [name, setName] = useState("")
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [location, setLocation] = useState({ lat: null, lng: null });

    

    const navigate = useNavigate()

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (err) => {
                    console.log(err.message);
                }
            );
        } else {
            alert("Please allow location on browser settings");
            navigate('/')
        }

        
(
        
    }, []);

    function handleSubmit(e) {
        e.preventDefault()
        
        if ((navigator.geolocation)&&(location.lat)&&(location.lng)){

        if ((name!='')&&(message!='')&&(token!='')) {
            let newPin = {
                name,
                message,
                token,
                location,
                currentDate: new Date().toLocaleString()
            }

            axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}messages`, newPin)
                .then(() => {
                    alert("Congrats you created a Pin")
                    navigate('/')

                })
                .catch((err) => { console.log(err) })
        } else {
            alert('Information incomplete')
        }

    }else {
        alert("Please allow location on browser settings");
        navigate('/')
    }
}

    return (
        <div>
            
            <h1 style={{ color: 'white', fontFamily: 'Unna', marginTop: '40px' }}>Create your <span style={{ color: '#697da8' }}>Pin</span></h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <h3>Name</h3>
                        <p>The name you want to be displayed as the author of your mesage.<br /> (Ex. Anonymous)</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <h3>Message</h3>
                        <p>This is the message that will pop when clicking your pin.<br /> (500 characters max.)</p>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <h3>Token</h3>
                        <p>Your token is what you will use to delete, edit or view your pins. Similar to a password. Do not forget it.  </p>
                        <div className='tokenDiv'>
                            <button type='button' className='generateButton' onClick={() => setToken(uuidv4())}>
                                Generate
                            </button>
                            <input
                                type="text"
                                value={token}
                                // readOnly
                                onChange={(e) => setToken(e.target.value)}
                            />
                            <button className='generateButton' type='button' onClick={() => {
                                navigator.clipboard.writeText(token);
                                alert('Text copied to clipboard!');
                            }}>
                                Copy
                            </button>
                        </div>

                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
            <button className='backButton' onClick={()=>navigate('/')} style={{margin:'40px auto'}}>←</button>
        </div>
    )
}

export default CreatePin