var connect = require('connect');
    serveStatic = require('serve-static');
    network = require('network');
    winston = require('winston');
    port = process.env.PORT || 8080;
    liveReload = require('livereload');
    project = require('./package.json');

    // lets create a global logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

connect().use('/' + project.name, serveStatic(__dirname)).listen(port)

var liveReloadServer = liveReload.createServer()

liveReloadServer.watch(__dirname)

logger.info('Running:')
logger.info('\t' + project.name)
logger.info('LiveReload Server is watching:')
logger.info('\t' + __dirname)

network.get_active_interface(function(err, obj) {

    var address = `:${port}/${project.name}`;

    logger.info('The magic happens at')
    logger.info('\t Localhost: http://localhost' + address)

    network.get_public_ip(function(err, ip) {
        // should return your public IP address
        logger.info("\t Public IP:", err || ip + address);
    })

    network.get_private_ip(function(err, ip) {
        // err may be 'No active network interface found'.
        logger.info("\t Private IP:", err || ip + address);
    })
});
