import React, {useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])
  const getData = async() => {
    const res = await axios.get('/api/users')
    setUsers(res.data)

    const res2 = await axios.get('/api/events')
    setEvents(res2.data)
  }

  useEffect(() => {
    getData()
  }, [])
 
  return (
    <div>
      {users.map(u => <h4 key={u._id}>userName : {u.userName}</h4>)}

      {events.map(u => <h4 key={u._id}>eventName : {u.title}</h4>)}

    </div>

    
  )
}

export default App