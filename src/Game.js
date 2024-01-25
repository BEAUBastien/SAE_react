import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database'
import firebaseConfig from './config'
import { DataSnapshot, getDatabase, onValue, ref, set, update, remove, get } from 'firebase/database';
import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import fourcheImage from './img/fourche.png';
import deadImage from './img/dead.png';

//audio
import rickAudio_start from './audio/rick_1.wav';
import rickAudio_voyante from './audio/rick_2.wav';
import rickAudio_loup from './audio/rick_3.wav';
import rickAudio_soricere from './audio/rick_4.wav';
import rickAudio_matin from './audio/rick_5.wav';
import rickAudio_vote from './audio/rick_6.wav';
import rickAudio_victoire_vill from './audio/rick_7.wav';
import rickAudio_victoire_loup from './audio/rick_8.wav';

function Game() {
    let { pin } = useParams();
    const [deroulement, setDeroulement] = useState('');

    useEffect(() => {
        const db = getDatabase();
        const reference = ref(db, 'Partie' + pin + '/deroulement');
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            setDeroulement(data);
        });
    }, []);
    // var deroulement = data;
    return (
        
        <div class="main-container">
            <div class="main-container-card"><Card partieId={pin} /></div>
            <div class="main-container-deroule">
            {deroulement === 'att' && <Prepa partieId={pin} />}
            {deroulement === 'start' && <Start partieId={pin} />}

            {/* {deroulement === 'loup' && <EffectuerVote partieId={pin} />} */}

            {deroulement === 'cupidon' && <Cupidon partieId={pin} />}
            {deroulement === 'voyante' && <Voyante partieId={pin} />}
            {deroulement === 'loup' && <Loups partieId={pin} />}
            {deroulement === 'sorciere' && <Sorciere partieId={pin} />}
            {deroulement === 'passageJour' && <PassageJour partieId={pin} />}
            {deroulement === 'victoireLoup' && <VictoireLoup partieId={pin} />}
            {deroulement === 'jour' && <Jour partieId={pin} />}
            {deroulement === 'chasseur' && <Chasseur partieId={pin} />}
            {deroulement === 'maire' && <Maire partieId={pin} />}
            {deroulement === 'villageois' && <VoteVillage partieId={pin} />}
            {deroulement === 'passageNuit' && <PassageNuit partieId={pin} />}
            {deroulement === 'villageoisWin' && <VictoireVillageois partieId={pin} />}
            {deroulement === 'nuit' && <Nuit partieId={pin} />}



            {/* {deroulement === 'start' && <Start />}
            {deroulement === 'cupidon' && <Cupidon />}
            {deroulement === 'voyante' && joueur.role === 'voyante' && joueur.etat === 'vivant' && <Voyante />}
            {deroulement === 'loup' && <Loups />}
            {deroulement === 'sorciere' && joueur.role === 'sorciere' && joueur.etat === 'vivant' ? <Sorciere /> : (deroulement = 'jour')}
            {deroulement === 'jour' && joueur.role !== 'loup' && joueur.etat === 'vivant' ? <Jour /> : (deroulement = 'winLoup')}
            {(deroulement === 'winLoup' || joueur.role !== 'loup' && joueur.etat === 'vivant' === 0) && <WinLoup />}
            {joueur.role === 'loup' && joueur.etat === 'vivant' === 0 && <WinVillageois />}
            {deroulement === 'chasseur' && <Chasseur />}
            {deroulement === 'maire' && <Maire />}
            {deroulement === 'voteVillage' && <VoteVillage />}
            {deroulement === 'nuit' && <Nuit />} */}
            </div>
        </div>
    );
}

function changeDeroulement(partieId, deroulement) {
    const db = getDatabase();
    const reference = ref(db, 'Partie' + partieId);

    // set(reference,{
    //     joueurs : joueurs,
    //     derroulement: derroulement,
    //     id : id,
    // });
    update(reference, {
        deroulement: deroulement,
    });
}

function changeEtat(partieId, joueur, etat) {
    const db = getDatabase();
    const reference = ref(db, 'Partie' + partieId + '/Joueurs/' + joueur);

    update(reference, {
        etat: etat,
    });
}



const db = getDatabase();
const reference = ref(db, 'Partie1/deroulement');
onValue(reference, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    // Game(data);
})



