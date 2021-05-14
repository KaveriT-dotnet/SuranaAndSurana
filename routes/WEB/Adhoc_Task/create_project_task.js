module.exports = function(router, db,errorData,async){ 

    //*************************  insert_adhoc_task START *********************************************//
    router.post('/insert_adhoc_task',async (req,res)=>{
       try
       {
        console.log("err");  
         var reqParams=req.body;
        var result1=await select_insert_adhoc_task(reqParams);
        
        if (result1 == 0 ){
         let sProc= "SET @start_date= ?; SET @end_date=?;SET @tag=?;SET @assignee_id= ?; SET @assigned_by=?;SET @description=?; CALL sp_insert_adhoc_task (@start_date, @end_date,@tag,@assignee_id, @assigned_by,@description); ";
         console.log("query",sProc);
         db.query(sProc,[reqParams.start_date,reqParams.end_date,reqParams.tag,reqParams.assignee_id,reqParams.assigned_by,reqParams.description],async function(err,response){  
         if(err){     
         console.log(err);  
          res.send({ status: 0, msg: 'Failed', data: err }); 
         }else{   
       
          res.send({ status: 1, msg: 'Success', data: [] }); 
          }  
          });  
        }
        else{
            res.send({ status: 1, msg: 'Already existed this start_date,end_date,tag assigned to this assignee_id  ', data: [] }); 
        }
    }
        
         catch(ex)
         {
           res.send({ status: 0, msg: 'Internal Server Error', data: ex }); 
         }
        });

    function select_insert_adhoc_task(reqParams){
        console.log("err1");  
        return new Promise((resolve)=>{
            let sProc1="SET @start_date= ?; SET @end_date=?;SET @tag=?;SET @assignee_id= ?; CALL sp_select_insert_adhoc_task (@start_date, @end_date,@tag,@assignee_id); ";
            console.log("query",sProc1);
            db.query(sProc1,[reqParams.start_date,reqParams.end_date,reqParams.tag,reqParams.assignee_id],function(err,response){
            if(err){
                console.log(err);
            }else{
                console.log("response",response[4][0].total);
                var result=response[4][0].total;
                resolve(result);
            }
        })
    })
    }
   
   return router;}