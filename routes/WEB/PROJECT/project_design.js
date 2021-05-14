module.exports = function(router, db,errorData){ 

    //************************************ insert_design - START ********************************************** */

    router.post('/insert_design',async (req,res)=>{ 
        try { 
            var reqParam=req.body;
            let sproc = "SET @project_id=?;SET @file_cover=?;SET @associate=?;SET @our_reference=?;SET @client_reference=?;SET @application_no=?;SET @application_date=?;SET @applicant=?;SET @title=?;SET @class_id=?;SET @country_id=?;SET @priority_country_id=?;SET @priority_date=?;SET @status=?;SET @comments=?;SET @renewal_date=?;SET @client_petitioner=?;SET @design_number=?;SET @petitioner=?;SET @responent_rep=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @design_id=?; CALL `sp_insert_design` (@project_id,@file_cover,@associate,@our_reference,@client_reference,@application_no,@application_date,@applicant,@title,@class_id,@country_id,@priority_country_id,@priority_date,@status,@comments,@renewal_date,@client_petitioner,@design_number,@petitioner,@responent_rep,@created_on,@updated_on,@created_by,@updated_by,@design_id) ;";
            db.query(sproc,[reqParam.project_id,reqParam.file_cover,reqParam.associate,reqParam.our_reference,reqParam.client_reference,reqParam.application_no,reqParam.application_date,reqParam.applicant,reqParam.title,reqParam.class_id,reqParam.country_id,reqParam.priority_country_id,reqParam.priority_date,reqParam.status,reqParam.comments,reqParam.renewal_date,reqParam.client_petitioner,reqParam.design_number,reqParam.petitioner,reqParam.responent_rep,reqParam.created_on,reqParam.updated_on,reqParam.created_by,reqParam.updated_by,reqParam.design_id], function(err, response) { 
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

    //************************************ get_design - START ********************************************** */

    router.post('/get_design',async (req,res)=>{ 
        try { 
            var reqParam=req.body;
            let sproc = "SET @project_id=?; CALL `sp_get_design` (@project_id) ;";
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
    
        return router;}