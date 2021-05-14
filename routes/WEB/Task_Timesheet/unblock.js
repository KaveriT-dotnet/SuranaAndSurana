

module.exports = function(router, db,errorData,async){ 

//*************************  update_unblock_status START *********************************************//
router.post('/update_unblock_status', (req,res)=>{
    try
    {
        var reqParams=req.body;
        
         let sProc= " SET @emp_id=?;SET @active_flag=?;SET @status_change_datetime= ?;  CALL sp_update_unblock_status ( @emp_id,@active_flag,@status_change_datetime); ";
         console.log("query",sProc);
         db.query(sProc,[reqParams.emp_id,reqParams.active_flag,reqParams.status_change_datetime], function(err,response){  
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

//*************************  get_unblock_user_by_id START *********************************************//
router.post('/get_unblock_user_by_id', (req,res)=>{
  try
  {
      var reqParams=req.body;
      
       let sProc= " SET @emp_id=?;  CALL sp_get_unblock_user_by_id ( @emp_id); ";
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


   return router;}