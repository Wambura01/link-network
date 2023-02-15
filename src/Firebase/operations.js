import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// authentication
//register users
export const registerWithEmailAndPassword = async (auth, email, password) => {
  try {
    const registeredUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userCredential) => {
      const user = userCredential.user;

      return user;
    });

    return registeredUser;
  } catch (err) {
    const errorMessage = err.message;
    console.log("Error while registering user: ", errorMessage);
  }
};

//sign in with email and password
export const logInWithEmailAndPassword = async (auth, email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        console.log("Logged in successfully!!");
        return userCredentials;
      }
    );

    // return the logged in user
    return user;
  } catch (error) {
    console.log("Error while logging user: ", error.message);
  }
};
