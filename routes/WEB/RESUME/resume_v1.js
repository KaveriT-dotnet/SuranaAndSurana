module.exports = function(router, db){ 

//*******************************API - GET***********************************************************//
router.post('/get_resume_search',(req,res)=>{
  try
  {
  var reqParams=req.body;
  console.log("trait_id",reqParams.trait_id)

  let sProc= " SET @skill_id= ?, @trait_id=?,@certification_id=?,@achievement_id=?,@specialization_id=?,@capability_id=?,@talent_id=?,@status_id=?,@qualification_id=? ,@min_experience=? ,@max_experience=? ;CALL sp_get_resume_search(@skill_id, @trait_id,@certification_id,@achievement_id,@specialization_id,@capability_id,@talent_id,@status_id,@qualification_id,@min_experience,@max_experience); ";
  console.log("query",sProc);
  db.query(sProc,[reqParams.skill_id,reqParams.trait_id,reqParams.certification_id,reqParams.achievement_id,reqParams.specialization_id,reqParams.capability_id,reqParams.talent_id,reqParams.status_id,reqParams.qualification_id,reqParams.min_experience,reqParams.max_experience],function(err,response){  
  if(err){     
  console.log(err);  
   res.send({ status: 0, msg: 'Failed', data: err }); 
  }else{   
    console.log("SET @skill_id= "+reqParams.skill_id+", @trait_id= "+reqParams.trait_id+",@certification_id="+reqParams.certification_id+",@achievement_id="+reqParams.achievement_id+",@specialization_id="+reqParams.specialization_id+",@capability_id="+reqParams.capability_id+",@talent_id="+reqParams.talent_id+",@status_id="+reqParams.status_id+",@qualification_id="+reqParams.qualification_id+" ,@min_experience="+reqParams.min_experience+" ,@max_experience="+reqParams.max_expereience+" ;CALL sp_get_resume_search(@skill_id, @trait_id,@certification_id,@achievement_id,@specialization_id,@capability_id,@talent_id,@status_id,@qualification_id,@min_experience,@max_experience)");
   res.send({ status: 1, msg: 'Success', data: response[1] }); 
   }  
   });  
    
  }
  catch(ex)
  {
    res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
  }
 }); 


// //*******************************API - GET***********************************************************//
// router.get('/get_s_tbl_pm_resume',(req,res)=>{
//  var query =  " select * from s_tbl_pm_resume   "; 
//  db.query(query,function(err,response){  
//  if(err){     
//  console.log(err);  
//   res.send({ status: 0, msg: 'Failed', data: err }); 
//  }else{   
//   res.send({ status: 1, msg: 'Success', data: response }); 
//   }  
//   });  
// }); 
//*******************************API - POST***********************************************************//

isNULLEmptyUndefined =(val)=>
{ 
  switch(val)
  {
    case null :
     case undefined:
    case "":
        return null;
    default: 
       if(val)
       return val;
       else
        return null;


  }

}


//******************** insert_s_tbl_pm_resume - START *******************************
router.post('/insert_s_tbl_pm_resume',(req,res)=>{ 
var reqParams = req.body;
reqParams.last_empr_start_date=isNULLEmptyUndefined (reqParams.last_empr_start_date)==null?null: "'" +reqParams.last_empr_start_date +"'" ;
reqParams.last_empr_end_date=isNULLEmptyUndefined (reqParams.last_empr_end_date)==null?null: "'" +reqParams.last_empr_end_date +"'";
console.log("last_empr_start_date",reqParams.last_empr_start_date );
console.log("last_empr_end_date",reqParams.last_empr_end_date );
// var startDate= reqParams.startDate;
// var endDate= reqParams.startDate;   
//console.log("req.body",reqParams);
var query =  " INSERT INTO s_tbl_pm_resume ( user_id,name,type_of_resource,gender,dob,organization2,organization1,ref_name1,ref_name2,linkedin,twitter,ref_email_1,ref_email_2,ref_phone_1,ref_phone_2,skills,traits,capability,achievement,certifications,specialization,talent,special_interest,con_ph_no,email_addr,postal_addr,state_of_domecile,city,lang_known,created_on,updated_on,created_by,updated_by,ip_address,status_resource ) values ( '" +reqParams.user_id +"' ,'" +reqParams.name +"' ,'" +reqParams.type_of_resource +"' ,'" +reqParams.gender +"' ,'" +reqParams.dob +"' ,'" +reqParams.organization2 +"' ,'" +reqParams.organization1 +"' ,'" +reqParams.ref_name1 +"' ,'" +reqParams.ref_name2 +"' ,'" +reqParams.linkedin +"' ,'" +reqParams.twitter +"' ,'" +reqParams.ref_email_1 +"' ,'" +reqParams.ref_email_2 +"' ,'" +reqParams.ref_phone_1 +"' ,'" +reqParams.ref_phone_2 +"' ,'" +reqParams.skills +"' ,'" +reqParams.traits +"' ,'" +reqParams.capability +"' ,'" +reqParams.achievement +"' ,'" +reqParams.certifications +"' ,'" +reqParams.specialization +"' ,'" +reqParams.talent +"' ,'" +reqParams.special_interest +"' ,'" +reqParams.con_ph_no +"' ,'" +reqParams.email_addr +"' ,'" +reqParams.postal_addr +"' ,'" +reqParams.state_of_domecile +"' ,'" +reqParams.city +"' ,'" +reqParams.lang_known +"'  ,'" +reqParams.created_on +"' ,'" +reqParams.updated_on +"' ,'" +reqParams.created_by +"' ,'" +reqParams.updated_by +"' ,'" +reqParams.ip_address +"','7' ) "; 
//console.log("req.body",req.body); 
db.query(query,async function(err,response){  
 if(err){     
 console.log(err);  
  // res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{   
   let Resume_id = response.insertId;
   console.log("response11",response);
           //**************************Insert qualification *********************************/
   let result= await insertQualification(Resume_id,reqParams);
   console.log("response22",response);
   if(result){
    //**************************Insert experience *********************************/
    //console.log("response2",response.affectedRows>0);
 let result1= await insertexperience(Resume_id,reqParams);
 if(result1){
 res.send({ status:1, msg: 'Success', data: [] });
}
else{
res.send({ status: 0, msg: 'Failed', data: [] });
}
// res.send({ status: 0, msg: 'Success', data: response });
}
}
})
})

function insertQualification (Resume_id,reqParams)
{
  return new Promise(
      (resolve)=>{
   var qualification=reqParams.qualification;
   var query1="";
   if(qualification.length>0){
   for(let i in qualification){
   query1 +=" INSERT INTO s_tbl_pm_qualification (qualification,year_of_passing,cgpa,certification_no,institution,resume_id,created_on,updated_on,created_by,updated_by) VALUES ('"+qualification[i].qualification+"','"+qualification[i].year_of_passing+"','"+qualification[i].cgpa+"','"+qualification[i].certification_no+"','"+qualification[i].institution+"','"+Resume_id+"','"+reqParams.created_on+"','"+reqParams.updated_on+"','"+reqParams.created_by+"','"+reqParams.updated_by+"');";}
   console.log(query1 );     
     db.query(query1 ,function(err,response){
   if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
   }  
   else{   
    console.log("response12",response);
    if(response.affectedRows>0){
      resolve(true);}
     
    else if(response[0].affectedRows>0){
        resolve(true);
    }else{
        resolve(false);
    } 
  }
})}
else{
  resolve(true);}
})
}

