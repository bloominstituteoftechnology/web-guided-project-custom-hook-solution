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

### Introduce Module:
* Explain that we will now be pivoting back to functional components.
* This lesson will be more about application architecture.
* We will start by discussion, not just stateful logic, but how we break down an application into ALL it component parts.

### Defining Stateful Logic.
* Discuss what stateful logic is.
* Discuss why should we even want to identify stateful logic.
* Highlight Dryness, Organization, Reusablity. 

### Introduce Separation of Concerns
* Discuss seperation of concerns.
* Highlight any one piece of code should ultimately do one thing and be kept in a seperate file.
* Highlight the different types of logic within a given piece of React code.

### Walk through presentational refactoring.
* Open up review project and note the App.js
* Discussion how we would modularize our presentation into subcomponents.
* Checkout review-presentational branch.
* Note that because we have refactored, we need to pass values in through props.
* Note the flexibility of using components.
* Note the hierarchy of files created.

### Walkthrough service refactoring.
* Create a new function that handles service for getAllPoke.
* Create a new function that handles service for get an indivisual pokemon.
* Modularize our service code as well.
* Highlight the difference between export default and export.

### Walkthrough state refactoring.
* Highlight that we still have code that has to do with something other then presentation of based components: Stateful logic.
* Custom Hooks are our method of encapliating stateful behavior.
* Create a custom hook
  1. usePokeState as the name.
  2. add in all defintions of our pokemon stateful logic.
  3. return all needed functions and data to our App code.
* Show review-hooks branch.
* Discuss the advatages of new style.
* Review the advantages of modularized style of code and the refactoring process.

### BREAK





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