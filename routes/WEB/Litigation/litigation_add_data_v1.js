module.exports = function(router, db,errorData,async){ 

    //*************************  insert_litigation_detail START *********************************************//
    router.post('/insert_litigation_detail', (req,res)=>{
        try
        {
            var reqParams=req.body;
            
             let sProc= " SET @litigation_id=?;SET @liti_councel_id=?;SET @name= ?; SET @phone_no=?;SET @email_id=?;SET @address= ?; SET @interim_name=?;SET @interim_appln_no=?;SET @interim_application_date= ?; SET @interim_details=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?; CALL sp_insert_litigation_detail ( @litigation_id,@liti_councel_id,@name, @phone_no,@email_id,@address, @interim_name,@interim_appln_no,@interim_application_date, @interim_details,@created_on,@updated_on,@created_by,@updated_by); ";
             console.log("query",sProc);
             db.query(sProc,[reqParams.litigation_id,reqParams.liti_councel_id,reqParams.name,reqParams.phone_no,reqParams.email_id,reqParams.address,reqParams.interim_name,reqParams.interim_appln_no,reqParams.interim_application_date,reqParams.interim_details,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by], function(err,response){  
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
    
           
       return router;}