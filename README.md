# Sprint 1 - Module 3 : Custom Hooks Lesson Plan

## [Training Kit](https://github.com/LambdaSchool/Full-Stack-Web-Curriculum/tree/main/03-WebApplications-II/Sprint%2001%20-%20Advanced%20React/Module%203%20-%20Composing%20and%20Sharing%20Non-Visual%20Behaviors)

----

## Objectives

By the end of this module, learners should be able to:
* define stateful logic
* apply non-visual behavior (stateful logic) with custom hooks
* compose hooks in a custom hook to extend multiple pieces of stateful logic

----

## Instructor Resources
* 🐙 [Guided Project Starter](https://github.com/LambdaSchool/web-guided-project-custom-hook)
* 🐙 [Guided Project Solution](https://github.com/LambdaSchool/web-guided-project-custom-hook-solution)
* 🐙 [Module Project](https://github.com/LambdaSchool/dark-mode)
* 🐙 [Module Project Solution]()

----

## Guided Project Slack Message
> 1. Clone without forking the following repo: https://github.com/LambdaSchool/web-guided-project-custom-hook
> 2. Navigate into both the review and followAlong folders and run npm i to load dependences.
>
> :point_right: Technical issues spinning up the project? Please head over to the help channel!
> :point_right: If you fall behind during lecture and wish to catch up:
>
> git fetch && git reset --hard origin/lecture
>
> :point_right: Slido event: *insert slido link*

----

## Guided Project Zoom Invitation:
> Unit 3 | Sprint 1 | **Module 2: Custom Hooks**
> _______________________________________________________
> Zoom Link : *insert zoom link*
> Slido: *insert slido link*
> Guided Project: https://github.com/LambdaSchool/web-guided-project-custom-hook
> Module Project: https://github.com/LambdaSchool/dark-mode

----

## Check for Understanding Questions

These are the questions used internally to check student understanding. Students will be instructed to answer these questions after the guided project. Please make sure to emphasize the concepts behind these answers.

#### Which of the following would NOT be considered "stateful logic"?
* event handler functions
* const [players, setPlayers] = useState([])
* **<h2 className="sub-header">Hello</h2>**
* fetching data from an API

#### If you had a custom hook called useWindowSize whose return value was [height, width], how would you use this hook in your component?
* const [height, width] = useState();
* const [height] = useHeight(); const [width] = useWidth();
* **const [height, width] = useWindowSize();**
* const [width, height] = useWindowSize();

#### Custom hooks should be named with "use" at the start of the name.
* FALSE
* **TRUE**

#### What is it called when you call a React hook (custom or not) inside a custom hook that you are building?
* creating a custom hook
* **composing hooks**
* calling hooks
* mounting


## Guided Project Outline

1. Work with students to define "stateful" logic (it is outlined in tk)

2. In the sandbox app, look at the `SignupForm` component. Ask students what they would consider to be the "stateful logic" of this component
  - useState call
  - handleChanges
  - handeSubmit
  - clearForm
  
#### Abstracting Stateful Login into Custom Hook

1. Create a folder called `/hooks` and a file in it called `useForm.js`

2. Remove the useState call from the form component and add it to the useForm hook (leave everything else)

3. Have the hook return `[username, setUsername]`

```javascript
// useForm.js
import { useState } from 'react';

export const useForm = () => {
  const [username, setUsername] = useState(key, initialValues);

  return [username, setUsername];
};

// SignupForm.js
...

const [username, setUsername] = useForm();
```

3. In place of the useState call, call the useForm hook, destructure `[username, setUsername]`. Now the app works again. However, this is too much work for just replacing useState. Let's abstract (may need to explain that word) more logic from the component to the hook

4. One-by-one abstract the other peices of stateful logic that we identified, with the exception of the `handleSubmit` function, from the component to the hook. When you're finished, this is what we want to see:

```javascript
// useForm.js
import { useState } from 'react';

export const useForm = () => {
  const [username, setUsername] = useState();

  const handleChanges = e => {
    setUsername(e.target.value);
  };

  const clearForm = e => {
    e.preventDefault();
    setUsername('');
  };

  return [username, clearForm, handleChanges];
};

// SignupForm.js
...

const [username, clearForm, handleChanges] = useForm();
```

Much better. But not quite dynamic enough to handle multiple inputs.

5. Copy/paste the single input we have in the form to make an input for email

6. Update the custom hook (if you want to allow students to try this out on their own for about 10 minutes, that's fine. It will be hard for them, but it may be a good exercise for them to struggle through it before you show them).
  - Change username to values and initialize it as an object with username and email properties
  - Change setUsername to setValues
  - Update handleChanges to handle updating an object
  - In clearForm, update the passed-in value in the setter function to the same object that is passed into useState
  - Update the form to use the properties now on the values object and setValues 
  
```javascript
// useForm.js
import { useLocalStorage } from './useLocalStorage';

export const useForm = (key, initialValues, cb) => {
  const [values, setValues] = useLocalStorage(key, initialValues);

  const handleChanges = e => {
    console.log(e.target.name);
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = e => {
    e.preventDefault();
    setValues(initialValues);
  };

  return [values, clearForm, handleSubmit, handleChanges];
};


// SignupForm
export default function SignupForm() {
  const classes = useStyles();

  const [values, clearForm, handleChanges] = useForm();
  
  const handleSubmit = e => {
    e.preventDefault();
    alert(username);
  };

  return (
    <div p={2} className="form">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Add New Client</legend>
          <TextField
            id="outlined-name"
            label="Username"
            className={classes.textField}
            value={values.username}
            onChange={handleChanges}
            margin="normal"
            variant="outlined"
            name="username"
          />
          <TextField
            id="outlined-name"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChanges}
            margin="normal"
            variant="outlined"
            name="email"
          />
          <Button color="blue" type="submit">
            Submit
          </Button>
          <Button color="red" onClick={clearForm}>
            Clear
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
```

7. Really close! Remind the students that we are creating a custom hook so we can reuse it in other components. But what if we had a form component that didn't have just username and email inputs? We need to make sure we're not hard-coding the values in the hook. Instead we'll define them in the component, and pass them in as an argument when we call the hook in the component.

```javascript
// useForm
export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);
  
  ...
  
  const clearForm = e => {
    e.preventDefault();
    setValues(initialValues);
  };
  
 
  ...
  
}


// SignupForm.js
const initialFormValues = {
  email: '',
  username: ''
};

export default function SignupForm() {
  const classes = useStyles();

  const [values, clearForm, handleChanges] = useForm(initialFormValues);
  
  ...
  
}
```

Now we have a very reusable custom hook that can take care of the stateful logic for _any_ form in our app!

#### Composing Multiple Hooks in A Single Custom Hook

1. Now this is cool, but the magic of hooks really comes into play when we compose multiple hooks together to extend mutiple pieces of logic to a component through a single hook.

2. create a `useLocalStorage.js` file in the `/hooks` directory.

3. explain that we are going to create a custom hook that will take the place of any `useState` call. But, this hook has a super power. It will keep track of the data for the piece of state in localStorage! So, anywhere we have a piece of state being managed by `useState`, we can replace that with `useLocalStorage` and now that data will be persisted in the browser.

4. Review localStorage. I open up the MDN docs for local storage and just follow their examples in the browser devtools. This is the flow I have used, explaining each method as I go along:

<img src="https://tk-assets.lambdaschool.com/a886c4ff-8ba5-4cca-a751-e50c7a7ea73e_ScreenShot2020-03-11at11.37.20AM.png" width="800" />

(I also explain that we need to stringify data going onto localStorage, and parse data coming out of localStorage)

5. Add these comments to the `useLocalStorage` hook:

```javascript 
import { useState } from 'react';

// set up state property
// capture the values
// if local data use that, else use initial data
// update localStorage when needed
// Don't forget to parse data from localStorage, and stringify new data getting stored

export const useLocalStorage = () => {
  
};

// should work almost exactly like useState - except any value that is controlled by this hook will be saved and persisted to localStorage
```

6. Pass in two parameters - `key` and `initialValue` 

```javascript 
import { useState } from 'react';

// set up state property
// capture the values
// if local data use that, else use initial data
// update localStorage when needed
// Don't forget to parse data from localStorage, and stringify new data getting stored

export const useLocalStorage = (key, initialValue) => {
  
};

// should work almost exactly like useState - except any value that is controlled by this hook will be saved and persisted to localStorage
```

7. Add the state property. But instead of passing in an initial value, we will pass in a function so we can run some JavaScript to see if we have the value we need already in localStorage. If we do, we will set our state to that value, otherwise we will set the state to the initial value.


```javascript 
import { useState } from 'react';

// set up state property
// capture the values
// if local data use that, else use initial data
// update localStorage when needed
// Don't forget to parse data from localStorage, and stringify new data getting stored

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (window.localStorage.getItem(key)) {
      return JSON.parse(window.localStorage.getItem(key));
    }
    window.localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  });
};

// should work almost exactly like useState - except any value that is controlled by this hook will be saved and persisted to localStorage
```

8. Return `storedValue` from the hook, but explain that we won't be returning `setStoredValue`. We're going to write our own updater function to return out of here.

9. Create the `setValue` function, and return that from the hook. Explain that we are doing this so that we can update state and update localStorage anytime the value changes.

Now our hooks is ready to use:
```javascript
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (window.localStorage.getItem(key)) {
      return JSON.parse(window.localStorage.getItem(key));
    }
    window.localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  });

  const setValue = value => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};
```

10. Use the local storage hook in the use form hook (Keep in mind that we need to pass a key string from the component to useForm, then forward that on to useLocalStorage)

```javascript
// useForm.js
export const useForm = (key, initialValues) => {
  const [values, setValues] = useLocalStorage(key, initialValues);

  ...
};


// SignupForm.js
export default function SignupForm() {
  const [values, clearForm, handleSubmit, handleChanges] = useForm(
    'signUpForm',
    initialFormValues
  );

  ...
  
}
```

11. Show the magic! Fill out the form, then refresh the page

_Note: this flow is very "functional programming oriented" so it's really hard for student to follow the flow at first. Make sure you leave enough time at the end of the lecture to walk through the flow from function to function at least once, if not a few times._


### Module Project Review
* [Dark Mode](https://github.com/LambdaSchool/dark-mode)

## Breakout Slack Messages

----

## After Class Message
Hope you all enjoyed today's guided Lesson!
A reminder if that office hours are from 3:30 - 4:30 Lambda Time. Don't forget to complete the days Check for Understanding and Pulse Checks! 

Module Project
[Dark Mode](https://github.com/LambdaSchool/dark-mode)

Here is a review of today's material.

Key Terminology
* 📝 *term* - [description](#)

Key Concepts
* 📝 *concept* - [description](#)