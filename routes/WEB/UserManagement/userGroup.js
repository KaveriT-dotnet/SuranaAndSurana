module.exports = function(router, db,errorData,async){ 


//*******************************API - GET***********************************************************//
router.get('/getAllGroup',(req,res)=>{
  let sProc =  " call sp_user_getAllGroup"; 
  db.query(sProc,function(err,response){  
  if(err){       
  console.log(err);  
   res.send({ status: 0, msg: 'Failed', data: err }); 
  }else{   
   res.send({ status: 1, msg: 'Success', data: response[0] }); 
   }  
   });   
 } 
 ); 


//*******************************API - GET***********************************************************//
router.get('/getGroupMaster',(req,res)=>{
    let sProc =  " call sp_user_getGroup"; 
    db.query(sProc,function(err,response){  
    if(err){      
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
     res.send({ status: 1, msg: 'Success', data: response[0] }); 
     }  
     });   
   } 
   ); 
  

//*******************************API - Insert***********************************************************//
router.post('/insertGroupMaster',async (req,res)=>{
     
  let  reqParams=req.body;  
  let sProc= "SET @group_name=?;SET @created_by=?;SET @group_id=?; CALL sp_user_insertGroup(@group_name,@created_by,@group_id) ";
   console.log("query",sProc);     
   db.query(sProc,[reqParams.group_name,reqParams.created_by,reqParams.group_id],(err,response,fields) =>{
   if(err)  
   {      console.log({error:err})   }
  else   
   {       res.send({status:1,msg:"Success",data:response})     }
   }     ) 

 });
 
//*******************************API - Insert***********************************************************//
router.put('/updateGroupMaster',async (req,res)=>{
     
  let  reqParams=req.body;  
  let sProc= "SET @group_name=?;SET @created_by=?;SET @group_id=?; CALL sp_user_insertGroup(@group_name,@created_by,@group_id) ";
   console.log("query",sProc);     
   db.query(sProc,[reqParams.group_name,reqParams.created_by,reqParams.group_id],(err,response,fields) =>{
   if(err)  
   {      console.log({error:err})   }
  else   
   {       res.send({status:1,msg:"Success",data:response})     }
   }     ) 

 });
 


//*******************************API - Insert***********************************************************//
router.delete('/deleteGroupMaster',async (req,res)=>{
     try
     {
  let  reqParams=req.body;  
  let sProc= "SET @group_id=?; CALL sp_user_deleteGroup(@group_id) ";
  //  console.log("query",sProc);     
   db.query(sProc,[reqParams.group_id],(err,response,fields) =>{
   if(err)  
   {     
      console.log({error:err})   ;
    res.send({status:0,msg:"Failed",data:err}) 
  }
  else    
   {       res.send({status:1,msg:"Success",data:response})     
    }
   })
   
  }
  catch(ex)
  {
    res.send({status:0,msg:"Failed",data:ex}) 
  }

 });



 return router;
}