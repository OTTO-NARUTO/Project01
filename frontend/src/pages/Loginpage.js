import React, {useState} from 'react';
function Loginpage() {
  const [email, setEmail] = useState(''); // email is the current value and setemail is for the update it 
  const [password,setpassword] = useState('');
  const handlesubmit  = (e) => {  
    e.preventDefault();    // stop page reload 
    console.log ('Email:',email); // print  the email
    console.log('Password:',password); // print the password
  };
  return(       // render the login from ui 
    <div>
      <h2>login</h2>
      <form onSubmit ={handlesubmit}>
        <input
         type = "email"
         placeholder='email'
         value={email}
         onChange = {(e) => setEmail(e.target.value)}
         />
         <br/><br/>
         <input
         type = "password"
         placeholder='passsword'
         value={password}
         onC hange = {(e) => setpassword(e.target.value)}
         />
         <br/><br/>
         <button type = "submit">login</button>    
      </form>
    </div>
  );
}
export default Loginpage;