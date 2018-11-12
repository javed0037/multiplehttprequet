const redis = require('redis');
const express = require('express');
const cors = require('cors')
var router = express.Router();
const request = require('request-promise');
const bodyparser = require('body-parser')
const http = require("http");
const ipfilter = require('express-ipfilter').IpFilter;
var app = express();
const axios    = require('axios');
app.use(bodyparser({
    limit: '50mb'
}))
app.use(bodyparser.urlencoded({
    limit: '50mb'
}));
app.use(bodyparser());
app.use(bodyparser.json());
app.use(cors())
var async = require("async");
client = redis.createClient();
require('dotenv').config();

let url = 'http://139.162.242.237/betfair/socket/super_admin_matches.php?type=4';
let url2 = 'http://139.162.242.237/betfair/socket/super_admin_matches.php?type=1';
let url3 = 'http://139.162.242.237/betfair/socket/super_admin_matches.php?type=2';
var urls = [url,url2,url3];

const promises = urls.map(url1 => request(url1));
//console.log("promisessss",request(url));

Promise.all(promises).then((data) => {
  var arrdata = [];
  var marketdataarr = [];
  data.forEach(function(element) {
       arrdata = arrdata.concat(JSON.parse(element));
});
//console.log("arrdata",arrdata);
var marketUrl = 'http://176.58.100.128/br_api/matchapi.php?Action=listMarketTypes&EventID='



arrdata.forEach(async function(element1) {

     let response = await axios.get(marketUrl+element1);
     let result =   response.data.map(a => a.marketId);
     marketdataarr   = marketdataarr.concat(result);
    // console.log("market id---------",result);

});

console.log("final array",marketdataarr);

})


let port = process.env.PORT || 5016;

app.listen(port, function(req, res) {
    console.log("app is listen on the port no ", port);
})
