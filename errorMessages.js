const errors = function(code, error) {

	console.log("Code, error", code, error);
	var errorBlock = {
		
	}

	switch(code){
		case "INTERNAL_SERVER_ERROR" : {
			errorBlock.status = 500;
			errorBlock.message = "There is a problem connecting to the database";
			errorBlock.payload = error;
			break; 
		}
		case "EXISTS" : {
			errorBlock.status = 409;
			errorBlock.message = "Duplication not allowed, {} already exists.";
			errorBlock.payload = error;
			break; 
		}
		case "LOGIN_FAILED" : {
			errorBlock.status = 401;
			errorBlock.message = "Login Failed! Please enter the correct username and password.";
			errorBlock.payload = error;
			break; 
		}
		case "UPDATED" : {
			errorBlock.status = 200;
			errorBlock.message = "{} has been updated successfully";
			errorBlock.payload = null; 
			break; 
		}
		case "INSERTED" : {
			errorBlock.status = 200;
			errorBlock.message = "{} has been inserted successfully";
			errorBlock.payload = null; 
			break; 
		}		
		case "REGISTERED" : {
			errorBlock.status = 200;
			errorBlock.message = "You have signed up successfully, please login.";
			errorBlock.payload = null; 
			break; 
		}
		case "DELETED" : {
			errorBlock.status = 200;
			errorBlock.message = "{} has been deleted successfully";
			errorBlock.payload = null; 
			break; 
		}
		case "ACTIVATED" : {
			errorBlock.status = 200;
			errorBlock.message = "{} has been activated successfully";
			errorBlock.payload = null; 
			break; 
		}
		default : {
			errorBlock.status = 0;
			errorBlock.message = "";
			errorBlock.payload = null; 	
			break; 
		}
	}
	console.log(errorBlock);
	return errorBlock;
}

module.exports.getErrorMsg = errors;