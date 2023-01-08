import React from 'react';
import '../App.css';
import {createClient} from '@supabase/supabase-js';
import {Auth, ThemeSupa} from '@supabase/auth-ui-react';
import {useNavigate} from 'react-router-dom';


//initialize supabase client, takes two arguments: url and key environment variables (both from .env file)

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_API_KEY
); 



function Login() {

    const navigate = useNavigate(); 
    //useNavigate is a hook that returns a function that can be used to navigate to a new route
    // onAuthStateChange triggers an event whenever the user's authentication state changes
    supabase.auth.onAuthStateChange(async (event) =>{
        if (event !== "SIGNED_OUT") {
            //forward to success page
            navigate('/success');
        }else{
            //forward to login page
            navigate('/');
        }
    })
  return (
    <div className="App">
      <header className="App-header">
        {/* //premade ui component from supabase that handles authentication */}
        <div className = "login">
        <Auth
            supabaseClient={supabase}
            appearance={{theme: ThemeSupa}}
            theme="dark"       
            providers={['google']}
        />
        </div>
       
      </header>
    </div>
  );
}

export default Login;