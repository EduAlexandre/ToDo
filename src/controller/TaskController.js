const TaskModel = require('../model/TaskModel')
const { 
    startOfDay, 
    endOfDay, 
    startOfWeek, 
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear
  } = require('date-fns')
/*
  * Constant: take a current hour and date 
  */
const current = new Date()

class TaskController {
   
  /*
  * Method: Create Task
  */
  async create(req, res) {
    const task = new TaskModel(req.body)
    await task
             .save()
             .then(response => {
               return res.status(200).json(response)
             })
             .catch(error => {
               return res.status(500).json(error)
             })
  }

  /*
  * Method: Update Task
  */
  async update(req, res) {
     await TaskModel.findByIdAndUpdate(
       { '_id': req.params.id}, req.body, { new: true })
       .then(response => {
         return res.status(200).json(response)
       })
       .catch(err => {
         res.status(500).json(err)
       })
  }

  /*
  * Method: List All Task
  */
  async all(req, res) {
    
    await TaskModel.find({ macaddress: {'$in': req.params.macaddress} })
           .sort('when')
           .then(response => {
             return res.status(200).json(response)
           })
           .catch(err => {
             return res.status(500).json(err)
           })
  }

  /*
  * Method: Show a specific Task 
  */
  async show(req, res) {
    await TaskModel.findById(req.params.id)
          .then(response =>{
            if(response)
             return res.status(200).json(response)
            else
            return res.status(400).json({ error: 'Tarefa não encontrada'})
          })
          .catch(error => {
            return res.status(500).json(error)
          })
  }

  /*
  * Method: Delete a Task 
  */
  async delete(req, res) {
    await TaskModel.deleteOne({'_id': req.params.id})
          .then(response => {
            if(response)
             return res.status(200).json(response)
            else
            return res.status(400).json({ error: 'Tarefa não encontrada'})            
          })
          .catch(error => {
            return res.status(500).json(error)
          })
  }

  /*
  * Method: Change status of a Task 
  */
  async done(req, res){
    await TaskModel.findByIdAndUpdate(
      {'_id': req.params.id},
      {'done': req.params.done},
      {new: true})
      .then(response =>{
        return res.status(200).json(response)
      })
      .catch(error => {
        return res.status(500).json(error)
      })    
  }

  /*
  * Method: Filter a late Task 
  */
 async late(req, res){
    await TaskModel.find({
      'when': {'$lt': current},
      'macaddress': {'$in': req.params.macaddress}
    })
    .sort('when')
    .then(response => {
      return res.status(200).json(response)
    })
    .catch(error => {
      return res.status(500).json(error)
    })
 }
 

  /*
  * Method: Filter a Task of day 
  */
 async today(req, res){
   await TaskModel.find({
     'macaddress': {'$in': req.params.macaddress},
     'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)}
   })
   .sort('when')
   .then(response => {
     return res.status(200).json(response)
   })
   .catch(error => {
     return res.status(500).json(error)
   })
 }


  /*
  * Method: Filter a Task of week 
  */
 async week(req, res){
   await TaskModel.find({
     'macaddress': {'$in': req.params.macaddress},
     'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}
   })
   .sort('when')
   .then(response => {
     return res.status(200).json(response)
   })
   .catch(error => {
     return res.status(500).json(error)
   })
 }

 /*
  * Method: Filter a Task of month 
  */
 async month(req, res){
   await TaskModel.find({
     'macaddress': {'$in': req.params.macaddress},
     'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)}
   })
   .sort('when')
   .then(response => {
     return res.status(200).json(response)
   })
   .catch(error => {
     return res.status(500).json(error)
   })
 }

 /*
  * Method: Filter a Task of year 
  */
 async year(req, res){
   await TaskModel.find({
     'macaddress': {'$in': req.params.macaddress},
     'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}
   })
   .sort('when')
   .then(response => {
     return res.status(200).json(response)
   })
   .catch(error => {
     return res.status(500).json(error)
   })
 }
}

module.exports = new TaskController();