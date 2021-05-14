

// var generator = require('generate-password'); 
var bcrypt = require('bcrypt');  
var jsonwebtoken = require('jsonwebtoken');   
const  checkauth= require('../checkauth');   
const  dotenv= require('dotenv').config({path:'./.env'});   
var Mustache = require("mustache");
var fs = require("fs");
var db=require('../db');
var ses = require("nodemailer-ses-transport");

var nodemailer = require("nodemailer"); 
var transporter = nodemailer.createTransport(ses({
    accessKeyId: 'AKIAX5QFSOQYK4F2PEVV',
    secretAccessKey: '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'
  }));

// module.exports = function(router, db,transporter,generator,bcrypt,jsonwebtoken,checkauth,Mustache,fs,Globallinks){  
 
var async=require("async");  
const router = require("../Common/eventHandler");
   
//*******************************Declare  file path here ***********************************************************//
//  const filePath=Globallinks.VendorProfile;   
const filePath="http://54.198.55.249/surana/?/Home/";
// const fileUploadPath =  mediaUploadPath.vendorUploadPath ;  




//*******************************  Referred by information ***********************/

router.post("/getReferredBy", function (req, res) {
 
    var query = "CALL sp_getEmployees";
    db.query(query, function (err, response) {
      if (err) {
        console.log(err.message);
        res.send({ status: 1, msg: "Failed", data: response });
      }
      else {
        res.send({ status:0, msg: "Success", data: response });
      }        
    })
  })
 

function readModuleFile(path, callback) {
	// try {  
		console.log("path",path); 
	  var filename = require.resolve(path);  
	  console.log("filename",filename);  
	  
	  fs.readFile(filename, "utf8", callback);
	// } catch (e) { 
	//   callback(e);
	// }  
  } 

//*******************************API - POST***********************************************************//
//*******************************API - RESET Password***********************************************************//


//*******************************API - RESET Password with Authentication Later ***********************************************************//
 router.post('/resetPassword',checkauth,async(req,res)=>{

    //*******************************API - RESET Password without Authentication ***********************************************************//
    // router.post('/resetPassword',async(req,res)=>{
  var reqParam=req.body;       
  var email=reqParam.email;     
  var password= reqParam.password;   
  console.log({ENV_KEY:process.env.JWT_KEY});     
  var query = "SET @email=?; CALL `sp_user_login`(@email);";  
//   var query =  " SELECT mas_user_master.id,mas_user_master.user_name,mas_user_master.email,mas_user_master.vendor_id,mas_user_master.password,mas_group_master.groupname as vendor FROM `mas_user_master` join mas_group_master ON mas_group_master.id=mas_user_master.groupid where email='"+reqParam.email+"'  "; 
	 db.query(query,[email],async function(err,response){  
	 if(err){         
	  console.log(err);  
	  res.send({ status: 0, msg: 'Failed', data: err }); 
	 }else{   
        response=response[1];
        console.log("response32",response);
		if(response.length > 0 )     
		{     
            password=await hashPassword(password); 
            query = "SET @email=?;SET @password=?;CALL sp_user_updateResetPassword(@email,@password);";
			// query = "update mas_user_master set password='"+password+"' where email='"+email+"' ";
			var output=await updatePassword(query,[email,password]);
			console.log({output:output}); 
			console.log({output:output.err}); 
			res.send({ status: 1, msg: 'Password updated sucessfully', data: [] });   
	  
		} 
		else
		{ 
			res.send({ status: 0, msg: 'Invalid Mail ID', data: response });    
		}
	  }                 
	  });     
 }); 
   

//*******************************update Password***********************************************************//
 function updatePassword(query,args)
 { 
	 return new Promise((resolve)=>{ 
		  db.query(query,args,(err,response)=>{
			  if(err)
			  {
				resolve(err);
				console.log({err:err});
				// return;
			  }
			  else
			  {  
				console.log({response:response});
				resolve(response);
				// return; 
			  }
		  }
		  )
	 } 
	 )
 }

 //*******************************get  HashPassword***********************************************************//
async function hashPassword(Userpassword)
{   
	console.log({userPassword:Userpassword});
  const password=Userpassword;  
  const setRounds=10;  
  const hashedPassword=await new Promise((resolve,reject)=>{
    //****************************  bcrypt.hash() function to convert plain text to encoded text ************************************************************************/
    //****************************  bcrypt.hash( password,setRounds,(err,hash)=>{ if(err){reject(err);}else {resolve(hash)}} ) ************************************************************************/
	bcrypt.hash(password,setRounds,(err,hash_val)=>{ 
		if(err){ 
			reject(err); 
		}
		else {
			console.log({hash:hash_val});			 	
			resolve(hash_val); 
		} 
	 
     }
    ); }        
   );   
   console.log({hashedPassword:hashedPassword});
   return hashedPassword;
} 
   
