module.exports = function(router, db){ 
//*******************************API - GET***********************************************************//
router.get('/get_s_tbl_m_industry',(req,res)=>{
 var query =  " select * from s_tbl_m_industry   "; 
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
router.post('/insert_s_tbl_m_industry',(req,res)=>{
var reqParams = req.body;
var query =  " INSERT INTO s_tbl_m_industry ( industry,created_on,updated_on,created_by,updated_by ) values ( '" +reqParams.industry +"' ,'" +reqParams.created_on +"' ,'" +reqParams.updated_on +"' ,'" +reqParams.created_by +"' ,'" +reqParams.updated_by +"' ) "; 
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
router.put('/edit_s_tbl_m_industry',(req,res)=>{
var reqParams = req.body;
var query =  " update s_tbl_m_industry set industry =  '"+reqParams.industry +"',created_on =  '"+reqParams.created_on +"',updated_on =  '"+reqParams.updated_on +"',created_by =  '"+reqParams.created_by +"',updated_by =  '"+reqParams.updated_by +"' Where  industry_id = '"+reqParams.industry_id+ "' " ; 
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
router.delete('/delete_s_tbl_m_industry',(req,res)=>{
var reqParams = req.body;
var query =  " delete from  s_tbl_m_industry  Where  industry_id = '"+reqParams.industry_id+ "' " ; 
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
