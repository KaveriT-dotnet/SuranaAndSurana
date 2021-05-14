module.exports = function(router, db,errorData,async){
  var async= require ('async');
  //*************************** insert_client - START ***************************************/
  router.post('/insert_client_old',async function (req,res){
  let  reqParam=req.body;  
  let sProc= "SET @client=?;SET @industry=?;SET @client_type=?;SET @contact_person_1=?;SET @gender=?;SET @dob=?;SET @contact_no=?;SET @email_id=?;SET @state=?;SET @city=?;SET @address=?;SET @contact_person_2=?;SET @ct_gender=?;SET @ct_dob=?;SET @ct_contact_no=?;SET @ct_email_id=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @document_type_id=?;SET @reference_id=?;SET @document_name=?;  CALL sp_insert_client (@client,@industry,@client_type,@contact_person_1,@gender,@dob,@contact_no,@email_id,@state,@city,@address,@contact_person_2,@ct_gender,@ct_dob,@ct_contact_no,@ct_email_id,@created_on,@updated_on,@created_by,@updated_by,@document_type_id,@reference_id,@document_name) ";
   console.log("query",sProc);     
   db.query(sProc,[reqParam.client,reqParam.industry,reqParam.client_type,reqParam.contact_person_1,reqParam.gender,reqParam.dob,reqParam.contact_no,reqParam.email_id,reqParam.state,reqParam.city,reqParam.address,reqParam.contact_person_2,reqParam.ct_gender,reqParam.ct_dob,reqParam.ct_contact_no,reqParam.ct_email_id,reqParam.created_on,reqParam.updated_on,reqParam.created_by,reqParam.updated_by,reqParam.document_type_id,reqParam.reference_id,reqParam.document_name],async (err,response,fields) =>{
   if(err)  
   { 
      console.log({error:err})
   }
  else    
   {
      console.log("response",response[24]);
     
     console.log("response",response[24][0].document_id);  
     var document_id=response[24][0].document_id;
    // var reqParams = req.body;  
     var filename = req.files == null ? [] : Array.isArray(req.files.file_name_upload) == true ? req.files.file_name_upload : [req.files.file_name_upload];     
       console.log("filenae",filename);
     var fileuploads=await imageUpload(filename,document_id);    
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

function imageUpload(data, document_id) {
return new Promise(resolve => {

   async.forEachOf(data, function (obj, index, callk) {

       var imageName = "Image_" + document_id + "_" + obj.name
       console.log(imageName);
      // obj.mv('H:/uploads/' + imageName, function (err) {
       obj.mv('../../../var/www/html/suranauploads/' + imageName, function (err) {
           if (err) {
               console.log('err', err);
           } else {
               console.log(obj)
               // console.log("req.file",req.fileS.file_name_upload);
               var query = "SET @file_name_upload=?;SET @document_id=?; CALL sp_insert_client_file_name(@file_name_upload,@document_id)";
           
               console.log(query);
               db.query(query,[imageName,document_id], function (err, response) {
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
  //*************************** insert_client - START ***************************************/
  router.post('/insert_client', function (req,res){
  let  reqParam=req.body;  
  let sProc= "SET @client=?;SET @industry=?;SET @client_type=?;SET @contact_person_1=?;SET @gender=?;SET @dob=?;SET @contact_no=?;SET @email_id=?;SET @state=?;SET @city=?;SET @address=?;SET @contact_person_2=?;SET @ct_gender=?;SET @ct_dob=?;SET @ct_contact_no=?;SET @ct_email_id=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;  CALL sp_insert_client (@client,@industry,@client_type,@contact_person_1,@gender,@dob,@contact_no,@email_id,@state,@city,@address,@contact_person_2,@ct_gender,@ct_dob,@ct_contact_no,@ct_email_id,@created_on,@updated_on,@created_by,@updated_by) ";
   console.log("query",sProc);     
   db.query(sProc,[reqParam.client,reqParam.industry,reqParam.client_type,reqParam.contact_person_1,reqParam.gender,reqParam.dob,reqParam.contact_no,reqParam.email_id,reqParam.state,reqParam.city,reqParam.address,reqParam.contact_person_2,reqParam.ct_gender,reqParam.ct_dob,reqParam.ct_contact_no,reqParam.ct_email_id,reqParam.created_on,reqParam.updated_on,reqParam.created_by,reqParam.updated_by], (err,response,fields) =>{
   if(err)  
   { 
      console.log({error:err})
   }
  else    
   {
      console.log("response",response[20][0]);
      res.send({status:1,msg:'Success',data: response[20][0]});
   }
  })
});

//*************************** insert_client_document - START ***************************************/

router.post('/insert_client_document',async function (req,res){
  
    var reqParam=req.body;
    let sproc = "SET @client_id=?;SET @POA=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?; CALL `sp_insert_client_document` (@client_id,@POA,@created_on,@updated_on,@created_by,@updated_by) ;";
    db.query(sproc,[reqParam.client_id,reqParam.POA,reqParam.created_on,reqParam.updated_on,reqParam.created_by,reqParam.updated_by],async function(err, response) { 
      if (err) { 
        console.log(err);   	
      } else {   
        //res.send({ status: 1, msg: "Success", data: response[1] });
        console.log("response",response);  
             var document_id=response[6][0].document_id;
            // var reqParams = req.body;  
             var filename = req.files == null ? [] : Array.isArray(req.files.file_name_upload) == true ? req.files.file_name_upload : [req.files.file_name_upload];     
               console.log("filenae",filename);
             var fileuploads=await imageUpload(filename,document_id);    
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

        
        function imageUpload(data, document_id) {
        return new Promise(resolve => {
        
           async.forEachOf(data, function (obj, index, callk) {
        
               var imageName = "Image_" + document_id + "_" + obj.name
               console.log(imageName);
              // obj.mv('H:/uploads/' + imageName, function (err) {
               obj.mv('../../../var/www/html/suranauploads/' + imageName, function (err) {
                   if (err) {
                       console.log('err', err);
                   } else {
                       console.log(obj)
                       // console.log("req.file",req.fileS.file_name_upload);
                       var query = "SET @file_name_upload=?;SET @document_id=?; CALL sp_insert_client_file_name(@file_name_upload,@document_id)";
                   
                       console.log(query);
                       db.query(query,[imageName,document_id], function (err, response) {
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


  //*************************** get_client - START ***************************************/

  router.post('/get_client',async function (req,res){
    try { 
      var reqParam=req.body;
      let sproc = "SET @client_id=?; CALL `sp_get_client` (@client_id) ;";
      db.query(sproc,[reqParam.client_id], function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
          res.send({ status: 1, msg: "Success", data: response[1] });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  });

  //******************* get_client_type - START **********************************************
router.get("/get_client_type",async function(req, res) {
  try { 
    let sproc = 
      " CALL sp_get_client_type ;";
    db.query(sproc, function(err, response) { 
      if (err) { 
        console.log(err);   	
      } else {   
        console.log("response",response);
        res.send({ status: 1, msg: "Success", data: response[0] });
      }   
    });   
   
  } catch (err) {     
    res.send({ status: 0, msg: "Error", data: [] });
  } 
})

 //******************* get_client_list - START **********************************************
  router.get("/get_client_list",async function(req, res) {
    try { 
      let sproc = 
        " CALL sp_get_client_list ;";
      db.query(sproc, function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
          console.log("response",response);
          res.send({ status: 1, msg: "Success", data: response[0] });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  })
//******************* get_poa - START **********************************************
 router.post("/get_poa",async function(req, res) {
  try { 
    let sproc = 
      "SET @client_id=?; CALL sp_get_poa (@client_id);";
    db.query(sproc,[req.body.client_id], function(err, response) { 
      if (err) { 
        console.log(err);   	
      } else {   
        console.log("response",response);
        res.send({ status: 1, msg: "Success", data: response[1] });
      }   
    });   
   
  } catch (err) {     
    res.send({ status: 0, msg: "Error", data: [] });
  } 
})



  return router;}