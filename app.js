"use strict";

let fs = require('fs');
let GuestbookEntry = require('./src/GuestbookEntry');
let handlebars = require('handlebars');
let expressHandlebars = require('express-handlebars');
let express = require('express');
let bodyParser = require('body-parser');
//const { parseWithoutProcessing } = require('handlebars');

fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) throw err;
    let d = JSON.parse(data);

    let entries = [];
    for(let entry of d) {
        entries.push(new GuestbookEntry(entry.title, entry.content));
    }

//Starte den Server
let app = express();
app.set('view engine', 'html');
app.set('views', './views');

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


app.engine('html', expressHandlebars({
    defaultLayout: 'main',
    extname:'.html'
}));

app.get('/index', (req, res) => {
    res.render('index', {
        entries: entries
    });
});

app.post('/guestbook/new', (req, res) => {
    let content = req.body.content;
    let title = req.body.title;

    let newEntry = new GuestbookEntry(title, content);
    entries.push(newEntry);

    //Schreibe Daten in Datei
  fs.writeFile("./data.json", JSON.stringify(entries), (err) => {
    if (err) throw err;
  });
   
    res.redirect('/index.html');
    });

app.listen(5000, () => {
    console.log('App wurde gestartet');
})
});
