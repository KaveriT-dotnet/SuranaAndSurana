
module.exports=function(router,db,errorData,async,bcrypt){
  //*******************************API - GET***********************************************************//
   
  router.get("/getCandidateName", function(req, res) {
    try { 
       let sproc = 
         "CALL sp_user_getCandidateName";
       db.query(sproc  , function(err, response) { 
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

//*******************************API - GET***********************************************************//
   
router.get("/getUser", function(req, res) {
  console.log("here");
   try { 


    //**********Reference query**********/
    // "select mas_user_master.id,user_name,phone as mobileno,email,  mas_group_master.group_name,group_id,mas_user_master.active_flag,mas_user_master.employee_id , CONCAT(mas_employee.EmpFirstName,' ',mas_employee.EmpLastName) as candidate_name ,mas_user_master.password from mas_user_master join mas_employee on mas_employee.EmpId=mas_user_master.employee_id  inner join mas_group_master on mas_group_master.id=mas_user_master.group_id"
      var sproc = 
        "CALL sp_user_getUser ";
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
    
    
  //*******************************API - Insert***********************************************************//
  router.post("/insertUser", async(req, res) => {
  
   try
   {
    let  reqParams = "";  
    reqParams = req.body;    
    console.log({password:reqParams.password});    

    let password=await hashPassword(reqParams.password);   
    let sproc= "SET @groupId=?;SET @password=?;SET @mobileno=?;SET @username=?;SET @created_by=?;SET @email=?;SET @active_flag=?;SET @user_id=?;SET @employee_id=?;CALL sp_user_insertUser(@groupId,@password,@mobileno,@username,@created_by,@email,@active_flag,@user_id,@employee_id);"
      
    console.log({Bcryptpassword:password});    
  console.log("sproc",sproc);  
    // query="INSERT INTO `mas_doctor_speciality` ( `speciality`, `created_by`, `created_on` )  VALUES ('"+reqParams.speciality+"','"+reqParams.created_by+"',CURDATE())";
    db.query(sproc,[reqParams.groupId,password, reqParams.mobileno,reqParams.username,reqParams.created_by,reqParams.email,reqParams.active_flag,reqParams.user_id,reqParams.employee_id], (err, data) => {
      if (err) {  
        res.send({ status: 0, msg: "Failed", Error: err });
        console.log({ error: err });
      } else {
        // var get_user_id = data;
        console.log({ data: data });                                 
        res.send({ status: 1, msg: 'Success', data: data });
        
      } 
        });
       
      }
      catch(ex)
      {
        res.send({ status: 0, msg: 'Failed', err: ex });
      }  
    });
  
   
//*******************************API - Insert***********************************************************//
router.put("/editUser", async(req, res) => {
  try
  {
   let  reqParams = "";  
   reqParams = req.body;    
   console.log({password:reqParams.password});    

   let password=await hashPassword(reqParams.password);   
   let sproc= "SET @groupId=?;SET @password=?;SET @mobileno=?;SET @username=?;SET @created_by=?;SET @email=?;SET @active_flag=?;SET @user_id=?;SET @employee_id=?;CALL sp_user_insertUser(@groupId,@password,@mobileno,@username,@created_by,@email,@active_flag,@user_id,@employee_id);"
     
   console.log({Bcryptpassword:password});    
 console.log("sproc",sproc);  
   // query="INSERT INTO `mas_doctor_speciality` ( `speciality`, `created_by`, `created_on` )  VALUES ('"+reqParams.speciality+"','"+reqParams.created_by+"',CURDATE())";
   db.query(sproc,[reqParams.groupId,password, reqParams.mobileno,reqParams.username,reqParams.created_by,reqParams.email,reqParams.active_flag,reqParams.user_id,reqParams.employee_id], (err, data) => {
     if (err) {  
       res.send({ status: 0, msg: "Failed", Error: err });
       console.log({ error: err });
     } else {
      //  var get_user_id = data;
       console.log({ data: data });                                 
       res.send({ status: 1, msg: 'Success', data: data });
       
     } 
       });
      
     }
     catch(ex)
     {
       res.send({ status: 0, msg: 'Failed', err: ex });
     }  
   });
 
  
      
async function hashPassword(Userpassword)
{ 
  const password=Userpassword;  
  const setRounds=10; 
  const hashedPassword=await new Promise((resolve,reject)=>{
    //****************************  bcrypt.hash() function to convert plain text to encoded text ************************************************************************/
    //****************************  bcrypt.hash( password,setRounds,(err,hash)=>{ if(err){reject(err);}else {resolve(hash)}} ) ************************************************************************/
    bcrypt.hash( password,setRounds,(err,hash)=>{ if(err){console.log("FNerr",err);throw (err);}else {resolve(hash)}}
    ); }          
   );    
   console.log({hashedPassword:hashedPassword});
   return hashedPassword;
}  

  // insert uername information 
  // function insert_userInfo(db, res, query) {
  //   db.query(query, (err, data) => {
  //     if (err) {
  //       res.send({ status: 0, msg: "Failed", Error: err });
  //     } else {
  //       res.send({ status: 1, msg: "Success", data: data });
  //     }
  //   });
  // }

  

  //*******************************API - Delete***********************************************************//
  router.delete("/deleteUser", (req, res) => {
    
    let reqParams = "";
    reqParams = req.body;  
    let sproc ="SET @user_id=?; CALL `sp_user_deleteUser`(@user_id);";  
    db.query(sproc,[reqParams.user_id], (err, data) => {
      if (err) {
        console.log({ error: err });
      } else {
        res.send({ status: 1, msg: "Success", data: data });
      }
    });
  });

    
  
return router;
}
//*******************************EOL***********************************************************//
