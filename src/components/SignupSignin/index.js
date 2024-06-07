import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, doc, setDoc } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();
  function signup() {
    setLoading(true);
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        setLoading(false);
        toast.error("Passwords don't match!");
      }
    } else {
      toast.error("All fields are required");
      setLoading(false);
    }
  }
  function login() {
    if (email != "" && password != "") {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          toast.success("User Logged In");
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      setLoading(false);
      toast.error("All fields are required");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email:user.email,
          createdAt:new Date(),
        });
        toast.success("doc created!");
      } catch (e) {
        toast.error(e.message);
      }
    }else
    toast.error("Doc already exists");
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"example@email.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example123"}
            />
          </form>

          <Button
            disabled={loading}
            text={loading ? " Loading..." : "Login"}
            onClick={login}
          />
          <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
            Don't have an account? Click here
          </p>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              type="text"
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"example@email.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example123"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"********"}
            />
          </form>

          <Button
            disabled={loading}
            text={loading ? " Loading..." : "Sign up"}
            onClick={signup}
          />
          <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
            Already have an account? Click here
          </p>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;
