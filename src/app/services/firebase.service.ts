import { Injectable } from '@angular/core';
import { getDatabase, ref, get, push, set, query, orderByKey, orderByChild, equalTo, child, remove } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { JobOffer } from '../models/JobOffer';
import { JobApplication } from '../models/JobApplication';
import { v4 as uuidv4 } from 'uuid';

import initializeApp = firebase.initializeApp;

const app = initializeApp(environment.firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

   async getJobOffers() {
    const jobOffersRef = ref(db, "JobOffers");
    const snapshot = await get(jobOffersRef);
    const jobOffers: JobOffer[] = [];
    snapshot.forEach((companySnapshot) => {
      companySnapshot.forEach((jobOfferSnapshot) => {
        const jobOffer = jobOfferSnapshot.val();
        const key = jobOfferSnapshot.key;
        jobOffers.push(Object.assign({}, jobOffer, { key }));
      });
    });
    return jobOffers;
  }

  async getJobOffersByCompany(companyId: string) {
    const jobOffersRef = ref(db, `JobOffers/${companyId}`);
    const snapshot = await get(jobOffersRef);
    const jobOffers: JobOffer[] = [];
    snapshot.forEach((jobOfferSnapshot) => {
      const jobOffer = jobOfferSnapshot.val();
      const key = jobOfferSnapshot.key;
      jobOffers.push(Object.assign({}, jobOffer, { key }));

    });
    return jobOffers;
  }
  
   async getUserDataByUid(uid:string){
    const userRef = ref(db, `Users/${uid}`);
    const snapshot = await get(userRef);
  
    if (snapshot.exists()) {
      const userData = snapshot.val();
      return userData;
    } else {
      return null;
    }
  }
  
   async getImage(image:string){
    const imageRef = storageRef(storage, image);
    const url = await getDownloadURL(imageRef);
    return url;
  }
  
  userLogin(email: string, password: string): Promise<string> {
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

  async logout() {
    await auth.signOut();
  }

  async addJobOffer(userId: string, jobOffer: JobOffer) {
    const jobOfferRef = ref(db, `JobOffers/${userId}`);
    const newJobOfferRef = push(jobOfferRef);
    await set(newJobOfferRef, jobOffer);
  }

  async uploadCv(file: File, userId: string) {
    const randomName = uuidv4();
    const cvRef = storageRef(storage, `UserCVS/${userId}/${randomName}`);
    await uploadBytes(cvRef, file);
    return await getDownloadURL(cvRef);
  }

  async addJobOApplication(jobOfferId: string, userId: string, jobApplication: JobApplication) {
    console.log(jobOfferId);
    const jobApplicationRef = ref(db, `JobApplications/${jobOfferId}/${userId}`);
    const newJobOfferRef = push(jobApplicationRef);
    return await set(newJobOfferRef, jobApplication);
  }

  async getJobApplicationsByJobOfferId(jobOfferId: string) {
    const jobApplicationsRef = ref(db, `JobApplications/${jobOfferId}`);
    const jobApplicationsQuery = query(jobApplicationsRef, orderByKey());
    const snapshot = await get(jobApplicationsQuery);
    const jobApplications: JobApplication[] = [];
    snapshot.forEach((childSnapshot) => {
      const userId = childSnapshot.key;
      Object.values(childSnapshot.val()).forEach((applicant) => {
        const jobApplication: any = {
          applicant,
          jobOfferId,
          userId
        };
        jobApplications.push(jobApplication);
      });
    });
    return jobApplications;
  }
  

  async deleteJobApplication(jobOfferId: string, userId: string) {
    console.log(jobOfferId);
    console.log(userId);
    const jobApplicationRef = ref(db, `JobApplications/${jobOfferId}/${userId}`);
    await remove(jobApplicationRef);
}
  
}