//*******************************API - POST***********************************************************//
router.post('/userlogin',(req,res)=>{ 
	// console.log("here"); 
	var reqParam=req.body;     
	var id=reqParam.id;     
	//var password= reqParam.password;
	// .env  environment file
	console.log({ENV_KEY:process.env.JWT_KEY});     
	// var path = "http://52.200.251.222/vprofile/";          
	// var path = filePath ; 
	//var query =  " select id,user_name,email,vendor_id from mas_user_master where email='"+reqParam.email+"' and password='"+reqParam.password+"' "; 
	//**************************** Mail id exist in mas_user_master table ************************************************************************/
	//var query =  " select id,user_name,email,vendor_id,password from mas_user_master where email='"+reqParam.email+"'  "; 
    var query = "SET @id=?; CALL `sp_user_login`(@id);"; 
    // var query =  " SELECT mas_user_master.id,mas_user_master.user_name,mas_user_master.email,mas_user_master.vendor_id,mas_user_master.password,mas_group_master.groupname as vendor,mas_vendor.vendor_type_id ,CONCAT('"+path+"',vendor_filename) as profile_image FROM `mas_user_master` join mas_group_master ON mas_group_master.id=mas_user_master.groupid left join mas_vendor on mas_vendor.id=mas_user_master.vendor_id where email='"+reqParam.email+"'  "; 
	db.query(query,[id],function(err,response){  
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
	  bcrypt.compare(password,response[0].password,(err,result)=>{
		if(err) 
		{     
		  res.status(401).send({ status: 0, msg: 'Authentication failed', err: err }); 
		}   
		if(result) 
		{    
		  var output=response; 
		  //**************************** JSONWEBTOKEN Sign() method  Generate TOKEN ************************************************************************/
		  //**************************** JSONWEBTOKEN.sign(payload,secret_key,Token_expires_In) method  Generate TOKEN ************************************************************************/
		  const token=  jsonwebtoken.sign({
			 id:id,userId:response[0].id 
		   },process.env.JWT_KEY,{expiresIn:"1h"});       
		  console.log({output:output[0].password});     


		  res.status(200).send({ status: 1, msg: 'Authentication success', data: response ,token:token}); 
		}     
		else    
		{   
		  res.status(401).send({ status: 0, msg: 'Authentication failed', error: error }); 
		}   
	  }    
		 
		); 
	//  res.send({ status: 1, msg: 'Success', data: [response] }); 
	}   
	 }      
	 });       
   });      
   //**********JSON TOKEN GENERATE*******************************************************************





//*******************************API - POST***********************************************************//
router.post('/login',(req,res)=>{ 
	// console.log("here"); 
	var reqParam=req.body;     
	var email=reqParam.email;     
	var password= reqParam.password;
	console.log({ENV_KEY:process.env.JWT_KEY});     
	// var path = "http://52.200.251.222/vprofile/";          
	// var path = filePath ; 
	//var query =  " select id,user_name,email,vendor_id from mas_user_master where email='"+reqParam.email+"' and password='"+reqParam.password+"' "; 
	//**************************** Mail id exist in mas_user_master table ************************************************************************/
	//var query =  " select id,user_name,email,vendor_id,password from mas_user_master where email='"+reqParam.email+"'  "; 
    var query = "SET @email=?; CALL `sp_user_login`(@email);"; 
    // var query =  " SELECT mas_user_master.id,mas_user_master.user_name,mas_user_master.email,mas_user_master.vendor_id,mas_user_master.password,mas_group_master.groupname as vendor,mas_vendor.vendor_type_id ,CONCAT('"+path+"',vendor_filename) as profile_image FROM `mas_user_master` join mas_group_master ON mas_group_master.id=mas_user_master.groupid left join mas_vendor on mas_vendor.id=mas_user_master.vendor_id where email='"+reqParam.email+"'  "; 
	db.query(query,[email],function(err,response){  
	if(err){         
	console.log(err);          
	res.status(404).send({ status: 0, msg: 'Failed', error: err }); 
	  }
	   else
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
	  bcrypt.compare(password,response[0].password,(error,result)=>{
		if(err) 
		{     
		  res.status(401).send({ status: 0, msg: 'Authentication failed', err: err }); 
		}   
		if(result) 
		{    
		  var output=response; 
		  //**************************** JSONWEBTOKEN Sign() method  Generate TOKEN ************************************************************************/
		  //**************************** JSONWEBTOKEN.sign(payload,secret_key,Token_expires_In) method  Generate TOKEN ************************************************************************/
		  const token=  jsonwebtoken.sign({
			 email:email,userId:response[0].id 
		   },process.env.JWT_KEY,{expiresIn:"1h"});       
		  console.log({output:output[0].password});     


		  res.status(200).send({ status: 1, msg: 'Authentication success', data: response ,token:token}); 
		}     
		else    
		{   
		  res.status(401).send({ status: 0, msg: 'Authentication failed', error: error }); 
		}   
	  }    
		 
		); 
	//  res.send({ status: 1, msg: 'Success', data: [response] }); 
	}   
	 }      
	 });       
   });      




  async function GenerateToken(payload)
   {
       //eg:payload={	email:email,userId:response[0].id }
       
       console.log("process.env.JWT_KEY",process.env.JWT_KEY);
	   return new Promise((resolve) =>{    
		const token=  jsonwebtoken.sign(payload,process.env.JWT_KEY,{expiresIn:"1h"});       
		console.log({token:token}); 
		resolve({ status: 1, msg: 'Authentication success', token:token}); 
        
	   }) 
 
   }
 //**********JSON TOKEN GENERATE*******************************************************************

 
