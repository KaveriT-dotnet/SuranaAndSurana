module.exports = function(router, db){ 

    router.post('/get_todo_list',async (req,res)=>{
        // console.log("query",sProc);
           let  reqParams=req.body;  
           let sProc= "SET @assignee_id=?; CALL `sp_get_to_do_list`(@assignee_id);"; 
            console.log("query",sProc);     
            db.query(sProc,[reqParams.assignee_id],(err,response,fields) =>{
            //console.log("selected_cand_id",selected_cand_id)
             if(err)  
            { 
               console.log({error:err})
            }
           else    
            {
               res.send({status:1,msg:"Success",data: response[1] })  
            }
            })  
         
          });

 //******************* get_interview_approver - START **********************************************

 router.get("/get_interview_approver",async function(req, res) {
  try { 
      let sproc = 
        " CALL `sp_get_interview_approver` ";
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