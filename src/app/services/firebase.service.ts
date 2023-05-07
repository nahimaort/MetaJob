import { Injectable } from '@angular/core';
import { getDatabase, ref, get, query, equalTo, child, orderByChild, orderByKey, push, set } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import initializeApp = firebase.initializeApp;
import { JobOffer } from '../models/JobOffer';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

   async getJobOffersByCompany(companyId: string) {
    const jobOffersRef = ref(db, `JobOffers/${companyId}`);
    const snapshot = await get(jobOffersRef);
    const jobOffers: JobOffer[] = [];
    snapshot.forEach((childSnapshot) => {
      jobOffers.push(childSnapshot.val());
    });
    return jobOffers;
  }

  async addJobOffer(userId: string, jobOffer: JobOffer) {
    const jobOfferRef = ref(db, `JobOffers/${userId}`);
    const newJobOfferRef = push(jobOfferRef);
    await set(newJobOfferRef, jobOffer);
  }
}

const app = initializeApp(environment.firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);


const jobOfferCollection = ref(db, 'JobOffers');

export async function getJobOffers(){
  return get(jobOfferCollection);
}

export async function getUserDataByUid(uid:string){
  const userRef = ref(db, `Users/${uid}`);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    const { isCompany, name, profileImage } = snapshot.val();
    return { isCompany, name, profileImage };
  } else {
    return null;
  }
}

export async function getImage(image:string){
  const imageRef = storageRef(storage, image);
  const url = await getDownloadURL(imageRef);
  return url;
}

export function userLogin(email: string, password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const userId = userCredential.user.uid;
        resolve(userId);
      })
      .catch(error => {
        reject(error);
      });
  });
}





