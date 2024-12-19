const bcrypt = require("bcryptjs");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Vérifier si tous les champs sont présents
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs." });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà, veuillez vous connecter." });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Générer un token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "72h" });

        // Retourner une réponse avec le token
        res.status(201).json({ message: "Utilisateur créé avec succès", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si les champs sont remplis
        if (!email || !password) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs." });
        }

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Comparer le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        // Générer un token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Retourner le token et un message de succès
        res.status(200).json({ message: "🎉 Vous êtes connecté !", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};




const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        // Mettre à jour les champs autorisés
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: "Utilisateur mis à jour avec succès.", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur." });
    }
};



const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur." });
    }
};



const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // "moins" le password pour la sécurité
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
};



module.exports = {registerUser, loginUser, updateUser, deleteUser, getUsers };