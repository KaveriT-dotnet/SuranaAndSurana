module.exports = function(router, db,errorData,dateFormat,async){ 

//******************* insert_update_class - START **********************************************
router.post("/insert_class",async function(req, res) {
    try { 
        var reqParam=req.body;
      let sproc = 
        "SET @class_type=?; SET @class=?; SET @class_id=?; CALL sp_count_insert_class (@class_type,@class,@class_id)";
      db.query(sproc,[reqParam.class_type,reqParam.class,reqParam.class_id],async function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
          console.log("response",response);
          var total=response[3][0].total;

           if(total==0){
               if(reqParam.class_id==0){
            //************************ insert_class ****************() */
               await insert_class(reqParam);
               res.send({ status: 1, msg: "Insert Successfully", data: [] });
               }
               else{
            //************************ update_class ****************() */
                await update_class(reqParam);
                res.send({ status: 1, msg: "Updated Successfully", data: [] });
               }

               
           }
           else{
            res.send({ status: 0, msg: "Failed", data: "Record already exist" });
           }

         
        }   
      });   
  
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  }); 

function insert_class(reqParam){
    return new Promise(
        (resolve)=>{
            let query="SET @class_type=?; SET@class=?; SET@class_description=?; SET@created_on=?;SET@created_by=?; CALL sp_insert_class (@class_type,@class,@class_description,@created_on,@created_by)";
            db.query(query,[reqParam.class_type,reqParam.class,reqParam.class_description,reqParam.created_on,reqParam.created_by],function(err,response){
                if(err){
                    console.log(err);
                    resolve(false);
                }
                else{
                    console.log("response",response);
                    resolve(true);
                }
            })
        }
    )
}  


function update_class(reqParam){
    return new Promise(
        (resolve)=>{
            let query="SET @class_type=?; SET@class=?; SET@class_description=?;SET @class_id=?; SET@created_on=?;SET@created_by=?; CALL sp_update_class (@class_type,@class,@class_description,@class_id,@created_on,@created_by)";
            db.query(query,[reqParam.class_type,reqParam.class,reqParam.class_description,reqParam.class_id,reqParam.created_on,reqParam.created_by],function(err,response){
                if(err){
                    console.log(err);
                    resolve(false);
                }
                else{
                    console.log("response",response);
                    resolve(true);
                }
            })
        }
    )
}

//******************* insert_checklist - START **********************************************
router.post("/insert_check_list",async function(req, res) {
    try { 
        var reqParam=req.body;
      let sproc = 
        "SET @check_list=?; SET @project_type_id=?; SET @check_list_id=?; CALL sp_count_insert_checklist (@check_list,@project_type_id,@check_list_id)";
      db.query(sproc,[reqParam.check_list,reqParam.project_type_id,reqParam.check_list_id],async function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
         // console.log("response",response);
          var total=response[3][0].total;
          console.log("total",total);

           if(total==0){
               if(reqParam.check_list_id==0){
            //************************ insert_checklist ****************() */
               await insert_checklist(reqParam);
               res.send({ status: 1, msg: "Insert Successfully", data: [] });
               }
               else{
            //************************ update_checklist ****************() */
                await update_checklist(reqParam);
                res.send({ status: 1, msg: "Updated Successfully", data: [] });
               }

               
           }
           else{
            res.send({ status: 0, msg: "Failed", data: "Record already exist" });
           }

         
        }   
      });   
  
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  }); 

function insert_checklist(reqParam){
    return new Promise(
        (resolve)=>{
            let query="SET @check_list=?; SET@project_type_id=?; SET@created_on=?;SET@created_by=?; CALL sp_insert_checklist (@check_list,@project_type_id,@created_on,@created_by)";
            db.query(query,[reqParam.check_list,reqParam.project_type_id,reqParam.created_on,reqParam.created_by],function(err,response){
                if(err){
                    console.log(err);
                    resolve(false);
                }
                else{
                   // console.log("response",response);
                    resolve(true);
                }
            })
        }
    )
}

function update_checklist(reqParam){
    return new Promise(
        (resolve)=>{
            let query="SET @check_list=?; SET@project_type_id=?; SET@created_on=?;SET@created_by=?;SET@check_list_id=?; CALL sp_update_checklist (@check_list,@project_type_id,@created_on,@created_by,@check_list_id)";
            db.query(query,[reqParam.check_list,reqParam.project_type_id,reqParam.created_on,reqParam.created_by,reqParam.check_list_id],function(err,response){
                if(err){
                    console.log(err);
                    resolve(false);
                }
                else{
                 //   console.log("response",response);
                    resolve(true);
                }
            })
        }
    )
}

//******************* insert_stage - START **********************************************
router.post("/insert_stage",async function(req, res) {
    try { 
        var reqParam=req.body;
      let sproc = 
        "SET @stage=?; SET @stage_id=?;  CALL sp_count_insert_stage (@stage,@stage_id)";
      db.query(sproc,[reqParam.stage,reqParam.stage_id],async function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
         // console.log("response",response);
          var total=response[2][0].total;
          console.log("total",total);

           if(total==0){
               if(reqParam.stage_id==0){
            //************************ insert_stage ****************() */
               await insert_stage(reqParam);
               res.send({ status: 1, msg: "Insert Successfully", data: [] });
               }
               else{
            //************************ update_stage ****************() */
                await update_stage(reqParam);
                res.send({ status: 1, msg: "Updated Successfully", data: [] });
               }

               
           }
           else{
            res.send({ status: 0, msg: "Failed", data: "Record already exist" });
           }

         
        }   
      });   
  
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  }); 

