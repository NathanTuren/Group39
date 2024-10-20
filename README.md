# Volunteer Website Application
**Carter Ung, Nathan Turen, Dion Olumese, Kelsey Wong**

## Setup 
To run our application, you need to activate a localhost server for client-side and server-side. 

### Client-Side
To run client-side, `cd` into `client` folder and then run `npm install` to build the `node modules` folder hosting your dependencies including React, Material UI Library, Jest, etc. Next, you can build the application using `npm run build`. 

After you have built and installed the proper dependencies, you can run the website locally using `npm start`. This will populate our client on `localhost:3000`.  

### Server-Side
To run server-side, `cd` into `server` folder and then run `npm install` to build the `node modules` folder hosting your dependencies including Node and express. 

After you have installed the proper dependencies, you can run the server using `npm start`. This will populate our server side hosting our APIs on `localhost:4000`.

*For notice, you must run client-side and server-side simulateneously on two separate terminals. For example, one terminal you will use `npm start` inside the `client` folder to start the client's `localhost:3000` and the other terminal you will run `npm start` inside ther `server` folder to run `localhost:4000` for the server. 

## Testing 
To run unit tests, go inside the `client` folder and run `npm test` to run full tests across our client. To check test coverage, run `npm run test-coverage`. For server, `cd` into `server` folder and run `npm test` to run tests and `npm run test:coverage` to check server test coverage.

## Adding Features
We use the [Materials UI Component Library](https://mui.com/material-ui/getting-started/) to generate props and components such as Buttons, Inputs, etc. Please reference this library for local frontend development.
