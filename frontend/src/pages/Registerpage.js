import React , {useState} from 'react';
import axios from 'axios';


function Registerpage() {
  const[Firstname,setFirstname] = useState('');
  const[Lastname,setLastname] = useState('');
  const[Email,setEmail]= useState('');
  const[Password,setPassword] = useState('');
  const handlesubmit =async(e) =>{
    e.preventDefault();
     try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        firstName: Firstname,
        lastName: Lastname,
        email: Email,
        password: Password,
      });

      console.log('User registered:', response.data);
      alert('User registered successfully!');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert('Registration failed.');
    }
  };
  return(
    <div>
      <h2>Register</h2>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder='Firstname'
          value={Firstname}
          onChange={(e) => setFirstname(e.target.value)}
          />
          <br/><br/>
          <input
          type="text"
          placeholder='Lastname'
          value={Lastname}
          onChange={(e) => setLastname(e.target.value)}
          />
          <br/><br/>
          <input
          type='email'
          placeholder='Email'
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <br/><br/>
          <input
          type='Password'
          placeholder='Password'
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <br/><br/>
          <button type = "submit">Register</button> 
      </form>
    </div>
  )
};
export default Registerpage;