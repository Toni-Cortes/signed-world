import { useState } from "react";
import Pins from "./Pins";
import EditPin from "./EditPin";


function EditPins() {

  const [userToken, setUserToken] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [refresh, setRefresh] = useState(false);

  const [editId, setEditId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);


  function handleSubmit(e) {

    e.preventDefault()
    setUserToken(inputValue);
    triggerRefresh();

  }

  function triggerRefresh() {
    console.log("Trigger being called")
    setRefresh(refresh ? false : true)
  }


  return (
    <div className="editPin">
      <form onSubmit={handleSubmit}>
        <label>
          <h1>Introduce your <span>Token</span></h1>
          <input type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} />



        </label>
        <button>Get Pins</button>
      </form>

      <Pins
 
        setIsEditing={setIsEditing}
        setEditId={setEditId}
        refresh={refresh}
        token={userToken}
        triggerRefresh={triggerRefresh}>

      </Pins>

      {isEditing && (
        <EditPin id = {editId} setIsEditing={setIsEditing} /* setRefresh={setRefresh} */ triggerRefresh={triggerRefresh}></EditPin>
      )}

    </div>
  )
}

export default EditPins