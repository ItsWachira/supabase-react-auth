import React from 'react';
import '../App.css';
import {createClient} from '@supabase/supabase-js';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';


const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_API_KEY
); //initialize supabase client, takes two arguments: url and key environment variables (both from .env file)



function Success() {
    const [user, setUser] = useState([]); //initialize user state
    const navigate = useNavigate(); //useNavigate is a hook that returns a function that can be used to navigate to a new route

    useEffect (() => {
        // onAuthStateChange triggers an event whenever the user's authentication state changes
        
        async function getUserData(){
           await supabase.auth.getUser().then((value) => {
            // if user data null then dont throw error undefines.user
                
               if(value.data?.user) {
                console.log(value.data.user.user_metadata);
                setUser(value.data.user);
                // return value.data.user.user_metadata.full_name;
               
    

               } 
            })
        }
       getUserData();
     
    
      
    },[]);

    
    const userName = user?.user_metadata?.full_name;
    const avatar = user?.user_metadata?.picture; 
    
    async function signOutUser(){
        const {error} = await supabase.auth.signOut();
         navigate('/');
     };

  return (
    <div className="App">
      <header className="App-header">
      <h1>Login Successful</h1>
      {/* <h2>{userName}</h2> */}
       <img src={avatar} /> 
       <button onClick={()=> signOutUser()}>Sign Out</button>    
      </header>
    </div>
  );
}

export default Success;
