import React from 'react';
import { useState , useEffect} from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/users", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            setMessage("Erreur lors de la récupération des utilisateurs.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setMessage("Utilisateur supprimé avec succès.");
            fetchUsers();
        } catch (error) {
            console.error(error);
            setMessage("Erreur lors de la suppression de l'utilisateur.");
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8080/users/${editingUser._id}`,
                { username: editingUser.username, email: editingUser.email },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setMessage(response.data.message);
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error(error);
            setMessage("Erreur lors de la mise à jour de l'utilisateur.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            {message && <p>{message}</p>}
            {editingUser ? (
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        value={editingUser.username}
                        onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                    />
                    <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                    <button type="submit">Mettre à jour</button>
                    <button type="button" onClick={() => setEditingUser(null)}>Annuler</button>
                </form>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            {user.username} ({user.email}){" "}
                            <button onClick={() => handleEdit(user)}>Modifier</button>
                            <button onClick={() => handleDelete(user._id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Users;