function Prepa({ partieId }) {
    const db = getDatabase();
    const joueurRef = ref(db, 'Partie' + partieId + '/Joueurs/Joueur1');

    remove(joueurRef)
        .then(() => {
            console.log("Joueur supprimé avec succès.");
        })
        .catch((error) => {
            console.log("Erreur lors de la suppression du joueur: ", error);
        });

    changeDeroulement(partieId, "start");
}





function Start({ partieId }) {

    const audio = new Audio(rickAudio_start);
    audio.play();
    
    document.body.className = 'bcgroundN';
    setTimeout(() => {
        changeDeroulement(partieId, "cupidon");
        console.log("C’est la nuit, tout le village s’endort, les joueurs ferment les yeux");
        console.log("cc");
    }, 20000);

    return (
        <h1>C’est la nuit, tout le village s’endort, les joueurs ferment les yeux</h1>
    );
}

function Cupidon({ partieId }) {
    setTimeout(() => {
        changeDeroulement(partieId, "voyante");
        console.log("Cupidon se réveille !");
    }, 20000);

    return (
        <h1>Cupidon se réveille !</h1>
    );
}


function Voyante({ partieId }) {
    const audio = new Audio(rickAudio_voyante);
    audio.play();

    setTimeout(() => {
        changeDeroulement(partieId, "loup");
        console.log("La Voyante se réveille, et désigne un joueur dont elle veut sonder la véritable personnalité !");
    }, 120000);

    return (
        <h1>La Voyante se réveille, et désigne un joueur dont elle veut sonder la véritable personnalité !</h1>
    );
}

// function Loups({ partieId }) {
//     EffectuerVoteLoup(partieId);
//     setTimeout(() => {
//         changeDeroulement(partieId, "sorciere");
//         console.log("Les Loups-Garous se réveillent, se reconnaissent et désignent une nouvelle victime !!!");
//     }, 120000);

//     return (
//         <h1>Les Loups-Garous se réveillent, se reconnaissent et désignent une nouvelle victime !!!</h1>
//     );
// }


function Loups({ partieId }) {
    const audio = new Audio(rickAudio_loup);
    audio.play();
    const [timer, setTimer] = useState(45); // Initialiser le timer à 45 secondes
    EffectuerVoteLoup(partieId);
    useEffect(() => {
        // Si le timer est à 0, passer à l'étape suivante
        if (timer === 0) {
            changeDeroulement(partieId, "sorciere");
            console.log("Les Loups-Garous se réveillent, se reconnaissent et désignent une nouvelle victime !!!");
            return;
        }

        // Décrémenter le timer chaque seconde
        const timerId = setTimeout(() => {
            setTimer(timer - 1);
        }, 120000);

        // Nettoyer le timeout lors du démontage du composant
        return () => clearTimeout(timerId);
    }, [timer, partieId]);

    return (
        <div>
            <h1>Les Loups-Garous se réveillent, se reconnaissent et désignent une nouvelle victime !!!</h1>
            <p>Temps restant: {timer} secondes</p>
        </div>
    );
}

function Sorciere({ partieId }) {
    const audio4 = new Audio(rickAudio_soricere);
    audio4.play();
    setTimeout(() => {
        changeDeroulement(partieId, "passageJour"); 
        console.log("La Sorcière se réveille, je lui montre la victime des Loups-Garous. Va-t-elle user de sa potion de guérison, ou d’empoisonnement ?");
    }, 20000);

    return (
        <h1>La Sorcière se réveille, je lui montre la victime des Loups-Garous. Va-t-elle user de sa potion de guérison, ou d’empoisonnement ?</h1>
    );
}

function VictoireLoup({ partieId }) {
    setTimeout(() => {
        changeDeroulement(partieId, "fin");
    }, 20000);

    return (
        <h1>Les loups ont gagnées</h1>
    );
}

function Jour({ partieId }) {
    const audio = new Audio(rickAudio_matin);
    audio.play();
    document.body.className = 'bcgroundJ';
    setTimeout(() => {
        changeDeroulement(partieId, "villageois");
    }, 20000);

    return (
        <h1>C’est le matin, le village se réveille, tout le monde se réveille et ouvre les yeux…</h1>
    );
}

function Chasseur({ partieId }) {
    setTimeout(() => {
        changeDeroulement(partieId, "maire");
        console.log("Le chasseur joue");
    }, 2000);

    return (
        <h1>Le chasseur joue</h1>
    );
}

