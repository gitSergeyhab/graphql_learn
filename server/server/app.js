const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const {connect, connection} = require('mongoose');
const cors = require('cors');
const { DB_PASSWORD } = require('../const');

const app = express();
const PORT = 3005;


connect(`mongodb+srv://sergey:${DB_PASSWORD}@cluster0.eh3qs.mongodb.net/graphql`, { useUnifiedTopology: true, useNewUrlParser: true });


// const start = async () => {
//     try {
//       await connect(`mongodb+srv://sergey:${DB_PASSWORD}@cluster0.eh3qs.mongodb.net/graphql`);
//       console.log('DB connected');
//     } catch (err) {
//       console.log('server ERROR', err.message);
//       process.exit(1);
//     }
//   };


  
// start();



app.use(cors());
app.use('/graphql', graphqlHTTP({schema, graphiql: true}));


connection.on('error', (err) => console.log(`Connection error: ${err}`));
connection.once('open', () => console.log('OK !'));

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started');
})