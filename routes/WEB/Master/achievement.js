module.exports = function(router, db){ 


//******************* insert_employee_status - START **********************************************

router.post("/common_insert_text",async function(req, res) {
  try { 

    //***********Common insert Table ***************************/
    let getRowCount=await  checkValuesAlreadyExists(req.body.table_names,req.body.text_val);
if(getRowCount==0)
{
    let sproc = 
        "SET @table_names=?; SET @text_val=?; SET @created_by=?; CALL `sp_insert_common_text`(@table_names, @text_val, @created_by); ";
      db.query(sproc,[req.body.table_names,req.body.text_val,req.body.created_by], function(err, response) { 
        if (err) { 
          console.log(err);   	
          res.status(403).send({ status: 0, msg: "Failed", data: [err] });
        } else {   
          res.send({ status: 1, msg: "Success", data: [response[3]] });
        }    
      });   
    }
    else
    {
      res.send({ status: 1, msg: "Record already exists", data: [] });
    }
     
    } catch (err) {     
      res.send({ status: 0, msg: "Internal Server Error", data: [] });
    } 
  });    


//*******************Check record alreay exist  ********************/
  function checkValuesAlreadyExists(table_name,text_val){

    return new Promise((resolve)=>{
      var query="";
      switch(table_name){
        //******************* check fro duplication info  ********************/

                      case "s_tbl_m_capability": 
                      query= "select count(capability_id ) as record_count from s_tbl_m_capability where capability='"+text_val+"' "
                        break;
                      case "s_tbl_m_group":
                        query= "select count(group_id  ) as record_count from s_tbl_m_group where group_name='"+text_val+"' "
                      break;
                case "s_tbl_m_skills":
                  query= "select count(skill_id  ) as record_count from s_tbl_m_capability where skill_name='"+text_val+"' "
                break;
                case "s_tbl_m_traits":
                  query= "select count(traitTable  ) as record_count from s_tbl_m_traits where traits='"+text_val+"' "
              break;
              case "s_tbl_m_certification":
                query= "select count(certification_id ) as record_count from s_tbl_m_certification where certification='"+text_val+"' "
              break;
              case "s_tbl_m_specialization":
                query= "select count(specialization_id  ) as record_count from s_tbl_m_specialization where specilization='"+text_val+"' "
              break;
              case "s_tbl_m_qual":
                query= "select count(qualification_id  ) as record_count from s_tbl_m_qual where qual_name='"+text_val+"' "
              break;
              case "s_tbl_m_industry":
                query= "select count(industry_id  ) as record_count from s_tbl_m_industry where industry='"+text_val+"' "
              break;
              case "s_tbl_m_institute":
                query= "select count(institute_id  ) as record_count from s_tbl_m_institute where institute='"+text_val+"' "
              break;
              case "s_tbl_m_designation":
                query= "select count(designation_id  ) as record_count from s_tbl_m_capability where designation='"+text_val+"' "
              break;
              case "s_tbl_m_activity":
                query= "select count(activity_id  ) as record_count from s_tbl_m_capability where activity='"+text_val+"' "
              break;
              case "s_tbl_m_mark":
                query= "select count(mark_id  ) as record_count from s_tbl_m_mark where mark ='"+text_val+"' "
              break;
              case "s_tbl_m_range":
                query= "select count( range_id ) as record_count from s_tbl_m_range where range ='"+text_val+"' "
              break;
              case "s_tbl_m_stage":
                query= "select count(stage_id  ) as record_count from s_tbl_m_stage where stage='"+text_val+"' "
              break;
              case "s_tbl_m_case_type":
                query= "select count(case_type_id  ) as record_count from s_tbl_m_case_type where case_type='"+text_val+"' "
              break;


      }
      let sPorc="SET @query=?; CALL `sp_insert_common_text_validate`(@query); ";
      db.query(sPorc,[query],function(err,output){
     if(err){
       console.log(err);
     }else{
       console.log("response_record",output[1][0].record_count);
       let result=output[1][0].record_count;
       resolve(result);
     }
      })
    })
 
  }
 



//*******************************API - GET***********************************************************//
router.get('/get_s_tbl_m_achievement',(req,res)=>{
 var query =  " select * from s_tbl_m_achievement   "; 
 db.query(query,function(err,response){  
 if(err){     
 console.log(err);  
  res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{   
  res.send({ status: 1, msg: 'Success', data: response }); 
  }  
  });  
}); 
//*******************************API - POST***********************************************************//
router.post('/insert_s_tbl_m_achievement',(req,res)=>{
var reqParams = req.body;
var query =  " INSERT INTO s_tbl_m_achievement ( achievement,created_on,updated_on,created_by,updated_by ) values ( '" +reqParams.achievement +"' ,'" +reqParams.created_on +"' ,'" +reqParams.updated_on +"' ,'" +reqParams.created_by +"' ,'" +reqParams.updated_by +"' ) "; 
 db.query(query,function(err,response){  
 if(err){     
 console.log(err);  
  res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{   
  res.send({ status: 1, msg: 'Success', data: response }); 
  }  
  });  
}); 
// *******************************API - Edit***********************************************************//
router.put('/edit_s_tbl_m_achievement',(req,res)=>{
var reqParams = req.body;
var query =  " update s_tbl_m_achievement set achievement =  '"+reqParams.achievement +"',created_on =  '"+reqParams.created_on +"',updated_on =  '"+reqParams.updated_on +"',created_by =  '"+reqParams.created_by +"',updated_by =  '"+reqParams.updated_by +"' Where  achievement_id = '"+reqParams.achievement_id+ "' " ; 
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
router.delete('/delete_s_tbl_m_achievement',(req,res)=>{
var reqParams = req.body;
var query =  " delete from  s_tbl_m_achievement  Where  achievement_id = '"+reqParams.achievement_id+ "' " ; 
 db.query(query,function(err,response){  
 if(err){     
 console.log(err);  
  res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{   
  res.send({ status: 1, msg: 'Success', data: response }); 
  }  
  });  
}); 
return router; }    