function Maire({ partieId }) {
    setTimeout(() => {
        changeDeroulement(partieId, "voteVillage");
        console.log("vote du nouveau maire");
    }, 2000);

    return (
        <h1>vote du nouveau maire</h1>
    );
}

function VoteVillage({ partieId }) {
    const audio = new Audio(rickAudio_vote);
    audio.play();
    EffectuerVoteVillageois(partieId);
    setTimeout(() => {
        changeDeroulement(partieId, "passageNuit");
        console.log("vote de la personne à tuer");
    }, 120000);

    return (
        <h1>Le village doit maintenant choisir qui tuer !</h1>
    );
}

function VictoireVillageois({ partieId }) {
    const audio = new Audio(rickAudio_victoire_vill);
    audio.play();
    setTimeout(() => {
        changeDeroulement(partieId, "fin");
    }, 20000);

    return (
        <h1>Les villageois ont gagnées</h1>
    );
}

function Nuit({ partieId }) {

    const audio = new Audio(rickAudio_start);
    audio.play();
    document.body.className = 'bcgroundN';
    setTimeout(() => {
        changeDeroulement(partieId, "voyante");
        console.log("Cupidon se réveille !");
    }, 2000);
    console.log("C’est la nuit, tout le village s’endort, les joueurs ferment les yeux");
    return (
        <h1>
            C’est la nuit, tout le village s’endort, les joueurs ferment les yeux
        </h1>
    );
}




function EffectuerVoteLoup( partieId ) {
    const db = getDatabase();
    const joueursRef = ref(db, 'Partie' + partieId + '/Joueurs');

    useEffect(() => {
        const unsubscribe = onValue(joueursRef, (snapshot) => {
            const joueurs = snapshot.val();
            const loupsVivants = Object.values(joueurs).filter(j => j.role === 'loup' && j.etat === 'vivant').length;

            let totalVotes = 0;
            let maxVotes = 0;
            let candidats = [];

            // Calculer le total des votes
            Object.entries(joueurs).forEach(([key, joueur]) => {
                totalVotes += joueur.vote;

                if (joueur.vote > maxVotes) {
                    maxVotes = joueur.vote;
                    candidats = [key];
                } else if (joueur.vote === maxVotes) {
                    candidats.push(key);
                }
            });

            if (totalVotes === loupsVivants) {
                const selectionne = candidats[Math.floor(Math.random() * candidats.length)];
                console.log(selectionne);
                changeEtat(partieId, selectionne, "presqueMort");

                // Réinitialiser les votes
                const updates = {};
                Object.keys(joueurs).forEach(joueurKey => {
                    updates[`Joueurs/${joueurKey}/vote`] = 0;
                    updates[`Joueurs/${joueurKey}/votePoster`] = false;
                });

                update(ref(db, 'Partie' + partieId), updates)
                    .then(() => {
                        changeDeroulement(partieId, "sorciere");
                    })
                    .catch(error => {
                        console.error('Erreur lors de la réinitialisation des votes:', error);
                    });
            }
        });

        return () => unsubscribe();
    }, [partieId]);

    return null; // La fonction ne renvoie rien pour le rendu
}

function PassageJour({partieId}) {
    console.log("PassageJour");
    const db = getDatabase();
    const partieRef = ref(db, 'Partie' + partieId);

    useEffect(() => {
        const unsubscribe = onValue(partieRef, (snapshot) => {
            const partieData = snapshot.val();
            const joueurs = partieData.Joueurs;
            const updates = {};

            // Mise à jour des états des joueurs
            Object.entries(joueurs).forEach(([key, joueur]) => {
                if (joueur.etat === 'presqueMort') {
                    updates[`Joueurs/${key}/etat`] = 'mort';
                }
            });

            // Appliquer les mises à jour
            update(ref(db, 'Partie' + partieId), updates).then(() => {
                const joueursMisAJour = { ...joueurs, ...updates };

                // Vérifier les conditions de victoire
                const joueursVivants = Object.values(joueursMisAJour).filter(joueur => joueur.etat === 'vivant');
                const sontTousLoups = joueursVivants.every(joueur => joueur.role === 'loup');

                const nouvelEtatDeroulement = sontTousLoups ? 'victoireLoup' : 'jour';
                update(ref(db, 'Partie' + partieId), { deroulement: nouvelEtatDeroulement });
            }).catch(error => {
                console.error('Erreur lors de la mise à jour des états des joueurs:', error);
            });
        });

        return () => unsubscribe();
    }, [partieId]);

    return null; // La fonction ne renvoie rien pour le rendu
}


