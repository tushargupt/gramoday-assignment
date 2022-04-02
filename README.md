# gramoday-assignment


# Introduction

This project requires the following tools:

- [Node.js](https://nodejs.org/en/) - The JavaScript environment for server-side code.
- [NPM](https://www.npmjs.com/) - A Node.js package manager used to install dependencies.
- MongoDB - It is NOT needed to be installed locally. An Atlas cluster have already been linked with the project.

## Getting Started

**Step 1. Clone the code into a fresh folder**

```
$ git clone https://github.com/tushargupt/gramoday-assignment.git
$ cd gramoday-assignment
```

**Step 2. Install Dependencies.**

Next, we need to install the project dependencies, which are listed in `package.json`.

```
$ npm install
```


**Step 3: Update environment variables and run the Server.**

.env file have already been updated with a correct Database URL.

Now we're ready to start our server which is as simple as:

```
$ npm run dev
```

Open http://localhost:8000 to view it in your browser.

The app will automatically reload if you make changes to the code.
You will see the build errors and warnings in the console.

**Step 4: Run the tests.**

We can run all the tests by:

```
$ npm test
```
