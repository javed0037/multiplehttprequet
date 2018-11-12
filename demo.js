const axios = require('axios');
const request = require('request-promise');
var final1 = [];
var arrdata = [];
function myfun(name1){
for (let i = 0,  len = name1.length; i < len; i++) {

  arrdata = arrdata.concat(JSON.parse(name1[i]));

}
return arrdata;
}
function myfun1(name2){

for (let i = 0,  len = name2.length; i < len; i++) {
if(name2[i].length > 0)
  final1 = final1.concat(JSON.parse(name2[i]));

}

return final1;

}

async function test(){
    try{
console.log(new Date())
var allurl = [];
var marketdataarr = [];
let url = 'http://139.162.242.237/betfair/socket/super_admin_matches.php?type=4';
let url2 = 'http://139.162.242.237/betfair/socket/super_admin_matches.php?type=1';
let url3 = 'http://139.162.242.237/betfair/socket/super_admin_matches.php?type=2';
var urls = [url,url2,url3];

var promises = await urls.map(url1 => request(url1));
var name = await Promise.all(promises);
var data1 = await myfun(name);

var marketUrl = 'http://176.58.100.128/br_api/matchapi.php?Action=listMarketTypes&EventID=';
for (let j = 0,  len1 = data1.length; j < len1; j++) {

 allurl.push('http://176.58.100.128/br_api/matchapi.php?Action=listMarketTypes&EventID='+data1[j])
}

var promises1 = await allurl.map(url2 => request(url2));

var name1 = await Promise.all(promises1);
console.log(name1.length)
var data2 = await myfun1(name1);
var marketidarr = data2.map(value =>{
  return value.marketId;
})
console.log("data2--",marketidarr.toString())
console.log(new Date())


}catch(e){
  console.log("error",e);
}
}

test();
