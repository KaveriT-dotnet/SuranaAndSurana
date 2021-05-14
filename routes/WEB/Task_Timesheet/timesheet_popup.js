module.exports = function(router, db,errorData,async){


 //*******************************  update timesheet  START ****************************************************//
router.put('/update_timesheet',(req,res)=>{
  try
  {

    var reqParams=req.body;
    //*******************************  Validate end date and end time ****************************************************//
    if(reqParams.end_date==null||reqParams.end_date==""||reqParams.end_date==0)
    {
      reqParams.end_date= '0000-00-00';
    }
    if(reqParams.end_time==null||reqParams.end_time==""||reqParams.end_time==0)
    {
      reqParams.end_time= '00:00:00';
    }
    //*******************************  CALL SP HERE ****************************************************//
    let sProc= "SET @timesheet_id= ?; SET @start_date=?;SET @start_time= ?;SET @end_date= ?;SET @end_time= ?;SET @comment= ?;SET @emp_id=?;CALL sp_update_timesheet (@timesheet_id,@start_date,@start_time,@end_date,@end_time,@comment,@emp_id); ";
    console.log("query",sProc);
    console.log("reqParams",reqParams.timesheet_id,reqParams.start_date,reqParams.start_time,reqParams.end_date,reqParams.end_time,reqParams.comment,reqParams.emp_id);
    db.query(sProc,[reqParams.timesheet_id,reqParams.start_date,reqParams.start_time,reqParams.end_date,reqParams.end_time,reqParams.comment,reqParams.emp_id],function(err,response){  
    if(err){     
      console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
      console.log("response",reqParams.task_id,reqParams.emp_id);
      console.log("response",response);
     if(response[7].affectedRows >0)
      {  
                res.send({ status: 1, msg: 'Success', data: [] }); 
      }
      else 
      {    
        //************Validate timesheet_id exists in table later ****************/
        res.send({ status: 0, msg: 'Failed', data: [] }); 
      }
     }  
     });  
      
    }
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });
 
//*******************************   update timesheet END ****************************************************//



 //*******************************  update task  START ****************************************************//
 router.put('/update_task',(req,res)=>{
  try
  {

    var reqParams=req.body;
    //*******************************  Validate end date and end time ****************************************************//
    if(reqParams.end_date==null||reqParams.end_date==""||reqParams.end_date==0)
    {
      reqParams.end_date= '0000-00-00';
    }
    if(reqParams.end_time==null||reqParams.end_time==""||reqParams.end_time==0)
    {
      reqParams.end_time= '00:00:00';
    }
    //*******************************  CALL SP HERE ****************************************************//
    let sProc= "SET @timesheet_id= ?; SET @start_date=?;SET @start_time= ?;SET @end_date= ?;SET @end_time= ?;SET @comment= ?;SET @emp_id=?;CALL sp_update_timesheet (@timesheet_id,@start_date,@start_time,@end_date,@end_time,@comment,@emp_id); ";
    console.log("query",sProc); 
    console.log("reqParams",reqParams.timesheet_id,reqParams.start_date,reqParams.start_time,reqParams.end_date,reqParams.end_time,reqParams.comment,reqParams.emp_id);
    db.query(sProc,[reqParams.timesheet_id,reqParams.start_date,reqParams.start_time,reqParams.end_date,reqParams.end_time,reqParams.comment,reqParams.emp_id],function(err,response){  
    if(err){     
      console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
      console.log("response",reqParams.task_id,reqParams.emp_id);
      console.log("response",response);
     if(response[7].affectedRows >0)
      {  
                res.send({ status: 1, msg: 'Success', data: [] }); 
      }
      else 
      {    
        //************Validate timesheet_id exists in table later ****************/
        res.send({ status: 0, msg: 'Failed', data: [] }); 
      }
     }  
     });  
      
    }
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });
 
//*******************************   update task END ****************************************************//






  //******************************* insert_start_time - START *******************************/
    router.post("/insert_start_time",async function(req, res) {
        try { 
            let sproc = 
              "SET @emp_id=?;SET @task_id=?;SET @start_date=?;SET @start_time=?;SET @comment=?;SET @created_by=?; CALL `sp_insert_start_time` (@emp_id,@task_id,@start_date,@start_time,@comment,@created_by)";
            db.query(sproc,[req.body.emp_id,req.body.task_id,req.body.start_date,req.body.start_time,req.body.comment,req.body.created_by], function(err, response) { 
              if (err) { 
                console.log(err);   	
              }  else {   
                console.log("response",response);
              //  var task=response[0].task_id
                res.send({ status: 1, msg: "Success", data: response[6]});
              }   
            });   
           
          } catch (err) {     
            res.send({ status: 0, msg: "Error", data: [] });
          } 
        });

    //******************************* insert_stop_time - START *******************************/
    router.post("/insert_stop_time",async function(req, res) {
        try { 
            let sproc = 
              "SET @end_date=?;SET @end_time=?;SET @comment=?;SET @updated_by=?;SET @timesheet_id=?; CALL `sp_insert_stop_time` (@end_date,@end_time,@comment,@updated_by,@timesheet_id)";
            db.query(sproc,[req.body.end_date,req.body.end_time,req.body.comment,req.body.updated_by,req.body.timesheet_id], function(err, response) { 
              if (err) { 
                console.log(err);   	
              } else {   
                console.log("response",response);
                res.send({ status: 1, msg: "Success", data: response });
              }   
            });   
           
          } catch (err) {     
            res.send({ status: 0, msg: "Error", data: [] });
          } 
        });

  //******************************* get_time_sheet - START *******************************/
    router.post("/get_time_sheet",async function(req, res) {
        try { 
            let sproc = 
              "SET @task_id=?; CALL `sp_get_time_sheet` (@task_id)";
            db.query(sproc,[req.body.task_id], function(err, response) { 
              if (err) { 
                console.log(err);   	
              } else {   
                console.log("response",response);
                res.send({ status: 1, msg: "Success", data: response[1] });
              }   
            });   
           
          } catch (err) {     
            res.send({ status: 0, msg: "Error", data: [] });
          } 
        });
    
//******************************* update_start_time - START *******************************/
router.put("/update_start_time",async function(req, res) {
    try { 
        let sproc = 
          "SET @start_date=?;SET @start_time=?;SET @comment=?;SET @timesheet_id=?; CALL `sp_update_start_time` (@start_date,@start_time,@comment,@timesheet_id)";
        db.query(sproc,[req.body.start_date,req.body.start_time,req.body.comment,req.body.timesheet_id], function(err, response) { 
          if (err) { 
            console.log(err);   	
          } else {   
           // console.log("response",response);
            res.send({ status: 1, msg: "Success", data: [] });
          }   
        });   
       
      } catch (err) {     
        res.send({ status: 0, msg: "Error", data: [] });
      } 
    });
  
    //******************************* update_end_time - START *******************************/
router.put("/update_end_time",async function(req, res) {
    try { 
        let sproc = 
          "SET @end_date=?;SET @end_time=?;SET @comment=?;SET @timesheet_id=?; CALL `sp_update_end_time` (@end_date,@end_time,@comment,@timesheet_id)";
        db.query(sproc,[req.body.end_date,req.body.end_time,req.body.comment,req.body.timesheet_id], function(err, response) { 
          if (err) { 
            console.log(err);   	
          } else {   
           // console.log("response",response);
            res.send({ status: 1, msg: "Success", data: [] });
          }   
        });   
       
      } catch (err) {     
        res.send({ status: 0, msg: "Error", data: [] });
      } 
    });

    return router;}
    