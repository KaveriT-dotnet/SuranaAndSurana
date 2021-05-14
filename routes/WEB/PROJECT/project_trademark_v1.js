module.exports = function(router, db,errorData,async){ 
    
    router.get('/get_mark',async (req,res)=>{ 
        try { 
            let sproc = " CALL `sp_get_mark` ;";
            db.query(sproc, function(err, response) { 
              if (err) { 
                console.log(err);   	
              } else {   
                res.send({ status: 1, msg: "Success", data: response[0] });
              }   
            });   
           
          } catch (err) {     
            res.send({ status: 0, msg: "Error", data: [] });
          } 
        });

//*****************************************get_class - START ************************************* */
router.post('/get_class',async (req,res)=>{ 
    try { 
        let sproc = "SET @class_type=?; CALL `sp_get_trade_mark_class` (@class_type) ;";
        db.query(sproc,[req.body.class_type], function(err, response) { 
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



    
//*****************************************insert_trade_mark - START ************************************* */
router.post('/insert_trade_mark',async (req,res)=>{ 
  var reqParam=req.body;

      let sproc = "SET @project_id=?;SET @status_id=?;SET @class_id=?;SET @usage_details_id=?;SET @mark_id=?;SET @application_no=?;SET @application_date=?;SET @goods_description=?;SET @usage_from_date=?;SET @comments=?;SET @internal_status=?;SET @allotment=?;SET @ip_india_status=?;SET @amendment=?;SET @priority_details=?;SET @tmj_number=?;SET @tmj_date=?;SET @journel_extract=?;SET @poa=?;SET @certificate_date=?;SET @renewal_certificate_date=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @ip_address=?;SET @associate_reference=?;SET @our_reference=?;SET @associate=?;SET @country_id=?;SET @user_claim=?;SET @opposition_no=?;SET @applicant=?;SET @applicant_agent=?;SET @deadline=?; SET @opponent=?; CALL `sp_insert_trade_mark` (@project_id,@status_id,@class_id,@usage_details_id,@mark_id,@application_no,@application_date,@goods_description,@usage_from_date,@comments,@internal_status,@allotment,@ip_india_status,@amendment,@priority_details,@tmj_number,@tmj_date,@journel_extract,@poa,@certificate_date,@renewal_certificate_date,@created_on,@updated_on,@created_by,@updated_by,@ip_address,@associate_reference,@our_reference,@associate,@country_id,@user_claim,@opposition_no,@applicant,@applicant_agent,@deadline,@opponent) ;"; 
      db.query(sproc,[reqParam.project_id,reqParam.status_id,reqParam.class_id,reqParam.usage_details_id,reqParam.mark_id,reqParam.application_no,reqParam.application_date,reqParam.goods_description,reqParam.usage_from_date,reqParam.comments,reqParam.internal_status,reqParam.allotment,reqParam.ip_india_status,reqParam.amendment,reqParam.priority_details,reqParam.tmj_number,reqParam.tmj_date,reqParam.journel_extract,reqParam.poa,reqParam.certificate_date,reqParam.renewal_certificate_date,reqParam.created_on,reqParam.updated_on,reqParam.created_by,reqParam.updated_by,reqParam.ip_address,reqParam.associate_reference,reqParam.our_reference,reqParam.associate,reqParam.country_id,reqParam.user_claim,reqParam.opposition_no,reqParam.applicant,reqParam.applicant_agent,reqParam.deadline,reqParam.opponent],async function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
          console.log("response",req.body.orders);
          console.log("response1",response);
          console.log("response",response[36][0].trademark_id);  
          var trademark_id=response[36][0].trademark_id;     
          var filename = req.files == null ? [] : Array.isArray(req.files.upload_image) == true ? req.files.upload_image : [req.files.upload_image];     
          console.log("filenae",filename);

          //**********************Image Upload **************************/
          if(filename.legth>0)
          {
                      var fileuploads=await imageUpload(filename,trademark_id);    
                      if (fileuploads.status == false) {    

                      error_status = false;    
                      err.push(uploadDataResponse.response);
                      console.log("Failed");
                      res.send({ status: 0, msg: 'Failed', err: err }); 
                            }  
                            else  
                            {  

                              //*******************************upload Order images ***************************/
                              let filename = req.files == null ? [] : Array.isArray(req.files.orders) == true ? req.files.orders : [req.files.orders];     
                              console.log("filename",filename);
                              if(filename.legth>0)
                              {
                               await orderUpload(filename,trademark_id);    
                              }
                                res.send({ status: 1, msg: 'Success', data: [] }); 

                            } 
          }
          else
          {

                //*******************************upload Order images ***************************/
                let filename = req.files == null ? [] : Array.isArray(req.files.orders) == true ? req.files.orders : [req.files.orders];     
                console.log("filename",filename);
                if(filename.legth>0)
                {
                await orderUpload(filename,trademark_id);    
                }
                  res.send({ status: 1, msg: 'Success', data: [] }); 


          }

//    res.send({status:1,msg:"Success",data:[]})  
// }
}
})  


});


//****************************upload trademark project order images ************************************
function orderUpload(data,trademark_id)
{
  return new Promise(resolve => {
  async.forEachOf(data, function (obj, index, callk) {
  
  var imageName = "Image_" + trademark_id + "_" + obj.name
  console.log(imageName);
  //obj.mv('D:/' + imageName, function (err) {
    obj.mv('../../../var/www/html/suranauploads/' + imageName, function (err) {
      if (err) {
          console.log('err', err);
      } else {
          console.log(obj)
          // console.log("req.file",req.fileS.upload_image);
          var query = "SET @upload_image=?;SET @trademark_id=?; CALL sp_insert_trade_mark_upload_order (@upload_image,@trademark_id)";
          console.log(query);
          db.query(query,[imageName,trademark_id], function (err, response) {
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
  







//***************image Upload ************************/
function imageUpload(data, trademark_id) {
return new Promise(resolve => {
async.forEachOf(data, function (obj, index, callk) {

var imageName = "Image_" + trademark_id + "_" + obj.name;
console.log(imageName);
obj.mv('D:/' + imageName, function (err) {
 // obj.mv('../../../var/www/html/suranauploads/' + imageName, function (err) {
    if (err) {
        console.log('err', err);
    } else {
        console.log(obj)
        // console.log("req.file",req.fileS.upload_image);
        var query = "SET @upload_image=?;SET @trademark_id=?; CALL sp_insert_trade_mark_upload_image (@upload_image,@trademark_id)";
    
        console.log(query);
        db.query(query,[imageName,trademark_id], function (err, response) {
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

//*****************************************get_trade_mark - START ************************************* */
router.post('/get_trade_mark',async (req,res)=>{ 
  try { 
      let sproc = "SET @project_id=?; CALL `sp_get_trade_mark` (@project_id) ;";
      db.query(sproc,[req.body.project_id], function(err, response) { 
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

//*****************************************get_country - START ************************************ */

router.get('/get_country',async (req,res)=>{ 
  try { 
      let sproc = " CALL `sp_get_trade_mark_country`  ;";
      db.query(sproc, function(err, response) { 
        if (err) { 
          console.log(err);   	
        } else {   
          res.send({ status: 1, msg: "Success", data: response[0] });
        }   
      });   
     
    } catch (err) {     
      res.send({ status: 0, msg: "Error", data: [] });
    } 
  });
//*****************************************update_trade_mark - START ************************************* */
router.put('/update_trade_mark',async (req,res)=>{ 
  try { 
      let sproc = "SET @trademark_id=?;SET @project_id=?;SET @status_id=?;SET @class_id=?;SET @usage_details_id=?;SET @mark_id=?;SET @application_no=?;SET @application_date=?;SET @goods_description=?;SET @usage_from_date=?;SET @comments=?;SET @internal_status=?;SET @allotment=?;SET @ip_india_status=?;SET @amendment=?;SET @orders=?;SET @priority_details=?;SET @tmj_number=?;SET @tmj_date=?;SET @journel_extract=?;SET @poa=?;SET @certificate_date=?;SET @renewal_certificate_date=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @ip_address=?; CALL `sp_update_trade_mark` (@trademark_id,@project_id,@status_id,@class_id,@usage_details_id,@mark_id,@application_no,@application_date,@goods_description,@usage_from_date,@comments,@internal_status,@allotment,@ip_india_status,@amendment,@orders,@priority_details,@tmj_number,@tmj_date,@journel_extract,@poa,@certificate_date,@renewal_certificate_date,@created_on,@updated_on,@created_by,@updated_by,@ip_address) ;"; 
      db.query(sproc,[req.body.trademark_id,req.body.project_id,req.body.status_id,req.body.class_id,req.body.usage_details_id,req.body.mark_id,req.body.application_no,req.body.application_date,req.body.goods_description,req.body.usage_from_date,req.body.comments,req.body.internal_status,req.body.allotment,req.body.ip_india_status,req.body.amendment,req.body.orders,req.body.priority_details,req.body.tmj_number,req.body.tmj_date,req.body.journel_extract,req.body.poa,req.body.certificate_date,req.body.renewal_certificate_date,req.body.created_on,req.body.updated_on,req.body.created_by,req.body.updated_by,req.body.ip_address], function(err, response) {
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