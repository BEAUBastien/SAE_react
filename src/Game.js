import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database'
import firebaseConfig from './config'
import { DataSnapshot, getDatabase, onValue, ref, set, update, remove, get } from 'firebase/database';
import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

function Game() {
    let { pin } = useParams();
    const [deroulement, setDeroulement] = useState('');

    useEffect(() => {
        const db = getDatabase();
        const reference = ref(db, 'Partie'+pin+'/deroulement');
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            setDeroulement(data);
        });
    }, []);
    // var deroulement = data;
    return (
        <div class="main-container">
            {deroulement === 'att' && <Prepa partieId={pin} />}
            {/* {deroulement === 'start' && <Start partieId={pin} />} */}
            {deroulement === 'start' && <EffectuerVote partieId={pin} />}

            {deroulement === 'cupidon' && <Cupidon partieId={pin} />}
            {deroulement === 'voyante' && <Voyante partieId={pin} />}
            {deroulement === 'loup' && <Loups partieId={pin} />}
            {deroulement === 'sorciere' && <Sorciere partieId={pin} />}
            {deroulement === 'villageois' && <Jour partieId={pin} />}
            {deroulement === 'chasseur' && <Chasseur partieId={pin} />}
            {deroulement === 'maire' && <Maire partieId={pin} />}
            {deroulement === 'voteVillage' && <VoteVillage partieId={pin} />}
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



function Prepa({ partieId }){
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
    document.body.className = 'bcgroundN';
    setTimeout(() => {
        changeDeroulement(partieId, "cupidon");
        console.log("C’est la nuit, tout le village s’endort, les joueurs ferment les yeux");
        console.log("cc");
    }, 2000);

    return (
        <h1>C’est la nuit, tout le village s’endort, les joueurs ferment les yeux</h1>
    );
}

function Cupidon({ partieId }) {
    setTimeout(() => {
        changeDeroulement(partieId, "voyante");
        console.log("Cupidon se réveille !");
    }, 2000);

    return (
        <h1>Cupidon se réveille !</h1>
    );
}


function Voyante({ partieId }) {
    setTimeout(() => {
        changeDeroulement(partieId, "loup");
        console.log("La Voyante se réveille, et désigne un joueur dont elle veut sonder la véritable personnalité !");
    }, 2000);

    return (
        <h1>La Voyante se réveille, et désigne un joueur dont elle veut sonder la véritable personnalité !</h1>
    );
}

function Loups({ partieId }) {
    setTimeout(() => {
        changeDeroulement(partieId, "sorciere");
        console.log("Les Loups-Garous se réveillent, se reconnaissent et désignent une nouvelle victime !!!");
    }, 2000);

    return (
        <h1>Les Loups-Garous se réveillent, se reconnaissent et désignent une nouvelle victime !!!</h1>
    );
}

function Sorciere({ partieId }) {
    setTimeout(() => {
        changeDeroulement(partieId, "villageois"); //jour
        console.log("La Sorcière se réveille, je lui montre la victime des Loups-Garous. Va-t-elle user de sa potion de guérison, ou d’empoisonnement ?");
    }, 2000);

    return (
        <h1>La Sorcière se réveille, je lui montre la victime des Loups-Garous. Va-t-elle user de sa potion de guérison, ou d’empoisonnement ?</h1>
    );
}

function Jour({ partieId }) {
    document.body.className = 'bcgroundJ';
    setTimeout(() => {
        changeDeroulement(partieId, "chasseur");
        console.log("C’est le matin, le village se réveille, tout le monde se réveille et ouvre les yeux…");
    }, 2000);

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
    setTimeout(() => {
        changeDeroulement(partieId, "nuit");
        console.log("vote de la personne à tuer");
    }, 2000);

    return (
        <h1>vote de la personne à tuer</h1>
    );
}

function Nuit({ partieId }) {
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




function EffectuerVote({partieId}) {
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
                changeDeroulement(partieId, "Yo");
            }
        });

        return () => unsubscribe();
    }, [partieId]);

    return null; // La fonction ne renvoie rien pour le rendu
}









export default Game;