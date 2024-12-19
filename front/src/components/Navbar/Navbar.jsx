import React from 'react';
import { Link} from "react-router-dom";


const Navbar = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Accueil</Link>
                    </li>

                    <li>
                        <Link to="/register">Inscription</Link>
                    </li>

                    <li>
                        <Link to="/login">Connexion</Link>
                    </li>

                    <li>
                        <Link to="/logout">Déconnexion</Link>
                    </li>

                    <li>
                        <Link to="/users">Utilisateurs</Link>
                    </li>
                    <li>
                        <Link to="/ads">Ajouter une annonce</Link>
                    </li>
                    <li>
                        <Link to="/adslist">Liste d'annonces</Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
};

export default Navbar;