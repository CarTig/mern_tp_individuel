import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero">
                <h1>Bienvenue sur le bon coin de la petite enfance</h1>
                <h2>Trouvez tout ce dont vous avez besoin pour vos enfants !</h2>
                <p>
                    Parents, particuliers et professionnels de la petite enfance, découvrez des bonnes affaires et des
                    articles de qualité pour vos bouts de choux. Vendez ou achetez des produits : jouets,
                    vêtements, équipements pour enfants, et plus encore !
                </p>
            </div>

            <div className="cta-section">
                <h3>Rejoignez notre communauté !</h3>
                <div className="cta-buttons">
                    <Link to="/register" className="cta-button">S'inscrire</Link>
                    <Link to="/ads" className="cta-button">Ajouter une annonce</Link>
                </div>
            </div>

            <div className="features">
                <div className="feature">
                    <h4>Acheter en toute confiance</h4>
                    <p>Découvrez des articles vérifiés et approuvés pour vos enfants.</p>
                </div>
                <div className="feature">
                    <h4>Vendre facilement</h4>
                    <p>Partagez vos objets inutilisés avec d'autres parents et professionnels.</p>
                </div>
                <div className="feature">
                    <h4>Un espace sécurisé</h4>
                    <p>Profitez d'une plateforme sûre pour effectuer vos achats et ventes.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
