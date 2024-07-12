const { application } = require('express');
const express = require('express');
const { request } = require('http');
const app = express();
const path =require('path');
const members = require('./Members/Members');
const PORT = process.env.PORT||5000;

app.get('/api/members', (req, res) => res.json(members));


app.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `no member with id: ${req.params.id} ` });
    }
});

app.post('/api/members?',(req, res, next) => {
    if (req.params !== null) {
        res.status(400).json({msg: `no member to post` });
      } else {
        members.push(req.params);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
      }
    }
)

app.use(express.static(path.join(__dirname,'public')));



app.listen(PORT,()=>(console.log(`ruuning on localhost ${PORT}`)));


// router.get('/', (req, res) => {
//     res.json(members);
// });





// module.exports = router;