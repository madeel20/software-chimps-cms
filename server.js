const express = require('express');
const path = require('path')

const app = express();

// //app.listen(PORT,process.env.HOST || '0.0.0.0');
app.set('port', (process.env.PORT || 8080));


    // the relative path from src/server/server.js
    const staticRoot = path.resolve(__dirname, './client/build');

    app.use(express.static(staticRoot));
    app.get('*', function (req, res) {
        console.log('Hello worlds')
        res.sendFile('index.html', { root: staticRoot });
    });

app.listen(app.get('port'), function () {
    console.log('app running on port', app.get('port'));
});
