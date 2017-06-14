const localStrategy = require('passport-local').Strategy,
      mongo = require('mongodb').MongoClient,
      url = 'mongodb://Admin:eric@ds045454.mlab.com:45454/condominio';

module.exports = function(passport){
    passport.serializeUser(function(user,done){
        done(null,user);
    });

    passport.deserializeUser(function(obj,done){
        done(null,obj);
    });

    passport.use(new localStrategy({
        passReqToCallback : true
    },function(req, correo, password, done){
        mongo.connect(url,function(err,db){
            if(err) throw err;
            var collection = db.collection('Prueba');
            collection.find({correo : correo}).toArray(function(err,user){
                if(err) throw err;
                if(password === user[0].password){
                    db.close();
                    return done(null,user);
                }
                return done(null,false, req.flash('autenticacion','Correo o Password incorrectos'));
            }); 
        });
    }
    ));

};