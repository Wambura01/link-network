import {
  doc,
  setDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { db } from "./firebaseConfig";

const provider = new GoogleAuthProvider();

// authentication
//register users
export const registerWithEmailAndPassword = async (auth, values, role) => {
  try {
    const registeredUser = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    ).then(async (userCredential) => {
      const user = userCredential?.user;
      localStorage.setItem("user", JSON.stringify(user.providerData));

      const userRef = doc(db, role, user?.uid);
      if (role === "student") {
        await setDoc(userRef, {
          displayName: values.displayName,
          email: values.email,
          role: role,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          docId: user?.uid,
        });
      }

      if (role === "editor") {
        await setDoc(userRef, {
          displayName: values.displayName,
          email: values.email,
          company: values.company,
          role: role,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          docId: user?.uid,
        });
      }

      return user;
    });

    return registeredUser;
  } catch (err) {
    const errorMessage = err.message;
    console.log("Error while registering user: ", errorMessage);
  }
};

//sign in with email and password
export const logInWithEmailAndPassword = async (auth, values, role) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    ).then(async (userCredentials) => {
      localStorage.setItem(
        "user",
        JSON.stringify(userCredentials.user.providerData)
      );

      const userRef = doc(db, role, userCredentials?.user.uid);
      await updateDoc(userRef, {
        lastLoginAt: serverTimestamp(),
      });
      console.log("Logged in successfully!!");
      return userCredentials;
    });

    // return the logged in user
    return user;
  } catch (error) {
    console.log("Error while logging user: ", error.message);
  }
};

// sign in with google pop up
export const loginWithPopup = (auth, role) => {
  let isRegistered = false;
  try {
    return signInWithPopup(auth, provider).then(async (response) => {
      console.log("User: ", response.user);
      localStorage.setItem("user", JSON.stringify(response.user.providerData));
      isRegistered = true;

      const userRef = doc(db, role, response.user.uid);
      await setDoc(userRef, {
        displayName: response.user.displayName,
        email: response.user.email,
        role: role,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });

      return isRegistered;
    });
  } catch (error) {
    console.log("Error while sign in with popup: ", error);
    return isRegistered;
  }
};

// create a new job
export const createJob = async (values) => {
  let isAdded = false;
  try {
    const newJobRef = doc(collection(db, "jobs"));
    await setDoc(newJobRef, values);

    isAdded = true;
    return isAdded;
  } catch (error) {
    console.log("Error while creating a job: ", error);
    return isAdded;
  }
};
