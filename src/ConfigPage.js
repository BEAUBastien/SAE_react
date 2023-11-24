import React from 'react';
import { Link } from 'react-router-dom';


function ConfigPage() {
    return (
        <div>
            <h2>ConfigPage</h2>
            <form action="" method="get" class="form_config">
            <select name="nb_joueurs" id="nb_joueurs">
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <Link to='/game'>
                <input type="submit" value="Valider" />
            </Link>
            </form>

        </div>
    );
}

export default ConfigPage;