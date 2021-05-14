const { ElasticBeanstalk } = require("aws-sdk");

module.exports=function(router, db,errorData,async){
//*******************************API - POST***********************************************************//

router.post('/getGroupPermission',(req,res)=>{
  let reqParam= req.body;          
  let group_id=reqParam.group_id;          
  let sproc = "SET @p0=?; CALL `sp_user_getGroupPermissionList`(@p0);";  
 console.log(sproc); 
  db.query(sproc,[group_id],function(err,response){   
  if(err){        
  console.log(err);          
   res.send({ status: 0, msg: 'Failed', data: err }); 
  }else{ 
    
    response=   response[1];    
    console.log({response:response}); 
    if(response.length>0)
    {
    response.forEach(async (item,i) =>{
    var id = response[i].id; 
    console.log({id:id});        
    response[i].item = await subModuleNames(id,group_id,res);    
    if(i==response.length-1) 
    {
   res.send({ status: 1, msg: 'Success', data: response });       
    }


  })    
}
else
{
  res.send({ status: 1, msg: 'Success', data: response });       
}
  
   //res.send({ status: 1, msg: 'Success', data: response });  
 } 
 })  
  })       
   





 
   
function subModuleNames(module_id,group_id,res){

   var groupid=group_id;   
       
 return new Promise(resolve =>{   
  // let sproc = "SELECT distinct mas_sub_module_master.id ,mas_sub_module_master.submodule_name FROM `mas_group_permission` join mas_screen_master on  mas_group_permission.screen_master_id=mas_screen_master.id join mas_module_master on mas_module_master.id=mas_screen_master.moduleid   left join mas_sub_module_master on mas_sub_module_master.id=mas_screen_master.submoduleid WHERE mas_group_permission.group_id= '"+group_id+"' and mas_module_master.id='"+module_id+"' order by mas_screen_master.submoduleid";   
   let sproc = "SET @group_id=?; SET @module_id=?; CALL `sp_user_getGroupPermissionSubModule`(@group_id, @module_id);";        
  console.log(sproc,sproc);
   db.query(sproc,[groupid,module_id],function(err,response){  
  if(err){          
  console.log(err);     
  res.send({ status: 0, msg: 'Failed', data: err }); 
} 
 else
 {              
     var test=0;
     response=   response[2];    
    console.log({response_submodule:response[2]}); 
     response.forEach(async (item,i) =>{
      test++;           
     var submodule_id=response[i].id;  
     
    response[i].item = await screenNames(group_id,module_id,'0'); 
    if(submodule_id!=null)
    {
    response[i].item = await screenNames(group_id,module_id,submodule_id);
    }
  //******************************Get length of the response *********************************//
  //*****************************If it is zero pass zero as input else submodule_id as input***//
 //  console.log("response length:"+response.length);  
   resolve(response);  
    })     
     //   if(test=0)
     //  {  
     //  console.log("function called here"); 
     //  response.forEach(async (item,i) =>{
     // console.log({group_id:group_id});  
     // console.log({module_id:module_id});        
     //     response[i].item = await screenNames(group_id,module_id,'0');
     //    resolve(response);  

     //  })

      // }
  }   
  });    
})  
}



function screenNames(group_id,module_id,submodule_id){
  return new Promise( resolve =>{   
      
    let sporc="SET @group_id=?; SET @module_id=?; SET @submodule_id=?; CALL `sp_user_getGroupPermissionScreens`(@group_id, @module_id, @submodule_id);"; 
      console.log({SubModulequery:sporc});   
      db.query(sporc,[group_id,module_id,submodule_id],(err,response)=>{  
        if(err)    
        {            
            res.send({ status: 0, msg: 'Failed', data: err }); 
        }   
        else 
        {    
          console.log({response_screen:response});   
          resolve(response[3]);   
          //  response.forEach(async(item,i) =>{
          //    // response[i].screenName= item;
          //     resolve(response);  
          //  })             
        }
      });
               
  })
}

//*******************************API - POST***********************************************************//
router.post('/insertGroupPermission',async (req,res)=>{
  // try
  // {
  // let reqParams = req.body;    

  let submit = req.body.submit;    
  let sproc = "";    
    for( var i in submit){    
    sproc="SET @screen_master_id=?; SET @group_id=?; SET @allow_add=?; SET @allow_edit=?; SET @allow_delete=?; SET @allow_view=?; SET @allow_print=?; SET @created_by=?; SET @created_on=?; SET @modified_by=?; SET @modified_on=?; CALL `sp_user_insertGroupPermission`(@screen_master_id, @group_id, @allow_add, @allow_edit, @allow_delete, @allow_view, @allow_print, @created_by, @created_on, @modified_by, @modified_on);";          
    console.log("test",submit[i]);
    let result= await insertPermission(submit[i],sproc);
    console.log("result",result);
    console.log("result",result);
    if(!result.status)
    {
      res.send({ status: 1, msg: 'Failed', data: result.msg });  
      return;
    }    
    if(i==submit.length-1) 
    { 
    res.send({ status: 1, msg: 'Success', data: [] });  
    return;
    }       
  }

// }
//   catch(ex)
//   {
//     res.send({ status: 1, msg: 'Failed', Error: ex });  
//     return;
//   }    
});


//*******************************INSERT PERMISSION *****************************************/

function insertPermission(submit,sproc){
 return new Promise((resolve)=>{
  

console.log("sproc_1",submit.screen_master_id ,submit.group_id,submit.allow_add  ,submit.allow_edit  ,submit.
allow_delete  ,submit.allow_view  ,submit.allow_print  ,submit.created_by  ,submit.created_on  ,submit.modified_by  ,submit.modified_on);
  db.query(sproc,[submit.screen_master_id ,submit.group_id,submit.allow_add  ,submit.allow_edit  ,submit.
    allow_delete  ,submit.allow_view  ,submit.allow_print  ,submit.created_by  ,submit.created_on  ,submit.modified_by  ,submit.modified_on ],function(err,response){  
      if(err){     
     console.log(err);  
     resolve({status:false,msg:err});
     
    }else{ 

      resolve({status:true,msg:'Success'});
      }  
     })


 } );
  //******************CALL SProc **********************/
  
    
}

// //*******************************API - POST***********************************************************//
// router.post('/insertGroupPermission',async (req,res)=>{
// var reqParams = req.body;    
// var submit = req.body.submit;    
// var query = "";   
// for(i in submit){    
// var output=await GETRecordExists(submit[i].group_id ,submit[i].screen_master_id );
// console.log("output",output);             
// // console.log({outputLength:output.RowDataPacket.length});          
//    if(output.length > 0 ){  
//   query +=  "  update mas_group_permission set allow_add =  '"+submit[i].allow_add +"',allow_edit =  '"+submit[i].allow_edit +"',allow_delete =  '"+submit[i].allow_delete +"',allow_view =  '"+submit[i].allow_view +"',allow_print =  '"+submit[i].allow_print +"',active_flag =  '"+submit[i].active_flag +"',created_by =  '"+submit[i].created_by +"',created_on =  '"+submit[i].created_on +"',modified_by =  '"+submit[i].modified_by +"',modified_on =  '"+submit[i].modified_on +"' Where  group_id =  '"+submit[i].group_id +"' and screen_master_id =  '"+submit[i].screen_master_id +"' ;" ;  
   
//   } 
//   else {  
//       query +=  " INSERT INTO mas_group_permission ( group_id,screen_master_id,allow_add,allow_edit,allow_delete,allow_view,allow_print,active_flag,created_by,created_on,modified_by,modified_on ) values ( '" +submit[i].group_id +"' ,'" +submit[i].screen_master_id +"' ,'" +submit[i].allow_add +"' ,'" +submit[i].allow_edit +"' ,'" +submit[i].allow_delete +"' ,'" +submit[i].allow_view +"' ,'" +submit[i].allow_print +"' ,'" +submit[i].active_flag +"' ,'" +submit[i].created_by +"' ,'" +submit[i].created_on +"' ,'" +submit[i].modified_by +"' ,'" +submit[i].modified_on +"' ); ";  
//       } 
//    }     
//     db.query(query,function(err,response){  
//    if(err){     
//    console.log(err);  
//    res.send({ status: 0, msg: 'Failed', data: err }); 
//   }else{   
//    res.send({ status: 1, msg: 'Success', data: response }); 
//     }  
//    })
// }); 
 
     
// function GETRecordExists(group_id,screen_id){
//   return new Promise( resolve =>{ 
   
//     var query="SELECT * FROM `mas_group_permission` Where screen_master_id='"+screen_id+"' and group_id='"+group_id+"'   ";  
//       console.log({SubModulequery:query});  
//       db.query(query,(err,response)=>{  
//         if(err)    
//         {      
//             resolve({status:0,msg:"Failed",error:err}) ;
//             console.log({errorGETRecordExists:err});   
//             // res.send({ status: 0, msg: 'Failed', data: err }); 
//         }  
//         else 
//         {     
//           console.log({response:response});
//           resolve(response);
//           return
//            // response.forEach(async(item,i) =>{
//            //   // response[i].screenName= item;
//            //  // console.log({responseInfo:response});
//            //    resolve(response);   
//            //  })
            
//         }
//       });
               
//   })
// }


// // *******************************API - Edit***********************************************************//
// router.put('/edit_mas_group_permission',(req,res)=>{
// // var reqParams = req.body; 
// var submit = req.body.submit;   

//  var query = "";   
// for(i in submit){   

//     query +=  "  update mas_group_permission set allow_add =  '"+submit[i].allow_add +"',allow_edit =  '"+submit[i].allow_edit +"',allow_delete =  '"+submit[i].allow_delete +"',allow_view =  '"+submit[i].allow_view +"',allow_print =  '"+submit[i].allow_print +"',active_flag =  '"+submit[i].active_flag +"',created_by =  '"+submit[i].created_by +"',created_on =  '"+submit[i].created_on +"',modified_by =  '"+submit[i].modified_by +"',modified_on =  '"+submit[i].modified_on +"' Where  group_id =  '"+submit[i].group_id +"' and screen_master_id =  '"+submit[i].screen_master_id +"' ;" ;   
//       }   
//    db.query(query,function(err,response){  
//    if(err){        
//    console.log(err);     
//    res.send({ status: 0, msg: 'Failed', data: err }); 
//   }else{    
//    res.send({ status: 1, msg: 'Success', data: response }); 
//     }      
//    }) 
// }) 

//*******************************API - Delete***********************************************************//
router.delete('/deletemas_group_permission',(req,res)=>{
var reqParams = req.body;
var query =  " update mas_group_permission set active_flag=0 Where  id = '"+reqParams.id+ "' " ; 
 db.query(query,function(err,response){  
 if(err){     
 console.log(err);  
  res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{   
  res.send({ status: 1, msg: 'Success', data: response }); 
  }  
  }); 
}) 

return router;
}
