//const { ElasticBeanstalk } = require("aws-sdk");

module.exports=function(router, db,errorData,async){
//*******************************API - POST***********************************************************//

router.post('/update_ticket_status',(req,res)=>{
  let reqParam= req.body;          
  let group_id=reqParam.group_id;          
  let sproc = "SET @ticket_id=?;SET @closed_by=?; CALL `sp_update_ticket_status`(@ticket_id,@closed_by);";  
 console.log(sproc); 
  db.query(sproc,[reqParam.ticket_id,reqParam.closed_by],function(err,response){   
  if(err){        
  console.log(err);          
   res.send({ status: 0, msg: 'Failed', data: err }); 
  }
  else
  {
    res.send({ status: 1, msg: 'Success', data: response });       
  }
   //res.send({ status: 1, msg: 'Success', data: response });  
}
)
}
)

router.post('/get_recruitment_ticket',(req,res)=>{
  let reqParam= req.body;          
  let group_id=reqParam.group_id;          
  let sproc = "SET @p0=?; CALL `sp_user_getGroupPermissionList`(@p0);";  
 console.log(sproc); 
  db.query(sproc,[group_id],function(err,response){   
  if(err){        
  console.log(err);          
   res.send({ status: 0, msg: 'Failed', data: err }); 
  }else{ 

    response=   response[1];    
    console.log({response:response}); 
    if(response.length>0)
    {
    response.forEach(async (item,i) =>{
    var id = response[i].id; 
    console.log({id:id});        
    response[i].item = await subModuleNames(id,group_id,res);    
    if(i==response.length-1) 
    {
   res.send({ status: 1, msg: 'Success', data: response });       
    }


  })    
}
else
{
  res.send({ status: 1, msg: 'Success', data: response });       
}
//res.send({ status: 1, msg: 'Success', data: response });  
 } 
 })  
  }
  )       
   

//*******************************API - Delete***********************************************************//
router.delete('/deletemas_group_permission',(req,res)=>{
var reqParams = req.body;
var query =  " update mas_group_permission set active_flag=0 Where  id = '"+reqParams.id+ "' " ; 
 db.query(query,function(err,response){  
 if(err){     
 console.log(err);  
  res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{   
  res.send({ status: 1, msg: 'Success', data: response }); 
  }  
  }); 
}) 

return router;
}
