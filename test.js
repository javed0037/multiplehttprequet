const axios = require('axios');
const request = require('request-promise');

var arrdata = [];
function myfun(name1){
//console.log("name function ",name1)
for (let i = 0,  len = name1.length; i < len; i++) {
  arrdata = arrdata.concat(JSON.parse(name1[i]));

}
// name1.forEach( function(element) {
// arrdata = arrdata.concat(JSON.parse(element));
// });
return arrdata;

}

async function test(){

var marketdataarr = [];
let url = 'http://139.162.242.237/betfair/socket/super_admin_matches.php?type=4';
let url2 = 'http://139.162.242.237/betfair/socket/super_admin_matches.php?type=1';
let url3 = 'http://139.162.242.237/betfair/socket/super_admin_matches.php?type=2';
var urls = [url,url2,url3];

var promises = await urls.map(url1 => request(url1));
var name = await Promise.all(promises);
var data1 = await myfun(name);
console.log("length for array ",data1.length)
var marketUrl = 'http://176.58.100.128/br_api/matchapi.php?Action=listMarketTypes&EventID=';
for (let j = 0,  len1 = data1.length; j < len1; j++) {
let response = await axios.get(marketUrl+data1[j]);
console.log("there are the response",response.data.length)
if(response.data.length > 0){
for (let k = 0, len2 = response.data.length; k < len2; k++) {
marketdataarr.push(response.data[k].marketId);
}
}
}
console.log("marketdataarr ::::",marketdataarr);

}

test();
