import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import ForgetPassword from "./ForgetPassword";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      console.log(auth);
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
        // phoneNumber: 9780951,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Somthing went wrong with registration");
    }
  };

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };

  // const onChange = (e) => {
  //   setFormData((prev) => {
  //     return { ...prev, [e.target.id]: e.target.value };
  //   });
  // };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='Name'
            value={name}
            id='name'
            onChange={onChange}
            className='nameInput'
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            id='email'
            onChange={onChange}
            className='emailInput'
          />

          <div className='passwordInputDiv'>
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
              className='passwordInput'
            />
            <img
              src={visibilityIcon}
              alt=''
              className='showPassword'
              // onClick={() => setShowPassword((prev) => !prev)}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>
          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <OAuth />
        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
