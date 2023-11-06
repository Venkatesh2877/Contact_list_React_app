import { useEffect, useState } from "react";
import "./styles.css";
import User from "./User";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  //fetch all the users when the page is loaded for the first time
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  //handle a post call and update the new user in the user state
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((json) => setUsers([...users, json]));
    setEmail("");
    setName("");
    setPhone("");
  };

  //handle a delete call and delete the user from user state
  const handleDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE"
    });
    const newusers = users.filter((user) => user.id !== id);
    setUsers(newusers);
  };

  //handle a put call and update the user state
  const handleSave = async (id, newname, newemail, newphone) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: newname,
        email: newemail,
        phone: newphone
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user.id === id) {
              return updatedUser;
            }
            return user;
          })
        );
      });
  };

  return (
    <div className="App">
      <h1>Here are the Contact List</h1>

      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          handleDelete={handleDelete}
          handleSave={handleSave}
        />
      ))}

      <form className="newUser" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter phone no"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
