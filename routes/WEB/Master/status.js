module.exports = function(router, db){ 
//*******************************API - GET***********************************************************//
router.post('/get_s_tbl_m_status',(req,res)=>{
 var query =  " select * from s_tbl_m_status  where status_type='"+req.body.status_type+"'  "; 
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
router.post('/insert_s_tbl_m_status',(req,res)=>{
var reqParams = req.body;
var query =  " INSERT INTO s_tbl_m_status ( status_type,status,created_on,updated_on,created_by,updated_by ) values ( '" +reqParams.status_type +"' ,'" +reqParams.status +"' ,'" +reqParams.created_on +"' ,'" +reqParams.updated_on +"' ,'" +reqParams.created_by +"' ,'" +reqParams.updated_by +"' ) "; 
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
router.put('/edit_s_tbl_m_status',(req,res)=>{
var reqParams = req.body;
var query =  " update s_tbl_m_status set status_type =  '"+reqParams.status_type +"',status =  '"+reqParams.status +"',created_on =  '"+reqParams.created_on +"',updated_on =  '"+reqParams.updated_on +"',created_by =  '"+reqParams.created_by +"',updated_by =  '"+reqParams.updated_by +"' Where  status_id = '"+reqParams.status_id+ "' " ; 
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
router.delete('/delete_s_tbl_m_status',(req,res)=>{
var reqParams = req.body;
var query =  " delete from  s_tbl_m_status  Where  status_id = '"+reqParams.status_id+ "' " ; 
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
