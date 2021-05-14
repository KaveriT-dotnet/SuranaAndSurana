
module.exports = function(router, db,errorData,async){ 
var async = require("async");
    //*************************  get_leave_type START *********************************************//
    router.get('/get_leave_type',async (req,res)=>{
        try
        {
         
          //var reqParams=req.body;
         
          let sProc= "  CALL sp_get_leave_type ";
          console.log("query",sProc);
          db.query(sProc, function(err,response){  
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
 
 //*************************  insert_leave_balance START *********************************************//
    router.post('/insert_leave_balance',async (req,res)=>{
        try
        {
         
            var reqParams=req.body;
            let query2="SELECT COUNT(emp_leave_mas_id) as total FROM `s_tbl_pm_emp_leave_master` WHERE s_tbl_pm_emp_leave_master.employee_id ='"+reqParams.employee_id+"' AND s_tbl_pm_emp_leave_master.leave_type_id='"+reqParams.leave_type_id+"' and s_tbl_pm_emp_leave_master.start_date='"+reqParams.start_date+"' and s_tbl_pm_emp_leave_master.end_date ='"+reqParams.end_date+"' ";
            db.query(query2, function(err,response){
              console.log("total",response[0].total);
              var total=response[0].total;
              if(total!=0){
                console.log(err);
                res.send({ status: 0, msg: 'Failed', data: "Employee_id and Leave_type_id are alredy exist this start date and end date" }); 
              }
              else{
            let query1 = "SET @employee_id=?;SET @leave_type_id=?; CALL sp_get_start_date (@employee_id,@leave_type_id)";
            db.query(query1,[reqParams.employee_id,reqParams.leave_type_id], function(err,response){
              if(err){
                console.log(err);
              }
              else{

              console.log("start_date",response[2][0].start_date);
              var start_date = response[2][0].start_date;

            let query="SELECT  case when s_tbl_pm_emp_leave_master.current_balance is null THEN 0 ELSE current_balance end as current_balance,case WHEN s_tbl_pm_emp_leave_master.eligible_leave is null THEN 0 ELSE s_tbl_pm_emp_leave_master.eligible_leave end as eligible_leave  FROM `s_tbl_pm_emp_leave_master` WHERE s_tbl_pm_emp_leave_master.employee_id='"+reqParams.employee_id+"' AND s_tbl_pm_emp_leave_master.leave_type_id = '"+reqParams.leave_type_id+"' AND start_date = '"+start_date+"'  group by start_date " ;
            db.query(query,async function(err,response){
             // console.log("response",response);
              if (err){
                console.log(err); 
              } 
              else{ 
                console.log("response",response);
               var previous_unavailed_leave = (response[0].current_balance);
               var eligible_leave = (response[0].eligible_leave);
               var current_balance=(previous_unavailed_leave + eligible_leave);
               console.log("current_balance",current_balance);
               console.log("eligible_leave",eligible_leave);
               console.log("previous_unavailed_leave",previous_unavailed_leave);
              // reqParams.current_balance=current_balance;
              // reqParams.previous_unavailed_leave=previous_unavailed_leave;

               // **** insert_curent_balance and previous_unavailed_leave*****
                await insert_leave_balance(reqParams,current_balance,previous_unavailed_leave);
                  res.send({ status: 1, msg: 'Success', data: [] }); 
              }
            })
          }
          
            
          })
              }
            })
          
        }
          catch(ex)
          {
            res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
          }
         });

         function insert_leave_balance (reqParams,current_balance,previous_unavailed_leave){
        return new Promise((resolve)=>{

          let sProc= " INSERT INTO s_tbl_pm_emp_leave_master (employee_id,leave_type_id,eligible_leave,start_date,end_date,created_on,updated_on,created_by,updated_by,current_balance,previous_unavailed_leave) values ('"+reqParams.employee_id+"','"+reqParams.leave_type_id+"','"+reqParams.eligible_leave+"','"+reqParams.start_date+"','"+reqParams.end_date+"','"+reqParams.created_on+"','"+reqParams.updated_on+"','"+reqParams.created_by+"','"+reqParams.updated_by+"','"+current_balance+"','"+previous_unavailed_leave+"')";
          console.log("query",sProc);
          db.query(sProc, function(err,response){  
          if(err){     
          console.log(err);  
           // res.send({ status: 0, msg: 'Failed', data: err }); 
          }else{   
            resolve(true);
           
           }
        })

        
           
           });  
         
     }
//*************************  get_leave_balance START *********************************************//
    router.post('/get_leave_balance',async (req,res)=>{
        try
        {
         
          var reqParams=req.body;
         
          let sProc= " SET @employee_code=?; CALL sp_get_leave_balance (@employee_code) ";
          console.log("query",sProc);
          db.query(sProc,[reqParams.employee_code], function(err,response){  
          if(err){     
          console.log(err);  
           res.send({ status: 0, msg: 'Failed', data: err }); 
          }else{   
            console.log("emp_id",response[1]);
            var empty_emp_id= response[1];
            if(empty_emp_id ==0){
              res.send({ status: 1, msg: 'Success', data: [] });
            }
            else{
            console.log(response[1][0].emp_id);
            var employee_id=response[1][0].emp_id;
            
          
            let sProc= " SELECT s_tbl_pm_emp_leave_master.emp_leave_mas_id,s_tbl_pm_emp_leave_master.employee_id,s_tbl_pm_employee.name,s_tbl_pm_emp_leave_master.leave_type_id,s_tbl_m_status.status,s_tbl_pm_emp_leave_master.previous_unavailed_leave as previous_balance,s_tbl_pm_emp_leave_master.eligible_leave,s_tbl_pm_emp_leave_master.current_balance  FROM s_tbl_pm_emp_leave_master LEFT JOIN s_tbl_pm_employee ON s_tbl_pm_employee.emp_id =s_tbl_pm_emp_leave_master.employee_id  LEFT JOIN s_tbl_m_status on s_tbl_m_status.status_id =s_tbl_pm_emp_leave_master.leave_type_id WHERE s_tbl_pm_emp_leave_master.employee_id='"+employee_id+"' and s_tbl_pm_emp_leave_master.start_date= '"+reqParams.start_date+"' and s_tbl_pm_emp_leave_master.end_date = '"+reqParams.end_date+"' GROUP BY  s_tbl_pm_emp_leave_master.leave_type_id; ";
          console.log("query",sProc);
           db.query(sProc, function(err,response){
            if(err){     
              console.log(err);  
               res.send({ status: 0, msg: 'Failed', data: err }); 
              }else{
            res.send({ status: 1, msg: 'Success', data: response }); 
           }
          })
        }
      }
        })
      
         }
         
          catch(ex)
          {
            res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
          }
         });

//*************************  get_professional_course START *********************************************//
router.get('/get_professional_course',async (req,res)=>{
  try
  {
   
    //var reqParams=req.body;
   
    let sProc= "  CALL sp_get_professional_course  ";
    console.log("query",sProc);
    db.query(sProc, function(err,response){  
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

//*************************  get_subject START *********************************************//
router.post('/get_subject',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= " SET @subject=?; CALL sp_get_subject (@subject) ";
    console.log("query",sProc);
    db.query(sProc,[reqParams.subject], function(err,response){ 
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

//*************************  insert_leave_form START *********************************************//
router.post('/insert_leave_form',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= "SET @employee_id=?;SET @leave_type_id=?;SET @from_date=?;SET @to_date=?;SET @from_time=?;SET @to_time=?;SET @reason=?;SET @address=?;SET @contact_number=?;SET @end_date=?;SET @client_id=?;SET @assigned_by=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?; CALL sp_insert_leave_form(@employee_id,@leave_type_id,@from_date,@to_date,@from_time,@to_time,@reason,@address,@contact_number,@end_date,@client_id,@assigned_by,@created_on,@updated_on,@created_by,@updated_by)";
    console.log("query",sProc);     
    
    db.query(sProc,[reqParams.employee_id,reqParams.leave_type_id,reqParams.from_date,reqParams.to_date,reqParams.from_time,reqParams.to_time,reqParams.reason,reqParams.address,reqParams.contact_number,reqParams.end_date,reqParams.client_id,reqParams.assigned_by,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by],async (err,response) =>{ 
      console.log("response",response[16][0]);
     var emp_leave_id=response[16][0].emp_leave_id;
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
      await insert_task(reqParams,emp_leave_id);
  
     res.send({ status: 1, msg: 'Success', data: [] }); 
     }  
     });  
   
}
   
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

   function insert_task(reqParams,emp_leave_id){
     return new Promise(
       (resolve)=>{
         var query = "INSERT INTO s_tbl_pm_task (s_tbl_pm_task.assignee_id,s_tbl_pm_task.assigned_by,s_tbl_pm_task.task_type,s_tbl_pm_task.emp_leave_id,s_tbl_pm_task.URL) VALUES ((SELECT s_tbl_pm_employee.supervisor  FROM  s_tbl_pm_employee WHERE s_tbl_pm_employee.emp_id='"+reqParams.employee_id+"'),'"+reqParams.employee_id+"',(SELECT s_tbl_m_task_type.task_type_id FROM s_tbl_m_task_type WHERE s_tbl_m_task_type.task_type='Leave Approval'),'"+emp_leave_id+"','http://54.198.55.249:8159/api/v1/leave_approval');";
         db.query(query,function(err,response){
          if(err){     
            console.log(err); 
           }else{   
  
              resolve(response);
             }  
        
         })
       })
     
   }

//*************************  get_leave_form START *********************************************//
router.post('/get_leave_form',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= " SET @employee_id=?; CALL sp_get_leave_form (@employee_id) ";
    console.log("query",sProc);
    db.query(sProc,[reqParams.employee_id], function(err,response){  
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

//*************************  update_leave_balance START *********************************************//
router.put('/update_leave_balance',async (req,res)=>{
  try
  {
   
      var reqParams=req.body;
   
    let sProc= "SET @employee_id=?; SET @leave_type_id=?; SET @current_balance=?; SET @eligible_leave=?; SET @previous_unavailed_leave=?; SET @start_date=?; SET @end_date=?; SET @no_days=?; SET @no_hrs=?; SET @created_on=?; SET @updated_on=?; SET @created_by=?; SET @updated_by=?;SET @emp_leave_mas_id=?; CALL sp_update_leave_balance (@employee_id,@leave_type_id,@current_balance,@eligible_leave,@previous_unavailed_leave,@start_date,@end_date,@no_days,@no_hrs,@created_on,@updated_on,@created_by,@updated_by,@emp_leave_mas_id)";
    console.log("query",sProc);
    db.query(sProc,[reqParams.employee_id,reqParams.leave_type_id,reqParams.current_balance,reqParams.eligible_leave,reqParams.previous_unavailed_leave,reqParams.start_date,reqParams.end_date,reqParams.no_days,reqParams.no_hrs,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by,reqParams.emp_leave_mas_id], function(err,response){  
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

//*************************  insert_leave_cep START *********************************************//
router.post('/insert_leave_cep',async (req,res)=>{
  
   
      var reqParams=req.body;
   
    let sProc= "SET @employee_id=?; SET @leave_type_id=?; SET @professional_course_id=?; SET @total_days_leave=?; SET @no_exam_days=?; SET @no_other_days=?; SET @description=?; SET @remarks=?; SET @created_on=?; SET @updated_on=?; SET @created_by=?; SET @updated_by=?;  CALL sp_insert_leave_cep (@employee_id,@leave_type_id,@professional_course_id,@total_days_leave,@no_exam_days,@no_other_days,@description,@remarks,@created_on,@updated_on,@created_by,@updated_by)";
    console.log("query",sProc);
    db.query(sProc,[reqParams.employee_id,reqParams.leave_type_id,reqParams.professional_course_id,reqParams.total_days_leave,reqParams.no_exam_days,reqParams.no_other_days,reqParams.description,reqParams.remarks,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by],async function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
      console.log("response1",response);
      console.log("response",response[12][0].emp_leave_id);  
      var emp_leave_id=response[12][0].emp_leave_id;
     var reqParams = req.body;  
      var filename = req.files == null ? [] : Array.isArray(req.files.hall_ticket) == true ? req.files.hall_ticket : [req.files.hall_ticket];     
        console.log("filenae",filename);
      var fileuploads=await imageUpload(filename,emp_leave_id); 
      //console.log("fileuploads",fileuploads);
      await insert_subject(reqParams,emp_leave_id);
     // if(err){
      if (fileuploads.status == false) {    
       error_status = false;    
       err.push(uploadDataResponse.response);
       res.send({ status: 0, msg: 'Failed', err: err }); 
     }  
     else 
     {  
            
       res.send({ status: 1, msg: 'Success', data: [] }); 
   
     } 
    //    res.send({status:1,msg:"Success",data:[]})  
    // }
    }
    })  
  
 
});

function imageUpload(data, emp_leave_id) {
return new Promise(resolve => {
    async.forEachOf(data, function (obj, index, callk) {

        var imageName = "Image_" + emp_leave_id + "_" + obj.name
        console.log(imageName);
       // obj.mv('H:/uploads/' + imageName, function (err) {
        obj.mv('../../../var/www/html/suranauploads/' + imageName, function (err) {
            if (err) {
                console.log('err', err);
            } else {
                console.log(obj)
                // console.log("req.file",req.fileS.hall_ticket);
                 var query = "SET @hall_ticket=?;SET @emp_leave_id=?; CALL sp_insert_leave_cep_hallticket (@hall_ticket,@emp_leave_id)";
              //  var query = "INSERT INTO s_tbl_pm_document (s_tbl_pm_document.document_type_id,s_tbl_pm_document.file_name,s_tbl_pm_document.emp_leave_id) VALUES (41,);";
            
                console.log(query);
                db.query(query,[imageName,emp_leave_id], function (err, response) {
                    if (err) {
                        console.log(err);
                    }
                    
                });

            }
              callk();
        })
    },
        function (err) {
            if (err) {
                console.log(err.message);
                resolve({ status: false, response: err.message });
            } else {
             // console.log("here");
                resolve({ status: true, response: true });
            }
        });

})
};

function insert_subject(reqParams,emp_leave_id){
  return new Promise(
    (resolve)=>{
     var query1="";
    
    
    var  subject=JSON.parse(reqParams.subject);
    console.log("subject_test",subject);
     for(let i in subject){
     query1 +="INSERT INTO s_tbl_pm_emp_leave_cep_sub (emp_leave_id,emp_id,subject_id,subject_date,created_on,updated_on,created_by,updated_by) VALUES ('"+emp_leave_id+"','"+subject[i].emp_id+"','"+subject[i].subject_id+"','"+subject[i].subject_date+"','"+subject[i].created_on+"','"+subject[i].updated_on+"','"+subject[i].created_by+"','"+subject[i].updated_by+"');";}
     console.log("query1",query1 );   
     db.query(query1,function(err,response){
  if(err){
    console.log(err);}
    else{
      resolve(true);
    }
  })
  })
}
//*************************  insert_leave_cep_sub START *********************************************//
  router.post('/insert_leave_cep_sub',async (req,res)=>{
    try
    {
     
      var reqParams=req.body;
     
      let sProc= " SET @emp_id=?; SET @subject_id=?; SET @subject_date=?; CALL sp_insert_leave_cep_sub (@emp_id,@subject_id,@subject_date) ";
      console.log("query",sProc);
      db.query(sProc,[reqParams.emp_id,reqParams.subject_id,reqParams.subject_date], function(err,response){  
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

//*************************  get_leave_cep_sub START *********************************************//
  router.post('/get_leave_cep_sub',async (req,res)=>{
    try
    {
     
      var reqParams=req.body;
     
      let sProc= " SET @emp_id=?;  CALL sp_get_leave_cep_sub (@emp_id) ";
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

//*************************  get_emp_by_code START *********************************************//
router.post('/get_emp_by_code',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= " SET @employee_code=?; CALL sp_get_emp_by_code (@employee_code) ";
    console.log("query",sProc);
    db.query(sProc,[reqParams.employee_code], function(err,response){  
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


   //*************************  get_leave_approval START *********************************************//
router.post('/get_leave_approval',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= " SET @employee_id=?;SET @emp_leave_id=?; CALL sp_get_leave_approval (@employee_id,@emp_leave_id) ";
    console.log("query",sProc);
    db.query(sProc,[reqParams.employee_id,reqParams.emp_leave_id], function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
  
     res.send({ status: 1, msg: 'Success', data: response[2 ] }); 
     }  
     });  
   
}
   
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

   //*************************  delete_leave_form START *********************************************//
 router.post('/delete_leave_form',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= "SET @emp_leave_id=?; CALL sp_delete_leave_form(@emp_leave_id)";
    console.log("query",sProc);
    db.query(sProc,[reqParams.emp_leave_id], function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
  
     res.send({ status: 1, msg: 'Success', data: [] }); 
     }  
     });  
   
}catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });
//*************************  update_leave_approval START *********************************************//
router.post('/update_leave_approval',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= " SET @emp_leave_id=?;SET @approve_status=?; CALL sp_update_leave_approval (@emp_leave_id,@approve_status) ";
    console.log("query",sProc);
    db.query(sProc,[reqParams.emp_leave_id,reqParams.approve_status], function(err,response){  
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

//*************************  get_emp_available_balance START *********************************************//
 router.post('/get_emp_available_balance',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= "SET @employee_id=?;SET @leave_type_id=?; CALL sp_get_emp_available_balance(@employee_id,@leave_type_id)";
    console.log("query",sProc);
    db.query(sProc,[reqParams.employee_id,reqParams.leave_type_id], function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
  
     res.send({ status: 1, msg: 'Success', data: response[2] }); 
     }  
     });  
   
}catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

return router;}