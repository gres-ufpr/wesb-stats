var connect = require('connect');
    serveStatic = require('serve-static');
    network = require('network');
    winston = require('winston');
    port = process.env.PORT || 8080;
    liveReload = require('livereload');
    project = require('./package.json');

connect().use('/' + project.name, serveStatic(__dirname)).listen(port)

var liveReloadServer = liveReload.createServer()

liveReloadServer.watch(__dirname)

winston.info('Running:')
winston.info('\t' + project.name)
winston.info('LiveReload Server is watching:')
winston.info('\t' + __dirname)

network.get_active_interface(function(err, obj) {

    var address = `:${port}/${project.name}`;

    winston.info('The magic happens at')
    winston.info('\t Localhost: http://localhost' + address)

    network.get_public_ip(function(err, ip) {
        // should return your public IP address
        winston.info("\t Public IP:", err || ip + address);
    })

    network.get_private_ip(function(err, ip) {
        // err may be 'No active network interface found'.
        winston.info("\t Private IP:", err || ip + address);
    })
});
