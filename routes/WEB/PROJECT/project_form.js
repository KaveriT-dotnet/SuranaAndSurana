module.exports = function(router, db,errorData,dateFormat){ 

//******************* get_project_form - START **********************************************
router.get("/get_payment_mode",async function(req, res) {
  try { 
    let sproc = 
      "call sp_get_payment_mode() ";
    db.query(sproc, function(err, response) { 
      if (err) { 
        console.log(err);   	
      } else {   
        console.log("response",response);
        res.send({ status: 1, msg: "Success", data: response[0] });
      }   
    });   

  } catch (err) {     
    res.send({ status: 0, msg: "Error", data: [] });
  } 
}); 

//******************* get_project_form - START **********************************************
router.get("/get_expense_type",async function(req, res) {
  try { 
    let sproc = 
      "call sp_get_expense_type() ";
    db.query(sproc, function(err, response) { 
      if (err) { 
        console.log(err);   	
      } else {   
        console.log("response",response);
        res.send({ status: 1, msg: "Success", data: response[0] });
      }   
    });   
   
  } catch (err) {     
    res.send({ status: 0, msg: "Error", data: [] });
  } 
}); 




  //******************************** get project type **********************************/
  router.post("/get_stage_monitor", function (req, res) {
    try { 
      var reqParams=req.body; 
      let sproc= "SET @project_id=?; CALL `sp_get_stage_monitor`(@project_id);";
              // let sproc = " CALL `sp_get_project_stage`";
              db.query(sproc,[reqParams.project_id], async function(err, response) { 
                console.log("sproc",sproc);
                if (err) {   
                  console.log(err);       
                } else {    
                  var result=response[1];
                  if(result.length>0)
                  {        
                    //************************************Automatic complaince date (t+ days) calculation **********************/
                    let actual_date="";
                    let length=result.length;
                    // console.log("result",result);
                    let count_actual_date=result.filter(val => val.actual_date!=null).length;
                    console.log("count_actual_date",count_actual_date );
                    if(count_actual_date>0)
                    {
                      
                     
                    await asyncForEach(result,async (item,i)=>{
                     
                      console.log("actual_date_null",result[i].actual_date );

                      if(result[i].actual_date == null  )
                     //  if(result[i].compliance_date==null  )
                      { 

                        console.log("actual_date_null",result[i].actual_date );
                        var  no_of_days= await project_compliance_date(result[i].project_type_id,result[i].process_id,result[i].stage_id,result[i].sub_stage_id,result[i].sub_project_id );
                        if(no_of_days.length == 0)
                        {
                          no_of_days=30;
                        }
                        else
                        {
                          console.log("no_of_days",no_of_days[0].no_of_compliance_days);                        
                          no_of_days=no_of_days[0].no_of_compliance_days;
                        // console.log("no_of_days",no_of_days[0].no_of_compliance_days);                        
                        }
                        console.log("actual_date",actual_date);                        
                        var compliance_date= new Date(actual_date);
                        compliance_date.setDate(compliance_date.getDate()+ no_of_days);                       
                        console.log("compliance_date",compliance_date); 
                        result[i].compliance_date= dateFormat(compliance_date,"yyyy-mm-dd");
                        actual_date=compliance_date;  

                      } 
                      else
                      {

                      actual_date=result[i].actual_date; 
                      console.log("initial_date",actual_date);
                    }

                    if(i== result.length-1)
                    {
                      res.send({ status: 1, msg: "Success", data: result });
                    }
                  
                  });
                  }
                  else
                  {

                    res.send({ status: 1, msg: "Success", data: result });
                  }
                  }
                  else
                  {
                   res.send({ status: 1, msg: "Success", data: result });
                  }
                }   
              });    
  
            } catch (err) {      
              res.send({ status: 0, msg: "Error", data: [] });
            } 
          });

    function project_compliance_date(project_type_id,process_id,stage_id,sub_stage_id,sub_project_id){
            return new Promise((resolve)=>{
          let sproc = 
            "SET @project_type_id=?;SET @process_id=?;SET @stage_id=?;SET @sub_stage_id=?;SET @sub_project_id=?;CALL `sp_get_stage_days` (@project_type_id,@process_id,@stage_id,@sub_stage_id,@sub_project_id);";
          db.query(sproc,[project_type_id,process_id,stage_id,sub_stage_id,sub_project_id], function(err, response) { 
            if (err) { 
              console.log(err);   	
            } else {   
              var result= response[5]; 
              //console.log("response",response[5]); 
              resolve(result);
              
             // res.send({ status: 1, msg: "Success", data: response[5] });
            }   
          });   
          })} 


          
//******************************** get project type **********************************/
router.post("/get_project_stage_list", function (req, res) {
  try { 
    var reqParams=req.body;
    let sproc= "SET @project_type_id=?;SET @sub_proj_type_id=?;SET @process_id=?;  CALL sp_get_project_stage_lists (@project_type_id,@sub_proj_type_id,@process_id)";
            // let sproc = " CALL `sp_get_project_stage`";
            db.query(sproc,[reqParams.project_type_id,reqParams.sub_proj_type_id,reqParams.process_id], function(err, response) { 
              console.log("sproc",sproc);
              if (err) {  
                console.log(err);       
              } else {    
                res.send({ status: 1, msg: "Success", data: response[3] });
              }   
            });    

          
          } catch (err) {      
            res.send({ status: 0, msg: "Error", data: [] });
          } 
        });







  //******************************** get project type **********************************/
  router.get('/get_project_name',async (req,res)=>{ 
    try { 
        let sproc = " CALL `sp_get_project_name`;";
        db.query(sproc, function(err, response) { 
          if (err) { 
            console.log(err);   	
          } else {   
            res.send({ status: 1, msg: "Success", data: response[0] });
          }   
        });   
       
      } catch (err) {     
        res.send({ status: 0, msg: "Error", data: [] });
      } 
    });


  


  //******************************** get project type **********************************/
    router.get('/get_sub_project_type',async (req,res)=>{ 
        try { 
            let sproc = "SET @project_type_id=?; CALL `sp_get_sub_project_type` (@project_type_id) ;";
            db.query(sproc,[req.body.project_type_id], function(err, response) {  
              if (err) { 
                console.log(err);   	
              } else {   
                res.send({ status: 1, msg: "Success", data: response[1] });
              }   
            });   
           
          } catch (err) {     
            res.send({ status: 0, msg: "Error", data: [] });
          } 
        });

        router.get('/get_mark',async (req,res)=>{ 
            try { 
                let sproc = " CALL `sp_get_mark` ;";
                db.query(sproc, function(err, response) { 
                  if (err) { 
                    console.log(err);   	
                  } else {   
                    res.send({ status: 1, msg: "Success", data: response[0] });
                  }   
                });   
               
              } catch (err) {     
                res.send({ status: 0, msg: "Error", data: [] });
              } 
            });

            router.get('/get_project_type',async (req,res)=>{ 
              try { 
                  let sproc = " CALL `sp_get_project_type` ;";
                  db.query(sproc, function(err, response) { 
                    if (err) { 
                      console.log(err);   	
                    } else {   
                      res.send({ status: 1, msg: "Success", data: response[0] });
                    }   
                  });   
                 
                } catch (err) {     
                  res.send({ status: 0, msg: "Error", data: [] });
                } 
              });
//*****************************************get_billable_type - START ************************************* */
              router.get('/get_billable_type',async (req,res)=>{ 
                try { 
                    let sproc = " CALL `sp_get_billable_type` ;";
                    db.query(sproc, function(err, response) { 
                      if (err) { 
                        console.log(err);   	
                      } else {   
                        res.send({ status: 1, msg: "Success", data: response[0] });
                      }   
                    });   
                   
                  } catch (err) {     
                    res.send({ status: 0, msg: "Error", data: [] });
                  } 
                });

//*****************************************get_process_type - START ************************************* */
  router.post('/get_process_type',async (req,res)=>{ 
  try { 
      let sproc = "SET @project_type_id=?;SET @sub_project_type_id=?; CALL `sp_get_process_type` (@project_type_id,@sub_project_type_id) ;";
      db.query(sproc,[req.body.project_type_id,req.body.sub_project_type_id,], function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
          res.send({ status: 1, msg: "Success", data: response[2] });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  });

  //******************* get_project_sub_type - START **********************************************

router.post("/get_project_sub_type",async function(req, res) {
  try { 
      let sproc = 
        "SET @project_type_id=?; CALL `sp_get_project_sub_type` (@project_type_id)";
      db.query(sproc,[req.body.project_type_id], function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
          res.send({ status: 1, msg: "Success", data: response[1] });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  }); 
//******************* get_filing_type - START **********************************************
  router.post("/get_filing_type",async function(req, res) {
    try { 
        let sproc = 
          "SET @sub_project_type_id=?;SET @process_id=?;SET @project_type_id=?; CALL `sp_get_filing_type` (@sub_project_type_id,@process_id,@project_type_id)";
        db.query(sproc,[req.body.sub_project_type_id,req.body.process_id,req.body.project_type_id], function(err, response) { 
          if (err) { 
            console.log(err);   	
          } else {   
            console.log("response",response);
            res.send({ status: 1, msg: "Success", data: response[3] });
          }   
        });   
       
      } catch (err) {     
        res.send({ status: 0, msg: "Error", data: [] });
      } 
    }); 

//******************* insert_project_form - START **********************************************
router.post("/insert_project_form",async function(req, res) {
  // try { 
    
    //if(variable_rate>0){
      let sproc = 
      "SET @client_id=?;SET @project_type_id=?;SET @sub_project_id=?;SET @process_id=?;SET @file_type_id=?;SET @project_name=?;SET @billable_type_id=?;SET @councel_id=?;SET @hod_hr_id=?;SET @range_id=?;SET @comments=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @ip_address=?;SET @base_rate=?;SET @unit_of_measure=?;SET @limit_in_hours=?;SET @additional_rate=?; CALL `sp_insert_project_form` (@client_id,@project_type_id,@sub_project_id,@process_id,@file_type_id,@project_name,@billable_type_id,@councel_id,@hod_hr_id,@range_id,@comments,@created_on,@updated_on,@created_by,@updated_by,@ip_address,@base_rate,@unit_of_measure,@limit_in_hours,@additional_rate)";
    db.query(sproc,[req.body.client_id,req.body.project_type_id,req.body.sub_project_id,req.body.process_id,req.body.file_type_id,req.body.project_name,req.body.billable_type_id,req.body.councel_id,req.body.hod_hr_id,req.body.range_id,req.body.comments,req.body.created_on,req.body.updated_on,req.body.created_by,req.body.updated_by,req.body.ip_address,req.body.base_rate,req.body.unit_of_measure,req.body.limit_in_hours,req.body.additional_rate], function(err, response) { sproc
      console.log("sproc",sproc);
      console.log("response1",response[20][0].P_ID);
     // var project_id=response[20][0].project_id;
     
     {
      if (err) { 
        console.log(err);   	
      } else {   
        var variable_rate=req.body.variable_rate;

        let query= "";
       // console.log("response",response);
       if(variable_rate.length != 0){
        for(var i in variable_rate ){
          query += "INSERT INTO s_tbl_pm_project_rate (s_tbl_pm_project_rate.project_id,designation_id,activity_id,sub_activity_id,location_id,range_id,lower_limit,upper_limit,base_rate,unit_of_measure) VALUES ('"+response[20][0].P_ID+"','"+variable_rate[i].designation_id+"','"+variable_rate[i].activity_id+"','"+variable_rate[i].sub_activity_id+"','"+variable_rate[i].location_id+"','"+variable_rate[i].range_id+"','"+variable_rate[i].lower_limit+"','"+variable_rate[i].upper_limit+"','"+variable_rate[i].base_rate+"','"+variable_rate[i].unit_of_measure+"');"}
          console.log("query",query);
            db.query(query,function(err,response){
           console.log("response",response);  
              res.send({ status: 1, msg: "Success", data: [] });})
             }
             else {
              res.send({ status: 1, msg: "Success", data: [] });
              }
            
          }
        }  
      }  ) 
    })
 
   

//******************* get_project_form - START **********************************************
router.post("/get_project_form",async function(req, res) {
  try { 
    let sproc = 
      "SET @project_id=?; CALL `sp_get_project_form` (@project_id)";
    db.query(sproc,[req.body.project_id], function(err, response) { 
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








//******************* get_resume_project_search - START **********************************************
 router.post("/get_resume_project_search",async function(req, res) {
  try { 
    //************** get_project_type *************************** */
    var reqParam=req.body;
    let sproc = 
      "CALL `sp_get_project_type` ";
    db.query(sproc,async function(err, response) { 
      if (err) { 
        console.log(err);   	
      } else {   

        var projectTypeList=response[0];
        


    //************** get_project_resume_search *************************** */    
        let project_resume= await project_resume_search(reqParam);

       await asyncForEach( projectTypeList,(item,i)=>{

        var getProjectTypeInfo = (project_resume).filter((val)=> val.project_type_id == projectTypeList[i].project_type_id ); 

        // console.log("id",projectTypeList[i].project_type_id);
        // console.log("project_type",projectTypeList[i].project_type);
        // console.log("getProjectTypeInfo",getProjectTypeInfo);

          projectTypeList[i].project_details= getProjectTypeInfo;


        }
        );
        
        // console.log("response",response[0]);
        // console.log("project_resume1",project_resume[5]);
        res.send({ status: 1, msg: "Success", data: projectTypeList });
      }   
    });   
  
  } catch (err) {     
    res.send({ status: 0, msg: "Error", data: [] });
  } 
});

function project_resume_search(reqParam){
  return new Promise((resolve)=>{
let sproc = 
  "SET @client_id=?;SET @client_type_id=?;SET @project_type_id=?;SET @project_id=?;SET @billable_type_id=?; CALL `sp_get_resume_project_search` (@client_id,@client_type_id,@project_type_id,@project_id,@billable_type_id)";
db.query(sproc,[reqParam.client_id,reqParam.client_type_id,reqParam.project_type_id,reqParam.project_id,reqParam.billable_type_id], function(err, response) { 
  if (err) { 
    console.log(err);   	
  } else {   
    var result= response[5];
       resolve(result);
    //console.log("response",response[5]);
   // res.send({ status: 1, msg: "Success", data: response[5] });
  }   
});   
})} 

        return router;}