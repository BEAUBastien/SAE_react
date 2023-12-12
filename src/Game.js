import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database'
import firebaseConfig from './config'
import { DataSnapshot, getDatabase, onValue, ref, set, update } from 'firebase/database';
import { useState, useEffect } from 'react';

function Game() {
    const [deroulement, setDeroulement] = useState('');

    useEffect(() => {
        const db = getDatabase();
        const reference = ref(db, 'Partie1/deroulement');
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            setDeroulement(data);
        });
    }, []);
    // var deroulement = data;
    return (
        <div class="main-container">
            {deroulement === 'start' && <Start />}
            {deroulement === 'cupidon' && <Cupidon />}
            {deroulement === 'voyante' && <Voyante />}
            {deroulement === 'loup' && <Loups />}
            {deroulement === 'sorciere' && <Sorciere />}
            {deroulement === 'jour' && <Jour />}
            {deroulement === 'chasseur' && <Chasseur />}
            {deroulement === 'maire' && <Maire />}
            {deroulement === 'voteVillage' && <VoteVillage />}
            {deroulement === 'nuit' && <Nuit />}



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
// changeDeroulement("1", "att");


const db = getDatabase();
const reference = ref(db, 'Partie1/deroulement');
onValue(reference, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    // Game(data);
})









function Start() {
    setTimeout(() => {
        changeDeroulement("1", "cupidon");
        console.log("C’est la nuit, tout le village s’endort, les joueurs ferment les yeux");
        console.log("cc");
    }, 2000);

    return (
        <h1>C’est la nuit, tout le village s’endort, les joueurs ferment les yeux</h1>
    );
}

function Cupidon() {
    setTimeout(() => {
        changeDeroulement("1", "voyante");
        console.log("Cupidon se réveille !");
    }, 2000);

    return (
        <h1>Cupidon se réveille !</h1>
    );
}


function Voyante() {
    setTimeout(() => {
        changeDeroulement("1", "loup");
        console.log("La Voyante se réveille, et désigne un joueur dont elle veut sonder la véritable personnalité !");
    }, 2000);

    return (
        <h1>La Voyante se réveille, et désigne un joueur dont elle veut sonder la véritable personnalité !</h1>
    );
}

function Loups() {
    setTimeout(() => {
        changeDeroulement("1", "sorciere");
        console.log("Les Loups-Garous se réveillent, se reconnaissent et désignent une nouvelle victime !!!");
    }, 2000);

    return (
        <h1>Les Loups-Garous se réveillent, se reconnaissent et désignent une nouvelle victime !!!</h1>
    );
}

function Sorciere() {
    setTimeout(() => {
        changeDeroulement("1", "jour");
        console.log("La Sorcière se réveille, je lui montre la victime des Loups-Garous. Va-t-elle user de sa potion de guérison, ou d’empoisonnement ?");
    }, 2000);

    return (
        <h1>La Sorcière se réveille, je lui montre la victime des Loups-Garous. Va-t-elle user de sa potion de guérison, ou d’empoisonnement ?</h1>
    );
}

function Jour() {
    setTimeout(() => {
        changeDeroulement("1", "chasseur");
        console.log("C’est le matin, le village se réveille, tout le monde se réveille et ouvre les yeux…");
    }, 2000);

    return (
        <h1>C’est le matin, le village se réveille, tout le monde se réveille et ouvre les yeux…</h1>
    );
}

function Chasseur() {
    setTimeout(() => {
        changeDeroulement("1", "maire");
        console.log("Le chasseur joue");
    }, 2000);

    return (
        <h1>Le chasseur joue</h1>
    );
}

function Maire() {
    setTimeout(() => {
        changeDeroulement("1", "voteVillage");
        console.log("vote du nouveau maire");
    }, 2000);

    return (
        <h1>vote du nouveau maire</h1>
    );
}

function VoteVillage() {
    setTimeout(() => {
        changeDeroulement("1", "nuit");
        console.log("vote de la personne à tuer");
    }, 2000);

    return (
        <h1>vote de la personne à tuer</h1>
    );
}

function Nuit() {
    setTimeout(() => {
        changeDeroulement("1", "voyante");
        console.log("Cupidon se réveille !");
    }, 2000);
    console.log("C’est la nuit, tout le village s’endort, les joueurs ferment les yeux");
    return (
        <h1>
            C’est la nuit, tout le village s’endort, les joueurs ferment les yeux
        </h1>
    );
}







export default Game;