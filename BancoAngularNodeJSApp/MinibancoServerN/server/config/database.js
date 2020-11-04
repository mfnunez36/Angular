let user = 'sharapp';
let pass = 'Ix0gSXrRBSDB24AN';
let dbname= 'ripley';

module.exports = {
    'url': `mongodb+srv://${ user }:${ pass }@cluster0.peksg.mongodb.net/${ dbname }?retryWrites=true&w=majority`
}