'use server';

import { auth, } from '@/firebase/config';
import { UserCredential, signInWithEmailAndPassword,createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';




const LoginFormSchema = z.object({
    email: z.string({
        invalid_type_error: 'Please select a email.', 
    }),
    password: z.string({
        invalid_type_error: 'Please select a password.', 
    }),
  });

  const SignUpFormSchema = z.object({
    userName: z.string({
        invalid_type_error: 'Please select a userName.', 
    }),
    email: z.string({
        invalid_type_error: 'Please select a email.', 
    }),
    password: z.string({
        invalid_type_error: 'Please select a password.', 
    }),
  });

  export async function createUser(formData: FormData) {
    const {email, password,userName} = SignUpFormSchema.parse({
        userName: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        
    })

    var result: UserCredential | null;
    var error ;
    try {
         result  = await createUserWithEmailAndPassword(auth, email, password);

    } catch (err) {
            error=err;
        throw error;
    }
    revalidatePath('/');
    redirect('/login');

}

 
