var Servername = "patients"
var port = 8000;
var ip = '127.0.0.1'

var getCounter = 1
var postCounter = 1


var restify = require('restify')

, savePatients = require('save')('patients')

, server = restify.createServer({ name: Servername})

server.listen (port, ip, function() {

console.log('Server %s listening on url %s',server.name,server.url)
console.log('Resources:')
console.log(' http://127.0.0.1:8000/patients')
console.log(' http://127.0.0.1:8000/patients/:id') 

})

server

.use(restify.fullResponse())

.use(restify.bodyParser())

server.get('/patients', function (req, res, next) {
  
  console.log("Get request counter:" + getCounter++);
  

savePatients.find({}, function (error, patients) {

  res.send(patients)
})
})


  //Used to get patients by their id
server.get('/patients/:id', function(req, res, next){
    
      savePatients.findOne({_id: req.params.id}, function(error, patient){
    
        if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        if(patient) {
    
          res.send(patient)
        }
    
        else {
    
          res.send(404)
        }
    
      })
    })


    //Used to input patient
server.post('/patients', function(req, res, next) 
    {

      console.log("Post counter:" + postCounter++);
    
      if(req.params.firstname === undefined)
      {
        return next(new restify.InvalidArgumentError('firstname must be supplied'))
      }

      if(req.params.lastname === undefined)
      {
        return next(new restify.InvalidArgumentError('lastname must be supplied'))
      }

      if(req.params.gender === undefined)
      {
        return next(new restify.InvalidArgumentError('gender must be supplied'))
      }

      if(req.params.age === undefined)
      {
        return next(new restify.InvalidArgumentError('age must be supplied'))
      }

      if(req.params.appointment === undefined)
      {
        return next(new restify.InvalidArgumentError('appointment must be supplied'))
      }

      if(req.params.address === undefined)
      {
        return next(new restify.InvalidArgumentError('address must be supplied'))
      }

      if(req.params.doctor === undefined)
      {
        return next(new restify.InvalidArgumentError('doctor must be supplied'))
      }

      if(req.params.bloodgroup === undefined)
      {
        return next(new restify.InvalidArgumentError('bloodgroup must be supplied'))
      }
    
    
      var newPatients = {
        
        firstname: req.params.firstname,
        lastname: req.params.lastname,
        address: req.params.address,
        gender: req.params.gender,
        age: req.params.age,
        bloodgroup: req.params.bloodgroup,
        appointment: req.params.appointment,
        doctor: req.params.doctor
      }
    
      savePatients.create( newPatients, function(error, patient) {
    
        if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        res.send(201, patient)
    
      })
    
    })

    
