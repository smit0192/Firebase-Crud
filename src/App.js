import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { db } from "./firebase-config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from "react-loader-spinner";
import Loaderimage from "./plan.gif";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
    getUsers();
    setNewName("");
    setNewAge(0);
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: parseInt(age) + 1 };
    await updateDoc(userDoc, newFields);
    getUsers();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  const getUsers = useCallback(async () => {
    setIsLoading(true);
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
    console.log(data.docs);
  }, []);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isLoading) {
    return (
      <center>
        <div>
          <img src={Loaderimage} alt="Loading..." />
        </div>
      </center>
      // <center>
      //   <Loader
      //     type="Puff"
      //     color="#00BFFF"
      //     height={100}
      //     width={100}
      //     timeout={3000} //3 secs
      //   />
      // </center>
    );
  }

  return (
    <div className="App">
      <input
        placeholder="Name..."
        value={newName}
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        value={newAge}
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user, index) => (
        <div key={index}>
          <h1>name:{user.name}</h1>
          <h1>age:{user.age}</h1>
          <button
            onClick={() => {
              updateUser(user.id, user.age);
            }}
          >
            Increase Age
          </button>
          <button
            onClick={() => {
              deleteUser(user.id);
            }}
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
}
export default App;
