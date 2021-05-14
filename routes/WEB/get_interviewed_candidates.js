module.exports = function(router, db,errorData,bcrypt){ 
router.post("/get_interviewed_candidates",async function(req, res) {
    try { 
        let sproc = 
          "SET @int_details_id=?; CALL sp_get_interviewed_candidates (@int_details_id) ;";
        db.query(sproc,[req.body.int_details_id], function(err, response) { 
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