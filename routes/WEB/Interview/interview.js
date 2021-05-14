module.exports = function(router, db){ 
//*******************************API - GET***********************************************************//

//**************Get async ForEach  **************************/
 asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}; 

router.post('/get_selected_candidates',(req,res)=>{
      
        var reqParams=req.body; 
        var interviewDetailId=req.body.int_detail_id;
        console.log("interviewDetailId",interviewDetailId);
        let sProc= "SET @int_details_id=?; CALL sp_schedule_candidate(@int_details_id); ";
        // var query =  " select * from s_tbl_pm_int_schedule   "; 
     db.query(sProc,[interviewDetailId],async function(err,response){  
     if(err){     
     console.log(err);  
      res.send({ status: 0, msg: 'Failed', data: err }); 
     }else{   
       var result= response[1]; 
       let candidate_id=result[0].selected_cand_id.split(',').map(Number);
      console.log("candidate_id",candidate_id);
      var output=[]; 
      //let candidate_int_id= ['1','2'];   
      console.log("interviewDetailId",interviewDetailId);
      let candidate_int_id= await getInterviewedCandidates(interviewDetailId);  
      candidate_int_id= Array.isArray(candidate_int_id)? candidate_int_id: [candidate_int_id];
      candidate_int_id= await candidate_int_id.map(function(obj){return obj.resume_id; }) ;
      
      console.log("candidate_int_test",candidate_int_id); 
       candidate_id= candidate_id.filter((value)=> value );    
      var short_resume_id =candidate_id.filter(x => !candidate_int_id.includes(x)).concat(candidate_int_id.filter(x => !candidate_id.includes(x)));;
      // candidate_id =candidate_id.filter(x => !candidate_int_id.includes(x)).concat(candidate_int_id.filter(x => !candidate_id.includes(x)));;
      console.log("candidate_int_id",candidate_int_id);
      console.log("candidate_id",candidate_id);
      console.log("short_resume_id",short_resume_id);

      // get number of candiates
      var no_of_candidate = short_resume_id.length;

      // console.log("result",result) ;
      await asyncForEach(short_resume_id, async(item,index)=>{

        let sampleOp= await getCandidateNames(item);
       //  console.log("sampleOp",sampleOp);
       output.push(sampleOp);
     
      });
      console.log("output",output);

      result[0].output=output;
      result[0].total_number_candidates=no_of_candidate;

      res.send({ status: 1, msg: 'Success', data: result }); 
      }  
      });  
    });

function getInterviewedCandidates(interviewDetailId)
{

  return new Promise((resolve)=>{
    sProc ="SET @int_details_id=?; CALL sp_get_interviewed_candidates (@int_details_id) ;";
    console.log("sProc",sProc, interviewDetailId);
    db.query(sProc,[interviewDetailId],function(err,response){  
      if(err){     
      console.log(err);   
       resolve([]);
      }else{    

        var result= response[1]; 
        console.log("result[1]",response);
       
        resolve(result);
       }  
       }); 

  })
}

function getCandidateNames(candidate_id)
{
  return new Promise((resolve)=>{
    sProc ="SET @p0=?; CALL `sp_get_candidate_details_by_id`(@p0);";
    db.query(sProc,[candidate_id],function(err,response){  
      if(err){     
      console.log(err);   
       resolve([]);
      }else{   
        var result= response[1]; 
       console.log("result_test",result[0]);
       
        resolve(result[0]);
       }  
       });

  })
}



 return router;   
}
