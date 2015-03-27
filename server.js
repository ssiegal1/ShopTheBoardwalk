
var express = require('express');
var path = require('path');
fs = require('fs');

// json slurping/validation
var shop_info_json, shop_schema_json;
try {
  var shop_info_json = fs.readFileSync(path.join(__dirname, '/shop_info.json'));
  var shop_schema_json = fs.readFileSync(path.join(__dirname, '/schema.json'));

  var Validator = require('jsonschema').Validator;
  var v = new Validator();
  v.validate(shop_info_json, shop_schema_json);
}
catch(err) {
  console.log('error reading json files: ' + err.message);
  return 1;
}

var shop_data = JSON.parse(shop_info_json);
console.log(shop_data);

var server = express();
server.use(express.static(__dirname + '/public'));
 
var port = 10001;

server.listen(port, function() {
    console.log('server listening on port ' + port);
});

server.get('/shop_data', function(req, res, next) {
  res.json(shop_data);
});
