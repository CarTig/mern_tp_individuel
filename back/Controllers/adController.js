const Ad = require("../Models/adModel")

const createAd = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        // Vérification des champs
        if (!title || !description || !price) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs." });
        }

        // Récupérer l'ID de l'utilisateur à partir du token JWT (middleware)
        const userId = req.user.id;

        // Créer une nouvelle annonce
        const newAd = new Ad({
            title,
            description,
            price,
            author: userId
        });

        await newAd.save();

        res.status(201).json({ message: "Annonce créée !", ad: newAd });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'annonce" });
    }
};


const updateAd = async (req, res) => {
    try {
        const { id } = req.params; // L'ID de l'annonce que l'on veut modifier
        const { title, description, price, category } = req.body; // Les champs à mettre à jour

        // Vérifier si l'annonce existe
        const ad = await Ad.findById(id);
        if (!ad) {
            return res.status(404).json({ message: "Annonce non trouvée" });
        }

        // Vérifier si l'utilisateur connecté est bien l'auteur de l'annonce
        if (ad.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier cette annonce" });
        }

        // Mettre à jour les champs de l'annonce
        ad.title = title || ad.title;
        ad.description = description || ad.description;
        ad.price = price || ad.price;


        await ad.save(); // Sauvegarder les modifications dans la base de données

        res.status(200).json({ message: "Annonce mise à jour avec succès", ad });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};


const deleteAd = async (req, res) => {
    try {
        const { id } = req.params; // L'ID de l'annonce que l'on veut supprimer

        // Vérifier si l'annonce existe
        const ad = await Ad.findById(id);
        if (!ad) {
            return res.status(404).json({ message: "Annonce non trouvée" });
        }

        // Vérifier si l'utilisateur connecté est bien l'auteur de l'annonce
        if (ad.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cette annonce" });
        }

        // Supprimer l'annonce
        await ad.remove();

        res.status(200).json({ message: "Annonce supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};


const getAds = async (req, res) => {
    try {
        // Récupérer toutes les annonces
        const ads = await Ad.find().populate('author', 'username'); // On peut peupler le champ `author` pour afficher le nom de l'utilisateur

        res.status(200).json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};



module.exports = { createAd , updateAd, deleteAd , getAds };