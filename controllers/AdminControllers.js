const url = 'mongodb://Admin:eric@ds045454.mlab.com:45454/condominio';
const mongo = require('mongodb').MongoClient;
const update = require('./mongo');


module.exports ={
      getUserPanel: function(req, res, netx){
         res.render('admin/panel',{
         isAuthenticated : req.isAuthenticated(),
         user : req.user,
         title : 'Panel del Administrador'});
        console.log(`> Sirviendo Panel de Administrador`); 
      },

      postCobro: function(req, res, netx){
            mongo.connect(url,function(err,db){
            var collection = db.collection('pagos');
            collection.insert(req.body,(err,data)=>{
                if (err) throw err; 
                update.update(req,'Prueba');
            });
        });
        console.log(`> Redireccionando a Panel del Admin.`);
        return res.redirect('/admin/panel');
      }
}