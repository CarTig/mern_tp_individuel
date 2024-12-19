import React , { useState, useEffect} from "react";
import axios from "axios";


const AdsList = () => {
    const [ads, setAds] = useState([]);
    const [editingAd, setEditingAd] = useState(null);
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        price: "",
    });

    // Fonction pour récupérer les annonces
    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await axios.get("http://localhost:8080/adslist", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setAds(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des annonces", error);
            }
        };

        fetchAds();
    }, []);

    // Fonction pour supprimer
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/ads/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setAds(ads.filter((ad) => ad._id !== id)); // Supprimer l'annonce de la liste
        } catch (error) {
            console.error("Erreur lors de la suppression de l'annonce", error);
        }
    };

    // Fonction pour éditer
    const handleEditClick = (ad) => {
        setEditingAd(ad._id);
        setEditForm({
            title: ad.title,
            description: ad.description,
            price: ad.price,
        });
    };

    // Fonction pour mettre à jour une annonce
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8080/ads/${editingAd}`,
                editForm,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setAds(
                ads.map((ad) =>
                    ad._id === editingAd
                        ? { ...ad, ...editForm }
                        : ad
                )
            );
            setEditingAd(null); // Fermer le formulaire d'édition
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'annonce", error);
        }
    };

    return (
        <div>
            <h1>Liste des annonces</h1>
            <ul>
                {ads.map((ad) => (
                    <li key={ad._id}>
                        <h3>{ad.title}</h3>
                        <p>{ad.description}</p>
                        <p>{ad.price} €</p>
                        <p>Auteur : {ad.author.username}</p>
                        <button onClick={() => handleEditClick(ad)}>Éditer</button>
                        <button onClick={() => handleDelete(ad._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            {editingAd && (
                <div>
                    <h2>Modifier l'annonce</h2>
                    <form onSubmit={handleEditSubmit}>
                        <input
                            type="text"
                            placeholder="Titre"
                            value={editForm.title}
                            onChange={(e) =>
                                setEditForm({ ...editForm, title: e.target.value })
                            }
                        />
                        <textarea
                            placeholder="Description"
                            value={editForm.description}
                            onChange={(e) =>
                                setEditForm({ ...editForm, description: e.target.value })
                            }
                        ></textarea>
                        <input
                            type="number"
                            placeholder="Prix"
                            value={editForm.price}
                            onChange={(e) =>
                                setEditForm({ ...editForm, price: e.target.value })
                            }
                        />
                        <button type="submit">Sauvegarder</button>
                        <button onClick={() => setEditingAd(null)}>Annuler</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdsList;