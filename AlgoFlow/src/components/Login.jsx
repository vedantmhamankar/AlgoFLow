import { useState } from "react";
import { motion , AnimatePresence } from "framer-motion";
import axios from 'axios'
import { useNavigate } from "react-router-dom";




function login(){
  const [userLogin, setLogin] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!userLogin.email || !userLogin.password) {
      alert("All fields are required");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userLogin.email)) {
      alert("Enter a valid email");
      return;
    }
    if (userLogin.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", userLogin);

      alert(res.data.message); // show success message
      console.log("Logged in user:", res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));


      // ✅ redirect to home/dashboard after login
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed");
    }
  };

    return(
      <form onSubmit={handleSubmit}>
        <motion.div
        style={{
            height:"400px",
            width:"400px",
            border:"1px solid white",
            borderRadius:"10px",
            textAlign:"center",
            backgroundColor:"white",
            marginLeft:"540px"
        }}
        >
            <motion.h1
            style={{
                color:"#166534"
            }}
            >Login</motion.h1>
            <input placeholder="Email"
            type="email"
            name="email"
            value={userLogin.email}
            onChange={handleChange}
            style={{
                color:"black",
                height:"30px",
                width:"200px",
                backgroundColor:"white",
                border:"0.5px solid #06923E",
                borderRadius:"5px"
            }} />
            <br/>
             <input placeholder="Password" 
             type="password"
          name="password"
          value={userLogin.password}
          onChange={handleChange}
            style={{
                marginTop:"30px",
                color:"black",
                height:"30px",
                width:"200px",
                backgroundColor:"white",
                border:"0.5px solid #06923E",
                borderRadius:"5px"
            }} />
            <br/>
            <motion.button
            type="submit"
            style={{
                backgroundColor:"#166534",
                color:"white",
                marginTop:"30px",
                width:"200px"
            }}
            > Login</motion.button>
            <h5 style={{ color: "#166534" ,cursor:"pointer"}}
            onClick={() => navigate("/Register")}>
               Don't have an account? Register</h5>
        </motion.div>
        </form>
    )
}

function Registration(){
   const navigate = useNavigate(); 
  const[value,setvalue] = useState({
    name:'',
    email:'',
    password:''
  })

  const handlechange = (e) =>{
    setvalue({
      ...value,
      [e.target.name] :e.target.value
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault(); 

    // ✅ validation
    if (!value.name || !value.email || !value.password) {
      alert("All fields are required");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value.email)) {
      alert("Enter a valid email");
      return;
    }
    if (value.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const register = await axios.post("http://localhost:5000/register",value) 
      alert(register.data.message || "Registered successfully");
      console.log("Form submitted:", value);
      setvalue({
        name:"",
        email:"",
        password:""
      })
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      // ✅ check if email already exists
      if (err.response?.status === 400 && err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Registration failed, try again.");
      }
    }
  };
    return(
      <form  onSubmit={handleSubmit}> 
       <motion.div
       style={{
            height:"400px",
            width:"400px",
            border:"1px solid white",
            borderRadius:"10px",
            textAlign:"center",
            backgroundColor:"white",
            marginLeft:"540px"
        }}
       >
        <motion.h1 style={{ color: "#166534" }}>Register</motion.h1>
            <input
            type="text"
              placeholder="Username"
              style={{
                color:"black",
                height: "30px",
                width: "200px",
                backgroundColor: "white",
                border: "0.5px solid #06923E",
                borderRadius: "5px",
              }}
              value={value.name}
              onChange={handlechange}
              name="name"
            />
            <br />
            <input
            type="email"
              placeholder="Email"
              style={{
                color:"black",
                marginTop: "20px",
                height: "30px",
                width: "200px",
                backgroundColor: "white",
                border: "0.5px solid #06923E",
                borderRadius: "5px",
              }}
              value={value.email}
              onChange={handlechange}
              name="email"
            />
            <br />
            <input
              placeholder="Password"
              type="password"
              style={{
                color:"black",
                marginTop: "20px",
                height: "30px",
                width: "200px",
                backgroundColor: "white",
                border: "0.5px solid #06923E",
                borderRadius: "5px",
              }}
              value={value.password}
              onChange={handlechange}
              name="password"
            />
            <br />
            <motion.button
              style={{
                backgroundColor: "#166534",
                color: "white",
                marginTop: "30px",
                width: "200px",
              }}
              type="submit"
            >
              Register
            </motion.button>
            <h5
              style={{ color: "#166534", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </h5>
       </motion.div>
       </form>
    );
}
const Comp ={
    login,
    Registration
}
export default Comp;
