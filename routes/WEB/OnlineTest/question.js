//module.exports = function(router, db,errorData,async,bcrypt,crypto){ 
  module.exports = function(router, db,errorData,async){ 
  // var algorithm = 'aes-256-ctr';
  // var password = '2d2kawoxw';
  
  // function encrypt(text){
  //   var cipher = crypto.createCipher(algorithm,password)
  //   var crypted = cipher.update(text,'utf8','hex')
  //   crypted += cipher.final('hex');
  //   return crypted;
  // }
 
  
  //   function decrypt(text){
  //     var decipher = crypto.createDecipher('aes-256-ctr','2d2kawoxw')
  //   var dec = decipher.update(text,'hex','utf8')
  //   dec += decipher.final('utf8');
  //   return dec;
  // }

  


//*********************** category *************************************************************/
  router.get("/category", function (req, res) {
  //   var hw = encrypt("success") 
  // // outputs hello world
  // console.log("encrypted_pass",(hw));
  // console.log("decrypt",decrypt(hw));
    var query = "SELECT *   FROM `mas_quescat`";
  
    db.query(query, async function (err, response) {
      if (err) {
        console.log(err.message);
        res.send({ status: 1, msg: "Failed", data: [] });
      } else {
        res.send({ status: 0, msg: "Success", data: response });
      }
    });
  });
  

  //*********************** subcategory *************************************************************/
  router.post("/subcategory", function (req, res) {
    var query =
      "SELECT QuesubcatId,QuesubcatName FROM `mas_quesubcat` WHERE mas_quesubcat.QuescatId = '" +
      req.body.categoryId +
      "'";
  
    db.query(query, async function (err, response) {
      if (err) {
        console.log(err.message);
        res.send({ status: 1, msg: "Failed", data: [] });
      } else {
        res.send({ status: 0, msg: "Success", data: response });
      }
    });
  });

  //*********************** questiontype *************************************************************/
  router.get("/questiontype", function (err, res) {
    var query = "SELECT * FROM `mas_questype`";
  
    db.query(query, async function (err, response) {
      if (err) {
        console.log(err.message);
        res.send({ status: 1, msg: "Failed", data: [] });
      } else {
        res.send({ status: 0, msg: "Success", data: response });
      }
    });
  });

  //*********************** addquestion *************************************************************/
  
  router.post("/addquestion", async function (req, res) {
    console.log(req.body);
    // leaveId 1 --> leave
    // leaveId 2 --> permission
    var question = req.body.question;
    var query = "";
    console.log("question", question);
    question.forEach(async (questions, i) => {
      query +=
        "INSERT INTO `mas_quesbank`(`QuesCatId`,`QuesubcatId`,`QuesType`,`Question`,`Choice`,`Answer`) VALUES ('" +
        question[i].quescatId +
        "','" +
        question[i].quesubcatId +
        "','" +
        question[i].questiontype +
        "','" +
        question[i].question +
        "','" +
        question[i].choice +
        "','" +
        question[i].answer +
        "');";
    });
    console.log(query);
    /*for (i in question) {
      query +="INSERT INTO `mas_quesbank`(`QuesCatId`,`QuesubcatId`,`QuesType`,`Question`,`Choice`,`Answer`) VALUES ('"+question[i].quescatId+"','"+question[i].quesubcatId+"','"+question[i].questiontype+"','"+question[i].question+"','"+question[i].choice+"','"+question[i].answer+"');";
  
    }*/
    db.query(query, function (err, response) {
      if (err) {
        console.log(err.message);
        res.send({ status: 0, msg: "Failed", data: [] });
      } else {
        res.send({ status: 0, msg: "Question  added successfully", data: [] });
      }
    });
  });
  

  //*********************** editquestion *************************************************************/
  router.post("/editquestion", async function (req, res) {
    console.log(req.body);
    // leaveId 1 --> leave
    // leaveId 2 --> permission
    var question = req.body.question;
    var query = "";
    console.log("question", question);
    question.forEach(async (questions, i) => {
      query +=
        "Update `mas_quesbank`set `QuesCatId`='"+question[i].quescatId+"',`QuesubcatId`='"+question[i].quesubcatId+"', `QuesType`='"+question[i].questiontype+"',`Question`='"+question[i].question+"',`Choice`='"+question[i].choice+"',`Answer`='"+question[i].answer+"' where QuesId='"+question[i].QuesId+"';";
    });
    console.log(query);
    
    db.query(query, function (err, response) {
      if (err) {
        console.log(err.message);
        res.send({ status: 0, msg: "Failed", data: [] });
      } else {
        res.send({ status: 1, msg: "Question  Updated successfully", data: [] });
      }
    });
  });
  
  
  //*********************** removeInterviewquestion *************************************************************/
  
  router.delete("/removeInterviewquestion", function(req,res){ 
   var query="Delete from mas_quesbank where QuesId='"+req.body.QuesId+"'";
  
    db.query(query,function(err,response){
      if(err){
        console.log(err.message);
      }else{
      //   res.send(response);
      res.send({ status: 0, msg: "deleted", data: response });
      }  
    });
  })
  
  //*********************** postquestion *************************************************************/
  
  router.post("/postquestion", async function (req, res) {
    console.log(req.body);
    var postquestion = req.body.postquestion;
  
    if (postquestion.length <= 0) {
      res.send({ status: 1, msg: "Questions List is Empty", data: [] });
      return;
    }
  
    var query =
      "INSERT INTO `mas_testtemplate`(`TestTempName`, `MaximumQuestions`, `Duration`) VALUES ('" +
      req.body.templateName +
      "','" +
      req.body.maximumquestions +
      "','" +
      req.body.duration +
      "')";
  
    db.query(query, async function (err, response) {
      if (err) {
        console.log(err.message);
        res.send({ status: 0, msg: "Failed", data: [] });
      } else {
        console.log(response);
        if (response.affectedRows == 1) {
          let templateId = response.insertId;
  
          let templateDetailsAdd = await templateDetailsAddHandler(
            postquestion,
            templateId
          );
  
          if (templateDetailsAdd) {
            res.send({
              status: 0,
              msg: "Questions posted successfully",
              data: [],
            });
          } else {
            res.send({ status: 1, msg: "Question Details not added", data: [] });
          }
        } else {
          res.send({ status: 1, msg: "Template Not Added", data: [] });
        }
      }
    });
  });
  
  function templateDetailsAddHandler(postquestion, templateId) {
    return new Promise((resolve, reject) => {
      console.log(postquestion);
      var query = "";
      for (i in postquestion) {
        query +=
          "INSERT INTO `mas_testtemplate_details`(`TestTempId`, `QuesCatId`, `QuesubcatId`, `NoOfQuestions`) VALUES ('" +
          templateId +
          "','" +
          postquestion[i].quescatId +
          "','" +
          postquestion[i].quesubcatId +
          "','" +
          postquestion[i].NoOfquestions +
          "');";
      }
  
      console.log(query);
      db.query(query, function (err, response) {
        if (err) {
          console.log(err);
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }
  

  // router.get("/getpostquestions", function (err, res) {
  //   var query =
  //     "SELECT DISTINCT mas_testtemplate.TestTempId ,mas_testtemplate.QuesCatId,mas_testtemplate.QuesubcatId, mas_testtemplate.NoOfQuestions,mas_testtemplate.MaximumQuestions FROM mas_testtemplate ";
  
  //   db.query(query, async function (err, response) {
  //     if (err) {
  //       console.log(err.message);
  //       res.send({ status: 1, msg: "Failed", data: [] });
  //     } else { 
  //       response.forEach(async (item, i) => {
  //         var quescatId = response[i].QuesCatId;
  //         response[i].Question = await questionDetails(quesId);
  //         if (i == response.length - 1) {
  //           res.send({ status: 0, msg: "Success", data: response });
  //         }
  //       });
  //     }
  //   });
  // });
  
  // function questionDetails(quescatId) {
  //   return new Promise((resolve) => {
  //     var query =
  //       "SELECT DISTINCT mas_quesbank.QuesId  FROM mas_quesbank  WHERE QuesId  = '" +
  //       quescatId +
  //       "'";
  //     console.log("query", query);
  //     db.query(query, function (err, response) {
  //       if (err) {
  //         console.log(err.message);
  //       } else {
  //         resolve(response);
  //       }
  //     });
  //   });
  // }
  
  router.get("/getaddquestions", function (err, res) {
    var query =
      "SELECT DISTINCT mas_quesbank.QuesCatId,mas_quescat.QuescatName,mas_quesubcat.QuesubcatName,mas_quesbank.QuesType,mas_quesbank.QuesubcatId,mas_quesbank.Question,mas_quesbank.Choice,mas_quesbank.Answer FROM `mas_quesbank` join mas_quescat on mas_quescat.QuescatId= mas_quesbank.QuesCatId join mas_quesubcat on mas_quesubcat.QuesubcatId= mas_quesbank.QuesubcatId";
  
    db.query(query, async function (err, response) {
      if (err) {
        console.log(err.message);
        res.send({ status: 1, msg: "Failed", data: [] });
      } else {
        res.send({ status: 0, msg: "Success", data: response });
      }
    });
  });
  
  router.post("/viewaddedquestions", function (req, res)  {
    var query =
      "SELECT DISTINCT `mas_quesbank`.`QuesId`, mas_quesbank.QuesCatId,mas_quesbank.QuesubcatId,mas_quesbank.QuesType,mas_quescat.QuescatName,mas_quesubcat.QuesubcatName,mas_quesbank.Question,mas_quesbank.Choice,mas_quesbank.Answer FROM `mas_quesbank` inner join mas_quescat on mas_quescat.QuescatId= mas_quesbank.QuesCatId inner join mas_quesubcat on mas_quesubcat.QuesubcatId= mas_quesbank.QuesubcatId where mas_quesbank.`QuesCatId`='"+req.body.quescatId+"' and  mas_quesbank.`QuesubcatId`='"+req.body.quesubcatId+"' and mas_quesbank.`QuesType`='"+req.body.questiontype+"' ";
    db.query(query, async function (err, response) {
      if (err) {
        console.log(err.message);
        res.send({ status: 1, msg: "Failed", data: [] });
      } else {
        res.send({ status: 0, msg: "Success", data: response });
      }
    });
  });

  
  router.post("/onlinetest", async function (req, res) {
    
    var test = req.body.test;
    var query = "";
    var score=0;
    for (let i in test) {
   
  let crtrans= await getcorrectAns(test[i].quesId,res);  
   console.log("score",score);
          console.log("input",req.body.test[i].answer);
          console.log("crtans",crtrans); 
      if(crtrans == req.body.test[i].answer)
          {
            score=1;
            
          }
          else
          {
            score=0;
          }
          
          
          
      // console.log("DesigId",DesigId);
       console.log("desigId",req.body.desigId);
        
      query +=
        "INSERT INTO `trn_onlinetest` (`ResId`,`TestDate`,`DesigId`,`TestTempId` ,`QuesId`,`Answer`,`Score`) VALUES ('" +
        req.body.resId +
        "',NOW(),'"+
        req.body.desigId+
        "','" + 
        test[i].testTempId +
        "','" +
        test[i].quesId +
        "','" +
        test[i].answer +
        "','" +
        score +
        "');";
    }
   // console.log("ResId_1",ResId);
    console.log("desigId_1",req.body.desigId);
    
  
    console.log(query);
  
    db.query(query, function (err, response) {
      if (err) {
        console.log(err.message);
        res.send({ status: 0, msg: "Failed", data: [] });
      } else {
  
        res.send({ status: 0, msg: "Online applied", data: [response] });
        
      }
    });
  });
   
  
  
  function getcorrectAns(quesId,res)
  {
    return new Promise((resolve)=> {
      query1="SELECT answer FROM `mas_quesbank` WHERE QuesId='"+quesId+"' ";
      db.query(query1, function (err, response) {
        if (err) {
          console.log(err.message);
          res.send({ status: 0, msg: "Failed", data: [] });
        } else {
         let crtans=response[0].answer;
         console.log("quesId",quesId);
         console.log("crtansresolve",crtans);
         console.log("response",response[0].answer);
          
  
         // console.log("input",req.body.test[i].answer);
         // console.log("i",i);
          // res.send({ status: 0, msg: "Online applied", data: [] });
          
          resolve(crtans);
      
        }
      });
      })
    }
  
  
  
  
  router.post("/getonlinetestdetails", (req, res) => {
    
            var query="";         
            query +="SELECT DISTINCT(`OnTestId`), trn_onlinetest.`ResId`, CONCAT(s_tbl_pm_resume.name As Candidatename, `TestDate`, `TestTempId`, `QuesId`, `Answer` FROM `trn_onlinetest` Inner join s_tbl_pm_resume on s_tbl_pm_resume.resume_id=trn_onlinetest.ResId  where ((DATE(TestDate) between '"+req.body.fromDate+"' and '"+req.body.toDate+"' ) OR DATE(TestDate)='"+req.body.fromDate+"' OR DATE(TestDate)='"+req.body.toDate+"') group by s_tbl_pm_resume.resume_id ORDER BY s_tbl_pm_resume.resume_id DESC"; 
          // query +="SELECT DISTINCT(`OnTestId`), trn_onlinetest.`ResId`, CONCAT(trn_resume.FirstName, ' ', trn_resume.LastName) As Candidatename, `TestDate`, `TestTempId`, `QuesId`, `Answer` FROM `trn_onlinetest` Inner join trn_resume on trn_resume.ResId=trn_onlinetest.ResId  where ((DATE(TestDate) between '"+req.body.fromDate+"' and '"+req.body.toDate+"' ) OR DATE(TestDate)='"+req.body.fromDate+"' OR DATE(TestDate)='"+req.body.toDate+"') group by ResId ORDER BY trn_resume.ResId DESC";    
           
      db.query(query, async function(err,response){  
         if(err){               
         console.log(err);          
          res.send({ status: 0, msg: 'Failed', data: err }); 
         }else{                
           console.log(response);  
            response.forEach(async (item, i) => {
              
              response[i].Score = await Candidatescore(
                response[i].ResId
              );
             
              if (i == response.length - 1) {
                res.send({
                  status: 1,
                  msg: "Success",
                  data: [{ details: response }],
                  //data: [{ details: response, nextCount: nextCount }],
                });
              }
            });
                                            
           //res.send({ status: 1, msg: 'Success', data: response });              
          }                     
          });    
  
  }); 
    
   Candidatescore = (ResId) => {
      return new Promise((resolve, reject) => {
        var query =
          "Select SUM(Score) As Score from trn_onlinetest where ResId='"+ResId+"';";
  
        db.query(query, (err, response) => {
          if (err) {
            console.log(err);
            reject(false);
          } else {
            resolve(response);
          }
        });
      });
    };


    router.post("/onlineTestTemplateList", function (req, res) {
      var query = "SELECT TestTempId,TestTempName FROM `mas_testtemplate`";
    
      db.query(query, async function (err, response) {
        if (err) {
          console.log(err.message);
          res.send({ status: 1, msg: "Failed", data: [] });
        } else {
          if (response.length > 0) {
            res.send({ status: 0, msg: "Success", data: response });
          } else {
            res.send({ status: 0, msg: "No Data Available", data: [] });
          }
        }
      });
    });
    
    router.post("/getOnlineTestQuestionBasedOnTemplate", function (req, res) {
      var query =
        "SELECT * FROM `mas_testtemplate` WHERE TestTempId = '" +
        req.body.testTemplateId +
        "';";
    
      db.query(query, async function (err, response) {
        if (err) {
          console.log(err.message);
          res.send({ status: 1, msg: "Failed", data: [] });
        } else {
          if (response.length > 0) {
            response[0].testQuestionDetails = await testDetailsHandler(
              req.body.testTemplateId
            );
    
            res.send({ status: 0, msg: "Success", data: response });
          } else {
            res.send({ status: 0, msg: "No Data Available", data: [] });
          }
        }
      });
    });
    
    function testDetailsHandler(testTemplateId) {
      return new Promise((resolve, reject) => {
        var query =
          "SELECT * FROM `mas_testtemplate_details` WHERE TestTempId = '" +
          testTemplateId +
          "';";
        db.query(query, function (err, response) {
          if (err) {
            console.log(err);
            reject([]);
          } else {
            if (response.length > 0) {
              let templateBasedQutionsList = [];
              response.forEach(async (item, i) => {
                let randomQuestionGeneration = await randomQuestionGenerationHandler(
                  response[i]
                );
    
                console.log(randomQuestionGeneration);
                templateBasedQutionsList.push(randomQuestionGeneration);
    
                if (i == response.length - 1) {
                  resolve(templateBasedQutionsList.flat());
                }
              });
            } else {
              resolve([]);
            }
          }
        });
      });
    }
    
    function randomQuestionGenerationHandler(templateDetails) {
      return new Promise((resolve) => {
        var query =
          "SELECT `QuesId`, `QuesCatId`, `QuesubcatId`, `QuesType`, `Question`, `Choice` FROM `mas_quesbank` WHERE QuesCatId = '" +
          templateDetails.QuesCatId +
          "' AND QuesubcatId = '" +
          templateDetails.QuesubcatId +
          "' ORDER BY RAND() LIMIT " +
          templateDetails.NoOfQuestions +
          ";";
    
        db.query(query, function (err, response) {
          if (err) {
            console.log(err);
            resolve([]);
          } else {
            if (response.length > 0) {
              resolve(response);
            } else {
              resolve([]);
            }
          }
        });
      });
    }
    
    router.post("/getscoredetails", function (req, res) {
    
      try{
        //console.log("req",req.body.From_date,"To",req.body.To_date);
      
      
      var query ="SELECT ResId,Date(TestDate)As Test_Date, IFNULL (concat(round( (SUM(trn_onlinetest.Score)/ COUNT(trn_onlinetest.Score)) * 100 ),'%'),'') AS Score_Percentage  FROM `trn_onlinetest` WHERE ResId='"+req.body.ResId+"' ";
         
      db.query(query,function(err,response){    
                    
        if(err){ 
          console.log(err);
        }else
          
          {
          res.send({ status: 0, msg: 'Success', data: response });
          
        } 
        
      })
    }
    
     catch (err) {
        console.log("CatchError", err.message)
        console.log("CatchError", err)
    
        res.send({ status: 1, msg: 'validation Error', data: [] })
      }
     
    });
   

    router.post("/masinterview", async function (req, res) {
    
      var Interview = req.body.Interview;
      var query = ""
     // var query1="SELECT concat(round( (SUM(trn_onlinetest.Score)/ COUNT(trn_onlinetest.Score)) * 100 ),'%') FROM trn_onlinetest WHERE ResId ='"+req.body.ResId+"' "
      for(i in Interview){
      
       query +=  "INSERT INTO `trn_interview`(`Nameofcandidate`,`InterviewType`,`DOB`,`Age`,`Address`,`CandidateId`,`DesigId`,`DateofTest`,`Score`,`InterviewerQuestions`,`InterviewerScore`,`IntBy`,`IntOn`,`IntRemarks`,`ResId`,`status`, `Dateofselection`) VALUES ('"+req.body.nameofcandidate+"','"+req.body.Interviewtype+"','"+req.body.dob+"','"+req.body.age+"','"+req.body.address+"','"+req.body.CandidateId+"','"+req.body.DesigId+"','"+req.body.dateoftest+"',(SELECT concat(round( (SUM(trn_onlinetest.Score)/ COUNT(trn_onlinetest.Score)) * 100 ),'%') FROM trn_onlinetest WHERE ResId ='"+req.body.ResId+"'),'"+Interview[i].interviewquestions+"','"+req.body.Interviewerscore+"','"+req.body.Intby+"','"+req.body.Inton+"','"+req.body.Intremarks+"','"+req.body.ResId+"','"+req.body.status+"',Now());";
      }
      
      console.log(query);
      
        db.query(query, function (err, response) {
          if (err) {
            console.log(err.message); 
            res.send({ status: 0, msg: "Failed", data: [] }); 
          }
              else {
                  res.send({ status: 0, msg: "Success", data: []  });
  
              }
          })
  })
  
  
  

  router.post("/scoreprecentage", function (req, res) {
    try{
      //console.log("req",req.body.From_date,"To",req.body.To_date);
    
     var query ="SELECT trn_onlinetest.ResId,concat(s_tbl_pm_resume.name,' - ',s_tbl_m_designation.designation) As Candidatelist_Designation,concat(round( (SUM(trn_onlinetest.Score)/ COUNT(trn_onlinetest.Score)) * 100 ),'%') AS Scorepercentage FROM trn_onlinetest INNER JOIN s_tbl_pm_resume ON s_tbl_pm_resume.resume_id = trn_onlinetest.ResId INNER JOIN s_tbl_m_designation ON s_tbl_m_designation.designation_id=trn_onlinetest.DesigId where ( date(trn_onlinetest.TestDate) BETWEEN '"+req.body.From_date+"' AND '"+req.body.To_date+"' ) GROUP by s_tbl_pm_resume.resume_id ;";
    //var query ="SELECT trn_onlinetest.ResId,concat(trn_resume.FirstName,' ',trn_resume.LastName,' - ',mas_designation.DesigName) As Candidatelist_Designation,concat(round( (SUM(trn_onlinetest.Score)/ COUNT(trn_onlinetest.Score)) * 100 ),'%') AS Scorepercentage FROM trn_onlinetest INNER JOIN trn_resume ON trn_resume.ResId = trn_onlinetest.ResId INNER JOIN mas_designation ON mas_designation.DesigId=trn_onlinetest.DesigId where ( date(trn_onlinetest.TestDate) BETWEEN '"+req.body.From_date+"' AND '"+req.body.To_date+"' ) GROUP by trn_resume.ResId  ";
       
    db.query(query,function(err,response){    
    
      if(err){ 
        console.log(err);
      }else
        
        {
        res.send({ status: 0, msg: 'Success', data: response });
        
      } 
      
    })
  }
  
   catch (err) {
      console.log("CatchError", err.message)
      console.log("CatchError", err)
  
      res.send({ status: 1, msg: 'validation Error', data: [] })
    }
   
  });





    return router;}