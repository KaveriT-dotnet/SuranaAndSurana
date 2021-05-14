module.exports = function(router, db,errorData,async){

//********************** insert_s_tbl_pm_int_details - START *********************************************

       router.post('/insert_s_tbl_pm_int_details',async (req,res)=>{
     // console.log("query",sProc);
        let  reqParams=req.body;  
        let sProc= "SET @selected_cand_id=?;SET @employee_id=?;SET @prop_designation=?;SET @prop_date_time=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @ip_address=?;SET @round=?; CALL sp_insertInterviewDetails(@selected_cand_id,@employee_id,@prop_designation,@prop_date_time,@created_on,@updated_on,@created_by,@updated_by,@ip_address,@round) ";
         console.log("query",sProc);     
         db.query(sProc,[reqParams.selected_cand_id,reqParams.employee_id,reqParams.prop_designation,reqParams.prop_date_time,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by,reqParams.ip_address,reqParams.round],(err,response,fields) =>{ 
         //console.log("selected_cand_id",selected_cand_id)
          if(err)  
         { 
            console.log({error:err})
         }
        else     
         {
            res.send({status:1,msg:"Success",data:[]})  
         }
         })  
       });

//********************** insert_approve_status - START *********************************************

           router.post('/insert_approve_status',async (req,res)=>{
        // console.log("query",sProc);
           let  reqParams=req.body;                                                                                                                                                                                                                                                                                                
           let sProc= "SET @status=?;SET @score=?;SET @reviewer=?;SET @approval=?;SET @Interviewer_cmt=?;SET @approver_cmt=?;SET @prop_designation=?;SET @prop_int_date_time=?;SET @resume_id=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @ip_address=?;SET @int_detail_id=?; CALL sp_insertInterviewStatus(@status,@score,@reviewer,@approval,@Interviewer_cmt,@approver_cmt,@prop_designation,@prop_int_date_time,@resume_id,@created_on,@updated_on,@created_by,@updated_by,@ip_address,@int_detail_id) ";
            console.log("query",sProc);     
            db.query(sProc,[reqParams.status,reqParams.score,reqParams.reviewer,reqParams.approval,reqParams.Interviewer_cmt,reqParams.approver_cmt,reqParams.prop_designation,reqParams.prop_int_date_time,reqParams.resume_id,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by,reqParams.ip_address,reqParams.int_detail_id],(err,response,fields) =>{
            if(err)  
            { 
               console.log({error:err})
            }
           else    
            {
               res.send({status:1,msg:"Success",data:[]})  
            }
            }) 
         
          });

//********************** get_interviewers - START  *********************************************


router.post("/get_hr_resume_search",async function(req, res) {
  try { 
    console.log("query","here");


        var reqParams= req.body;
      // let sproc = 
      //   " SET @designation_id=''; SET @round=''; SET @status_id=''; CALL sp_get_resume_hr_search(@, @p1, @p2);";
      
      let sproc = 
      " SET @designation_id=? ; SET @round=?; SET @status_id=?; CALL sp_get_resume_hr_search(@designation_id, @round, @status_id); ";
      console.log("query",sproc);     
      db.query(sproc, [reqParams.designation_id,reqParams.round,reqParams.status_id], async function(err, response) { 
        if (err) {   
          console.log(err);    	
        } else {

          var result= response[3];
          console.log("result",result);
          var designation;
          console.log("result123",result)
          designation =  await getInterviewDesignation(); 
          designation=designation[0];
          if(reqParams.designation_id=="0")
           {
           
            //  console.log("designation",designation);
         
            //***********for each */
             await asyncForEach(designation, async(item,i)=>{
             
              //output[i].push(item);
              console.log("designation_id_info",designation[i].designation_id);
              designation[i].result= result.filter(val=> val.designation_id==item.designation_id );

             })

            // console.log("output",designation);
             //  result = result.filter(val=> val.designation_id== reqParams.designation_id);
             

           } 
           else
           { 

             console.log("result",designation);
             console.log("result_test",reqParams.designation_id ); 
             designation = designation.filter(val => val.designation_id==reqParams.designation_id  ); 
             console.log("designation_Test",designation);
             designation[0].result= result.filter(val=> val.designation_id==reqParams.designation_id );

            }
          res.send({ status: 1, msg: "Success", data: designation });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [err] });
    } 
  });  

  function getInterviewDesignation()
  {
  
    return new Promise((resolve)=>{
      sProc =" CALL sp_get_interview_designation();";
      
      db.query(sProc,function(err,response){  
        // console.log("sProc",sProc, interviewDetailId);
        if(err){     
        console.log(err);   
         resolve([]);
        }else{    
           
          console.log("result[1]",response);
          resolve(response);
         }  
         }); 
  
    })
  }







router.get("/get_interviewers",async function(req, res) {
  try { 
      let sproc = 
        " CALL sp_get_interviewers";
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

  //********************** get_questions - START *********************************************************

router.get("/get_questions",async function(req, res) {
  try { 
      let sproc = 
        " CALL sp_get_questions";
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

  //********************** insert_interview_scores - START *********************************************

  router.post('/insert_interview_scores',async (req,res)=>{
    // console.log("query",sProc);
       let  reqParams=req.body;                                                                                                                                                                                                                                                                                                
       let sProc= "SET @designation=?;SET @comment=?;SET @score_inital=?;SET @score_reviewer=?;SET @final_score=?;SET @status=?;SET @int_details_id=?;SET @resume_id=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @ip_address=?;SET @task_id=?;SET @round=?; CALL sp_insert_interview_scores (@designation,@comment,@score_inital,@score_reviewer,@final_score,@status,@int_details_id,@resume_id,@created_on,@updated_on,@created_by,@updated_by,@ip_address,@task_id,@round) ";
        console.log("query",sProc);     
        db.query(sProc,[reqParams.designation,reqParams.comment,reqParams.score_inital,reqParams.score_reviewer,reqParams.final_score,reqParams.status,reqParams.int_details_id,reqParams.resume_id,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by,reqParams.ip_address,reqParams.task_id,reqParams.round],(err,response,fields) =>{
        if(err)  
        { 
           console.log({error:err})
        }
       else   
        { 
           res.send({status:1,msg:"Success",data:[]})  
        }
        }) 
     
      });
 //********************** get_Interview_Status - START *********************************************************

 router.get("/get_Interview_Status",async function(req, res) {
  try { 
      let sproc = 
        " CALL sp_get_Interview_Status ";
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
//********************** get_s_tbl_m_designation - START *********************************************************

 router.get("/get_s_tbl_m_designation",async function(req, res) {
  try { 
      let sproc = 
        " CALL sp_get_s_tbl_m_designation ";
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

//******************* get_employee_by_id - START **********************************************

 router.post("/get_employee_by_id",async function(req, res) {
  try { 
  console.log(req.body);
        let sproc = 
        "SET @emp_id=?; CALL `sp_get_employee_by_id` (@emp_id) ;";
      db.query(sproc,[req.body.emp_id], function(err, response) { 
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

 //******************* get_candidate_details_by_id - START **********************************************

 router.post("/get_candidate_details_by_id",async function(req, res) {
  try { 
var resume_id=req.body.resume_id;
console.log("req.body.resume_id",req.body.resume_id);
      let sproc = 
        "SET @resume_id=?; CALL `sp_get_candidate_details_by_id` (@resume_id) ;";
      db.query(sproc,[req.body.resume_id],async function(err, response) { 
        if (err) { 
          console.log(err);   	
        } 
  //  else {   
  //        res.send({ status: 1, msg: "Success", data: response[1] }); 
  //      }   
  //    });   
     
  //  } catch (err) {     
  //    res.send({ status: 0, msg: "Error", data: [] });
  //  } 
  //  });

 else {   
          var output=[];
           var result=response[1];

         // ************** get_qualification ************************************
        let result1=await get_qualification(resume_id);  
        var re= await asyncForEach(result,(item,i)=>{
          result[i].qualification=result1;
        })
         // ************** get_experience  ************************************
         let result2=await get_experience(resume_id);
         await asyncForEach(result,(item,i)=>{
          result[i].experience=result2;
         })
           output.push({result});
           res.send({ status: 1, msg: "Success", data: output });
          }   
        });   
       
      } catch (err) {     
        res.send({ status: 0, msg: "Error", data: [] });
      } 
    });

    function get_qualification(resume_id){
      return new Promise (resolve=>{
       let sporc="SELECT s_tbl_pm_qualification.qulification_id,s_tbl_pm_qualification.qualification,s_tbl_m_qual.qual_name,s_tbl_pm_qualification.year_of_passing,s_tbl_pm_qualification.cgpa,s_tbl_pm_qualification.certification_no,s_tbl_m_certification.certification,s_tbl_pm_qualification.institution,s_tbl_pm_qualification.resume_id FROM s_tbl_pm_qualification LEFT JOIN s_tbl_m_qual ON s_tbl_m_qual.qualification_id IN (s_tbl_pm_qualification.qualification) LEFT JOIN s_tbl_m_certification ON s_tbl_m_certification.certification_id IN (s_tbl_pm_qualification.certification_no) WHERE s_tbl_pm_qualification.resume_id='"+resume_id+"'";
       db.query(sporc,function(err,response){
        if(err){     
          console.log(err); 
         }else{   

            resolve(response);
           }  
      
       })
      })

    }

    function get_experience(resume_id){
      return new Promise (resolve=>{
       let sporc="SELECT s_tbl_pm_experience.experience_id,s_tbl_pm_experience.company_name,s_tbl_pm_experience.city AS city_id,s_tbl_m_city.state AS city,s_tbl_pm_experience.department AS department_id,s_tbl_m_department.department,s_tbl_pm_experience.designation AS designation_id,s_tbl_m_designation.designation,s_tbl_pm_experience.period_from,s_tbl_pm_experience.period_to,s_tbl_pm_experience.type_of_industry,s_tbl_m_industry.industry,s_tbl_pm_experience.responsible,s_tbl_pm_experience.resume_id FROM s_tbl_pm_experience LEFT JOIN s_tbl_m_city ON s_tbl_m_city.city_id IN (s_tbl_pm_experience.city) LEFT JOIN s_tbl_m_department ON s_tbl_m_department.department_id IN(s_tbl_pm_experience.department) LEFT JOIN s_tbl_m_designation ON s_tbl_m_designation.designation_id IN (s_tbl_pm_experience.designation) LEFT JOIN s_tbl_m_industry ON s_tbl_m_industry.industry_id IN (s_tbl_pm_experience.type_of_industry) WHERE s_tbl_pm_experience.resume_id='"+resume_id+"'";
       db.query(sporc,function(err,response){
        if(err){     
          console.log(err); 
         }else{   
                      
            resolve(response);
           }  
      
       })
      })

    }

//************get_to_do_interview_by_id


router.post("/get_to_do_interview_by_id", function (req, res) {
  // var query = "SELECT s_tbl_pm_interview.interview_id,s_tbl_m_designation.designation,s_tbl_pm_interview.comment,s_tbl_pm_interview.score_inital,s_tbl_pm_interview.created_on AS Date FROM `s_tbl_pm_interview` join s_tbl_m_designation ON s_tbl_m_designation.designation_id=s_tbl_pm_interview.designation WHERE resume_id = '" + req.body.resume_id + "'";

  var query ="SELECT s_tbl_pm_interview.interview_id,s_tbl_m_designation.designation,s_tbl_pm_interview.comment,s_tbl_pm_interview.score_inital,s_tbl_pm_interview.created_on AS Date, s_tbl_pm_resume.name ,  s_tbl_pm_interview.created_by,s_tbl_pm_interview.round AS round_id,round.status AS round, s_tbl_pm_interview.status AS status_id,s_tbl_m_status.status   FROM `s_tbl_pm_interview` join s_tbl_m_designation ON s_tbl_m_designation.designation_id=s_tbl_pm_interview.designation   JOIN s_tbl_pm_resume on  s_tbl_pm_resume.resume_id= s_tbl_pm_interview.resume_id LEFT  join s_tbl_pm_resume as pm_resume on  s_tbl_pm_interview.created_by= pm_resume.resume_id LEFT JOIN  s_tbl_m_status AS round ON round.status_id = (s_tbl_pm_interview.round) LEFT JOIN s_tbl_m_status ON s_tbl_m_status.status_id =(s_tbl_pm_interview.status) WHERE s_tbl_pm_interview.resume_id = '" + req.body.resume_id + "' ";
  console.log(query);  

  db.query(query, async function (err, response) {
    if (err) { 
      console.log(err.message);
    } else {
      //   res.send(response);

      // var result=response;
      await asyncForEach(response, async(item,i)=>{
        
      let get_interviewers= await getInterviewers(response[i].created_by);  
      console.log("name",get_interviewers );
      response[i].interviewer= get_interviewers[0].name;
    });
      
      res.send({ status: 1, msg: "Success", data: response });
    }
  });
})



function getInterviewers(emp_id)
{

  return new Promise((resolve)=>{
    let sproc = 
        "SET @emp_id=?; CALL `sp_get_employee_by_id` (@emp_id) ;";
    console.log("sProc",emp_id, emp_id);
    db.query(sproc,[emp_id], function(err, response) { 
      if(err){     
      console.log(err);   
       resolve([]);
      }else{    

        var result= response[1]; 
        console.log("result[1]",response);
       
        resolve(result);
       }  
       }); 

  })
}



//**********get_employee_approval

router.post("/get_employee_approval", function (req, res) {
  var query = "SELECT s_tbl_pm_employee.emp_id,s_tbl_pm_employee.name,s_tbl_m_designation.designation, s_tbl_pm_employee.employee_code as employee_code FROM `s_tbl_pm_employee` join s_tbl_m_designation ON s_tbl_m_designation.designation_id=s_tbl_pm_employee.designation WHERE emp_id = '" + req.body.emp_id + "'";
  db.query(query, function (err, response) {
    if (err) {
      console.log(err.message);
    } else {

      

      //   res.send(response);
      res.send({ status: 1, msg: "Success", data: response });
    }
  });
})



//********************** insert_employee - START *********************************************

  router.post('/insert_employee',async function (req,res){
    // console.log("query",sProc);
    
       let  reqParams=req.body;  
       let sProc= "SET @name=?;SET @type_of_resource=?;SET @gender=?;SET @dob=?;SET @bas_qual=?;SET @add_quali_1=?;SET @add_quali_2=?;SET @institution=?;SET @last_employer=?;SET @start_date=?;SET @end_date=?;SET @skills=?;SET @traits=?;SET @certification=?;SET @specialization=?;SET @achievement=?;SET @capabilities=?;SET @talents=?;SET @special_interest=?;SET @con_ph_no=?;SET @email_addr=?;SET @address=?;SET @state_of_domecile=?;SET @city=?;SET @status=?;SET @lang_known=?;SET @industry=?;SET @designation=?;SET @doj=?;SET @supervisor=?;SET @email=?;SET @supervisor_name=?;SET @supervisor_email=?;SET @official_email=?;SET @official_contact=?;SET @department=?;SET @employee__code=?;SET @upload_document=?;SET @biometric_data=?;SET @approved_by=?;SET @approved_date=?;SET @is_interviewer=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @ip_address=?;SET @task_id=?; CALL sp_insert_employee(@name,@type_of_resource,@gender,@dob,@bas_qual,@add_quali_1,@add_quali_2,@institution,@last_employer,@start_date,@end_date,@skills,@traits,@certification,@specialization,@achievement,@capabilities,@talents,@special_interest,@con_ph_no,@email_addr,@address,@state_of_domecile,@city,@status,@lang_known,@industry,@designation,@doj,@supervisor,@email,@supervisor_name,@supervisor_email,@official_email,@official_contact,@department,@employee__code,@upload_document,@biometric_data,@approved_by,@approved_date,@is_interviewer,@created_on,@updated_on,@created_by,@updated_by,@ip_address,@task_id) ";
        console.log("query",sProc);     
        db.query(sProc,[reqParams.name,reqParams.type_of_resource,reqParams.gender,reqParams.dob,reqParams.bas_qual,reqParams.add_quali_1,reqParams.add_quali_2,reqParams.institution,reqParams.last_employer,reqParams.start_date,reqParams.end_date,reqParams.skills,reqParams.traits,reqParams.certification,reqParams.specialization,reqParams.achievement,reqParams.capabilities,reqParams.talents,reqParams.special_interest,reqParams.con_ph_no,reqParams.email_addr,reqParams.address,reqParams.state_of_domecile,reqParams.city,reqParams.status,reqParams.lang_known,reqParams.industry,reqParams.designation,reqParams.doj,reqParams.supervisor,reqParams.email,reqParams.supervisor_name,reqParams.supervisor_email,reqParams.official_email,reqParams.official_contact,reqParams.department,reqParams.employee__code,reqParams.upload_document,reqParams.biometric_data,reqParams.approved_by,reqParams.approved_date,reqParams.is_interviewer,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by,reqParams.ip_address,reqParams.task_id],async (err,response,fields) =>{
        if(err)  
        { 
           console.log({error:err})
        }
       else    
        {
           console.log("response",response[48]);
          
          console.log("response",response[48][0].emp_id);  
          var emp_id=response[48][0].emp_id;
         // var reqParams = req.body;  
          var filename = req.files == null ? [] : Array.isArray(req.files.upload_document) == true ? req.files.upload_document : [req.files.upload_document];     
            console.log("filenae",filename);
          var fileuploads=await imageUpload(filename,emp_id);    
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
                    // console.log("req.file",req.fileS.upload_document);
                    var query = "SET @upload_document=?;SET @emp_id=?; CALL sp_insert_employee_upload_document(@upload_document,@emp_id)";
                
                    console.log(query);
                    db.query(query,[imageName,emp_id], function (err, response) {
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
  //******************* insert_employee_status - START **********************************************

  router.post("/insert_employee_status",async function(req, res) {
  try { 
      let sproc = 
        "SET @emp_id=?;SET @approved_by=?;SET @approved_date=?;SET @task_id=?;SET @emp_status=?; CALL sp_insert_employee_status (@emp_id,@approved_by,@approved_date,@task_id,@emp_status) ;";
      db.query(sproc,[req.body.emp_id,req.body.approved_by,req.body.approved_date,req.body.task_id,req.body.emp_status], function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
          res.send({ status: 1, msg: "Success", data: response });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  });    

//******************* get_round - START **********************************************

  router.get("/get_round",async function(req, res) {
    try { 
        let sproc = 
          " CALL `sp_get_round` ";
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
        

    return router; }    
