const   express = require('express'),
        app = express(),
        cors = require('cors'),
        home_router = require('./Routes/Home.api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/covidportal', home_router);
// app.use(ApiErrorHandler);

app.listen(5000, () => {console.log('Server is listening on port 5000 http://localhost:5000/api/covidportal/')});