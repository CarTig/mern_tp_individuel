import React, { useState , useEffect} from 'react';
import axios from "axios";


const Ads = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // Récupérer le token JWT

            const response = await axios.post(
                "http://localhost:8080/ads",
                formData,
                { headers: { Authorization: `Bearer ${token}` } } // Envoyer le token dans le header
            );

            setMessage(response.data.message);
            setFormData({ title: "", description: "", price: "" }); // Réinitialiser le formulaire
        } catch (error) {
            setMessage(error.response?.data?.message || "Erreur lors de la création de l'annonce");
        }
    };

    return (
        <div>
            <h1>Créer une annonce</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Titre de l'annonce"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Prix"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Créer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Ads;