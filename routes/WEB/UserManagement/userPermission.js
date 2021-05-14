
module.exports=function(router, db,errorData,async){


// const express=require('express');
// const { templateCache } = require('mustache');
// const router= express.Router();
// var db= require('../db');
// var routes= require('../routes');



// module.exports = function(router, db){ 
//*******************************API - GET***********************************************************//
// router.get('/get_mas_user_permission',(req,res)=>{
//  var query =  " select * from mas_user_permission  where active_flag=1 "; 
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
     
router.post('/getUserPermission',(req,res)=>{ 
 var reqParam= req.body;           
 var user_id=reqParam.user_id;          
 var sproc="SET @user_id=?; CALL `sp_user_getUserPermissionList`(@user_id);";
 //var query =  " SELECT distinct mas_module_master.id,mas_module_master.module_name,mas_group_master.group_name  FROM `mas_user_permission`  join mas_screen_master on mas_user_permission.screen_master_id=mas_screen_master.id and mas_screen_master.active_flag='1' join mas_module_master on mas_module_master.id=mas_screen_master.module_id join mas_group_master on mas_group_master.id=mas_user_permission.group_id   WHERE mas_user_permission.user_id= user_id  order by mas_screen_master.module_id"; 
  // var query = "SELECT distinct mas_module_master.id,mas_module_master.module_name,mas_group_master.groupname  FROM `mas_user_permission`  join mas_screen_master on mas_user_permission.screen_master_id=mas_screen_master.id and mas_screen_master.active_flag='1' join mas_module_master on mas_module_master.id=mas_screen_master.moduleid join mas_group_master on mas_group_master.id=mas_user_permission.group_id   WHERE mas_user_permission.user_id= '"+user_id +"' order by mas_screen_master.moduleid";  
  // console.log({query:query});       
  console.log("sproc",sproc);         
  db.query(sproc,[user_id],function(err,response){   
 if(err){        
 console.log(err);         
  res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{ 
  // console.log({query:query});    
  response=response[1];
  if(response.length>0)
  {
   response.forEach(async (item,i) =>{
   var id = response[i].id;
  //  var group_id = response[i].group_id;
    console.log({id:id});    
   response[i].item = await subModuleNames(id,user_id);    
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

async function subModuleNames(module_id,user_id){
 
  return new Promise(resolve =>{   
 
    let sproc= "SET @user_id=?; SET @module_id=?; CALL `sp_user_getUserPermissionSubModule`(@user_id, @module_id);";
  // var query = "SELECT distinct mas_sub_module_master.id ,mas_sub_module_master.submodule_name FROM `mas_user_permission` join mas_screen_master on  mas_user_permission.screen_master_id=mas_screen_master.id and mas_screen_master.active_flag='1'  join mas_module_master on mas_module_master.id=mas_screen_master.moduleid   left join mas_sub_module_master on mas_sub_module_master.id=mas_screen_master.submoduleid WHERE user_id= '"+user_id+"' and mas_module_master.id='"+module_id+"' order by mas_screen_master.submoduleid  desc";  
  
  db.query(sproc,[user_id,module_id], async function(err,response){  
  if(err){           
  console.log(err);      
  //response.send({ status: 0, msg: 'Failed', data: err }); 
 }  
 else
 {             
     var test=0; 
     response=response[2];
         // response.forEach(async (item,i) =>{
      await asyncForEach(response, async (item, i) => {
      test++;           
     var submodule_id=response[i].id;     
     response[i].item = await screenNames(user_id,module_id,'0');    
     if(submodule_id!=undefined||submodule_id!=null)
     {
     response[i].item = await screenNames(user_id,module_id,submodule_id); 
     }
    //   if(submodule_id==null)
    //   {
    //      response[i].item = await screenNames(user_id,module_id,'0');    
    //   }  
    //  else  
    //   {         
    //     response[i].item = await screenNames(user_id,module_id,submodule_id); 
    //   }  
    //******************************Get length of the response *********************************//
    //*****************************If it is zero pass zero as input else submodule_id as input***//
 //  console.log("response length:"+response.length);  
      if(i==response.length-1)
      {
      resolve(response);     
      }
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
 

function screenNames(user_id,module_id,submodule_id){
  return new Promise( resolve =>{ 
    let sproc="SET @user_id=?; SET @module_id=?; SET @submodule_id=?; CALL `sp_user_getUserPermissionScreens`(@user_id, @module_id, @submodule_id);";  
      //  var query="SELECT  mas_screen_master.id,mas_screen_master.screen_name,allow_add,allow_edit,allow_delete,allow_view,allow_print FROM `mas_user_permission` join mas_screen_master on mas_user_permission.screen_master_id=mas_screen_master.id  and mas_screen_master.active_flag='1' join mas_module_master on mas_module_master.id=mas_screen_master.moduleid left join mas_sub_module_master on mas_sub_module_master.id=mas_screen_master.id WHERE mas_user_permission.user_id='"+user_id+"' and mas_module_master.id='"+module_id+"' and mas_screen_master.submoduleid='"+submodule_id+"' order by mas_screen_master.moduleid,mas_screen_master.submoduleid,mas_screen_master.order_by   "; 
      // console.log({SubModulequerySCREEN:query});  
      db.query(sproc,[user_id,module_id,submodule_id],(err,response)=>{   
        if(err)      
        {       
          console.log(err);   
          response.send({ status: 0, msg: 'Failed', data: err }); 
        } 
        else 
        { 
          response=response[3];      
          resolve(response);   
          //  response.forEach(async(item,i) =>{
          //    // response[i].screenName= item;
          //     resolve(response);  
          //  })               
        }
      }); 
                
  })
}

//*******************************API - POST***********************************************************//

router.post('/insertUserPermission',async (req,res)=>{
  // var reqParams = req.body; 
  let submit = req.body.submit;   
   
   let sproc = "";   
  for(let i in submit){    
    sproc = "";   
    sproc +=  " SET @user_id=?; SET @screen_master_id=?; SET @allow_add=?; SET @allow_edit=?; SET @allow_delete=?; SET @allow_view=?; SET @allow_print=?; SET @created_by=?; SET @created_on=?; SET @modified_by=?; SET @modified_on=?; CALL `sp_user_insertUserPermission`(@user_id,@screen_master_id,@allow_add,@allow_edit,@allow_delete,@allow_view,@allow_print,@created_by,@created_on,@modified_by,@modified_on);" ;   
      // query +=  "  update mas_user_permission set allow_add =  '"+submit[i].allow_add +"',allow_edit =  '"+submit[i].allow_edit +"',allow_delete =  '"+submit[i].allow_delete +"',allow_view =  '"+submit[i].allow_view +"',allow_print =  '"+submit[i].allow_print +"',active_flag =  '"+submit[i].active_flag +"',created_by =  '"+submit[i].created_by +"',created_on =  '"+submit[i].created_on +"',modified_by =  '"+submit[i].modified_by +"',modified_on =  '"+submit[i].modified_on +"' Where  user_id =  '"+submit[i].user_id +"' and screen_master_id =  '"+submit[i].screen_master_id +"' ;" ;   
      
      db.query(sproc,[submit[i].user_id,submit[i].screen_master_id,submit[i].allow_add,submit[i].allow_edit,submit[i].allow_delete,submit[i].allow_view,submit[i].allow_print,submit[i].created_by,submit[i].created_on,submit[i].modified_by,submit[i].modified_on],function(err,response){  
     if(err){        
     console.log(err);     
     res.send({ status: 0, msg: 'Failed', data: err }); 
     return;
    }else{    
      if(i==submit.length-1) 
      {
     res.send({ status: 1, msg: 'Success', data: response });  
     return;
      }
      }      
     }) 
     
    }   

  });    



// router.post('/insertUserPermission',async (req,res)=>{
//   var reqParams = req.body; 
//   var submit = req.body.submit;   
   
//    var sproc = "";   
//   for(i in submit){    
  
//     sproc +=  "  update mas_user_permission set allow_add =  '"+submit[i].allow_add +"',allow_edit =  '"+submit[i].allow_edit +"',allow_delete =  '"+submit[i].allow_delete +"',allow_view =  '"+submit[i].allow_view +"',allow_print =  '"+submit[i].allow_print +"',active_flag =  '"+submit[i].active_flag +"',created_by =  '"+submit[i].created_by +"',created_on =  '"+submit[i].created_on +"',modified_by =  '"+submit[i].modified_by +"',modified_on =  '"+submit[i].modified_on +"' Where  user_id =  '"+submit[i].user_id +"' and screen_master_id =  '"+submit[i].screen_master_id +"' ;" ;   
//       // query +=  "  update mas_user_permission set allow_add =  '"+submit[i].allow_add +"',allow_edit =  '"+submit[i].allow_edit +"',allow_delete =  '"+submit[i].allow_delete +"',allow_view =  '"+submit[i].allow_view +"',allow_print =  '"+submit[i].allow_print +"',active_flag =  '"+submit[i].active_flag +"',created_by =  '"+submit[i].created_by +"',created_on =  '"+submit[i].created_on +"',modified_by =  '"+submit[i].modified_by +"',modified_on =  '"+submit[i].modified_on +"' Where  user_id =  '"+submit[i].user_id +"' and screen_master_id =  '"+submit[i].screen_master_id +"' ;" ;   
//         }   
//      db.query(query,function(err,response){  
//      if(err){        
//      console.log(err);     
//      res.send({ status: 0, msg: 'Failed', data: err }); 
//     }else{    
//      res.send({ status: 1, msg: 'Success', data: response }); 
//       }      
//      })  
//   });    
      

//**************************************Previous without trigger*****************************************************************/
// router.post('/insert_mas_user_permission',async (req,res)=>{
// var user_id = req.body.user_id;   
// var group_id = req.body.group_id;     
// var query = "";                             
// var submit=await GETRecordExists(group_id);   
// console.log({outputLength:submit[0]});      
// console.log({outputLength:submit.length});  
// for(i in submit){       
// console.log("output",submit);                  
// // console.log({outputLength:output.RowDataPacket.length});          
// var output=await GETRecordUser(user_id,submit[i].screen_master_id ); 
//    if(output.length > 0 ){      
//     query +=  "  update mas_user_permission set allow_add =  '"+submit[i].allow_add +"',allow_edit =  '"+submit[i].allow_edit +"',allow_delete =  '"+submit[i].allow_delete +"',allow_view =  '"+submit[i].allow_view +"',allow_print =  '"+submit[i].allow_print +"',active_flag =  '"+submit[i].active_flag +"',created_by =  '"+submit[i].created_by +"',created_on =  '"+submit[i].created_on +"',modified_by =  '"+submit[i].modified_by +"',modified_on =  '"+submit[i].modified_on +"' Where  user_id =  '"+user_id +"' and screen_master_id =  '"+submit[i].screen_master_id +"' ;" ;  
//     }    
//   else {    
//       query +=  " INSERT INTO mas_user_permission ( user_id,screen_master_id,allow_add,allow_edit,allow_delete,allow_view,allow_print,active_flag,created_by,created_on,modified_by,modified_on,group_id       ) values ( '" +user_id +"' ,'" +submit[i].screen_master_id +"' ,'" +submit[i].allow_add +"' ,'" +submit[i].allow_edit +"' ,'" +submit[i].allow_delete +"' ,'" +submit[i].allow_view +"' ,'" +submit[i].allow_print +"' ,'" +submit[i].active_flag +"' ,'" +submit[i].created_by +"' ,'" +submit[i].created_on +"' ,'" +submit[i].modified_by +"' ,'" +submit[i].modified_on +"','"+group_id+"' ); ";   
//       }       
//    }                       
//     db.query(query,function(err,response){  
//    if(err){       
//     console.log(err);  
//     res.send({ status: 0, msg: 'Failed', data: err }); 
//   }else{   
//     res.send({ status: 1, msg: 'Success', data: response }); 
//     }     
//    }) 
// });  
  
// function   GETRecordUser(user_id,screen_master_id){
// return new Promise( resolve =>{ 

// var query="SELECT * FROM `mas_user_permission` WHERE user_id='"+user_id+"' and screen_master_id='"+screen_master_id+"' ";  
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



// });
// }
// function GETRecordExists(group_id){
//   return new Promise( resolve =>{ 
   
//     var query="SELECT * FROM `mas_group_permission` Where group_id='"+group_id+"'  ";  
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

 //*******************************API - PUT***********************************************************//
router.put('/edit_mas_user_permission',async (req,res)=>{
  
  // var reqParams = req.body; 
  var submit = req.body.submit;   
   
   var query = "";   
  for(let i in submit){    
  
      query +=  "  update mas_user_permission set allow_add =  '"+submit[i].allow_add +"',allow_edit =  '"+submit[i].allow_edit +"',allow_delete =  '"+submit[i].allow_delete +"',allow_view =  '"+submit[i].allow_view +"',allow_print =  '"+submit[i].allow_print +"',active_flag =  '"+submit[i].active_flag +"',created_by =  '"+submit[i].created_by +"',created_on =  '"+submit[i].created_on +"',modified_by =  '"+submit[i].modified_by +"',modified_on =  '"+submit[i].modified_on +"' Where  user_id =  '"+submit[i].user_id +"' and screen_master_id =  '"+submit[i].screen_master_id +"' ;" ;   
        }   
     db.query(query,function(err,response){  
     if(err){        
     console.log(err);     
     res.send({ status: 0, msg: 'Failed', data: err }); 
    }else{    
     res.send({ status: 1, msg: 'Success', data: response }); 
      }      
     })      
});  

// router.post('/insert_mas_user_permission',(req,res)=>{
// var reqParams = req.body;
// var query =  " INSERT INTO mas_user_permission ( user_id,screen_master_id,allow_add,allow_edit,allow_delete,allow_view,allow_print,active_flag,created_by,created_on,modified_by,modified_on ) values ( '" +reqParams.user_id +"' ,'" +reqParams.screen_master_id +"' ,'" +reqParams.allow_add +"' ,'" +reqParams.allow_edit +"' ,'" +reqParams.allow_delete +"' ,'" +reqParams.allow_view +"' ,'" +reqParams.allow_print +"' ,'" +reqParams.active_flag +"' ,'" +reqParams.created_by +"' ,'" +reqParams.created_on +"' ,'" +reqParams.modified_by +"' ,'" +reqParams.modified_on +"' ) "; 
//  db.query(query,function(err,response){  
//  if(err){     
//  console.log(err);  
//   res.send({ status: 0, msg: 'Failed', data: err }); 
//  }else{   
//   res.send({ status: 1, msg: 'Success', data: response }); 
//   }  
//   });  
// }); 
//*******************************API - PUT (RESET) ***********************************************************//
  
function GETGroupRights(user_id)
{
  return new Promise(resolve=>{
    var query="SET @user_id=?; CALL `sp_user_getUserPermissionReset`(@user_id); ";  
    // var query="select * from mas_group_permission where group_id=(select group_id from mas_user_permission where user_id='"+user_id+"' group by(group_id))  ";  
    // console.log({query:query});
    //       console.log({SubModulequery:query});  
          db.query(query,[user_id],(err,response)=>{  
            if(err)    
            {      
                resolve({status:0,msg:"Failed",error:err}) ;
                console.log({errorGETGroupRights:err});     
                // res.send({ status: 0, msg: 'Failed', data: err }); 
            }  
            else 
            {      
              response=response[1];
              console.log({response123:response});
              resolve(response); 
              
               
                
            }
          }); 

  })

}

router.put('/resetUserPermission',async (req,res)=>{   
  
  var user_id = req.body.user_id;         
  var sproc = "";     
  var submit=await GETGroupRights(user_id);
  //  console.log("Submit:",submit);
  let tempArray;
  submit= Array.isArray(submit)?submit:[submit];
    console.log("Submit:",submit);
  for(var  i in submit){ 
 
    // console.log("I:",i);
    
    tempArray=[    
     submit[i].group_id,
     submit[i].screen_master_id,
     submit[i].allow_add,    
     submit[i].allow_edit,
     submit[i].allow_delete,
     submit[i].allow_view,  
     submit[i].allow_print,
     user_id       
    
    ];     
    sproc=""; 
    // console.log("tempArray:",tempArray);

    // console.log({sproc_test:sproc});

    let result= await resetUserPermission(sproc,tempArray);
    console.log({result:result.status});
    if(!result.status)
    {
      res.send({ status: 1, msg: 'Failed', data: result.msg });  
      return;
    }   
    if(i==submit.length-1)
    {

        res.send({ status: 1, msg: 'Success', data: [] }); 
        // return next();

    }
   
     tempArray=[];
    sproc=""; 
    }    
     
});   

//**************************************** resetUserPermission *********************/

function resetUserPermission(sproc,tempArray){

  return new Promise((resolve)=>{

  sproc="SET @group_id=?; SET @screen_master_id=?;SET @allow_add=?;SET @allow_edit=?;SET @allow_delete=?;SET @allow_view=?;SET @allow_print=?;SET @user_id=?;CALL sp_user_updateResetUserPermission(@group_id,@screen_master_id,@allow_add,@allow_edit,@allow_delete,@allow_view,@allow_print,@user_id);";
  // query +=  "  update mas_user_permission set allow_add =  '"+submit[i].allow_add +"',allow_edit =  '"+submit[i].allow_edit +"',allow_delete =  '"+submit[i].allow_delete +"',allow_view =  '"+submit[i].allow_view +"',allow_print =  '"+submit[i].allow_print +"' Where  user_id =  '"+user_id+"' and screen_master_id =  '"+submit[i].screen_master_id +"' and group_id =  '"+submit[i].group_id +"' ;" ;    
 // console.log({sproc:sproc});
db.query(sproc,tempArray,function(err,response){  
if(err){          
console.log(err);     
// res.send({ status: 0, msg: 'Failed', data: err }); 
resolve({status:false,msg:err});

}else{     
  console.log({res:response});     

  resolve({status:true,msg:'Success'});
   
 }
 
 
}) 
  })

}


//*******************************API - Delete***********************************************************//
router.delete('/deletemas_user_permission',(req,res)=>{
var reqParams = req.body;
var query =  " update mas_user_permission set active_flag=0 Where  id = '"+reqParams.id+ "' " ; 
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
