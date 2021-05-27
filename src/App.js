import React, { useEffect, useState } from 'react'

export default function App() {

  const [alert, setAlert] = useState(false);
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    if (users.length && !alert) {
      return;
    }
    fetch('https://main-user-no-k2iv646gtti1km8v-gtw.qovery.io/getUsers')
      .then(res => res.json())
      .then((res) => {
        setUsers(res);
      })
  }, [alert, users])

  function onChangeForm(e) {
    if (e.target.name === 'name') {
      user.name = e.target.value;
    }
    if (e.target.name === 'age') {
      user.age = e.target.value;
    }

    setUser(user)
  }

  function createUser() {
    fetch(`https://main-user-no-k2iv646gtti1km8v-gtw.qovery.io/addUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userDetails: user })
    }).then(res => res.json())
      .then((res) => {
        console.log('user added')
        handleButtonClick()
        setAlert(true);
      })
  }

  function renderAddForm() {
    return <>
      <input type="text" onChange={(e) => onChangeForm(e)} name="name" id="name" placeholder="Name" />
      <input type="number" onChange={(e) => onChangeForm(e)} name="age" id="age" placeholder="Age" />
      <button type="button" onClick={(e) => createUser()} className="btn btn-danger">Create User</button>
    </>
  }

  function handleButtonClick() {
    setShowAddForm(!showAddForm)
  }

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000)
    }
  }, [alert])

  return (
    <div className="App">
      <ul>
        {users.map((item, index) => {
          return <li key={`${item.name}-${index}}`}>Name: {item.name} <br></br> Age: {item.age}</li>
        })
        }
        <button onClick={handleButtonClick}>Add User</button>
        {showAddForm && renderAddForm()}
        {alert && <h2> Submit Successful</h2>}
      </ul>
    </div>
  );
}
