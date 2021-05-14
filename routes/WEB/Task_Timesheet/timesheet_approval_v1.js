module.exports = function(router, db,errorData,async){ 

 //*************************  edit_timesheet START *********************************************//
 router.put('/edit_timesheet',(req,res)=>{
    try
    {
      var reqParams=req.body;
    
      let sProc= "SET @start_time= ?; SET @end_time=?;SET @timesheet_id=?; CALL sp_edit_timesheet (@start_time, @end_time,@timesheet_id); ";
      console.log("query",sProc);
      db.query(sProc,[reqParams.timesheet_id,reqParams.start_date,reqParams.start_time,reqParams.end_date,reqParams.end_time,reqParams.comment],function(err,response){  
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

//*************************  update_approve_timesheet START *********************************************//
router.put('/update_approve_timesheet',(req,res)=>{
   

      var timesheet=req.body.timesheet;
     // var timesheet;
     // console.log("timesheet",timesheet);
      var sProc="";
      for(let i in timesheet){
         
       sProc += "UPDATE s_tbl_pm_timesheet SET s_tbl_pm_timesheet.approve_start_date ='"+timesheet[i].approve_start_date+"', s_tbl_pm_timesheet.approved_start_time= '"+timesheet[i].approved_start_time+"',s_tbl_pm_timesheet.approved_end_date='"+timesheet[i].approved_end_date+"',s_tbl_pm_timesheet.approved_end_time='"+timesheet[i].approved_end_time+"',s_tbl_pm_timesheet.approved_by='"+timesheet[i].approved_by+"',s_tbl_pm_timesheet.approved_status=1 WHERE s_tbl_pm_timesheet.timesheet_id='"+timesheet[i].timesheet_id+"' ;";}
      console.log("query",sProc);
      db.query(sProc,function(err,response)
      {
        if(err){     
      console.log(err);    
       res.send({ status: 0, msg: 'Failed', data: err }); 
      }
    else{   
    
       res.send({ status: 1, msg: 'Success', data: [] }); 
       }  
       });  
    
    })


return router;}