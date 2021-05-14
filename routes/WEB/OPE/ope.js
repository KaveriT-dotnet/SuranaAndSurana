module.exports = function(router, db,errorData,async){ 
  var async= require ('async');
router.post("/insert_ope",async function(req, res) {
   // try { 
        let sproc = 
          "SET @project_id=?;SET @mode_of_payment=?;SET @amount=?;SET @description=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @expence_type=?; CALL `sp_insert_ope` (@project_id,@mode_of_payment,@amount,@description,@created_on,@updated_on,@created_by,@updated_by,@expence_type)";
        db.query(sproc,[req.body.project_id,req.body.mode_of_payment,req.body.amount,req.body.description,req.body.created_on,req.body.updated_on,req.body.created_by,req.body.updated_by,req.body.expence_type],async function(err, response) { 
          if (err) { 
            console.log(err);   	
          } else {   
            console.log("response",response[9][0].ope_id);
            var ope_id=response[9][0].ope_id;
            var filename = req.files == null ? [] : Array.isArray(req.files.bill) == true ? req.files.bill : [req.files.bill];     
       console.log("filenae",filename);
     var fileuploads=await imageUpload(filename,ope_id);    
     if (fileuploads.status == false) {    
      error_status = false;    
      err.push(uploadDataResponse.response);
      res.send({ status: 0, msg: 'Failed', err: err }); 
    }  
    else 
    {  
           
      res.send({ status: 1, msg: 'Success', data: [] }); 
  
    } 
   //    res.send({status:1,msg:"Success",data:[]})  
   // }
   }
   })  
 

});

function imageUpload(data, ope_id) {
return new Promise(resolve => {

   async.forEachOf(data, function (obj, index, callk) {

       var imageName = "Image_" + ope_id + "_" + obj.name
       console.log(imageName);
      // obj.mv('H:/uploads/' + imageName, function (err) {
       obj.mv('../../../var/www/html/suranauploads/' + imageName, function (err) {
           if (err) {
               console.log('err', err);
           } else {
               console.log(obj)
               // console.log("req.file",req.fileS.bill);
               var query = "SET @bill=?;SET @ope_id=?; CALL sp_insert_ope_bill (@bill,@ope_id)";
           
               console.log(query);
               db.query(query,[imageName,ope_id], function (err, response) {
                   if (err) {
                       console.log(err);
                   }
                   
               });

           }
             callk();
       })
   },
       function (err) {
           if (err) {
               console.log(err.message);
               resolve({ status: false, response: err.message });
           } else {
            // console.log("here");
               resolve({ status: true, response: true });
           }
       });

})
};

    return router;}