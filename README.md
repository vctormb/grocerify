<p align="center">
 <img src="https://github.com/vctormb/grocerify/blob/master/docs/grocerify-logo.svg" width="280" />
</p>  
<p align="center">Made with React, Styled Components, GraphQL Apollo and Prisma</p>

<hr />

Grocerify is a mobile-first web app that you can:  
- see all the products; 
- authenticate to add the products to your shopping cart (JWT authentication); 
- see your shopping cart with the total price, add more or less products or remove them from your cart;

<p align="center">
 <img src="https://github.com/vctormb/grocerify/blob/master/docs/grocerify.gif" height="500" />
</p>

## Why?
I did this project in my free time to aprimorate my skills on Apollo Client with React.  
At first, I just wanted to consume a GraphQL API without building the back-end, but I wanted to challenge myself to understand the whole stack to create my own logic, so I decided to build the back-end too.

## Running the Back End
1. Create an account on [Prisma Cloud](https://www.prisma.io/cloud)

After the first step, run the following commands in the root folder of the project to start the back-end:  

2. install prisma globally 
```
npm install -g prisma
```

3. you can choose the prisma demo server
```
prisma deploy  
```

4. generate the prisma client
```
prisma generate
```

5. start the project
```
npm run start
```

## Running the Front End

1. go to the client's folder
```
cd client
```

2. you can use NPM too
```
yarn install
```

3. start the project
```
yarn run start
```

if you want to run the tests
```
yarn test
```

## Tech Stack 
- [React](https://www.reactjs.org/); 
- [Styled Components](https://www.styled-components.com/);
- [GraphQL Apollo](https://www.apollographql.com/) Client and Server;
- [Prisma](https://www.prisma.io/); 
- [React Testing Library](https://github.com/kentcdodds/react-testing-library) for integration testing;

## Roadmap
- Rewrite the UI to use TypeScript;
- Add form validation;
- E2E testing with Cypress;
- Aprimorate the UI to handle better with caching;
- Aprimorate the back-end;
- loading...
