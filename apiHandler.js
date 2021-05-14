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
const todo =  require("./routes/WEB/ToDo/ToDo");
const rate_a_master =  require("./routes/WEB/ToDo/Rate_A_Master");
const login =  require("./routes/WEB/Login/login");
const project_form =  require("./routes/WEB/PROJECT/project_form");
const project_trademark =  require("./routes/WEB/PROJECT/project_trademark");
const project_design =  require("./routes/WEB/PROJECT/project_design");
const project_patent =  require("./routes/WEB/PROJECT/project_patent");
const project_copyright =  require("./routes/WEB/PROJECT/project_copyright");
const interviewed_candidates =  require("./routes/WEB/get_interviewed_candidates");
const rate_screen =  require("./routes/WEB/Rate_Screen/get_court");
const client =  require("./routes/WEB/Client/add_client");
const ope =  require("./routes/WEB/OPE/ope");
const stage_master =  require("./routes/WEB/Stage_Master/stage_master");
const timesheet_popup =  require("./routes/WEB/Task_Timesheet/timesheet_popup");
const create_project_task =  require("./routes/WEB/Task_Timesheet/create_project_task");
const timesheet_approval =  require("./routes/WEB/Task_Timesheet/timesheet_approval");
const unblock =  require("./routes/WEB/Task_Timesheet/unblock");
const ip_stage =  require("./routes/WEB/Stages/IP_stage");
const create_project_task_adhoc =  require("./routes/WEB/Adhoc_Task/create_project_task");
const litigation =  require("./routes/WEB/Litigation/litigation");
const litigation_add_data =  require("./routes/WEB/Litigation/litigation_add_data");
const leave =  require("./routes/WEB/Leave/leave");
const user_group =  require("./routes/WEB/User_Group/user_group");
const severence_emp =  require("./routes/WEB/Severence/severence_emp");
const checklist =  require("./routes/WEB/Checklist/checklist");
const user_master =  require("./routes/WEB/Master/user_master");
const question =  require("./routes/WEB/OnlineTest/question");
const credentials =  require("./routes/WEB/OnlineTest/credentials");


//**********&&&&&&***************/
const interview =  require("./routes/WEB/Interview/interview");

/************************ Recruitment Ticket *********************/
const recruitmentTicket =  require("./routes/WEB/RecruitmentTicket/recruitmentTicket");

/************************User Management *********************/
const userGroup =  require("./routes/WEB/UserManagement/userGroup");
const groupPermission =  require("./routes/WEB/UserManagement/groupPermission");
const userMaster =  require("./routes/WEB/UserManagement/userMaster");
const userPermission =  require("./routes/WEB/UserManagement/userPermission");



let apiHandler = {  
	init: function(app,router,db,nodemailer,Mustache,fs,ses,async,dateFormat,errorData,bcrypt,crypto)
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
		app.use(version,interview_details(router,db,errorData,async)); 
                app.use(version,employee(router,db,errorData)); 
		app.use(version,interview(router,db,errorData,async)); 
                app.use(version,todo(router,db,errorData));
		app.use(version,rate_a_master(router,db,errorData));
                app.use(version,login(router,db,errorData,bcrypt));
                app.use(version,project_form(router,db,errorData,dateFormat));
		app.use(version,project_trademark(router,db,errorData,async));
		app.use(version,project_design(router,db,errorData));
		app.use(version,project_patent(router,db,errorData));
		app.use(version,project_copyright(router,db,errorData,async));
                app.use(version,interviewed_candidates(router,db,errorData));
                app.use(version,rate_screen(router,db,errorData));
		app.use(version,client(router,db,errorData,async)); 
		app.use(version,ope(router,db,errorData));
		app.use(version,stage_master(router,db,errorData));
		app.use(version,timesheet_popup(router,db,errorData));
		app.use(version,create_project_task(router,db,errorData));
		app.use(version,ip_stage(router,db,errorData,async));
		app.use(version,timesheet_approval(router,db,errorData,async));
		app.use(version,create_project_task_adhoc(router,db,errorData,async));
		app.use(version,litigation(router,db,errorData,async)); 
		app.use(version,litigation_add_data(router,db,errorData,async));
		app.use(version,unblock(router,db,errorData));
		app.use(version,leave(router,db,errorData));
		app.use(version,user_group(router,db,errorData,async));
		app.use(version,severence_emp(router,db,errorData,async));
		app.use(version,checklist(router,db,errorData,async));
		app.use(version,user_master(router,db,errorData,async));
		app.use(version,recruitmentTicket(router,db,errorData,async));

		//*******************User Management ******************/
		app.use(version,userGroup(router,db,errorData,async));
		app.use(version,groupPermission(router,db,errorData,async));
		app.use(version,userMaster(router,db,errorData,async,bcrypt));
		app.use(version,userPermission(router,db,errorData,async,bcrypt));


		//*******************Online Test **************************/
		app.use(version,question(router,db,errorData,async));
		app.use(version,credentials(router,db,errorData,async,bcrypt,crypto));
		
				
       }    
}; 
module.exports = apiHandler;  
