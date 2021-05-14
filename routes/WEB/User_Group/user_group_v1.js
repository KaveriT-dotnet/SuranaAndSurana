const { resolveContent } = require("nodemailer/lib/shared");

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
 router.post('/insert_group_control',async (req,res)=>{
    try
    {
     
       //*************** validate group_control  already exists *********************/

      var reqParams=req.body;
      var screen_control_id= req.body.screen_control_id;
      //********get all groups      */

      let sProc= "SET @group_id=?; SET @screen_control_id=?; SET @created_on=?; SET @updated_on=?; SET @created_by=?; SET @updated_by=?;  CALL sp_insert_group_control (@group_id,@screen_control_id,@created_on,@updated_on,@created_by,@updated_by)";
      console.log("query",sProc);
      db.query(sProc,[reqParams.group_id,reqParams.screen_control_id,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by], function(err,response){  
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
    //****************** Get users screen control list *********************/
      let sproc = "CALL sp_get_screen_control;";
      db.query(sproc, async function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   

                var output=Array.isArray(response[0])?response[0]:[response[0]];
                  if(output.length>0)
                    {

                      sp_get_screen_controls
                       //*******************Get all group controls ************************/
                       output.asyncForEach((item,i)=>{
                       

                       })
                      res.send({ status: 1, msg: "Success", data: response[0] });
                    }
                  else
                    {
                      res.send({ status: 0, msg: "Access Denied", data: response[0] });
                    }
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  });
 
return router;}