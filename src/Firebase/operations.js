import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

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
      localStorage.setItem("user", JSON.stringify(user.providerData));

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
        localStorage.setItem(
          "user",
          JSON.stringify(userCredentials.user.providerData)
        );
        return userCredentials;
      }
    );

    // return the logged in user
    return user;
  } catch (error) {
    console.log("Error while logging user: ", error.message);
  }
};

// sign in with google pop up
export const loginWithPopup = (auth) => {
  let isRegistered = false;
  try {
    return signInWithPopup(auth, provider).then((response) => {
      console.log("User: ", response.user);
      localStorage.setItem("user", JSON.stringify(response.user.providerData));
      isRegistered = true;
      return isRegistered;
    });
  } catch (error) {
    console.log("Error while sign in with popup: ", error);
    return isRegistered;
  }
};
