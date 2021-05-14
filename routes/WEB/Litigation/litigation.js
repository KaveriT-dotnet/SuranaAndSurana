module.exports = function(router, db,errorData,async){ 
//******************* get_adjourn_taken_by - START **********************************************

router.get("/get_adjourn_taken_by",async function(req, res) {
  try { 
      let sproc = 
        " CALL `sp_get_adjourn_taken_by` ";
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
      



    //*************************  insert_litigation START *********************************************//
    router.post('/insert_litigation',async (req,res)=>{
       try
       {
        
         var reqParams=req.body;
        
         let sProc= " SET @project_id=?;SET @client_id=?;SET @internal_case_no= ?; SET @case_type_id=?;SET @status_id=?;SET @court_id= ?; SET @court_case_no=?;SET @responsible_attorney=?;SET @next_hearing_date= ?; SET @due_date=?;SET @sub_case=?;SET @suit_value=?;SET @created_on= ?; SET @updated_on=?;SET @created_by=?;SET @updated_by=?; CALL sp_insert_litigation ( @project_id,@client_id,@internal_case_no, @case_type_id,@status_id,@court_id, @court_case_no,@responsible_attorney,@next_hearing_date, @due_date,@sub_case,@suit_value,@created_on, @updated_on,@created_by,@updated_by); ";
         console.log("query",sProc);
         db.query(sProc,[reqParams.project_id,reqParams.client_id,reqParams.internal_case_no,reqParams.case_type_id,reqParams.status_id,reqParams.court_id,reqParams.court_case_no,reqParams.responsible_attorney,reqParams.next_hearing_date,reqParams.due_date,reqParams.sub_case,reqParams.suit_value,reqParams.created_on,reqParams.updated_on,reqParams.created_by,reqParams.updated_by],async function(err,response){  
         if(err){     
         console.log(err);  
          res.send({ status: 0, msg: 'Failed', data: err }); 
         }else{   
       
          res.send({ status: 1, msg: 'Success', data: [] }); 
          }  
          });  
        
    }
        
         catch(ex)
         {
           res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
         }
        });

//****************************************  get_litigation START *********************************************//

       router.post('/get_litigation',async (req,res)=>{
         
          var reqParams=req.body;
         // ********************** get_litigation ****************************
          let sProc= " SET @project_id=?; CALL sp_get_litigation (@project_id); ";
          console.log("query",sProc);

          db.query(sProc,[reqParams.project_id],async function(err,response){  
          if(err){     
          console.log(err);  
           res.send({ status: 0, msg: 'Failed', data: err }); 
          }else{    
            // console.log("response_liti",response[1]);
            // console.log("response_liti",response[1].ligitation_id);
               var output=[];
                var result=response[1];
                if((response[1].length == 0) || (response[1] == "")){

                  let result2=await get_litigation_counsel(reqParams);
                  await asyncForEach(result2,(item,i)=>{
                    result2[i].liti_details=[];
                  })
                  output.push({case:[],case_details:result2});

                  res.send({ status: 1, msg: 'Success', data: output});
                }else{
                console.log("response[1]",response[1][0].project_id);
                var project_id=response[1][0].project_id;
                var ligitation_id=response[1][0].ligitation_id;
            // ********************** get_litigation_details ****************************
                let result1=await get_litigation_details(reqParams);
                
           // ********************** get_litigation_counsel **************************** 
                let result2=await get_litigation_counsel(reqParams);
                 console.log("result2")
                 await asyncForEach(result2,(item,i)=>{
                var liti_details =  result1.filter((val) => val.liti_councel_id == result2[i].liti_councel_id && val.litigation_id==ligitation_id );
                  //********* liti_details Object Created result2[i].liti_details ************/
                result2[i].liti_details= liti_details;
                
                 })
                 if(result2.length>0)
                 {
                   // ********************** hearing details **************************
                   let result4=await get_hearning_deatils(project_id);
                   console.log("result4",result4);
                   result2.push({liti_councel_id:0, liti_councel:"Adjournment", liti_details: result4});
                    
                 }
                 output.push({case:result,case_details:result2});
                 res.send({ status: 1, msg: 'Success', data: output});  
                }
              }
           })
          })
      
 function get_litigation_details(reqParams){
 return new Promise((resolve)=>{
  let sproc = 
  "SET @litigation_id=?; CALL `sp_get_litigation_details` (@litigation_id)";
db.query(sproc,[reqParams.litigation_id],async function(err, response) {  
  if (err) { 
    console.log(err);   	
  } else {   
    console.log("response",response[1]);
    var result2= response[1];
    
       resolve(result2)
    //console.log("response",response[5]);
   // res.send({ status: 1, msg: "Success", data: response[5] });
  
 
}
})
 })  

 }

 function get_litigation_counsel(){
   return new Promise((resolve)=>{
    let sproc = 
    " CALL `sp_get_litigation_councel` ";
  db.query(sproc,async function(err, response) {  
    if (err) { 
      console.log(err);   	
    } else {   
      console.log("response3",response[0]);
      var result3= response[0];
      
         resolve(result3);
     
  }
  })
   })
 }

 function get_hearning_deatils(project_id){
   return new Promise((resolve)=>{
     let sPorc="SET @project_id=?; CALL sp_get_hearning_deatils (@project_id)";
     db.query(sPorc,[project_id],function(err,response){
    if(err){
      console.log(err);
    }else{
      console.log("response_hearing",response[1]);
      var result=response[1][0];
      resolve(result);
    }
     })
   })

 }

   //******************* get_sub_case - START **********************************************

router.post("/get_sub_case",async function(req, res) {
  try { 
      let sproc = 
        "SET @client_id=?; CALL sp_get_sub_case (@client_id)";
      db.query(sproc,[req.body.client_id], function(err, response) { 
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