//*******************************API - POST***********************************************************//
router.post('/sendresetpwdURL',(req,res)=>{  
	var reqParam=req.body;      
	var email=reqParam.email;   
	    
	var liveUrl="";            
	//  linkurl= "http://localhost:3000/resetpassword?tk=";    
	// liveUrl="http://122.165.146.121:81/superadmin/?/resetpassword?&tk=";         
	liveUrl="http://54.198.55.249/surana/?/resetpassword?&tk=";         
	//**************************** Mail id exist in mas_user_master table ************************************************************************/
	//var query =  " select id,user_name,email,vendor_id,password from mas_user_master where email='"+reqParam.email+"'  "; 
	// var query =  " SELECT mas_user_master.id,mas_user_master.user_name,mas_user_master.email,mas_user_master.vendor_id,mas_user_master.password,mas_group_master.groupname as vendor FROM `mas_user_master` join mas_group_master ON mas_group_master.id=mas_user_master.groupid where email='"+reqParam.email+"'  "; 
    var query = "SET @email=?; CALL `sp_user_login`(@email);";  
    db.query(query,[email],async function(err,result){  
	if(err){                   
	    console.log(err);              
	    res.status(404).send({ status: 0, msg: 'Invalid Mail ID', error: err }); 
	  } else{     
        result=result[1];
		  console.log("result",result); 
		  if(result.length>0)         
		  {         
        var subject="SURANA_ Reset Password";    
		// var msg="Click the link to reset your password:";   
		GeneratedToken=await GenerateToken({email:email,user_id:result[0].employee_id});  
		var token=GeneratedToken.token; 
		console.log({token:token});   
         var URLLINK=liveUrl+token+"&ma="+email;  
         console.log({URLLINK:URLLINK});   
		var msg =await message_data(URLLINK);  

		var output=await mailing(email,msg,subject);      
		if(output.status=0)
		{  
			res.status(404).send('Mail Send Failed! Try again'); 
		} 
		else  
		{         
			res.send({status:1,msg:'Link Send Successfully'});   
		}  	
	//  res.send({ status: 1, msg: 'Success', data: [response] }); 
		  }
		  else
		  {
			res.status(404).send({ status: 0, msg: 'Invalid Mail ID', data:result });  
		  }
	}        
	 });          
   });          
     
   function mailing(mailId, message, subject) {
	return new Promise(resolve => { 
	  var mailOptions = {
		from:"membershi8@gmail.com" ,
		to: mailId, 
		subject: subject,  
		// html: message  
		html:message   
	  };     
	  transporter.sendMail(mailOptions, function(error, info) {
		console.log(mailOptions);
		if (error) {
		  console.log(error);  
		  resolve({ 
			status: 0,  
			msg: "Mail Id is not registered in AWS",
			data: []
		  });  
		} else {   
		      
		  resolve({
			status: 1, 
			msg: " Mail sent to the User", 
			data: [] 
		  });  
		} 
	  });
	}); 
  }
		   

  function message_data(urlLink) {

	// console.log("heading message", heading);
	return new Promise(resolve => {           
        readModuleFile('../Resetpwd.html', function(err, template) {
		console.log("template",template);      
        // var logo="http://52.200.251.222/uploads/Logo.png";
		var filePath="http://54.198.55.249/surana/Logo.png";  
		var logo=filePath; 
        // var logo= filePath +"Logo.png";         
        console.log("logo123",logo);
		var rendered = Mustache.render(template, { url:urlLink,logo:logo }); 
		console.log(rendered);          
		resolve(rendered); 
      });         
	});        
  }       
 
  //*******************Mail Send functionality END *****************************/  
module.exports=router;
