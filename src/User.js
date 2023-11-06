import { useState } from "react";

export default function User({ user, handleDelete, handleSave }) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleEdit = (id) => {
    setEditMode(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(user.id, name, email, phone);
    setEditMode(false);
  };
  return !editMode ? (
    <div className="user">
      <div className="user-detail">
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Phone: {user.phone}</div>
      </div>

      <div>
        <span onClick={() => handleEdit(user.id)}>
          <i className="fa-solid fa-pencil"></i>
        </span>
        <span onClick={() => handleDelete(user.id)}>
          <i className="fa-solid fa-trash"></i>
        </span>
      </div>
    </div>
  ) : (
    <form className="oldUsers" onSubmit={handleSubmit}>
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

      <button type="submit">Save</button>
    </form>
  );
}
