## Project Goal 
The goal is to create a Bug/Issue Tracker Web Application with a cloud server using MERN framework (MongoDB, Express.js, React.js and Node.js).

## Photos of Progress

![Screen Shot 2022-02-09 at 9 57 50 PM](https://user-images.githubusercontent.com/74369791/153328666-da4b979d-ea91-4958-93bc-001eff5df6a4.png)


## Steps to Create Project

### 1. Setup of Node.js, the Backend Server
#### a) Download and Setup Node.Js
Download the appropriate version of Node.JS for your Operating System from https://nodejs.org/en/ .
Then in terminal run: ```node -v```

#### b) Create Directories for backend and Create a Package.json file 
In terminal change your directory until you are a directory of your computer that you want to create your project in.

Terminal: ```cd Desktop```

Create Folder where you will store your whole project. You can name it whatever you want. For example's sake let's call our project 'bugTracker'

Terminal: ```mkdir bugTracker```

Now let's move into the folder and make a directory called 'backend':

Terminal: ```cd bugTracker```\
Terminal: ```mkdir backend```\

Now let's go into the backend folder for our next step
Terminal: ```cd backend```

#### c) Create a Package.Json files by running npm init 
We can use npm init to help us ease the creation of package.json files

Terminal: ```npm init```

#### d) Install Few Dependencies 

Terminal: ```npm install express cors mongodb dotenv```

>*Express is a framework that acts as a light layer atop the
Node.js web server making it easier to develop Node.js web applications.
It simplifies the APIs of Node.js, adds helpful features, helps organizes our
application’s functionality with middleware and routing and many others.
CORS stands for Cross-Origin Resource Sharing. By default, modern
browsers don’t allow frontend clients to talk to REST APIs. They block
requests sent from clients to the server as a security mechanism to make sure
that client-side browser JavaScript code can only talk to their own allowed
server and not to some other servers which can potentially run malicious
code. To circumvent this security mechanism, we can enable CORS
checking, a mechanism that uses additional HTTP headers to tell browsers to
give a web application running at one origin, access to selected resources
from a different origin.
The cors package we are installing provides an Express middleware that can
enable CORS with different options so we can make the right connections on
the network.
The mongodb dependency allows us to interact with our MongoDB database.
The dotenv dependency loads environmental variables from the process.env
file instead of setting environment variables on our development machine
which simplifies development.*
#### e) Implementing Automatic Server Restart with nodemon
We can install nodemon which will automatically restart the server whenever changes are detected.
You can read more about this here (https://www.npmjs.com/package/nodemon). 

In terminal you can install nodemon globally: `npm install -g nodemon`

### 2. Setup of Node.js, the Backend Server
#### a) Building Server.js
In backend folder you can create a new file called server.js: `mkdir server.js`
In server.js you can add this code: 

```jsx
import express from 'express'
import cors from 'cors'
import issues from './api/issues.route.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1/issues", issues)
app.use('*', (req,res)=>{
res.status(404).json({error: "not found"})
})
export default app
```
#### b) Explaining the Code of Server.js
We first import the express and cors middleware. We also import
issues.route.js which is a separate file we will create later to store our routes.
```jsx
import express from 'express'
import cors from 'cors'
import issues from './api/issues.route.js'
```

We first import the express and cors middleware. We also import
issues.route.js which is a separate file we will create later to store our routes.


We create the server with ```const app = express()```\
We attach the *cors* and *express.json* middleware that express will use with:
```jsx
app.use(cors())
app.use(express.json())
```
>*express.json is the JSON parsing middleware to enable the server to read and
accept JSON in a request ’ s body.*
>With app.use(express.json()), the express.json()
middleware let’s us retrieve data from a request via the body attribute.
Without this middleware, data retrieval would be much more difficult.
#### c) Storing Valuable Environment Variables 

Create an .env file where you will store the URI of our database in MongoDB Atlas. 
If you haven't created an account, you can create a free one in MongoDB Atlas and you can choose from the options of cloud server providers. ( *I chose AWS* ).
**** WARNING List your .env file to .gitignore, and make sure not to share your URI with anyone, because your URI is sensitive information.

When you're at your cluster click '**Connect**'.

<img width="649" alt="Screen Shot 2022-02-10 at 3 49 11 AM" src="https://user-images.githubusercontent.com/74369791/153371013-2447c376-91fc-4285-b252-545d1a760e19.png">

Choose '**Connect Your Application**' and copy the URL provided.

<img width="787" alt="Screen Shot 2022-02-10 at 3 52 44 AM" src="https://user-images.githubusercontent.com/74369791/153371629-6ea4d4cf-d213-4543-9f43-f2833375e4fd.png">

>Remember to make sure that you replace the words 'password' with your user's password and replace 'MyFirstDatabase' with the database of your choice that's in your cluster. As shown below:
<img width="689" alt="Screen Shot 2022-02-10 at 3 55 28 AM" src="https://user-images.githubusercontent.com/74369791/153372083-d3785bff-23b4-430d-bb97-09b81b093b48.png">

In your **.env** file there should be three variables:

```jsx
ISSUES_DB_URI = mongodb+srv://newuser1:pwd123@cluster0.vxjpr.mongodb.net/issues_db?retryWrites=true&w=majority
```
```jsx
ISSUES_NS = issues_db //our database name
```
```jsx
PORT = 5000 //starting port of the server, PORT NUMBER can be any open PORT. In development, I used 3001 for example
```

1. The **ISSUES_DB_URI** variable stores your URI that you copied and updated with your password and database you want to access.
2. The **ISSUES_NS** ariable stores the namespace of the database. 
3. THE **PORT** variable stores the starting port of the server.

#### d) Connect to Database and Start Server - *index.js*
