import { useEffect, useState } from "react";

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const useGoogleAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth()

    const handleUser = (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }

        setIsLoading(false);
    };

    const signIn = () => {
        const googleAuthProvider = new GoogleAuthProvider()

        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                handleUser(user)

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage)
            });

    };

    const signOut = () => {
        auth.signOut()
    };

    useEffect(() => {

        const unsubscribe = auth.onIdTokenChanged(handleUser);
        return () => unsubscribe();
    }, []);

    return { user, isLoading, signIn, signOut };
};

export default useGoogleAuth