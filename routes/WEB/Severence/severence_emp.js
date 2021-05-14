module.exports = function(router, db,errorData,async){ 

//*************************  insert_reason_for_resignation START *********************************************//
 router.post('/insert_reason_for_resignation',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= "SET @employee_id=?;SET @date_of_resignation=?;SET @reason_for_resignation=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?; CALL sp_insert_reason_for_resignation (@employee_id,@date_of_resignation,@reason_for_resignation,@created_on,@updated_on,@created_by,@updated_by)";
    console.log("query",sProc);
    db.query(sProc,[reqParams.employee_id,reqParams.date_of_resignation,reqParams.reason_for_resignation,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by], function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
  
     res.send({ status: 1, msg: 'Success', data: [] }); 
     }  
     });  
   
}
   
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

//*************************  insert_hr_noc START *********************************************//
  router.post('/insert_hr_noc',async (req,res)=>{
    try
    {
     
      var reqParams=req.body;
     
      let sProc= " SET @employee_id=?; SET @hr_noc_date=?; SET @hr_noc_by=?; CALL sp_insert_hr_noc (@employee_id,@hr_noc_date,@hr_noc_by) ";
      console.log("query",sProc);
      db.query(sProc,[reqParams.employee_id,reqParams.hr_noc_date,reqParams.hr_noc_by], function(err,response){  
      if(err){     
      console.log(err);  
       res.send({ status: 0, msg: 'Failed', data: err }); 
      }else{   
    
       res.send({ status: 1, msg: 'Success', data: [] }); 
       }  
       });  
     
 }
     
      catch(ex)
      {
        res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
      }
     });
    
   //*************************  insert_resignation_approval START *********************************************//
 router.post('/insert_resignation_approval',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= "SET @employee_id=?;SET @resignation_accepted_on=?;SET @proposed_date_relieving=?; CALL sp_insert_resignation_approval (@employee_id,@resignation_accepted_on,@proposed_date_relieving)";
    console.log("query",sProc);
    db.query(sProc,[reqParams.employee_id,reqParams.resignation_accepted_on,reqParams.proposed_date_relieving], function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
  
     res.send({ status: 1, msg: 'Success', data: [] }); 
     }  
     });  
   
}
   
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

//*************************  get_severence START *********************************************//
  router.post('/get_severence',async (req,res)=>{
    try
    {
     
      var reqParams=req.body;
     
      let sProc= " SET @emp_id=?; CALL sp_get_severence (@emp_id) ";
      console.log("query",sProc);
      db.query(sProc,[reqParams.emp_id], function(err,response){  
      if(err){     
      console.log(err);  
       res.send({ status: 0, msg: 'Failed', data: err }); 
      }else{   
    
       res.send({ status: 1, msg: 'Success', data: response[1] }); 
       }  
       });  
     
 }
     
      catch(ex)
      {
        res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
      }
     });

//*************************  insert_it_noc START *********************************************//
router.post('/insert_it_noc',async (req,res)=>{
    try
    {
     
      var reqParams=req.body;
     
      let sProc= " SET @employee_id=?; SET @it_noc_date=?; SET @it_noc_by=?; CALL sp_insert_it_noc (@employee_id,@it_noc_date,@it_noc_by) ";
      console.log("query",sProc);
      db.query(sProc,[reqParams.employee_id,reqParams.it_noc_date,reqParams.it_noc_by], function(err,response){  
      if(err){     
      console.log(err);  
       res.send({ status: 0, msg: 'Failed', data: err }); 
      }else{   
    
       res.send({ status: 1, msg: 'Success', data: [] }); 
       }  
       });  
     
 }
     
      catch(ex)
      {
        res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
      }
     });

//*************************  insert_admin_noc START *********************************************//
 router.post('/insert_admin_noc',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= "SET @employee_id=?;SET @admin_noc_date=?;SET @admin_noc_by=?; CALL sp_insert_admin_noc (@employee_id,@admin_noc_date,@admin_noc_by)";
    console.log("query",sProc);
    db.query(sProc,[reqParams.employee_id,reqParams.admin_noc_date,reqParams.admin_noc_by], function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
  
     res.send({ status: 1, msg: 'Success', data: [] }); 
     }  
     });  
   
}
   
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });
 //*************************  insert_final_relieving START *********************************************//
 router.post('/insert_final_relieving',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= "SET @employee_id=?;SET @actual_date_relieving=?; CALL sp_insert_final_relieving (@employee_id,@actual_date_relieving)";
    console.log("query",sProc);
    db.query(sProc,[reqParams.employee_id,reqParams.actual_date_relieving], function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
  
     res.send({ status: 1, msg: 'Success', data: [] }); 
     }  
     });  
   
}
   
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

   return router;}