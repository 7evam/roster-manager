const express        = require('express');
const logger         = require('morgan');
const app            = express();
const reactViews     = require('express-react-views');
const path           = require('path');
const bodyParser     = require('body-parser');
const apiRouter    = require('./routes');


app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());
app.set('views', path.join(__dirname, './src'));
app.use('/api', apiRouter);

app.use(express.static('public'))

app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, './public/index.html'), function(err){
    if(err){
      console.log(path.join(__dirname, './src'))
      res.status(501).send(err)
    }
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server up and listening on port ${PORT} in ${app.get('env')} mode`));
