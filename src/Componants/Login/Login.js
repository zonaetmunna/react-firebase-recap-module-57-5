import React, { useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import initializeAuthenticaion from '../../Firebase/Firebse.init';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, updateProfile, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";

initializeAuthenticaion();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const Login = () => {
     const auth = getAuth();
     // state
     const [user, setUser] = useState({})
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [error, setError] = useState('')
     const [isLogin, setIsLogin] = useState(false)
     const [userName, setUserName] = useState('')


     // toogle user
     const handleToggleUser = (e) => {
          setIsLogin(e.target.checked)
     }
     // hanldle user
     const handleUser = (e) => {
          setUserName(e.target.value)

     }

     // email
     const handleEmailUser = (e) => {
          setEmail(e.target.value)

     }
     // password
     const handlePassword = (e) => {
          setPassword(e.target.value)
     }

     // 
     const handleSubmit = (e) => {
          e.preventDefault();
          if (password.length < 6) {
               setError('at least 6 chacater');
               return;
          }
          if (!/(?=.*[A-Z])/.test(password)) {
               setError('2 upppercase')
               return;
          }

          isLogin ? handleExistsUser(email, password) : handleCreateUser(email, password);


     }

     // existe user
     const handleExistsUser = (email, password) => {
          signInWithEmailAndPassword(auth, email, password)
               .then(() => {
                    setError('')
                    handleReset();
               })
               .catch(error => {
                    setError(error.message)
               })

     }

     // creaete user
     const handleCreateUser = (email, password) => {
          createUserWithEmailAndPassword(auth, email, password)
               .then(result => {
                    const user = result.user;
                    console.log(user)
                    handleVarify();
                    userNameUpdate();
                    setError('')
               })
               .catch(error => {
                    setError(error.message)
               })

     }

     // reset user
     const handleReset = () => {
          sendPasswordResetEmail(auth, email)
               .then(result => {

               })

     }

     // verification
     const handleVarify = () => {
          sendEmailVerification(auth.currentUser)
               .then(result => {

               })
     }

     // user update
     const userNameUpdate = () => {
          updateProfile(auth.currentUser, { displayName: userName })
               .then(result => [

               ])

     }
     // handle Google sign in
     const handleGoogleSign = () => {
          signInWithPopup(auth, googleProvider)
               .then(result => {
                    const { displayName, email, photoURL } = result.user;
                    const loggedUser = {
                         name: displayName,
                         email: email,
                         image: photoURL
                    }
                    setUser(loggedUser)
               })
     }
     // Facebook sign in
     const handleFacebookSign = () => {
          signInWithPopup(auth, facebookProvider)
               .then(result => {
                    const { displayName, photoURL } = result.user;
                    const loggedUser = {
                         name: displayName,
                         image: photoURL
                    }
                    setUser(loggedUser)
               })
     }
     // 
     const handleGithubSign = () => {
          signInWithPopup(auth, githubProvider)
               .then(result => {
                    const { displayName, photoURL } = result.user;
                    const loggedUser = {
                         name: displayName,
                         image: photoURL
                    }
                    setUser(loggedUser)

               })
     }





     return (
          <div>

               <Form onSubmit={handleSubmit}>
                    <h4>Please {isLogin ? 'Login' : 'Register'}</h4>
                    {
                         !isLogin && <div>
                              <Form.Label>User</Form.Label>
                              <Form.Control onBlur={handleUser} type="text" placeholder="Enter username" />
                         </div>

                    }
                    <Form.Group className="mb-3" controlId="formHorizontalEmail">
                         <Form.Label column sm={2}>
                              Email
                         </Form.Label>
                         <Col sm={10}>
                              <Form.Control onBlur={handleEmailUser} type="email" placeholder="Email" />
                         </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formHorizontalPassword">
                         <Form.Label column sm={2}>
                              Password
                         </Form.Label>
                         <Col sm={10}>
                              <Form.Control onBlur={handlePassword} type="password" placeholder="Password" />
                         </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formHorizontalCheck">
                         <Col sm={{ span: 10, offset: 2 }}>
                              <Form.Check onClick={handleToggleUser} label="Already have account" />
                         </Col>
                    </Form.Group>
                    {/* error message */}
                    <div>
                         <h5>{error}</h5>
                    </div>

                    {/* create */}
                    <Form.Group className="mb-3">
                         <Col sm={{ span: 10, offset: 2 }}>
                              <Button onSubmit={handleSubmit} type="submit">{isLogin ? 'Login' : 'Register'}</Button>
                              <Button onSubmit={handleReset} type="submit">Reset</Button>
                         </Col>
                    </Form.Group>
                    {/* Google sign in  */}
                    <Form.Group className="mb-3">
                         <Col sm={{ span: 10, offset: 2 }}>
                              <Button onClick={handleGoogleSign}>Google Sign In</Button>
                         </Col>
                    </Form.Group>
                    {/* Facebook sign in */}
                    <Form.Group className="mb-3">
                         <Col sm={{ span: 10, offset: 2 }}>
                              <Button onClick={handleFacebookSign}>FaceBook Sign In</Button>
                         </Col>
                    </Form.Group>
                    {/* github sign in */}
                    <Form.Group className="mb-3">
                         <Col sm={{ span: 10, offset: 2 }}>
                              <Button onClick={handleGithubSign}>Github Sign In</Button>
                         </Col>
                    </Form.Group>
               </Form>

               <div>
                    <h1>{user.name}</h1>
                    <img src={user.image} alt="" />
               </div>

          </div>
     );
};

export default Login;