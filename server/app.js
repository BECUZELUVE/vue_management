var url = require("url");
var formidable = require('formidable');
var express = require("express");
var app = express();

app.use(express.static("www"));

var User = require("./models/User.js");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/manager",{useMongoClient:true})

app.get("/users",function(req,res){
    var query = url.parse(req.url,true).query
    var page = query.page; //页码
    var pagesize = query.pagesize; //每页数量
    var sortby = query.sortby; //排序条件
    var sortdirection = query.sortdirection; //正序倒序 1正序 -1倒序
    var keyword = query.keyword;
    var keywordArr = keyword.split(",");

    if(keywordArr.length > 1){//如果关键词超过两个，执行且逻辑查询
         var searchObj = {
            "name":  keywordArr.map(item=> new RegExp(item,"g")),
            "tel": keywordArr.map(item=> new RegExp(item,"g")),
            "sex": keywordArr.map(item=> new RegExp(item,"g")),
            "job": keywordArr.map(item=> new RegExp(item,"g"))
        }
    }else{
        var searchObj = {
            $or:[
                {"name": keywordArr.map(item=> new RegExp(item,"g"))},
                {"tel": keywordArr.map(item=> new RegExp(item,"g"))},
                {"sex": keywordArr.map(item=> new RegExp(item,"g"))},
                {"job": keywordArr.map(item=> new RegExp(item,"g"))}
            ]
        }
        
    }
    User.count(searchObj,function(err,count){
        User.find(searchObj).sort({[sortby]:sortdirection}).skip(pagesize * (page-1)).limit(pagesize).exec(function(err,results){
            res.json({count,results})
        })
    })
})

app.post("/users",function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, data) {
        User.create(data, function() {
            res.send("ok");
        })
    });
    
})

app.delete("/users",function(req,res){
    var id = req.query.id;
    User.remove({ "id": id }, function() {
        res.send("ok");
    })
})
app.listen(3000);