function EffectuerVoteVillageois(partieId) {
    const db = getDatabase();
    const joueursRef = ref(db, 'Partie' + partieId + '/Joueurs');

    useEffect(() => {
        const unsubscribe = onValue(joueursRef, (snapshot) => {
            const joueurs = snapshot.val();
            const joueursVivants = Object.values(joueurs).filter(j => j.etat === 'vivant').length;

            let totalVotes = 0;
            let maxVotes = 0;
            let candidats = [];

            // Calculer le total des votes
            Object.entries(joueurs).forEach(([key, joueur]) => {
                totalVotes += joueur.vote;

                if (joueur.vote > maxVotes) {
                    maxVotes = joueur.vote;
                    candidats = [key];
                } else if (joueur.vote === maxVotes) {
                    candidats.push(key);
                }
            });

            if (totalVotes === joueursVivants) {
                const selectionne = candidats[Math.floor(Math.random() * candidats.length)];
                console.log(selectionne);
                changeEtat(partieId, selectionne, "presqueMort");

                // Réinitialiser les votes et votePoster
                const updates = {};
                Object.keys(joueurs).forEach(joueurKey => {
                    updates[`Joueurs/${joueurKey}/vote`] = 0;
                    updates[`Joueurs/${joueurKey}/votePoster`] = false;
                });

                update(ref(db, 'Partie' + partieId), updates)
                    .then(() => {
                        changeDeroulement(partieId, "passageNuit"); 
                    })
                    .catch(error => {
                        console.error('Erreur lors de la réinitialisation des votes:', error);
                    });
            }
        });

        return () => unsubscribe();
    }, [partieId]);

    return null; 
}

function PassageNuit({partieId}) {
    const db = getDatabase();
    const partieRef = ref(db, 'Partie' + partieId);

    useEffect(() => {
        const unsubscribe = onValue(partieRef, (snapshot) => {
            const partieData = snapshot.val();
            const joueurs = partieData.Joueurs;
            const updates = {};

            // Mise à jour des états des joueurs de "presqueMort" à "mort"
            Object.entries(joueurs).forEach(([key, joueur]) => {
                if (joueur.etat === 'presqueMort') {
                    updates[`Joueurs/${key}/etat`] = 'mort';
                }
            });

            update(ref(db, 'Partie' + partieId), updates).then(() => {
                const joueursMisAJour = { ...joueurs, ...updates };
                const loupsVivants = Object.values(joueursMisAJour).filter(joueur => joueur.role === 'loup' && joueur.etat === 'vivant').length;

                // Vérifier s'il reste des loups vivants
                const nouvelEtatDeroulement = loupsVivants === 0 ? 'villageoisWin' : 'nuit';
                update(ref(db, 'Partie' + partieId), { deroulement: nouvelEtatDeroulement });
            }).catch(error => {
                console.error('Erreur lors de la mise à jour des états des joueurs:', error);
            });
        });

        return () => unsubscribe();
    }, [partieId]);

    return null; // La fonction ne renvoie rien pour le rendu
}





function Card({ partieId }) {
    const [joueurs, setJoueurs] = useState([]);
    const [columnCount, setColumnCount] = useState(3);

    useEffect(() => {
        const db = getDatabase();
        const joueursRef = ref(db, 'Partie' + partieId + '/Joueurs');
        onValue(joueursRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const joueursArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                }));
                setJoueurs(joueursArray);
                const cols = Math.ceil(joueursArray.length / 2);
                setColumnCount(cols);
            } else {
                setJoueurs([]);
            }
        });
    }, [partieId]);

    const gridStyle = {
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`
    };

    return (
        <div className="card">
            <div className="grid_card" style={gridStyle}>
                {joueurs.map(joueur => (
                    <div
                        key={joueur.id}
                        className={`square ${joueur.etat === 'mort' ? 'dead' : ''}`}
                    >
                        <p>{joueur.pseudo}</p>
                        <div className={`icon-card ${joueur.etat === 'mort' ? 'dead' : ''}`}>
                            <img 
                                className="icones" 
                                src={joueur.etat === 'mort' ? deadImage : fourcheImage}
                                alt={joueur.etat}
                            />
                        </div>
                        <p>{joueur.etat === 'mort' ? 'Mort' : 'En vie'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}







export default Game;