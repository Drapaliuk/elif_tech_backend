const DBname = 'banks_app';
const params  = {
    useNewUrlParser: true, 
    dbName: DBname,
    useCreateIndex: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 3000,
    useFindAndModify: false,
}

module.exports = params;


