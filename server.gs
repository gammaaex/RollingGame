var TABLE_ID = '';
var SHOW_LIMIT = 5;

function doGet() {
   var t = HtmlService.createTemplateFromFile("index.html");
   return t.evaluate();
}

//function doPost(e) {
//  setData(e.parameter.score);
//  return dataToString(selectSortedLimited('score',SHOW_LIMIT))
//}
  
function select(){
  var sql = 'SELECT * FROM ' + TABLE_ID;
  var res = FusionTables.Query.sql(sql);
  
  return res.rows;
}

function insert(id,score,date){
  var sql = 'INSERT INTO ' + TABLE_ID + '(id,score,date) VALUES (' + id + ',' + score + ",'" + date + "');";
  var res = FusionTables.Query.sql(sql);
}

function getLastId(){
  var sql = 'SELECT id,score,date FROM ' + TABLE_ID;
  var res = FusionTables.Query.sql(sql);
  
  if(res.rows != undefined){
    var lastId = res.rows[res.rows.length-1][0];
    return +lastId; // + ... 単項正値演算子は、そのオペランドをNumber型に変換します。
  }else {
    return 0;
  }
}

function setData(argScore){
  var id = getLastId() + 1;
  var score = argScore;
  var date = Utilities.formatDate(new Date(),"JST","yyyy-MM-dd HH:mm");
  
  this.insert(id,score,date);
}

function selectSortedLimited(column,limit){
  var sql = 'SELECT * FROM ' + TABLE_ID + ' ORDER BY ' + column + ' DESC LIMIT ' + limit;
  var res = FusionTables.Query.sql(sql);
  
  return res.rows;
}

function dataToString(res){
  var result = "";
  for(var i=0; i < res.length; i++){
    result += "Rank." + (i+1) +" | id : " + res[i][0] + " | Score : " + res[i][1] + " | PlayTime : " + res[i][2] + "\n";
    if(i >= SHOW_LIMIT) break;
  }
  
  return result;
}

function getDataToString(){
  return dataToString(selectSortedLimited('score',SHOW_LIMIT))
}