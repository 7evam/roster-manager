const express        = require('express');
const logger         = require('morgan');
const app            = express();
const reactViews     = require('express-react-views');
const path           = require('path');
// const messageRouter  = require('./api/messageRouter')
const bodyParser     = require('body-parser');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());
app.set('views', path.join(__dirname, './src'));
app.use(express.static('public'))
// app.use('/api', messageRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server up and listening on port ${PORT} in ${app.get('env')} mode`));
