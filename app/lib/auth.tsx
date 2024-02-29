"use client"

import { useEffect, useState } from "react";
import { User as FirebaseUser, signOut as firebaseSignOut, browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";

export async function signIn(email: string, password: string, rememberMe: boolean = true) {
   
  await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password).then(
                        data=>{
                          
                                  const colRef = doc(db, 'users',data.user.uid);
                                  setDoc(colRef,{
                                      email: email,              
                                      id: data.user.uid,      
                                  },
                                    { merge: true }
                                    ); 
                        }
                    );
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export async function signUp(email: string, password: string,name : string, rememberMe: boolean = true) { 
  await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  return createUserWithEmailAndPassword(auth, email, password).then(
    data=>{
      
              const colRef = doc(db, 'users',data.user.uid);
              setDoc(colRef,{
                  email: email,              
                  id: data.user.uid,
                  name : name
              },
                { merge: true }
                ); 
    }
  );


}


export function useUser() {
  const [user, setUser] = useState<FirebaseUser | null | false>(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return user;
}
