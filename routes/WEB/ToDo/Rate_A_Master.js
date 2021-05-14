module.exports = function(router, db,errorData,async){ 

    
    router.get('/get_activity',async (req,res)=>{ 
        try { 
            //var reqParam=req.body;
            let sproc = " CALL `sp_get_activity` ;";
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

//******************************** get_sub_activity START **************************************** */
        router.post('/get_sub_activity',async (req,res)=>{ 
            try { 
                //var reqParam=req.body;
                let sproc = "SET @activity_id=?; CALL `sp_get_sub_activity` (@activity_id) ;";
                db.query(sproc,[req.body.activity_id], function(err, response) { 
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