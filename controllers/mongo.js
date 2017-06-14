const url = 'mongodb://Admin:eric@ds045454.mlab.com:45454/condominio';
const mongo = require('mongodb').MongoClient;

module.exports ={
      update: function(req, coll){
        var op = req.body;
               var total = 0;
               var abono = 0;
               var saldo = 0;
        for (var key in op){
            if(Object.prototype.hasOwnProperty.call(op,key)){
                if (key.toString().includes("dep",0) || key.toString().includes("_id",0) || key.toString().includes("abonar",0)) {                 
                }else{
                    total += parseInt(op[key]);
                    op[key] = parseInt(op[key]);
                    op.total = total;
                }
            }
        };
          abono = parseInt(op.abonar);
          saldo = abono - total;
          op.saldo = saldo
            console.log(op)
            mongo.connect(url,function(err,db){
            var collection = db.collection(coll);
            collection.update({_id : op.dep}, {$set: {pagos: op}}, {},function(err, object){
                    if (err)
                        console.warn(err.message);
                });
            });
      }

}