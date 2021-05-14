module.exports = function(router, db,errorData){ 

//************************************ insert_patent - START ********************************************** */
    router.post('/insert_patent',async (req,res)=>{ 
        try { 
            var reqParam=req.body;
            let sproc = "SET @project_id=?;SET @filing_type_id=?;SET @opposition_filled_date=?; SET @types_of_grant=?;SET @application_no=?;SET @patent_title=?;SET @publication_date=?;SET @patent_applicant=?;SET @application_agent=?;SET @opponent=?;SET @opponent_agent=?;SET @comments=?;SET @file_cover=?;SET @associate=?;SET @our_reference=?;SET @client_reference=?;SET @application_date=?;SET @priority_country=?;SET @priority_application_no=?;SET @priority_date=?;SET @status_id=?;SET @dead_line=?;SET @created_on=?;SET @updated_on=?;SET @created_by=?;SET @updated_by=?;SET @patent_id=?; CALL `sp_insert_patent` (@project_id,@filing_type_id,@opposition_filled_date,@types_of_grant,@application_no,@patent_title,@publication_date,@patent_applicant,@application_agent,@opponent,@opponent_agent,@comments,@file_cover,@associate,@our_reference,@client_reference,@application_date,@priority_country,@priority_application_no,@priority_date,@status_id,@dead_line,@created_on,@updated_on,@created_by,@updated_by,@patent_id) ;";
            console.log("sproc",sproc);
            db.query(sproc,[reqParam.project_id,reqParam.filing_type_id,reqParam.opposition_filled_date,reqParam.types_of_grant,reqParam.application_no,reqParam.patent_title,reqParam.publication_date,reqParam.patent_applicant,reqParam.application_agent,reqParam.opponent,reqParam.opponent_agent,reqParam.comments,reqParam.file_cover,reqParam.associate,reqParam.our_reference,reqParam.client_reference,reqParam.application_date,reqParam.priority_country,reqParam.priority_application_no,reqParam.priority_date,reqParam.status_id,reqParam.dead_line,reqParam.created_on,reqParam.updated_on,reqParam.created_by,reqParam.updated_by,reqParam.patent_id], function(err, response) {
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

//************************************ get_patent - START ********************************************** */

router.post('/get_patent',async (req,res)=>{ 
    try { 
        var reqParam=req.body;
        let sproc = "SET @project_id=?; CALL `sp_get_patent` (@project_id) ;";
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