let user = '****';
let pass = '*******';
let dbname= '*****';

module.exports = {
    'url': `mongodb+srv://${ user }:${ pass }@cluster0.peksg.mongodb.net/${ dbname }?retryWrites=true&w=majority`
}
