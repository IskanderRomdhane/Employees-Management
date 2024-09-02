import React, { useState } from 'react'
import Cuser from '../api/Cuser';
const CreateUser  = () => {
    const [firstname , setFirstName] = useState('');
    const [lastname , setLastName] = useState('');
    const [email , setEmail] = useState('');
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [vpassword , setVpassword] = useState('');

    const HandleFirstname = (event) => {
        setFirstName(event.target.value);
    }

    const HandleLastName = (event) => {
        setLastName(event.target.value);
    }

    const HandleEmail = (event) => {
        setEmail(event.target.value);
    }

    const HandleUsername = (event) => {
        setUsername(event.target.value);
    }

    const HandlePassword = (event) => {
        setPassword(event.target.value);
    }

    const HandleVpassword = (event) => {
        setVpassword(event.target.value);
    }

  return (
    <div><section class="py-10 my-auto dark:bg-gray-900">
    <div class="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div
            class="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
            
            <div class="">
                <h1
                    class="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-kanit mb-2 dark:text-white">
                    CREATE USER
                </h1>
                <form>
                    


                    <div class="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div class="w-full  mb-4 mt-6">
                            <label for="" class="mb-2 dark:text-gray-300">First Name</label>
                            <input type="text"
                                    class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="First Name" 
                                    onChange={HandleFirstname}/>
                        </div>
                        <div class="w-full  mb-4 lg:mt-6">
                            <label for="" class=" dark:text-gray-300">Last Name</label>
                            <input type="text"
                                    class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="Last Name" 
                                    onChange={HandleLastName}/>
                        </div>
                    </div>


                    <div class="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div class="w-full">
                        <label for="" class=" dark:text-gray-300">Email</label>
                            <input type="Email"
                                    class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="you@example.com" 
                                    onChange={HandleEmail}/>
                        </div>


                        <div class="w-full">
                        <label for="" class=" dark:text-gray-300">Username</label>
                            <input type="text"
                                    class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="Username" 
                                    onChange={HandleUsername}/>
                        </div>

                        
                    </div>

                    <div class="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full py-2">

                    <div class="w-full">
                        <label for="" class=" dark:text-gray-300">Password</label>
                            <input type="password"
                                    class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="password"
                                    onChange={HandlePassword} />
                                    </div>

                    <div class="w-full">
                        <label for="" class=" dark:text-gray-300">Verify Password</label>
                            <input type="password"
                                    class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="verify password" 
                                    onChange={HandleVpassword}/>
                                    </div>
                    </div>

                
                    <Cuser lastname = {lastname} firstname = {firstname} username = {username} email = {email} password = {password} vpassword = {vpassword} />
                </form>
            </div>
        </div>
    </div>
</section></div>
  )
}

export default CreateUser ;