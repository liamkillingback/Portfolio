# Hello World! 

Today's Blog is about user authentication using the MERN stack. The tools i used are:

&nbsp;

 **bcrypt**,
 **jsonwebtoken**,
 **react-redux + redux-persist**

&nbsp;

With a freshly made react Vite app, i set up the server first with these dependancies:

&nbsp;

 **mongoose**,
 **express**,
 **dotenv**,
 **cors**,
 **bodyParser**

&nbsp;
## Mongoose:
&nbsp;


This tool is used to easily operate the mongoDB database, which i set up a **mongoDB Atlas** account for storing user information, and stored the **Database URL** in the dotenv file as '**MONGO_URL**'. I also made a models folder with the **User** schema: 

```js
import mongoose from "mongoose";

const UserSchema =
 mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 2,
            max: 25
        },
        email: {
            type: String,
            required: true,
            min: 5,
            max: 50
        },
        password: {
            type: String,
            required: true,
            min: 5,
            max: 25
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        address: {
            type: String,
            required: false,
            max: 50
        }
    },
    { timestamps: true }
)
  
const User = mongoose.model("User", UserSchema);

export default User;
```

With this we assert that every user in the database will have an **email, username, password, isAdmin status and an adress(optional)**. By default we set the **isAdmin** status to false, as to make sure all new users are **not** admins of the site.

&nbsp;


## Here is the server file (index.js):
```js
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
  
//Configurations
const app = express();
const jsonParser = bodyParser.json();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb" }));
app.use(cors());
app.use(express.json());
  
//Routes
app.use("/auth", jsonParser, authRoutes);
  
const PORT = 8080 || process.env.PORT;
  
//DB Connection + app
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(`${error}, did not connect`));
```

Here we are connecting to our mongoDB Database, then listening on port 8080 ( or the webserver port ). with **app.use("/auth", jsonParser, authRoutes**, we are saying that any request to the server following the **localhost:8080/auth** address will pass to the **authRoutes** file, parsed with some middleware from jsonParser.

## In our authRoutes file, we have the following:

```js
import express from 'express';
  
import { login, register } from '../controllers/auth.js'
const router = express.Router();
  
router.post('/login', login);
router.post('/register', register);
  
export default router;
```

We declare that if a request to **localhost:8080/auth/login**, it will be handled by the login funcion, imported from **controllers/auth.js**. Same to the other routes, takes a directory as its first argument, then the function as the second.

```js
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
  
export const register = async (req, res) => {
  console.log("Register route reached");
  
  try {
    const { username, email, password } = req.body;
  
    const userAlreadyExists = await User.findOne({ email: email });
    if (userAlreadyExists) {
      return res.status(406).json({ message: "User already exists with that email" });
    }
    // Encrypt the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Save new user to database with encrypted password
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = newUser.save();
    console.log(savedUser);
    delete savedUser.password;
    res.status(201).json({ message: "Success", ...savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
export const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
  
    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(400).json({ message: "invalid credentials" });
    delete user.password;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, user, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

The code above is hopefully mostly self explanitory, so in short, the **register** function checks to see if there is already a user with the same email, and if not creates a new user in the database with an **encrypted password** by bcrypt. 

&nbsp;
&nbsp;

The **login function** attempts to find a **user** in the **database** with the supplied email, compares the entered password with the encrypted password with **bcrypt.compare()**. If all goes well, we **delete** the password then send the **user info** back in the response, so that the front end can use that information for the users profile, as well as a **jwt Token** to validate the users logged in status. The **JWT_SECRET** is just a hard to guess string stored in the **env** file. Theres also a few classic console logs to keep track of things in development :).

&nbsp;

## This completes the backend for user Auth.

&nbsp;



# Now for the frontend.
&nbsp;


The Below code is a **hybrid** **login/register** page, not fully complete but has the functionality we need to test out our **authentication!**


```js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setLogin } from "../state";
  
const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [submitting, setSubmitting] = useState("Submit");
  const URL = isRegister
    ? "http://localhost:8080/auth/register"
    : "http://localhost:8080/auth/login";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    setSubmitting("Submitting...");
  
    try {
      const response = await axios.post(URL, { email, password });
      console.log(response);
      if (isRegister) {
        if (password != e.target[2].value)
          return alert("Passwords do not match");
        alert("Success, login to your account!");
        e.target[1].value = "";
        setIsRegister(false);
        setSubmitting("Submit");
      } else {
        const user = response?.data?.user;
        const token = response?.data?.token;
        dispatch(setLogin({ user: user, token: token }));
        navigate("/");
      }
    } catch (error) {
      setSubmitting("Submit");
      return alert(error?.response?.data?.message);
    }
  };
  
  return (
    <>
      <div className="flex z-50 min-h-full flex-1 font-semibold flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10  text-center text-2xl font-bold leading-9 tracking-tight text-black">
            {isRegister ? "Register" : "Login to"} your account here
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm  leading-6 text-black"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm  leading-6 text-black"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className={`${
                      isRegister && "hidden"
                    } font-semibold text-indigo-600 hover:text-indigo-500`}                  
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {isRegister && "Confirm Password"}
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  className={`${
                    !isRegister
                      ? "hidden"
                      : "focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  } block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6`}
                />
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {submitting}
              </button>
              <div className="mt-2">
                <label className="pr-5" htmlFor="">
                  {isRegister ? "" : "Don't"} have an account?
                </label>
                <label
                  className="hover:underline text-blue-700 cursor-pointer"
                  onClick={() => setIsRegister(!isRegister)}
                  htmlFor=""
                >
                  {isRegister ? "Login" : "Register"}
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
```

This is a modified **Tailwind** **Template**, with a isRegister state keeping track whether the user is logging in or creating an account, and will send the **username + Password** to a different path within our server, which we set up earlier. 

&nbsp;

Upon succesfully creating an account, the **User** will be prompted to then login. (given all goes well on your server). And when the user signs in with the correct credentials, we use **react-redux** to sign the user in with a token generated by **jwt** and returned to you from the server. ( dispatch(setLogin{ user: user, token: token })). this will keep the user logged in across the whole website, alongside **redux-persist**. You can learn how to use **react-redux** to keep state in my previous blog. 

&nbsp;

That is about it to this simple user authentication, more can be done with security but this is more than enough for a small scale website. Hope it helped

&nbsp;

## -Liam Killingback