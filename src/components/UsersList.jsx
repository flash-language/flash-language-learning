import React, { useEffect, useState } from "react";
import axios from "axios";

const url = "https://flash-language-5bfe9-default-rtdb.europe-west1.firebasedatabase.app/users";

function fetchAllUsers() {
  return axios.get(`${url}.json`)
    .then((response) => {
      const data = response.data;
      const users = [];
      const loginJournal = {};


      for (const uid in data) {
        const userSessions = data[uid];
        
        loginJournal[uid] = [];

        for (const sessionId in userSessions) {
          const session = userSessions[sessionId];
          
          loginJournal[uid].push(session.lastLogin);

          // condition to avoid duplication
          if (!users.some(user => user.uid === session.uid)) {
            users.push({
              uid: session.uid,
              displayName: session.displayName || "Anonymous",
              email: session.email,
            });
          }
        }
      }

      return { users, loginJournal };
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      return { users: [], loginJournal: {} }; // empty objects in case of error
    });
}

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loginJournal, setLoginJournal] = useState({});

  useEffect(() => {
    function loadUsers() {
      fetchAllUsers().then(({ users, loginJournal }) => {
        setUsers(users);
        setLoginJournal(loginJournal);
      });
    }
    loadUsers();
  }, []);

  return (
    <div>
      <h2>Registered Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.displayName} ({user.email})
            <ul>
              {loginJournal[user.uid]?.map((login, idx) => (
                <li key={idx}>Last Login: {login}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
