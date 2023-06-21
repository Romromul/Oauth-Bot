const express = require('express');

const server = express();


server.all('/', (req, res)=>{

   res.setHeader('Content-Type', 'text/html');

   res.write('The bot is online');

   res.end();

})




function keepAlive(){

   server.listen(3000, ()=>{console.log(`\u001b[32m✔ \u001b[0mThe Server Is Online! 
\u001b[32m▣\u001b[0m \u001b[0mBot Connected: \u001b[34;1mOauth Bot
\u001b[32m▣\u001b[0m \u001b[0mBot Run By: \u001b[34;1mFelosi\u001b[0m`)});

}



module.exports = keepAlive;