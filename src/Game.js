import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database'
import firebaseConfig from './config'
import { DataSnapshot, getDatabase, onValue, ref, set, update } from 'firebase/database';

function Game() {
    return (
        <div class="main-container">
            <h1 id='Titre'>ROARRR !</h1>
            <div>
                <h3 id='bienvenue'>Bienvenue</h3>
                {/* <h3>{data}</h3> */}
            </div>
        </div>
    );
}

function changeDeroulement(partieId, deroulement){
    const db = getDatabase();
    const reference = ref(db, 'Partie'+ partieId);

    // set(reference,{
    //     joueurs : joueurs,
    //     derroulement: derroulement,
    //     id : id,
    // });
    update(reference, {
        deroulement: deroulement,
    }); 
}
changeDeroulement("1","att"); 


const db = getDatabase();
const reference = ref(db, 'Partie1/deroulement');
onValue(reference,(snapshot)=>{
    const data = snapshot.val();
    console.log(data);
    // Game(data);
})


export default Game;