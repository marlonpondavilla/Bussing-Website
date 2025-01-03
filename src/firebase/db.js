import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, where, query, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { firebaseConfig } from '../services/firebaseConfig.js';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const usersCollection = collection(db, 'userLoggedIn');
const signedUpUsersCollection = collection(db, 'signedUpUsers');
const adminLoggedInCollection = collection(db, 'adminLoggedIn');
const scheduleCollection = collection(db, 'ScheduleDocuments');

// Function to add user to Firestore
export async function addUserToFirestore(userData) {
    try {
        const docRef = await addDoc(usersCollection, userData);
    } catch (e) {
        console.error('Error adding google user: ', e);
    }
}

// Function to add signed up user to Firestore
export async function addSignedUpUserToFirestore(signedUpUserData) {
    try{
        const docRef = await addDoc(signedUpUsersCollection, signedUpUserData);
    } catch(e){
        console.error('Error adding signup: ', e);
    }
}

// Function to add admin to Firestore
export async function addAdminToFirestore(adminData){
    try{
        const docRef = await addDoc(adminLoggedInCollection, adminData);
    } catch(e){
        console.error('Error adding admin: ', e);
    }
}

// add schedule to Firestore
export async function addScheduleToFirestore(scheduleData){
    try{
        const docRef = await addDoc(scheduleCollection, scheduleData);
    } catch(e){
        console.error('Error adding schedule: ', e);
    }
}

// function to retrieve data from Firestore
export async function getFirestoreData(collectionName) {
    try{
        const snapshot = await getDocs(collection(db, collectionName));
        if(snapshot.empty){
            return [];
        }
        return snapshot.docs.map(doc => doc.data());
    } catch(e){
        console.error('Error getting documents: ', e);
    }
}

// Function to check if busNo already exists
export async function checkBusNumberExists(busNo) {
    try {
        const q = query(collection(db, 'ScheduleDocuments'), where('busNo', '==', busNo));
        const snapshot = await getDocs(q);

        // Return true if busNo already exists
        return !snapshot.empty;
    } catch (e) {
        console.error('Error checking busNo: ', e);
        return false;
    }
}   

// Create a function to get a single document from Firestore where the document's busNo field matches the provided busNo
export async function getSingleSchedule(busNo) {
    try {

        const q = query(collection(db, 'ScheduleDocuments'), where('busNo', '==', busNo));

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;  
        }

        return snapshot.docs[0].data();

    } catch (e) {
        console.error('Error getting document: ', e);
        return null; 
    }
}

export async function updateSingleSchedule(busNo, updatedData){
    try{
        // query to find the document where busNo matches the provided busNo
        const q = query(collection(db, 'ScheduleDocuments' ), where('busNo', '==', busNo));

        const snapshot = await getDocs(q);

        // check if the document exists
        if(snapshot.empty){
            return;
        }

        // get the document reference
        const docRef = doc(db, 'ScheduleDocuments', snapshot.docs[0].id)

        // update the document
        await updateDoc(docRef, updatedData);
        
    } catch(e){
        console.error('Error updating document: ', e);
    }
}