function insert_stage(reqParam){
    return new Promise(
        (resolve)=>{
            let query="SET @stage=?;  SET@created_on=?;SET@created_by=?; CALL sp_insert_stage (@stage,@created_on,@created_by)";
            db.query(query,[reqParam.stage,reqParam.created_on,reqParam.created_by],function(err,response){
                if(err){
                    console.log(err);
                    resolve(false);
                }
                else{
                   // console.log("response",response);
                    resolve(true);
                }
            })
        }
    )
}

function update_stage(reqParam){
    return new Promise(
        (resolve)=>{
            let query="SET @stage=?; SET@created_on=?;SET@created_by=?;SET@stage_id=?; CALL sp_update_stage (@stage,@created_on,@created_by,@stage_id)";
            db.query(query,[reqParam.stage,reqParam.created_on,reqParam.created_by,reqParam.stage_id],function(err,response){
                if(err){
                    console.log(err);
                    resolve(false);
                }
                else{
                 //   console.log("response",response);
                    resolve(true);
                }
            })
        }
    )
}

// ************************** insert_sub_activity *****************************
router.post('/insert_sub_activity',async (req,res)=>{
    try { 
        var reqPrams=req.body;
        let sProc="SET @sub_activity=?; CALL sp_check_sub_activity (@sub_activity)";
        db.query(sProc,[reqPrams.sub_activity],async(err,response)=>{
            //console.log("response",response);
            var total=response[1][0].total;
            var sub_activity_id = response[1][0].sub_activity_id;
            console.log(total,sub_activity_id);
            if(total == 0) {
                //***********  insert sub_activity ****************** */
               let result= await user_insert_sub_activity(reqPrams);
               console.log("insertd_sub_activity_id",result);
                //***********  check activity and sub_activity id ****************** */
               let result1= await check_map_proje_act_sub_id(reqPrams,result)
               console.log("select_map_project_id",result1);
                  if (result1 == 0){
                 //********** Insert to activity and sub to map_projec ***** */
                 await insert_map_project(reqPrams,result)
                 res.send({ status: 1, msg: "Success", data: [] });
                  }
                  else{
                    res.send({ status: 0, msg: "Record already exist", data: [] });
                  }

            }
            else{
                //******** check map_projec already inserted sub_activty ********** */
                let resul=await check_map_projec_exist_sub_acti(reqPrams,sub_activity_id);
                console.log("resul",resul);
                if(resul==0){
                    await insert_map_proj_sub_act(reqPrams,sub_activity_id);
                    res.send({ status: 1, msg: "Success", data: [] });
                }
                else{
                    res.send({ status: 0, msg: "Record already exist", data: [] });
                  }
              
            }

        })

    } catch (err) {     
        res.send({ status: 0, msg: "Error", data: [] });
      } 
    }); 

function user_insert_sub_activity(reqPrams){
    return new Promise(
        (resolve)=>{
            let sporc="SET @sub_activity=?; CALL sp_user_insert_sub_activity (@sub_activity)";
            db.query(sporc,[reqPrams.sub_activity],async(err,response)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("response",response);
                    var result= response[1][0].sub_acti_id;
                    resolve(result);
                }
        })
    })
}

function check_map_proje_act_sub_id(reqPrams,result){
return new Promise(
    (resolve)=>{
        let sporc="SET @activity=?; SET @sub_activity=?; CALL sp_check_map_proje_act_sub_id (@activity,@sub_activity)";
        db.query(sporc,[reqPrams.activity,result],async(err,response)=>{
            if(err){
                console.log(err);
            }
            else{
               // console.log("response",response);
                var result= response[2][0].total;
                  console.log("total_of_map",result)
                resolve(result);
            }
    })
})
}
            
function insert_map_project(reqPrams,result){
    return new Promise(
        (resolve)=>{
            let sporc="SET @activity=?; SET @sub_activity=?; CALL sp_insert_map_proje_act_sub_id (@activity,@sub_activity)";
            db.query(sporc,[reqPrams.activity,result],async(err,response)=>{
                if(err){
                    console.log(err);
                }
                else{
                   // console.log("response",response);
                    resolve(true);
                }
        })
    })
    }

    function check_map_projec_exist_sub_acti(reqPrams,sub_activity_id){
        return new Promise(
            (resolve)=>{
                let sporc="SET @activity=?; SET @sub_activity=?; CALL sp_check_map_proje_act_sub_id (@activity,@sub_activity)";
                db.query(sporc,[reqPrams.activity,sub_activity_id],async(err,response)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                       // console.log("response",response);
                        var result= response[2][0].total;
                  console.log("total_of_map",result)
                resolve(result);
                    }
            })
        })
        }

    function insert_map_proj_sub_act(reqPrams,sub_activity_id){
        return new Promise(
            (resolve)=>{
                let sporc="SET @activity=?; SET @sub_activity=?; CALL sp_insert_map_proje_act_sub_id (@activity,@sub_activity)";
                db.query(sporc,[reqPrams.activity,sub_activity_id],async(err,response)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                       // console.log("response",response);
                        resolve(true);
                    }
            })
        })
        }


    return router;}