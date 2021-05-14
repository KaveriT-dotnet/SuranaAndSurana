module.exports = function(router, db,errorData,async){ 

    //*************************  insert_project_stage START *********************************************//
    router.post('/insert_project_stage',async (req,res)=>{
      try
      {
        var reqParams=req.body;
        var result1= await select_project_stage(reqParams);
        console.log("result1",result1);
        if(result1==0){
        let sProc= "SET @project_id= ?; SET @project_type_id=?;SET @sub_project_id=?;SET @stage_id=?;SET @sub_stage_id=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?; CALL sp_insert_project_stage (@project_id, @project_type_id,@sub_project_id,@stage_id,@sub_stage_id,@created_on,@updated_on,@created_by,@updated_by); ";
        console.log("query",sProc);
        db.query(sProc,[reqParams.project_id,reqParams.project_type_id,reqParams.sub_project_id,reqParams.stage_id,reqParams.sub_stage_id,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by],async function(err,response){  
        if(err){     
        console.log(err);  
         res.send({ status: 0, msg: 'Failed', data: err }); 
        }
     else{   
      
         res.send({ status: 1, msg: 'Success', data: [] }); 
         }  
         });  
        }
        else{
            res.send({ status: 0, msg: 'Alredy insert project_id,project_type_id,stage_id these combinations', data: [] }); 
        }
        }
        catch(ex)
        {
            console.log("ex",ex);
          res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
        }
       });

     function select_project_stage(reqParams){
         return new Promise((resolve) =>{
            let query="SET @project_id=?;SET @project_type_id=?;SET @stage_id=?; CALL sp_select_project_stage (@project_id,@project_type_id,@stage_id) ;";
            db.query(query,[reqParams.project_id,reqParams.project_type_id,reqParams.stage_id],function(err,response){
                if(err){
                    console.log(err);
                }else{
                    var result=response[3][0].total;
                    console.log("result",result);
                    resolve(result);
                }
            })
         })
     }
 //*************************  get_project_stage START *********************************************//
 router.post('/get_project_stage',(req,res)=>{
    try
    {
      var reqParams=req.body;
    
      let sProc= "SET @project_id= ?; SET @project_type_id=?;SET @sub_project_id=?; CALL sp_get_project_stage (@project_id, @project_type_id,@sub_project_id); ";
      console.log("query",sProc);
      db.query(sProc,[reqParams.project_id,reqParams.project_type_id,reqParams.sub_project_id],function(err,response){  
      if(err){     
      console.log(err);  
       res.send({ status: 0, msg: 'Failed', data: err }); 
      }else{   
    
       res.send({ status: 1, msg: 'Success', data: response[3] }); 
       }  
       });  
        
      }
      catch(ex)
      {
        res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
      }
     });

 //*************************  delete_project_stage START *********************************************//
 router.delete('/delete_project_stage',(req,res)=>{
    try
    {
      var reqParam=req.body;
    
      let sProc= "SET @stage_list_id=?; CALL sp_delete_project_stage (@stage_list_id) ; ";
      console.log("query",sProc);
      db.query(sProc,[reqParam.stage_list_id],function(err,response){  
      if(err){     
      console.log(err);  
      // res.send({ status: 0, msg: 'Failed', data: err }); 
      }else{   
    
       res.send({ status: 1, msg: 'Success', data: [] }); 
       }  
       });  
        
      }
      catch(ex)
      {
        res.send({ status: 0, msg: 'Failed', data: ex }); 
      }
     });

//*************************  update_stage_completion_date START *********************************************//
router.put('/update_stage_completion_date',(req,res)=>{
    try
    {
      var reqParam=req.body;
      let sProc= "SET @actual_date=?;SET @stage_list_id=?; SET @compliance_date=?;CALL sp_update_stage_completion_date (@actual_date,@stage_list_id,@compliance_date) ; ";
      console.log("query",sProc);
      db.query(sProc,[reqParam.actual_date,reqParam.stage_list_id,reqParam.compliance_date],function(err,response){  
      if(err){     
      console.log(err);  
      // res.send({ status: 0, msg: 'Failed', data: err }); 
      }else{   
    
       res.send({ status: 1, msg: 'Success', data: [] }); 
       }  
       });  
        
      }
      catch(ex)
      {
        res.send({ status: 0, msg: 'Failed', data: ex }); 
      }
     });

return router;}