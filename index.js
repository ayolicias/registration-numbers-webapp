const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const flash = require('express-flash');
const session = require('express-session');

const pg = require('pg');
const Pool = pg.Pool;

app.use(express.static('public'));
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helper: {

  }
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/registration_webapp';

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

app.use(session({
  secret: "<Enter Name>",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
// requiring/importing factory  function 
let regServices = require('./services/registration');
// requiring/importing routes
let regRoute = require('./routes/Regs');

const regsServices = regServices(pool);
const regsRoute = regRoute(regsServices);

app.get('/', regsRoute.home);
app.post('/registration', regsRoute.addReg);
app.get('/Reset', regsRoute.reset);
app.get('/filter', regsRoute.filter);
app.get('/filter/:town', regsRoute.filterTowns);

let PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
  console.log("App started on Port", PORT);
}); 