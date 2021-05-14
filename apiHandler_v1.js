//const sample = require("./routes/WEB/sample");
//const login = require("./routes/WEB/login");
//const moduleMaster = require("./routes/WEB/moduleMaster"); 
//const doctor_speciality =  require("./routes/WEB/SUPERADMIN/SPECIALITY/doctor_speciality");

 
//*************************** Web Admin API LIST - Super Admin ************************** 
const achievement =  require("./routes/WEB/Master/achievement"); 
const capability =  require("./routes/WEB/Master/capability");
const certification =  require("./routes/WEB/Master/certification");
const city =  require("./routes/WEB/Master/city");
const industry =  require("./routes/WEB/Master/industry");
const institute =  require("./routes/WEB/Master/institute");
const language =  require("./routes/WEB/Master/language");
const qual =  require("./routes/WEB/Master/qual");
const resource_type =  require("./routes/WEB/Master/resource_type");
const skills =  require("./routes/WEB/Master/skills");
const special_interest =  require("./routes/WEB/Master/special_interest");
const specialization =  require("./routes/WEB/Master/specialization");
const state =  require("./routes/WEB/Master/state");
const status =  require("./routes/WEB/Master/status");
const talents =  require("./routes/WEB/Master/talents");
const traits =  require("./routes/WEB/Master/traits");
const resume =  require("./routes/WEB/RESUME/resume");
const interview_details =  require("./routes/WEB/Interview_Details/interview_details");
const employee=  require("./routes/WEB/Employee/employee");
const login =  require("./routes/WEB/Login/login");











let apiHandler = {  
	init: function(app,router,db,nodemailer,Mustache,fs,ses,async,dateFormat,errorData,)
	{   
        let version = "/api/v1/";            
       
		app.use(version,achievement(router,db,errorData));  
		app.use(version,capability(router,db,errorData));  
		app.use(version,certification(router,db,errorData));  
		app.use(version,city(router,db,errorData));
		app.use(version,industry(router,db,errorData)); 
		app.use(version,institute(router,db,errorData)); 
		app.use(version,language(router,db,errorData)); 
		app.use(version,qual(router,db,errorData)); 
		app.use(version,resource_type(router,db,errorData)); 
		app.use(version,skills(router,db,errorData)); 
		app.use(version,special_interest(router,db,errorData)); 
		app.use(version,specialization(router,db,errorData)); 
		app.use(version,state(router,db,errorData)); 
		app.use(version,status(router,db,errorData)); 
		app.use(version,talents(router,db,errorData)); 
		app.use(version,traits(router,db,errorData)); 
		app.use(version,resume(router,db,errorData)); 
		app.use(version,interview_details(router,db,errorData)); 
                app.use(version,employee(router,db,errorData)); 
                app.use(version,login(router,db,errorData,bcrypt));

		



       }    
};
module.exports = apiHandler;  
