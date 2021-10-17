import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import "./App.css";
import initializeAuthentication from "./Firebase/firebase.initialize";

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const auth = getAuth();

function App() {
  // useState for both google and github sign in
  const [user, setUser] = useState({});

  // handle google sign in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // handle github sign in
  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // handle facebook sign in
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // handle sign out for all logged in accounts
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser({});
    });
  };
  return (
    <div className="App">
      {/* conditional sign in & sign out case */}
      {!user.name ? (
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign-In</button>
          <button onClick={handleGitHubSignIn}>GitHub Sign-In</button>
          <button onClick={handleFacebookSignIn}>Facebook Sign-In</button>
        </div>
      ) : (
        <button onClick={handleSignOut}>Sign Out</button>
      )}
      <br />
      {user.name && (
        <div>
          <h2>Welcome {user.name}</h2>
          <p>Email Address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
