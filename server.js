// Generated by CoffeeScript 1.4.0
var Application, application, path;

path = require("path");

Application = require(path.join(__dirname, 'lib/application'));

require(path.join(__dirname, 'config/environment'));

application = new Application(global.config);

application.run();
