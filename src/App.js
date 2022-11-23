import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios.get("/users").then((response) => {
      console.log(response.data);
      setUsers(
        <div class="row">
          {response.data._embedded.users.map((user) => (
            <div key={user} id="userid">
            <p>{user.username}  {user.nickname}</p>
            </div>
          ))}
        </div>
      );
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
      <div class="container">
      <h2>Users list</h2>
        <hr class="solid" />
        {users}
      </div>
      </header>
    </div>
  );
}

export default App;
