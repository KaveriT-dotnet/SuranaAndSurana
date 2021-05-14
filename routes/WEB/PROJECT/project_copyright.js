module.exports = function(router, db,errorData,async){

  router.post('/insert_copyright',async function (req,res){
    // console.log("query",sProc);
    
       let  reqParam=req.body;  
       let sProc= "SET @project_id=?;SET @title=?;SET @type_of_work=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?; CALL `sp_insert_copyright` (@project_id,@title,@type_of_work,@created_on,@updated_on,@created_by,@updated_by) ";
        console.log("query",sProc);     
        db.query(sProc,[reqParam.project_id,reqParam.title,reqParam.type_of_work,reqParam.created_on,reqParam.updated_on,reqParam.created_by,reqParam.updated_by],async (err,response) =>{
        if(err)  
        { 
           console.log({error:err})
        }
       else    
        {
           console.log("response",response[7]);
          
          console.log("response",response[7][0].copy_right_id);  
          var copy_right_id=response[7][0].copy_right_id;
         // var reqParams = req.body;  
          var filename = req.files == null ? [] : Array.isArray(req.files.upload_images) == true ? req.files.upload_images : [req.files.upload_images];     
            console.log("filenae",filename);
          var fileuploads=await imageUpload(filename,copy_right_id);    
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
 
  function imageUpload(data, copy_right_id) {
    return new Promise(resolve => {

        async.forEachOf(data, function (obj, index, callk) {

            var imageName = "Image_" + copy_right_id + "_" + obj.name
            console.log(imageName);
           // obj.mv('H:/uploads/' + imageName, function (err) {
      
            obj.mv('../../../var/www/html/suranauploads/' + imageName, function (err) {
            console.log("imageName",imageName);
                if (err) {
                    console.log('err', err);
                } else {
                    console.log(obj)
                    // console.log("req.file",req.fileS.upload_images);
                    var query = "SET @upload_images=?;SET @copy_right_id=?; CALL sp_insert_copyright_upload_image(@upload_images,@copy_right_id)";
                
                    console.log(query);
                    db.query(query,[imageName,copy_right_id], function (err, response) {
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

    
//*********************************** get_copyright - START ************************

        router.post('/get_copyright',async (req,res)=>{ 
            try { 
                var reqParam=req.body;
                let sproc = "SET @project_id=?; CALL `sp_get_copyright` (@project_id) ;";
                db.query(sproc,[reqParam.project_id], function(err, response) { 
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

//*********************************** update_copyright - START ************************

router.put('/update_copyright',async (req,res)=>{ 
  try { 
      var reqParam=req.body;
      let sProc = "SET @copy_right_id=?;SET @project_id=?;SET @title=?;SET @type_of_work=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?; CALL `sp_update_copyright` (@copy_right_id,@project_id,@title,@type_of_work,@created_on,@updated_on,@created_by,@updated_by) ";
      console.log("query",sProc);     
      db.query(sProc,[reqParam.copy_right_id,reqParam.project_id,reqParam.title,reqParam.type_of_work,reqParam.created_on,reqParam.updated_on,reqParam.created_by,reqParam.updated_by],async (err,response) =>{
        if (err) { 
          console.log(err);   	
        } else {   
          res.send({ status: 1, msg: "Success", data: [] });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  });


    return router;}