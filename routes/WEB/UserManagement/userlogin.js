var bcrypt = require('bcrypt');  
var jsonwebtoken = require('jsonwebtoken');   
const express = require("express");
//const bcrypt = require("bcrypt");
const router = express.Router();
var db = require("../db"); 
var routes = require("../routes");
var db=require('../db');
var ses = require("nodemailer-ses-transport");

var nodemailer = require("nodemailer"); 
// var transporter = nodemailer.createTransport(ses({
//     accessKeyId: 'AKIAX5QFSOQYK4F2PEVV',
//     secretAccessKey: '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'
//   }));

router.post('/userslogin',(req,res)=>{ 
	// console.log("here"); 
	var reqParam=req.body;     
    var id=reqParam.id;
    console.log("id",id);  
	// var password= reqParam.password;
	// .env  environment file  
	// console.log({ENV_KEY:process.env.JWT_KEY});     
	// var path = "http://52.200.251.222/vprofile/";          
	// var path = filePath ; 
	//var query =  " select id,user_name,email,vendor_id from mas_user_master where email='"+reqParam.email+"' and password='"+reqParam.password+"' "; 
	//**************************** Mail id exist in mas_user_master table ************************************************************************/
	//var query =  " select id,user_name,email,vendor_id,password from mas_user_master where email='"+reqParam.email+"'  "; 
    var query = "SET @id=?; CALL `sp_user_Ulogin`(@id);"; 
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
	//   bcrypt.compare(password,response[0].password,(err,result)=>{
	// 	if(err) 
	// 	{     
	// 	  res.status(401).send({ status: 0, msg: 'Authentication failed', err: err }); 
	// 	}   
	// 	if(result) 
	// 	{    
	// 	  var output=response; 
	// 	  //**************************** JSONWEBTOKEN Sign() method  Generate TOKEN ************************************************************************/
	// 	  //**************************** JSONWEBTOKEN.sign(payload,secret_key,Token_expires_In) method  Generate TOKEN ************************************************************************/
	// 	  const token=  jsonwebtoken.sign({
	// 		 email:email,userId:response[0].id 
	// 	   },process.env.JWT_KEY,{expiresIn:"1h"});       
	// 	  console.log({output:output[0].password});     


	// 	  res.status(200).send({ status: 1, msg: 'Authentication success', data: response ,token:token}); 
	// 	}     
	// 	else    
	// 	{   
	// 	  res.status(401).send({ status: 0, msg: 'Authentication failed', error: error }); 
	// 	}   
	//   }    
		 
	// 	); 
	 res.send({ status: 1, msg: 'Success', data: response }); 
	}   
	 }      
	 });       
   });      
//    //**********JSON TOKEN GENERATE*******************************************************************
//   async function GenerateToken(payload)
//    {
//        //eg:payload={	email:email,userId:response[0].id }
       
//        console.log("process.env.JWT_KEY",process.env.JWT_KEY);
// 	   return new Promise((resolve) =>{    
// 		const token=  jsonwebtoken.sign(payload,process.env.JWT_KEY,{expiresIn:"1h"});       
// 		console.log({token:token}); 
// 		resolve({ status: 1, msg: 'Authentication success', token:token}); 
        
// 	   }) 
 
//    }

module.exports=router;