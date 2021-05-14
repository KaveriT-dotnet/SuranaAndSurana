module.exports = function(router, db,errorData){ 

router.get('/get_court',async (req,res)=>{ 
    try { 
        let sproc = " CALL `sp_get_location`  ;";
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

    return router;}