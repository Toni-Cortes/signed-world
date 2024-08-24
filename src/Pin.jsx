
function Pin({pin}) {
  return (
    <div className="pin">
        <h3>{pin.name}</h3>
        <p>{pin.message}</p>
        <span>{pin.currentDate}</span>
    </div>
  )
}

export default Pin