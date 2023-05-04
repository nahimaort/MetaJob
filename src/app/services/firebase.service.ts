import { Injectable } from '@angular/core';
import { getDatabase, ref, get } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import initializeApp = firebase.initializeApp;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }
}

const app = initializeApp(environment.firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

const jobOfferCollection = ref(db, 'JobOffers');

export async function getJobOffers(){
  return get(jobOfferCollection);
}

export async function getJobOfferImage(image:string){
  const imageRef = storageRef(storage, image);
  const url = await getDownloadURL(imageRef);
  return url;
}



