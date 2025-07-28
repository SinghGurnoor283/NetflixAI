import React, { useRef, useState } from 'react';
import Header from './Header';
import checkValidateData from './utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, updateProfile } from "firebase/auth";
import { auth } from './utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import Footer from './Footer';
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const validationMsg = checkValidateData(email.current.value, password.current.value, !isSignInForm);
    setErrorMsg(validationMsg);
    if (validationMsg) return;

    if (!isSignInForm) {
      // Sign Up
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: name.current.value,
          });
        })
        .then(() => {
          const { uid, email, displayName } = auth.currentUser;
          dispatch(addUser({ uid, email, displayName }));
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setErrorMsg("Email already in use. Try logging in.");
          } else if (error.code === "auth/weak-password") {
            setErrorMsg("Weak password. Use at least 8 characters with 1 uppercase & 1 special character.");
          } else {
            setErrorMsg(error.message);
          }
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;

          if (
            errorCode === "auth/user-not-found" ||
            errorCode === "auth/invalid-credential"
          ) {
            setErrorMsg("Invalid credentials or user not found.");
          } else if (errorCode === "auth/wrong-password") {
            setErrorMsg("Incorrect password. Please try again.");
          } else if (errorCode === "auth/invalid-email") {
            setErrorMsg("Invalid email format.");
          } else {
            setErrorMsg(error.message);
          }
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMsg(null);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      
      <Header />


      <main className="flex-grow relative">
      <div className="absolute inset-0 z-0 h-full">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/75b0ed49-75ab-4a63-bd45-37bc2c95cb73/web/IN-en-20250623-TRIFECTA-perspective_ae5833b7-6ce5-4e88-853e-014f38c506f1_large.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 flex justify-center items-start pt-40 min-h-screen">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md p-10 my-12 bg-black/75 text-white rounded"
        >
          <h1 className="font-bold text-3xl mb-6">
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="py-2.5 px-4 mb-4 w-full bg-gray-500 text-white rounded outline-none"
            />
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="py-2.5 px-4 mb-4 w-full bg-gray-500 text-white rounded outline-none"
          />

          <div className="relative mb-3 w-full">
            <input
              ref={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="py-2.5 px-4 w-full bg-gray-500 text-white rounded outline-none pr-10"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
              
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.366.327-2.665.9-3.818M9.88 9.88a3 3 0 014.242 4.243M15 12a3 3 0 01-3 3M3 3l18 18" />
                </svg>
              ) : (
               
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <p className="text-red-500 mt-2 text-lg py-2">{errorMsg}</p>

          <button
            className="w-full mt-4 p-3 bg-red-700 hover:bg-red-800 rounded font-semibold"
            onClick={handleButtonClick}
          >
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </button>

          <p
            className="py-6 mb-3 cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? 'New to Netflix? Sign Up Now'
              : 'Already a user? Sign In Now'}
          </p>
        </form>
      </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Login;
