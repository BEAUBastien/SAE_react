import React from 'react';
import { Link } from 'react-router-dom';

function LaunchPage() {
    return (
        <div class="main-container">
            <h1 id='Titre'>ROARRR !</h1>
            <div>
                <h3 id='bienvenue'>Bienvenue</h3>
                <Link to='/config'>
                    <button class="cartoon-button"type="button">Creer une partie</button>
                </Link>
            </div>
        </div>
    );
}

export default LaunchPage;