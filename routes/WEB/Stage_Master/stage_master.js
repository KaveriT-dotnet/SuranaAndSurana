module.exports = function(router, db,errorData){ 

//****************************** get_table_names START ********************************** */
    router.get('/get_table_names',async (req,res)=>{ 
        try { 
            
            let sproc = " CALL `sp_get_table_names` ";
            console.log("sproc",sproc);
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


//****************************** insert_stage_master START ********************************** */
router.post('/insert_stage_master',async (req,res)=>{ 
var reqParam= req.body;
let sProc ="SET @stage_id=?;SET @project_type_id=?;SET @sub_proj_type_id=?;SET @process_id=?;SET @sub_stage_id=?; CALL sp_select_s_tbl_m_map_stage_proj_type (@stage_id,@project_type_id,@sub_proj_type_id,@process_id,@sub_stage_id) ;";
    console.log("sProc",sProc);
    db.query(sProc,[reqParam.stage_id,reqParam.project_type_id,reqParam.sub_proj_type_id,reqParam.process_id,reqParam.sub_stage_id],function(err,response){  
        console.log("response",response[5][0].count_record);
     let   count_record1 = response[5][0].count_record;
     if (count_record1 == 0)
     {
           
        let sproc = "SET @stage_id=?;SET @project_type_id=?;SET @sub_proj_type_id=?; SET @process_id=?;SET @no_of_compliance_days=?;SET @sub_stage_id=?;SET @remainder_days=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?; CALL `sp_insert_stage_master` (@stage_id,@project_type_id,@sub_proj_type_id,@process_id,@no_of_compliance_days,@sub_stage_id,@remainder_days,@created_on,@updated_on,@created_by,@updated_by) ";
        console.log("sproc",sproc);
        db.query(sproc,[reqParam.stage_id,reqParam.project_type_id,reqParam.sub_proj_type_id,reqParam.process_id,reqParam.no_of_compliance_days,reqParam.sub_stage_id,reqParam.remainder_days,reqParam.created_on,reqParam.updated_on,reqParam.created_by,reqParam.updated_by], function(err, response) { 

          if (err) { 
            console.log(err);  
             	
          } else {   
            res.send({ status: 1, msg: "Success", data: [] });
          }   
        
    })

} else{
    res.send({ status: 0, msg: "Already exist 'stage_id','project_type_id','sub_proj_type_id','process_id','sub_stage_id' ", data: [] });
}

    })
})

//****************************** get_stage_list START ********************************** */
router.get('/get_stage_list',async (req,res)=>{ 
    try { 
        
        let sproc = " CALL `sp_get_stage_list` ";
        console.log("sproc",sproc);
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
    
//****************************** get_sub_stage START ********************************** */
router.post('/get_sub_stage',async (req,res)=>{ 
    try { 
        
        let sproc = "SET @stage_id=?; CALL `sp_get_sub_stage` (@stage_id) ";
        console.log("sproc",sproc);
        db.query(sproc,[req.body.stage_id], function(err, response) { 
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


    
//****************************** get_stage_master START ********************************** */
router.get('/get_stage_master',async (req,res)=>{ 
    try { 
        
        let sproc = " CALL `sp_get_stage_master`  ";
        console.log("sproc",sproc);
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