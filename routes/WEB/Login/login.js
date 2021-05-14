module.exports = function(router, db,errorData,bcrypt){ 
  router.post('/login',(req,res)=>{ 
    // console.log("here"); 
    // var bcrypt = require('bcrypt'); 
    var reqParam=req.body;     
    var email=reqParam.email;     
    var password= reqParam.password;
    // .env  environment file
   // console.log({ENV_KEY:process.env.JWT_KEY});     
   var query = "SET @email=?; CALL `sp_user_login`(@email);"; 
      // var query =  " SELECT mas_user_master.id,mas_user_master.user_name,mas_user_master.email,mas_user_master.vendor_id,mas_user_master.password,mas_group_master.groupname as vendor,mas_vendor.vendor_type_id ,CONCAT('"+path+"',vendor_filename) as profile_image FROM `mas_user_master` join mas_group_master ON mas_group_master.id=mas_user_master.groupid left join mas_vendor on mas_vendor.id=mas_user_master.vendor_id where email='"+reqParam.email+"'  "; 
    db.query(query,[email],function(err,response){  
    if(err){         
    console.log(err);          
    res.status(404).send({ status: 0, msg: 'Failed', error: err }); 
      } else
      {            
    
    response=response[1];  
    console.log({length:response.length});
    console.log({length:response});  
    //**************************** If response is zero mail id doesn't exist  ************************************************************************/
    if(response.length<1)  
    {       
      return res.status(404).json({status: 1, msg: 'Authentication failed'});
    }      
    else 
    {    
      //**************************** Else mail id  exist  ************************************************************************/
      //**************************** Compare password which is encoded text in DB with user entered password which is plain text************************************************************************/
      console.log("password",response);
      console.log("response[0].password",response[0].password);
      
      bcrypt.compare(password,response[0].password,(err,resp)=>{
      if(err) 
      {     
        res.status(401).send({ status: 0, msg: 'Authentication failed', err: err }); 
      }   
      else
      {    
       // var output=response; 
            
       console.log("response",response);
  
        res.status(200).send({ status: 1, msg: 'Authentication success', data: response }); 
      }     
       
      }    
       
      ); 
    //  res.send({ status: 1, msg: 'Success', data: [response] }); 
    }   
     }      
     });       
     });  

    return router;}