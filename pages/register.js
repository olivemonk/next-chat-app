import Link from 'next/link'
import React, { useEffect} from 'react'
import {IoLogoGoogle, IoLogoFacebook} from "react-icons/io"
import { auth, db } from '../firebase/firebase'
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useAuth } from '../context/authContext'
import { useRouter } from 'next/router'
import { setDoc, doc } from 'firebase/firestore'
import { profileColors } from '@/utils/constants'
import Loader from '@/components/Loader'


const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();

const Register = () => {

    const router = useRouter();

    const { currentUser, isLoading } = useAuth();


    useEffect(() => {
        if(!isLoading && currentUser){
            // logged in    
            router.push('/');
        }
    },[currentUser, isLoading])


    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, gProvider);
        } catch (error) {
            console.log(error);
        }
    }


    const signInWithFacebook = async () => {
            try {
                await signInWithPopup(auth, fProvider);
            } catch (error) {
                console.log(error);
            }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const colorIndex = Math.floor(Math.random() * profileColors.length)

        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc (doc(db, "users", user.uid), {
                uid: user.uid,
                displayName,
                email,
                color: profileColors[colorIndex]
            })

            await setDoc(doc(db, "userChats", user.uid, ), {})
            await updateProfile(user, {displayName});
            console.log(user);
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }


  return isLoading || (!isLoading && currentUser) ? <Loader /> : (
    <div className="h-[100vh] flex justify-center items-center bg-c1">
        <div className="flex items-center flex-col">
             <div className="text-center">
                <div className="text-4xl font-bold">
                    Create New Account
                </div>
                <div className="mt-3 text-c3">
                    Connect and chat with anyone, anywhere
                </div>
             </div>
             <div className='flex items-center gap-2 w-full mt-5 mb-10 '>
                <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]' onClick={signInWithGoogle}>
                    <div className='flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md'>
                        <IoLogoGoogle size={24}/>
                        <span>Signin with Google</span>
                    </div>
                </div>

                <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]' onClick={signInWithFacebook}>
                    <div className='flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md'>
                        <IoLogoFacebook size={24}/>
                        <span>Signin with Facebook</span>
                    </div>
                </div>
             </div>
             <div className='flex items-center gap-1'>
                <span className=' w-5 h-[1px] bg-c3'></span>
                <span className='text-c3 font-semibold'>OR</span>
                <span className=' w-5 h-[1px] bg-c3'></span>
             </div>

             <form className='flex flex-col items-center gap-3 w-[500px] mt-5 ' onSubmit={handleSubmit} >
                <input 
                    type="text" 
                    placeholder='User Name' 
                    className='w-full h-14  bg-c5 rounded-xl outline-none border-none px-5 text-c3' autoComplete='off'
                />
                <input 
                    type="email" 
                    placeholder='Email' 
                    className='w-full h-14  bg-c5 rounded-xl outline-none border-none px-5 text-c3' autoComplete='off'
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    className='w-full h-14  bg-c5 rounded-xl outline-none border-none px-5 text-c3' autoComplete='off'
                />
                <button className='mt-4 rounded-xl w-full h-14 outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Sign Up</button>
                
             </form>
             <div className='flex justify-center gap-1 text-c3  mt-5 '>
                <span>Already have an account?</span>
                <Link 
                    href='/login' 
                    className="font-semibold text-white underline underline-offset-2 cursor-pointer"
                >Login</Link>
             </div>
        </div>
    </div>
  )
}

export default Register