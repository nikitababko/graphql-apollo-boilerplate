require('dotenv').config({
  path: 'src/config/keys.env',
});

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const schema = require('./schema');
const users = [
  {
    id: 0,
    username: 'Vasya',
    age: 25,
  },
];

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

const createUser = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id == id);
  },
  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  try {
    console.log(`Server up and running on port: ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
