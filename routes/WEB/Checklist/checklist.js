const { CostExplorer } = require('aws-sdk');
const { response } = require('express');

module.exports = function(router, db,errorData,async){
    var async= require ('async');
router.post('/insert_checklist',(req,res)=>{
    var reqParam=req.body;
    var checklist=reqParam.checklist;
    var query="";
    var i;
    
    for( i in checklist){
        query +=" INSERT INTO s_tbl_pm_check_list (check_list_id,project_id,check_list_status) VALUES ('"+checklist[i].check_list_id+"','"+checklist[i].project_id+"','"+checklist[i].check_list_status+"');";}
        db.query(query,(err,response)=>{
        console.log("query",query);
        if(err){
            console.log(err);  
        }
        else{
            res.send({status:1,msg:"success",data:[]});
        }
    })


})








 //*************************  get_check_list START *********************************************//
 router.post('/get_checklist',async (req,res)=>{
  try
  {
   
    var reqParams=req.body;
   
    let sProc= "SET @project_id=?;SET @project_type_id=?; CALL sp_get_check_list (@project_id,@project_type_id)";
    console.log("query",sProc);
    db.query(sProc,[reqParams.project_id,reqParams.project_type_id], function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{   
  
     res.send({ status: 1, msg: 'Success', data: response[2] }); 
     }  
     });  
   
}
   
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

    return router;}