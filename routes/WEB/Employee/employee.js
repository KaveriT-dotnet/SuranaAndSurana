module.exports = function(router, db,errorData,async){

// router.post('/insert_employee',async (req,res)=>{
//            let  reqParams=req.body;                                                                                                                                                                                                                                                                                                
//            let sProc= "SET @name=?;SET @type_of_resource=?;SET @gender=?;SET @dob=?;SET @bas_qual=?;SET @add_quali_1=?;SET @add_quali_2=?;SET @institution=?;SET @last_employer=?;SET @start_date=?;SET @end_date=?;SET @skills=?;SET @traits=?;SET @certification=?;SET @specialization=?;SET @achievement=?;SET @capabilities=?;SET @talents=?;SET @special_interest=?;SET @con_ph_no =?;SET @email_addr  =?;SET @address=?;SET @state_of_domecile=?;SET @city=?;SET @certification=?;SET @status=?;SET @lang_known=?;SET @industry=?;SET @designation=?;SET @doj=?;SET @supervisor=?;SET @email=?;SET @supervisor_name=?;SET @supervisor_email=?;SET @official_email=?;SET @official_contact=?;SET @department=?;SET @employee__code=?; CALL sp_insertemployee(@name,@type_of_resource,@gender,@dob,@bas_qual,@add_quali_1,@add_quali_2,@institution,@last_employer,@start_date,@end_date,@skills,@traits,@certification,@specialization,@achievement,@capabilities@talents@special_interest@con_ph_no@email_addr@address@state_of_domecile@city,@certification,@status,@lang_known,@industry,@designation,@doj,@supervisor,@email,@supervisor_name,@supervisor_email,@official_email,@official_contact,@department,@employee__code)";
//             console.log("query",sProc);     
            
//             db.query(sProc,[reqParams.name,reqParams.type_of_resource,reqParams.gender,reqParams.dob,reqParams.bas_qual,reqParams.add_quali_1,reqParams.add_quali_2,reqParams.institution,reqParams.last_employer,reqParams.start_date,reqParams.end_date,reqParams.skills,reqParams.traits,reqParams.certification,reqParams.specialization,reqParams.achievement,reqParams.capabilities,reqParams.talents,reqParams.special_interest,reqParams.con_ph_no,reqParams.email_addr,reqParams.address,reqParams.state_of_domecile,reqParams.city,reqParams.status,reqParams.lang_known,reqParams.industry,reqParams.designation,reqParams.doj ,reqParams.supervisor,reqParams.email,reqParams.supervisor_name,reqParams.supervisor_email,reqParams.official_email,reqParams.official_contact,reqParams.department,reqParams.employee__code,],(err,response,fields) =>{
//             if(err)  
//             { 
//                console.log({error:err})
//             }
//            else   
//             {
//                var empId = response.insertId;

//               var uploadimage_data = req.files == null ? [] : Array.isArray(req.files.imageArray) == true ? req.files.imageArray : [req.files.imageArray];

//               let uploadImage_response =  uploadImage(uploadimage_data, empId);//upload and insert data
//               if (uploadImage_response.status == false) { error_status = false; error_message.push(uploadImage_response.response) }
//                 res.send({ status: 0, msg: "Success", data: empId  });

//             }
//             }) 
         
//           });

// function uploadImage(data, empId) {
//     return new Promise(resolve => {
//         async.forEachOf(data, function (obj, index, callback) {

//             var imageName = "Image_" + empId + "_" + obj.name
//             console.log(imageName);
//             //../../../var/www/html/salesmanuploads/
//             obj.mv('../../../var/www/html/suranauploads/' + imageName, function (err) {
//                 if (err) {
//                     console.log('err', err);
//                 } else {
//                     console.log(obj)
//                     var query = "UPDATE `s_tbl_pm_employee` SET `upload_document`='" + imageName + "' WHERE `emp_id `='" + empId + "'";

//                     console.log(query);
//                     db.query(query, function (err, response) {
//                         if (err) {
//                             console.log(err);
//                         }
//                     });

//                 }
//                 callback();
//             })
//         },
//             function (err) {
//                 if (err) {
//                     console.log(err.message);
//                     resolve({ status: false, response: err.message });
//                 } else {
//                     resolve({ status: true, response: true });
//                 }
//             });

//     })
// };

router.get("/get_employee_list", function (req, res) {
  var query = "SELECT s_tbl_pm_employee.emp_id,s_tbl_pm_employee.name FROM `s_tbl_pm_employee` WHERE approved_by IS NOT NULL";
  db.query(query, function (err, response) {
    if (err) {
      console.log(err.message);
    } else {
      //   res.send(response);
      res.send({ status: 1, msg: "Success", data: response });
    }
  });
})

router.get("/get_trade_mark_status", function (req, res) {
  try { 
            let sproc = " CALL `sp_get_trade_mark_status`";
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
router.get("/get_trade_mark_usage_details", function (req, res) {
  var query = "SELECT s_tbl_m_status.status_id,s_tbl_m_status.status FROM `s_tbl_m_status` WHERE status_type='UserDetails'";
  db.query(query, function (err, response) {
    if (err) {
      console.log(err.message);
    } else {
      //   res.send(response);
      res.send({ status: 1, msg: "Success", data: response });
    }
  });
})

router.get("/get_range", function (req, res) {
  try { 
            let sproc = " CALL `sp_get_range`";
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


router.get("/get_project_form", function (req, res) {
  try { 
            let sproc = " CALL `sp_get_project_form`";
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

//router.post("/insert_project_stage",async function(req, res) {
//  var query = "INSERT INTO `s_tbl_pm_stage`(`project_id`,`project_type_id`,`map_stage_id`,`sub_project_id`,`stage_id`,`sub_stage_id`,`compliance_date`,`actual_date`,`created_on`,`updated_on`,`created_by`,`updated_by`) VALUES ('"+req.body.project_id+"','"+req.body.project_type_id+"','"+req.body.map_stage_id+"','"+req.body.sub_project_id+"','"+req.body.stage_id+"','"+req.body.sub_stage_id+"','"+req.body.compliance_date+"','"+req.body.actual_date+"','"+req.body.created_on+"','"+req.body.updated_on+"','"+req.body.created_by+"','"+req.body.updated_by+"')";
//
//    console.log(query);
//    
//      db.query(query, function (err, response) {
//        if (err) {
//          console.log(err.message); 
//          res.send({ status: 0, msg: "Failed", data: [] }); 
//        }
//            else {
//                res.send({ status: 0, msg: "Success", data: response  });
//
//            }
//        })
//})

//router.get("/get_project_stage", function (req, res) {
//  try { 
//            let sproc = " CALL `sp_get_project_stage`";
//            db.query(sproc, function(err, response) { 
//              if (err) { 
//                console.log(err);     
//              } else {   
//                res.send({ status: 1, msg: "Success", data: response[0] });
//              }   
//            });   
//           
//          } catch (err) {     
//            res.send({ status: 0, msg: "Error", data: [] });
//          } 
//        });


router.get("/get_unit_of_measure", function (req, res) {
  try { 
            let sproc = "CALL `sp_get_unit_of_measure`";
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


router.post("/insert_vairable_rate",async function(req, res) {
  try { 
      let sproc = 
        "SET @range_id=?;SET @location_id=?;SET @designation_id=?;SET @activity_id=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @sub_activity_id=?;SET @rate=?;SET @upper_limit=?;SET @lower_limit=?;SET @unit_id=?; CALL `sp_insert_vairable_rate` (@range_id,@location_id,@designation_id,@activity_id,@created_on,@updated_on,@created_by,@updated_by,@sub_activity_id,@rate,@upper_limit,@lower_limit,@unit_id)";
      db.query(sproc,[req.body.range_id,req.body.location_id,req.body.designation_id,req.body.activity_id,req.body.created_on,req.body.updated_on,req.body.created_by,req.body.updated_by,req.body.sub_activity_id,req.body.rate,req.body.upper_limit,req.body.lower_limit,req.body.unit_id,], function(err, response) { 
        if (err) { 
          console.log(err);     
        } else {   
          console.log("response",response);
          res.send({ status: 1, msg: "Success", data: [] });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  }); 

router.get("/get_variable_rate", function (req, res) {
  try { 
            let sproc = "CALL `sp_get_variable_rate`";
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

router.post("/get_stage", function (req, res) {
  var query = "SELECT s_tbl_pm_stage.tm_stage_id,s_tbl_pm_project.project_id,s_tbl_pm_project.project_name,s_tbl_m_project_type.project_type_id,s_tbl_m_project_type.project_type,s_tbl_m_sub_project_type.sub_project_type,s_tbl_m_stage.stage,s_tbl_m_sub_stage.sub_stage,s_tbl_pm_stage.compliance_date,s_tbl_pm_stage.actual_date,s_tbl_pm_stage.created_on,s_tbl_pm_stage.updated_on,s_tbl_pm_stage.created_by,s_tbl_pm_stage.updated_by FROM `s_tbl_pm_stage` INNER JOIN s_tbl_pm_project ON s_tbl_pm_project.project_id =s_tbl_pm_stage.project_id INNER JOIN s_tbl_m_project_type ON s_tbl_m_project_type.project_type_id =s_tbl_pm_stage.project_type_id INNER JOIN s_tbl_m_sub_project_type ON s_tbl_m_sub_project_type.sub_project_type_id =s_tbl_pm_stage.sub_project_id INNER JOIN s_tbl_m_stage ON s_tbl_m_stage.stage_id =s_tbl_pm_stage.stage_id INNER JOIN s_tbl_m_sub_stage ON s_tbl_m_sub_stage.sub_stage_id =s_tbl_pm_stage.sub_stage_id WHERE s_tbl_pm_stage.project_id='" + req.body.project_id + "' AND s_tbl_pm_stage.project_type_id='" + req.body.project_type_id + "'";
  db.query(query, function (err, response) {
    if (err) {
      console.log(err.message);
    } else {
      //   res.send(response);
      res.send({ status: 0, msg: "Success", data: response });
    }
  });
})

//router.post("/insert_hearing",async function(req, res) {
//  try { 
//      let sproc = 
//        "SET @project_id=?;SET @hearing_outcome=?;SET @hearing_date=?;SET @next_hearing_date=?;SET @adjournment_taken_by=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @reason=?; CALL `sp_insert_hearing` (@project_id,@hearing_outcome,@hearing_date,@next_hearing_date,@adjournment_taken_by,@created_on,@updated_on,@created_by,@updated_by,@reason)";
//      db.query(sproc,[req.body.project_id,req.body.hearing_outcome,req.body.hearing_date,req.body.next_hearing_date,req.body.adjournment_taken_by,req.body.created_on,req.body.updated_on,req.body.created_by,req.body.updated_by,req.body.reason], function(err, response) { 
//        if (err) { 
//          console.log(err);     
//        } else {   
//          console.log("response",response);
//          res.send({ status: 1, msg: "Success", data: [] });
//        }   
//      });   
//     
//    } catch (err) {     
//      res.send({ status: 0, msg: "Error", data: [] });
//    } 
//  }); 

router.get("/get_hearing", function (req, res) {
  try { 
            let sproc = "CALL `sp_get_hearing`";
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


router.post("/insert_hearing_adjourn",async function(req, res) {
        try { 
            let sproc = 
              "SET @adjournment_taken_by=?;SET @reason=?; CALL `sp_insert_hearing_adjourn` (@adjournment_taken_by,@reason)";
            db.query(sproc,[req.body.adjournment_taken_by,req.body.reason], function(err, response) { 
              if (err) { 
                console.log(err);     
              } else {   
                console.log("response",response);
                res.send({ status: 1, msg: "Success", data: [] });
              }   
            });   
           
          } catch (err) {     
            res.send({ status: 0, msg: "Error", data: [] });
          } 
        });

router.get("/get_litigation_councel", function (req, res) {
  try { 
            let sproc = "CALL `sp_get_litigation_councel`";
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

router.get("/get_case_type", function (req, res) {
  try { 
            let sproc = "CALL `sp_get_case_type`";
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

router.post("/get_subordinate", function (req, res) {
  var reqParams = req.body;
  //***********************Get subordinate details with employee info ***************************/
  let  query = "SET @emp_id=?;CALL sp_get_subordinate(@emp_id);  ";
  //****************Validation ********************/
  if(reqParams.emp_id)
  {
  db.query(query,[ reqParams.emp_id ], function (err, response) {
    console.log(query,[ reqParams.emp_id ]);
    if (err) {
      console.log(err.message);
    } else {
      if(response.length>0)
      res.send({ status: 1, msg: "Success", data: response[1] });
      else
      res.status(405).send({ status: 0, msg: "Failed", data: [] });
    }
  }) 
}
else
res.status(403).send({ status: 0, msg: "Invalid parameter", data: [] });

})


//*************************** update_employee_skills ******************************* */

router.put("/update_employee_skills", function (req, res) {
  var query = "SET @skills=?; SET @emp_id=?; CALL sp_update_employee_skills (@skills,@emp_id)";
  db.query(query,[req.body.skills,req.body.emp_id], function (err, response) {
    if (err) {
      console.log(err.message);
    } else {
      //   res.send(response);
      res.send({ status: 1, msg: "Success", data: [] });
    }
  });
})

//*************************** get_employee_code ******************************* */

router.get("/get_employee_code", function (req, res) {
  var query = " CALL sp_get_employee_code ";
  db.query(query, function (err, response) {
    if (err) {
      console.log(err.message);
    } else {
      //   res.send(response);
      res.send({ status: 1, msg: "Success", data: response[0] });
    }
  });
})

//*************************** sp_get_employee_list_search ******************************* */

router.post("/get_employee_list_search", function (req, res) {
  var reqParam=req.body;
  var query = "SET @employee_code=?; SET @designation=?; SET @department=?; CALL sp_get_employee_list_search (@employee_code,@designation,@department) ";
  db.query(query,[reqParam.employee_code,reqParam.designation,reqParam.department], function (err, response) {
    if (err) {
      console.log(err.message);
    } else {
      //   res.send(response);
      res.send({ status: 1, msg: "Success", data: response[3] });
    }
  });
})

//*************************** get_bank_name START ******************************* */

router.get("/get_bank_name", function (req, res) {
  var reqParam=req.body;
  var query = " CALL sp_get_bank_name  ";
  db.query(query, function (err, response) {
    if (err) {
      console.log(err.message);
    } else {
      //   res.send(response);
      res.send({ status: 1, msg: "Success", data: response[0] });
    }
  });
})

//*************************  insert_employee_resume START *********************************************//
router.post('/insert_employee',async (req,res)=>{
 
   
    var reqParams=req.body;
   
    //********************validate emp_code already exists **********************/


      let sProc= "SET @resume_id=?;SET @designation=?;SET @doj=?;SET @supervisor=?;SET @official_email=?;SET @official_contact=?;SET @department=?;SET @employee_code=?;SET @account_number=?;SET @ifsc_code=?;SET @bank_id=?;SET @created_on=?;SET @created_by=?;SET @task_id=?;SET @supervisor_email=?; CALL sp_insert_employee_resume(@resume_id,@designation,@doj,@supervisor,@official_email,@official_contact,@department,@employee_code,@account_number,@ifsc_code,@bank_id,@created_on,@created_by,@task_id,@supervisor_email)";
      console.log("query",sProc);     
    
    db.query(sProc,[reqParams.resume_id,reqParams.designation,reqParams.doj,reqParams.supervisor,reqParams.official_email,reqParams.official_contact,reqParams.department,reqParams.employee_code,reqParams.account_number,reqParams.ifsc_code,reqParams.bank_id,reqParams.created_on,reqParams.created_by,reqParams.task_id,reqParams.supervisor_email],async (err,response,fields) =>{
    if(err)   { 
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
  
    //  console.log("response1",response);
      console.log("response",response[15][0].emp_id);  
      var emp_id=response[15][0].emp_id;
     var reqParams = req.body; 
      var filename = req.files == null ? [] : Array.isArray(req.files.upload_document) == true ? req.files.upload_document : [req.files.upload_document];     
        console.log("filenae",filename);
      var fileuploads=await imageUpload(filename,emp_id); 
      console.log("fileuploads",fileuploads);
     
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
  
  })


function imageUpload(data, emp_id) {
return new Promise(resolve => {
    async.forEachOf(data, function (obj, index, callk) {

        var imageName = "Image_" + emp_id + "_" + obj.name
        console.log(imageName);
       // obj.mv('H:/uploads/' + imageName, function (err) {
        obj.mv('../../../var/www/html/suranauploads/' + imageName, function (err) {
            if (err) {
                console.log('err', err);
            } else {
                console.log(obj)
                // console.log("req.file",req.fileS.hall_ticket);
                 var query = "UPDATE s_tbl_pm_employee SET s_tbl_pm_employee.upload_document = '"+imageName+"' WHERE s_tbl_pm_employee.emp_id='"+emp_id+"';";
              //  var query = "INSERT INTO s_tbl_pm_document (s_tbl_pm_document.document_type_id,s_tbl_pm_document.file_name,s_tbl_pm_document.upload_document) VALUES (41,);";
            
                console.log(query);
                db.query(query, function (err, response) {
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
}


    return router; }    