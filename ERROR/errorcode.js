module.exports = {
    
    errorCodeResponse:(errCode) => {

        var errorBlock = {
		
        }
    
        switch(errCode){
            case 1366:
                errorBlock.status = 0,
                errorBlock.msg = "Wrong Value For the Field Please check the field Values or Data Type",
                errorBlock.data = []
                break;
            case 1406:
                errorBlock.status = 0,
                errorBlock.msg = "Data is Too Long For One Field Please check the field Values",
                errorBlock.data = []
                break;
            case 1364:
                errorBlock.status = 0,
                errorBlock.msg = "The given Value doen't have the deafault value(Foreign Key Err)",
                errorBlock.data = []
                break;
            case 1452:
                errorBlock.status = 0,
                errorBlock.msg = "The Given Foreign key value is Wrong so can't able to update the value",
                errorBlock.data = []
                break;
            case 1136:
                errorBlock.status = 0,
                errorBlock.msg = "Doesn't Match the field values",
                errorBlock.data = []
                break;
            case 1064:
                errorBlock.status = 0,
                errorBlock.msg = "Mysql sintax error pleact contact API developer",
                errorBlock.data = []
                break;
            default:
                errorBlock.status = 0,
                errorBlock.msg = "Failed",
                errorBlock.data = []
                break;
        }
// console.log(errorBlock)
        return errorBlock;
     

    }
}