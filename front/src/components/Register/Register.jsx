import React , {useState} from 'react';
import axios from "axios";
import { useNavigate} from "react-router-dom";


const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/register", formData);
            setMessage(response.data.message);
            localStorage.setItem("token", response.data.token); // Stocker le token dans localStorage

            navigate("/");
        } catch (error) {
            setMessage(error.response?.data?.message || "Erreur lors de l'inscription");
        }
    };

    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">S'inscrire</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};



export default Register;