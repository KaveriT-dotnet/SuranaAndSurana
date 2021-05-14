module.exports = function(router, db,errorData,async){ 
	//*************************  user access rights START *********************************************//
router.post('/get_user_rights',async (req,res)=>{
  try
  {

    var reqParams=req.body;   
    let sProc= " set @emp_id=?;CALL sp_get_user_rights (@emp_id);";
    console.log("query",sProc);
    db.query(sProc,[reqParams.emp_id], async function(err,response){  
    if(err){     
    console.log(err);  
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{ 

      console.log("filterRecords",response);
            var filterRecords=Array.isArray(response[1])?response[1]:[response[1]];
      
            if( filterRecords.length>0)
                {
                    var output=await  getControls();
                    await asyncForEach(output,(item,i)=>{

                      output[i].display_control= (filterRecords.filter(val=>val.screen_control_id==output[i].screen_control_id).length>0)?"Y":"N";
                    })
                    res.send({ status: 1, msg: 'Success', data:output  }); 
                }
              else
                {
                    res.send({ status: 0, msg: 'Failed', data: [] }); 
                }   
      }  
     });  
   }
    catch(ex)
    {
      res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
    }
   });

 //*********************************Get screens and control names ****************/
   
   function getControls()
   { 
     return new Promise((resolve)=>{
       let sProc="CALL sp_get_controls;";
       console.log("sproc",sProc);
                   db.query(sProc, function(err,response){  
                     if(err){     
                     console.log(err);  
                     
                     }else{         
                     resolve(response[0]);
                     }  
                     });  
 
                 })
 
     
   }
 
//*************************  user access rights END *********************************************//










    //*************************  get_group START *********************************************//
    router.get('/get_group',async (req,res)=>{
        try
        {
         
          //var reqParams=req.body;
         
          let sProc= "  CALL sp_get_group ";
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

//*************************  insert_user_group START *********************************************//
 router.post('/insert_user_group',async (req,res)=>{
    try
    {
     
      var reqParams=req.body;
     
      let sProc= "SET @group_id=?; SET @emp_id=?; SET @created_on=?; SET @updated_on=?; SET @created_by=?; SET @updated_by=?;  CALL sp_insert_user_group (@group_id,@emp_id,@created_on,@updated_on,@created_by,@updated_by)";
      console.log("query",sProc);
      db.query(sProc,[reqParams.group_id,reqParams.emp_id,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by], function(err,response){  
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

//*************************  get_user_group START *********************************************//
   router.get('/get_user_group',async (req,res)=>{
    try
    {
     
      //var reqParams=req.body;
     
      let sProc= "  CALL sp_get_user_group ";
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

 //*************************  insert_group_control START *********************************************//
//  router.post('/insert_group_control',async (req,res)=>{
//     try
//     {
     
//       var reqParams=req.body;
     
//       let sProc= "SET @group_id=?; SET @screen_control_id=?; SET @created_on=?; SET @updated_on=?; SET @created_by=?; SET @updated_by=?;  CALL sp_insert_group_control (@group_id,@screen_control_id,@created_on,@updated_on,@created_by,@updated_by)";
//       console.log("query",sProc);
//       db.query(sProc,[reqParams.group_id,reqParams.screen_control_id,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by], function(err,response){  
//       if(err){     
//       console.log(err);  
//        res.send({ status: 0, msg: 'Failed', data: err }); 
//       }else{   
    
//        res.send({ status: 1, msg: 'Success', data: [] }); 
//        }  
//        });  
     
//  }
     
//       catch(ex)
//       {
//         res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
//       }
//      });

//*************************  get_group_control START *********************************************//
 router.get('/get_group_control',async (req,res)=>{
    try
    {
     
      //var reqParams=req.body;
     
      let sProc= "  CALL sp_get_group_control ";
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
//************************************ groups_control ********************************************** */

 router.get('/get_controls',async (req,res)=>{ 
  try { 
      let sproc = "CALL sp_get_screen_control;";
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

//************************************ get_employee_group ********************************************** */

router.get('/get_employee_group',async (req,res)=>{ 
  try { 
      let sproc = "CALL sp_get_employee_group;";
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

//************************************ insert_employee_group ********************************************** */

router.post('/insert_employee_group',async (req,res)=>{ 
   
    var reqParms=req.body;
    var group_id=reqParms.group_id;
    console.log("group_id",group_id);
    var group_id_length = group_id.length;
     
    console.log("group_id_length",(group_id.length));
    var output=[];
      
    var exeQuery="";
     
      let total;
      await asyncForEach(group_id,async(item,i)=>
    // for(var i=0; i<group_id_length; i++) 
      { 
                var grp_id=group_id[i];
              //  console.log("I",i);
               var count= await count_employee_group(reqParms,grp_id)
               


               // var grp_id1= count.group_id;
                console.log("count_total",count.length);
               total= count.total;
                //* format continue
                  if(total == 0){
                    console.log("total",total);

                    //*********insert query ****************/
                    exeQuery = " INSERT INTO `s_tbl_pm_roles` (s_tbl_pm_roles.group_id,s_tbl_pm_roles.emp_id) VALUES ('"+group_id[i]+"','"+reqParms.emp_id+"') ;";
                    console.log("exeQuery_09",exeQuery)
              
                  } 
                   
      });
      output.push({total})
      console.log("total.length",output);

      if( exeQuery == "")
      
        {
          res.send({ status: 0, msg: "Record Already Exist", data: [] });
        } 

      
          //********************** insert_employee_group *******/ 
          console.log("exeQuery",exeQuery);
        let result=await common_text_validate (exeQuery);
        console.log("result",result)
        if(result > 0)
        {
          res.send({ status: 1, msg: "Success", data: [] });
        }
        else

        {
          res.send({ status: 1, msg: "Record Already Exist", data: [] });
        } 
    
  });

  function count_employee_group(reqParms,grp_id){
   console.log("reqParms.emp_id",reqParms.emp_id);
   console.log("grp_id",grp_id);
    return new Promise((resolve)=>{
     // var query="SET @emp_id=?; SET @group_id=?; CALL sp_count_employee_group (@emp_id,@group_id);";
  var query ="SELECT COUNT(s_tbl_pm_roles.role_id) as total FROM `s_tbl_pm_roles` WHERE s_tbl_pm_roles.emp_id ='"+reqParms.emp_id+"' AND s_tbl_pm_roles.group_id ='"+grp_id+"' ";
      
  db.query(query, function(err, response) { 
  if(err)
  {
         console.log("err",err);

  }
  else{

       console.log("response[2]",response);
       var result=response[0];
       resolve(result)
      
      }
      
 })
 
})
  }

  function common_text_validate(exeQuery){

    return new Promise((resolve)=>{
      console.log("exeQuery_1",exeQuery);
  var sProc="SET @query=?; CALL `sp_insert_common_text_validate`(@query); ";
  db.query(sProc,[exeQuery],function(err,output){

 if(err){
  console.log("sProc",sProc);
  console.log("exeQuery",exeQuery);
   console.log(err);

 }else{
   console.log("output",output);
   console.log("response_record",output[1].affectedRows);
   let result=output[1].affectedRows;
   resolve(result);
 }
  })
  })
}

//************************************ insert_group_control  ********************************************** */

router.post('/insert_group_control',async (req,res)=>{ 
   
  var reqParms=req.body;
  var screen_control_id=reqParms.screen_control_id;
  console.log("screen_control_id",screen_control_id);
  var group_id_length = screen_control_id.length;
   
  console.log("screen_control_id_length",(screen_control_id.length));
  
  var exeQuery_grp_ctrl="";
   
    let total;
    await asyncForEach(screen_control_id,async(item,i)=>
  // for(var i=0; i<group_id_length; i++) 
    { 
              var scrn_cntrl_id=screen_control_id[i];
            //  console.log("I",i);
             var count= await count_group_control(reqParms,scrn_cntrl_id)
             


             // var grp_id1= count.screen_control_id;
              console.log("count_total",count.length);
             total= count.total;
              //* format continue
                if(total == 0){
                  console.log("total",total);

                  //*********insert query ****************/
                  exeQuery_grp_ctrl = " INSERT INTO `s_tbl_m_group_controls` (s_tbl_m_group_controls.group_id,s_tbl_m_group_controls.screen_control_id) VALUES ('"+reqParms.group_id+"','"+scrn_cntrl_id+"');";
                  console.log("exeQuery_09",exeQuery_grp_ctrl)
            
                } 
                 
    });

    if( exeQuery_grp_ctrl == "")
    
      {
        res.send({ status: 0, msg: "Record Already Exist", data: [] });
      } 

    
        //********************** insert_employee_group *******/ 
        console.log("exeQuery_grp_ctrl",exeQuery_grp_ctrl);
      let result=await common_text_validate (exeQuery_grp_ctrl);
      console.log("result",result)
      if(result > 0)
      {
        res.send({ status: 1, msg: "Success", data: [] });
      }
      else

      {
        res.send({ status: 1, msg: "Record Already Exist", data: [] });
      } 
  
});

function count_group_control(reqParms,scrn_cntrl_id){
 console.log("reqParms.group_id",reqParms.group_id);
 console.log("scrn_cntrl_id",scrn_cntrl_id);
  return new Promise((resolve)=>{
   // var query="SET @emp_id=?; SET @screen_control_id=?; CALL sp_count_employee_group (@emp_id,@group_id);";
var query ="SELECT COUNT(s_tbl_m_group_controls.group_control_id) as total FROM  `s_tbl_m_group_controls` WHERE s_tbl_m_group_controls.group_id='"+reqParms.group_id+"' AND s_tbl_m_group_controls.screen_control_id = '"+scrn_cntrl_id+"' ";
    
db.query(query, function(err, response) { 
if(err)
{
       console.log("err",err);

}
else{

     console.log("response[2]",response);
     var result=response[0];
     resolve(result)
    
    }
    
})

})
}

//************************************ get_employee_group_details ********************************************** */

router.post('/get_emp_group_details',async (req,res)=>{ 
  try { 
    var reqParam=req.body;
      let sproc = "CALL sp_get_employee_group_details";
      db.query(sproc,async function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
          var output=[];
          var get_employee_group_details_all=response[0];
         
          await asyncForEach(get_employee_group_details_all,(item,i)=>{
            if(response[0][i].emp_id == reqParam.emp_id )    
        {
            get_employee_group_details_all[i].is_checked=1;
        }
        else{
          get_employee_group_details_all[i].is_checked=0;
        }
          })
         
        output.push({group:get_employee_group_details_all})
          res.send({ status: 1, msg: "Success", data: output });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  });
 
//************************************ get_group_control_details ********************************************** */

router.post('/get_group_control_details',async (req,res)=>{ 
  try { 
    var reqParam=req.body;
      let sproc = "CALL sp_get_group_control_details";
      db.query(sproc,async function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
          var output=[];
          var get_group_control_details_all=response[0];
         
          await asyncForEach(get_group_control_details_all,(item,i)=>{
            if(response[0][i].group_id == reqParam.group_id )    
        {
          get_group_control_details_all[i].is_checked=1;
        }
        else{
          get_group_control_details_all[i].is_checked=0;
        }
          })
         
        output.push({group:get_group_control_details_all})
          res.send({ status: 1, msg: "Success", data: output });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  });


return router;}