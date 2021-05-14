module.exports = function(router, db,async){ 


//*******************************  task delete  START ****************************************************//
router.delete('/delete_task',(req,res)=>{
  try
  {
    var reqParams=req.body;
    console.log("HERE");
  //*******************************  CALL SP HERE ****************************************************//
    let sProc= "SET @task_id= ?; SET @emp_id=?;CALL sp_delete_task (@task_id,@emp_id); ";
    console.log("query",sProc);
    db.query(sProc,[reqParams.task_id,reqParams.emp_id],function(err,response){  
    if(err){     
    console.log(err);   
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
      console.log("response",reqParams.task_id,reqParams.emp_id);
      console.log("response",response);
     if(response[2].affectedRows >0)
      {  
          res.send({ status: 1, msg: 'Success', data: [] }); 
      }
      else 
      {    
        //************Validate timesheet_id exists in table later ****************/
        res.send({ status: 1, msg: 'Timesheet started tasks can not be deleted', data: [] }); 
      }
     }  
     });  
      
    }
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });
 
//*******************************  task delete END ****************************************************//





//*******************************  delete_timesheet  START ****************************************************//
router.delete('/delete_timesheet',(req,res)=>{
  try
  {
    var reqParams=req.body;
  //*******************************  CALL SP HERE ****************************************************//
    let sProc= "SET @timesheet_id= ?; CALL sp_delete_timesheet (@timesheet_id); ";
    console.log("query",sProc);
    db.query(sProc,[reqParams.timesheet_id],function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
      console.log("response[1]",response);
     if(response[1].affectedRows >0)
      {
          res.send({ status: 1, msg: 'Success', data: [] }); 
      }
      else
      {   
        //************Validate timesheet_id exists in table later ****************/
        res.send({ status: 1, msg: 'Approved time sheet can not be delete ', data: [] }); 
      }
     }  
     });  
      
  
    }
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

//*******************************  delete_timesheet END ****************************************************//





    //*******************************  update task percentage START ****************************************************//
    router.put('/update_task_percentage',(req,res)=>{
      try
      {
        var reqParams=req.body;
      
        let sProc= "SET @task_id= ?; SET @percentage_completion=?; CALL sp_insert_task_percent (@task_id, @percentage_completion); ";
        console.log("query",sProc);
        db.query(sProc,[reqParams.task_id,reqParams.percentage_completion],function(err,response){  
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



    //*******************************  update task percentage END ****************************************************//


    
    router.post('/insert_task',(req,res)=>{
      try
      {
        var reqParams=req.body;
      
        let sProc= "SET @project_id= ?; SET @activiity_id=?;SET @sub_activity_id=?;SET @assignee_id=?;SET @start_date=?;SET @end_date=?;SET @assigned_by=?;SET @priority=?;SET @description=?;SET @tag=?; CALL sp_insert_task (@project_id, @activiity_id,@sub_activity_id,@assignee_id,@start_date,@end_date,@assigned_by,@priority,@description,@tag); ";
        console.log("query",sProc);
        db.query(sProc,[reqParams.project_id,reqParams.activiity_id,reqParams.sub_activity_id,reqParams.assignee_id,reqParams.start_date,reqParams.end_date,reqParams.assigned_by,reqParams.priority,reqParams.description,reqParams.tag],function(err,response){  
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

       


//********************************** get_priority START ******************************************** */       
router.get('/get_priority', (req,res)=>{
  try
  {
   // var reqParams=req.body;
  
    let sProc= " CALL sp_get_priority ; ";
    console.log("query",sProc);
    db.query(sProc,function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
  
     res.send({ status: 1, msg: 'Success', data: response[0] }); 
     }  
     });  
      
    }
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

//********************************** get_tag START ******************************************** */       
router.get('/get_tag', (req,res)=>{
  try
  {
   // var reqParams=req.body;
  
    let sProc= " CALL sp_get_tag ; ";
    console.log("query",sProc);
    db.query(sProc,function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
  
     res.send({ status: 1, msg: 'Success', data: response[0] }); 
     }  
     });  
      
    }
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

//********************************** variable_rate_search START ******************************************** */       
router.post('/variable_rate_search', (req,res)=>{
  try
  {
    var reqParams=req.body;
  
    let sProc= "SET @designation_id= ?; SET @activity_id=?;SET @sub_activity_id=?;SET @location_id= ?; SET @range_id=?;SET @unit_id=?; SET @lower_limit=?;SET @upper_limit=?; CALL sp_variable_rate_search (@designation_id, @activity_id,@sub_activity_id,@location_id, @range_id,@unit_id, @lower_limit,@upper_limit); ";
    console.log("query",sProc);
    db.query(sProc,[reqParams.designation_id,reqParams.activity_id,reqParams.sub_activity_id,reqParams.location_id,reqParams.range_id,reqParams.unit_id,reqParams.lower_limit,reqParams.upper_limit],function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
  
     res.send({ status: 1, msg: 'Success', data: response[8] }); 
     }  
     });  
      
    }
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

  //********************************** get_task_list START ******************************************** */       
router.post('/get_task_list', (req,res)=>{
  try
  {
    var reqParams=req.body;
  
    let sProc= "SET @assignee_id= ?; CALL sp_get_task_list (@assignee_id); ";
    console.log("query",sProc);
    db.query(sProc,[reqParams.assignee_id],async function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
      console.log("response_check",response[1]);
      if(response[1].length == 0){
        res.send({ status: 1, msg: 'Success', data: [] });
      }
      else{
      console.log("task_id",response[1][0].task_id);
      var task=response[1];
      var task_id=response[1][0].task_id;
                 // ******** get_timesheet details **********
      var result= await get_timesheet(task_id,reqParams)
      console.log("result",result);
      var output=[];

      result = Array.isArray(result)?result:[result];
            await asyncForEach(task,(item,i)=>{
        task[i].timesheet=result.filter((val) => val.task_id == task[i].task_id  );;
      })
      // await asyncForEach(result,(item,i)=>{
      //   var timesheet =  task.filter((val) => val.task_id == result[i].task_id && val.task_id==task_id );
      //     //********* timesheet Object Created result[i].timesheet ************/
      //     task[i].timesheet= timesheet;
        
      //    })
      output.push({task});
  
     res.send({ status: 1, msg: 'Success', data: task }); 
     }  
    }
     });  
      
    }
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

   function get_timesheet(task_id,reqParams){
     return new Promise(
       (resolve)=>{
        let sProc= "SET @task_id=?; SET @assignee_id= ?; CALL sp_get_task_list_timesheet (@task_id,@assignee_id); ";
        console.log("query",sProc);
        db.query(sProc,[task_id,reqParams.assignee_id],function(err,response){ 
          console.log("get_timesheet",response[2][0])
          if(err){
            console.log(err)
          }
          else{
            var result=response[2][0];
            resolve(result);

          }

       })
     
   })
  }

//********************************** get_project_tasks START ******************************************** */       
router.post('/get_project_tasks', (req,res)=>{
  try
  {
    var reqParams=req.body;
  
    let sProc= "SET @emp_id= ?; CALL sp_get_project_tasks (@emp_id); ";
    console.log("query",sProc);
    db.query(sProc,[reqParams.emp_id],function(err,response){  
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

//********************************** insert_task_timesheet START ******************************************** */       
router.post('/insert_task_timesheet', (req,res)=>{
  try
  {
    var reqParams=req.body;
  
    let sProc= "SET @activiity_id= ?; SET @sub_activity_id=?;SET @assigned_by=?;SET @emp_id= ?; SET @priority=?;SET @tag=?; SET @start_date=?;SET @end_date=?;SET @start_time=?; SET @comment=?; SET @created_on=?; SET @created_by=?; CALL sp_insert_task_timesheet (@activiity_id, @sub_activity_id,@assigned_by,@emp_id, @priority,@tag, @start_date,@end_date,@start_time,@comment,@created_on,@created_by); ";
    console.log("query",sProc);
    db.query(sProc,[reqParams.activiity_id,reqParams.sub_activity_id,reqParams.assigned_by,reqParams.emp_id,reqParams.priority,reqParams.tag,reqParams.start_date,reqParams.end_date,reqParams.start_time,reqParams.comment,reqParams.created_on,reqParams.created_by],function(err,response){   
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

//********************************** get_task_timesheet START ******************************************** */       
router.post('/get_task_timesheet', async(req,res)=>{
  try
  {
    var reqParams=req.body,project_id=reqParams.project_id;
    var projectBaseActivity="",adhocActivity="";
    console.log("getActInfo",project_id);
   //**********************Get distinct activity and sub activity *************/
 if(project_id=="" ||project_id==0 ||project_id==null)

 {
  adhocActivity=[{task_id:reqParams.task_id,activity_id:null,activity:null,sub_activity_id:null,sub_activity:null}];
 }
 else
 {
  console.log("here");
  projectBaseActivity=await  getActivityInfo(reqParams);
  projectBaseActivity= Array.isArray(projectBaseActivity)?projectBaseActivity:[projectBaseActivity];
  console.log("getActInfo",projectBaseActivity);
 }

    let sProc= "SET @task_id= ?; CALL sp_get_task_timesheet (@task_id); ";
    console.log("query",sProc);
  await  db.query(sProc,[reqParams.task_id],async function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{  
      var response=response[1];
      response=Array.isArray(response)?response:[response];
       var output="";
       console.log("reqParams.project_id",project_id);
       if(project_id=="" ||project_id==0 ||project_id==null)
            {
              adhocActivity[0].timesheet=response; 
              output=adhocActivity;  
            }
          else
          { 
            console.log("projectBaseActivity",projectBaseActivity);
            await asyncForEach(projectBaseActivity,(item,i)=>{
                
              projectBaseActivity[i].timesheet=response.filter((val)=>val.task_id=projectBaseActivity[i].task_id&&val.activity_id==projectBaseActivity[i].activity_id &&val.sub_activity_id==projectBaseActivity[i].sub_activity_id)
            } );
            
            output=projectBaseActivity;
            
          }
                         

     res.send({ status: 1, msg: 'Success', data: output }); 
     }  
     });  
      
    }
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });
 ///********************* get timesheet values ***************************/

   function getActivityInfo(reqParams){
    console.log("err1");  
    return new Promise((resolve)=>{
        let sProc1="SET @task_id=?;CALL sp_select_timesheet_info(@task_id) ";
        console.log("query",sProc1);
        db.query(sProc1,[reqParams.task_id],function(err,response){
        if(err){ 
            console.log(err);
        }else{
            console.log("response",response[1]);
            var result=response[1];
            resolve(result);
        }
    })
})
}



   return router;   }