function insertexperience (Resume_id,reqParams)
{
  return new Promise(
      (resolve)=>{
        var experience=reqParams.experience;
        var query2="";
        if(experience.length>0){
        for(let j in experience){
        query2 +=" INSERT INTO s_tbl_pm_experience (type_of_industry,company_name,city,department,designation,period_from,period_to,responsible,resume_id,created_on,updated_on,created_by,updated_by) VALUES ('"+experience[j].type_of_industry+"','"+experience[j].company_name+"','"+experience[j].city+"','"+experience[j].department+"','"+experience[j].designation+"','"+experience[j].period_from+"','"+experience[j].period_to+"','"+experience[j].responsible+"','"+Resume_id+"','"+reqParams.created_on+"','"+reqParams.updated_on+"','"+reqParams.created_by+"','"+reqParams.updated_by+"');";}
        console.log(query2);     
     db.query(query2 ,function(err,response){
   if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
   }  
   else{   
    console.log("response23",response);

    if(response.affectedRows>0){
      resolve(true);}
     
    else if(response[0].affectedRows>0){
        resolve(true);
    }else{
        resolve(false);
    } 
}
})
        }
        else{
          resolve(true);
      }
})
}

// *******************************API - Edit***********************************************************//
router.put('/edit_s_tbl_pm_resume',(req,res)=>{
var reqParams = req.body;
var query =  " update s_tbl_pm_resume set user_id =  '"+reqParams.user_id +"',name =  '"+reqParams.name +"',type_of_resource =  '"+reqParams.type_of_resource +"',gender =  '"+reqParams.gender +"',dob =  '"+reqParams.dob +"',bas_qual =  '"+reqParams.bas_qual +"',add_quali_1 =  '"+reqParams.add_quali_1 +"',add_quali_2 =  '"+reqParams.add_quali_2 +"',institution =  '"+reqParams.institution +"',last_employer =  '"+reqParams.last_employer +"',last_empr_start_date =  '"+reqParams.last_empr_start_date +"',last_empr_end_date =  '"+reqParams.last_empr_end_date +"',ref_email_1 =  '"+reqParams.ref_email_1 +"',ref_email_2 =  '"+reqParams.ref_email_2 +"',ref_phone_1 =  '"+reqParams.ref_phone_1 +"',ref_phone_2 =  '"+reqParams.ref_phone_2 +"',skills =  '"+reqParams.skills +"',traits =  '"+reqParams.traits +"',certifications =  '"+reqParams.certifications +"',specialization =  '"+reqParams.specialization +"',achievement =  '"+reqParams.achievement +"',capability =  '"+reqParams.capability +"',talent =  '"+reqParams.talent +"',special_interest =  '"+reqParams.special_interest +"',con_ph_no =  '"+reqParams.con_ph_no +"',email_addr =  '"+reqParams.email_addr +"',postal_addr =  '"+reqParams.postal_addr +"',state_of_domecile =  '"+reqParams.state_of_domecile +"',city =  '"+reqParams.city +"',status_resource =  '"+reqParams.status_resource +"',lang_known =  '"+reqParams.lang_known +"',industry =  '"+reqParams.industry +"',created_on =  '"+reqParams.created_on +"',updated_on =  '"+reqParams.updated_on +"',created_by =  '"+reqParams.created_by +"',updated_by =  '"+reqParams.updated_by +"',ip_address =  '"+reqParams.ip_address +"' Where  resume_id = '"+reqParams.resume_id+ "' " ; 
 db.query(query,function(err,response){  
 if(err){     
 console.log(err);  
  res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{   
  res.send({ status: 1, msg: 'Success', data: response }); 
  }  
  });  
});    

//*******************************API - Delete***********************************************************//
router.delete('/delete_s_tbl_pm_resume',(req,res)=>{
var reqParams = req.body;
var query =  " delete from  s_tbl_pm_resume  Where  resume_id = '"+reqParams.resume_id+ "' " ; 
 db.query(query,function(err,response){  
 if(err){     
 console.log(err);  
  res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{   
  res.send({ status: 1, msg: 'Success', data: response }); 
  }  
  });  
}); 

//******************* get_department - START **********************************************

  router.get("/get_department",async function(req, res) {
    try { 
        let sproc = 
          " CALL sp_get_department";
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

//******************* get_resume_round_search - START **********************************************

router.get("/get_resume_round_search",async function(req, res) {
  try { 
      let sproc = 
        " CALL sp_get_resume_round_search";
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

//******************* delete_resume_qualification - START **********************************************

router.delete("/delete_resume_qualification",async function(req, res) {
  try { 
      let sproc = 
        "SET @qulification_id=?; CALL sp_delete_resume_qualification (@qulification_id)";
      db.query(sproc,[req.body.qulification_id], function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
          res.send({ status: 1, msg: "Success", data: [] });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  });

  //******************* delete_resume_experience - START **********************************************

router.delete("/delete_resume_experience",async function(req, res) {
  try { 
      let sproc = 
        "SET @experience_id=?; CALL sp_delete_resume_experience (@experience_id)";
      db.query(sproc,[req.body.experience_id], function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
          res.send({ status: 1, msg: "Success", data: [] });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  });


  //******************* get_resume_by_id - START **********************************************

  router.post("/get_resume_by_id",async function(req, res) {
    try { 
      var reqParam=req.body;
      var resume_id=reqParam.resume_id;
        let sproc = 
          "SET @resume_id=?; CALL sp_get_resume (@resume_id)";
        db.query(sproc,[reqParam.resume_id],async function(err, response) { 
          if (err) { 
            console.log(err);   	
          } else {   
           // res.send({ status: 1, msg: "Success", data: [] });
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
       let sporc="SELECT s_tbl_pm_experience.experience_id,s_tbl_pm_experience.company_name,s_tbl_pm_experience.city AS city_id,s_tbl_m_city.state AS city,s_tbl_pm_experience.department AS department_id,s_tbl_m_department.department,s_tbl_pm_experience.designation AS designation_id,s_tbl_m_designation.designation,s_tbl_pm_experience.period_from,s_tbl_pm_experience.period_to,s_tbl_pm_experience.type_of_industry,s_tbl_m_type_of_industry.industry,s_tbl_pm_experience.responsible,s_tbl_pm_experience.resume_id FROM s_tbl_pm_experience LEFT JOIN s_tbl_m_city ON s_tbl_m_city.city_id IN (s_tbl_pm_experience.city) LEFT JOIN s_tbl_m_department ON s_tbl_m_department.department_id IN(s_tbl_pm_experience.department) LEFT JOIN s_tbl_m_designation ON s_tbl_m_designation.designation_id IN (s_tbl_pm_experience.designation) LEFT JOIN s_tbl_m_type_of_industry ON s_tbl_m_type_of_industry.industry_id IN (s_tbl_pm_experience.type_of_industry) WHERE s_tbl_pm_experience.resume_id='"+resume_id+"'";
       db.query(sporc,function(err,response){
        if(err){     
          console.log(err); 
         }else{   
                      
            resolve(response);
           }  
      
       })
      })

    }

//******************* update_resume - START **********************************************

router.put("/update_resume",async function(req, res) {
 // try { 
    var reqParam=req.body;
      let sproc ="SET @user_id=?;SET @name=?;SET @type_of_resource=?;SET @gender=?;SET @dob=?;SET @organization1=?;SET @organization2=?;SET @ref_name1=?;SET @ref_name2=?;SET @linkedin=?;SET @twitter=?;SET @ref_email_1=?;SET @ref_email_2=?;SET @ref_phone_1=?;SET @ref_phone_2=?;SET @skills=?;SET @traits=?;SET @capability=?;SET @achievement=?;SET @certifications=?; SET @specialization=?;SET @talent=?;SET @special_interest=?;SET @con_ph_no=?;SET @email_addr=?;SET @postal_addr=?;SET @state_of_domecile=?;SET @city=?;SET @lang_known=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @resume_id=?; CALL sp_update_resume (@user_id,@name,@type_of_resource,@gender,@dob,@organization1,@organization2,@ref_name1,@ref_name2,@linkedin,@twitter,@ref_email_1,@ref_email_2,@ref_phone_1,@ref_phone_2,@skills,@traits,@capability,@achievement,@certifications,@specialization,@talent,@special_interest,@con_ph_no,@email_addr,@postal_addr,@state_of_domecile,@city,@lang_known,@created_on,@updated_on,@created_by,@updated_by,@resume_id) ";
      console.log("query",sproc);     
      db.query(sproc,[reqParam.user_id,reqParam.name,reqParam.type_of_resource,reqParam.gender,reqParam.dob,reqParam.organization1,reqParam.organization2,reqParam.ref_name1,reqParam.ref_name2,reqParam.linkedin,reqParam.twitter,reqParam.ref_email_1,reqParam.ref_email_2,reqParam.ref_phone_1,reqParam.ref_phone_2,reqParam.skills,reqParam.traits,reqParam.capability,reqParam.achievement,reqParam.certifications,reqParam.specialization,reqParam.talent,reqParam.special_interest,reqParam.con_ph_no,reqParam.email_addr,reqParam.postal_addr,reqParam.state_of_domecile,reqParam.city,reqParam.lang_known,reqParam.created_on,reqParam.updated_on,reqParam.created_by,reqParam.updated_by,reqParam.resume_id],async function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
       //************* update_qualification ******************* */   
         await update_qualification(reqParam);
       //************* update_experience ******************* */
       await update_experience(reqParam);

          res.send({ status: 1, msg: "Success", data: [] });
        }   
      });   
     
    // } catch (err) {     
    //   res.send({ status: 0, msg: "Error", data: [] });
    // } 
  });


  function update_qualification(reqParams){
    return new Promise(resolve=>{
      var qualification=reqParams.qualification;
      var query1="";
      if(qualification != 0){
      for(let i in qualification){
        query1 += " UPDATE s_tbl_pm_qualification SET s_tbl_pm_qualification.qualification='"+qualification[i].qualification+"',s_tbl_pm_qualification.year_of_passing='"+qualification[i].year_of_passing+"',s_tbl_pm_qualification.cgpa='"+qualification[i].cgpa+"',s_tbl_pm_qualification.certification_no='"+qualification[i].certification_no+"',s_tbl_pm_qualification.institution='"+qualification[i].institution+"' WHERE s_tbl_pm_qualification.qulification_id='"+qualification[i].qulification_id+"'; ";
      }
      db.query(query1 ,function(err,response){
        if(err){     
         console.log(err);
        }
        else{
          resolve(true);
        }
      })
    }else{
        resolve(true);
      }
  })
  
}

function update_experience(reqParams){
  return new Promise(resolve=>{
    var experience=reqParams.experience;
    var query1="";
    if(experience != 0){
    for(let i in experience){
      query1 += " UPDATE s_tbl_pm_experience SET s_tbl_pm_experience.company_name='"+experience[i].company_name+"',s_tbl_pm_experience.city='"+experience[i].city+"',s_tbl_pm_experience.department='"+experience[i].department+"',s_tbl_pm_experience.period_from='"+experience[i].period_from+"',s_tbl_pm_experience.period_to='"+experience[i].period_to+"',s_tbl_pm_experience.type_of_industry='"+experience[i].type_of_industry+"',s_tbl_pm_experience.responsible='"+experience[i].responsible+"'  WHERE s_tbl_pm_experience.experience_id='"+experience[i].experience_id+"'; ";
    }
    db.query(query1 ,function(err,response){
      if(err){     
       console.log(err);
      }
      else{
        resolve(true);
      }
})
    }
else{
  resolve(true);
}
})
}

return router; }    
