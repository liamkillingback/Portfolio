## How to keep state using react-redux alongside redux-persist 
&nbsp;

 To maintain state in a React-Redux application along with Redux-Persist, first npm install **react-redux** and **redux-persist**, then import the necessary hooks, **useSelector** and **useDispatch**, to access and modify state.
```js
import { useSelector, useDispatch } from "react-redux";
```

### Before using these you will need to set up your reducer with createSlice:
The practice i follow is to store this in a folder named "state" and create an index.js file.

&nbsp;

To create the reducer, use createSlice from @reduxjs/toolkit and set up the initial state with an example/empty string (note this can be Booleans, ints etc.). Then define the reducer function, in this case setArticle, which takes in two parameters: the current state and an action that returns the new state. Export both the reducer function and the stateSlice. See below:

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  author: "bob",
  content: "i like salad",
};

export const stateSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticle: (state, action) => {
      (state.author = action.payload.author);
      (state.content = action.payload.content);
    },
  },
});

export const { setArticle } = stateSlice.actions;
export default stateSlice.reducer;
```



&nbsp;
## The next step is to set up our storage: 
&nbsp;

Next, configure the storage with configureStore from @reduxjs/toolkit and the root reducer, which in this example is stateReducer. Use Provider from react-redux to wrap the app with the store.

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./state";

const store = configureStore({
  reducer: {
    article: stateReducer,
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>      
        <App />
    </Provider>
  </React.StrictMode>
);
```

## **useSelector** is used to get the current value of your state variables. Heres an example:

```js
const article = useSelector((state) => state.article);
// article === {author: "bob", content: "i like salad"}
```

In this case, as we haven't changed anything, article will equal our **initial state**. .article refers to the name in your slice.
&nbsp;

To change the state we will use **useDispatch**. Firstly we need to import the reducer function and useDispatch: 

```js
import { useSelector, useDispatch } from "react-redux";
import { setArticle } from "../state";

const homePage = () => {
	const dispatch = useDispatch();
	const article = useSelector((state) => state.article);
	//article === {author: "bob", content: "i like salad"}
	//then we can change the article stored inside state with out setArticle reducer.
	dispatch(setArticle({author: "fred", content: "i do not like salad"}))
	const newArticle = useSelector((state) => state.article);
	//newArticle === {author: "fred", content: "i do not like salad"}
}
```

To start off we **declare dispatch**, then article returned our **current state**, dispatch(setArticle) then changed our state, and finally we fetched our updated state with newArticle.

&nbsp;


This will all work as expected to store variables to pass to different components and pages, as to store things such as user tokens and admin validation etc. But a problem i ran into was once you **refresh the page**.

&nbsp;

Once the page is refreshed your state will be refreshed, **which is not ideal**. A solution to this is **redux-persist**. This will store your state on the webserver and be persistant **even if you refresh the page**. To implement this update your code as follows: 


```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./state";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
  
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, stateReducer);
const store = configureStore({
  reducer: {
    article: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
  
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
```
To persist the state, use redux-persist, which stores the state on the webserver. First, import PersistGate and persistStore from redux-persist/integration/react and redux-persist/lib/storage, respectively. Then define a persistConfig object that specifies the key and storage. Use persistReducer to wrap the root reducer and create a new persisted reducer. Finally, wrap the app in a PersistGate component, passing in the persistStore of the store as a prop.

&nbsp;

Note that some middleware may need to be added to avoid errors in the console. In this example, getDefaultMiddleware is called with an object specifying ignored actions.

&nbsp;

Hopefully this was helpful, this is a simplified version of an app i made recently that had blog and article components. More information can be found in the documentation.
