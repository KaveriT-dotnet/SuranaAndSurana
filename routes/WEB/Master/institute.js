module.exports = function(router, db){ 
//*******************************API - GET***********************************************************//
router.get('/get_s_tbl_m_institute',(req,res)=>{
 var query =  " select * from s_tbl_m_institute   "; 
 db.query(query,function(err,response){  
 if(err){     
 console.log(err);  
  res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{   
  res.send({ status: 1, msg: 'Success', data: response }); 
  }  
  });  
}); 
//*******************************API - POST***********************************************************//
router.post('/insert_s_tbl_m_institute',(req,res)=>{
var reqParams = req.body;
var query =  " INSERT INTO s_tbl_m_institute ( institute,state_id,city_id,created_on,updated_on,created_by,updated_by ) values ( '" +reqParams.institute +"' ,'" +reqParams.state_id +"' ,'" +reqParams.city_id +"' ,'" +reqParams.created_on +"' ,'" +reqParams.updated_on +"' ,'" +reqParams.created_by +"' ,'" +reqParams.updated_by +"' ) "; 
 db.query(query,function(err,response){  
 if(err){     
 console.log(err);  
  res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{   
  res.send({ status: 1, msg: 'Success', data: response }); 
  }  
  });  
}); 
// *******************************API - Edit***********************************************************//
router.put('/edit_s_tbl_m_institute',(req,res)=>{
var reqParams = req.body;
var query =  " update s_tbl_m_institute set institute =  '"+reqParams.institute +"',state_id =  '"+reqParams.state_id +"',city_id =  '"+reqParams.city_id +"',created_on =  '"+reqParams.created_on +"',updated_on =  '"+reqParams.updated_on +"',created_by =  '"+reqParams.created_by +"',updated_by =  '"+reqParams.updated_by +"' Where  institute_id = '"+reqParams.institute_id+ "' " ; 
 db.query(query,function(err,response){  
 if(err){     
 console.log(err);  
  res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{   
  res.send({ status: 1, msg: 'Success', data: response }); 
  }  
  });  
}); 
//*******************************API - Delete***********************************************************//
router.delete('/delete_s_tbl_m_institute',(req,res)=>{
var reqParams = req.body;
var query =  " delete from  s_tbl_m_institute  Where  institute_id = '"+reqParams.institute_id+ "' " ; 
 db.query(query,function(err,response){  
 if(err){     
 console.log(err);  
  res.send({ status: 0, msg: 'Failed', data: err }); 
 }else{   
  res.send({ status: 1, msg: 'Success', data: response }); 
  }  
  });  
}); 
return router; }    
