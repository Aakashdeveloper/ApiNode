var express = require('express');
var mongodb = require('mongodb').MongoClient;

var app = express();

var port = process.env.PORT||3000; 
var commanRouter = express.Router();

commanRouter.route('/getProducts')
    .get(function(req,res){
    	var url ='mongodb://localhost:27017';
    	mongodb.connect(url, (err, db) => {  
			  if (err) {
			    return console.log(err);
			  }
			  var dbo = db.db('secondclass')
			  dbo.collection('second').find({}).toArray(
            	function(err,data){
					if(err)
					   
					   res.status(500).send(err);
					else
						res.setHeader('Access-Control-Allow-Origin','*')
		    		    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept')
						res.json(data);
		})
		})
		
});


app.use('/api', commanRouter);

app.get('/',function(req,res){
	res.send("Working")
});
app.use(express.static(__dirname + '/public'));

app.listen(port, function(){
	console.log("running");
});