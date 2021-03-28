
export { FetchCalling, FileUploadService, FileUploadMultipleService, FileDeleteService, baseURL };

const baseURL = 'http://godlandit.pythonanywhere.com'

function FetchCalling(passData, setReturnData, setLoader, pageFinder) {


    // let baseURL = 'http://godlandit.pythonanywhere.com/api';
    let baseURL = 'https://wedunn.godlandit.tk/api';
    let baseURL2 = 'https://wedunn.godlandit.tk/api';
    let suffixURL = '';


    switch (pageFinder) {
        case 'tockenUpdation':
            suffixURL = baseURL + '/ServicePerson/UpdateTokenServicePerson/';
            break;
        case 'getService':
            suffixURL = baseURL + '/Master/GetAllOfferServices/';
            break;
        case 'register':
            suffixURL = baseURL + '/ServicePerson/CreateServicePerson/';
            break;
        case 'login':
            suffixURL = baseURL + '/ServicePerson/ServicePersonLogin/';
            break;
        case 'mobileNumberCheck':
            suffixURL = baseURL + '/ServicePerson/ValidateMobile/';
            break;
        case 'OTPgen':
            suffixURL = baseURL + '/Gateway/sms/';
            break;
        case 'changePassWord':
            suffixURL = baseURL + '/ServicePerson/ServicePersonResetPassword/';
            break;
        case 'emailcheck':
            suffixURL = baseURL + '/ServicePerson/ValidateEmail/';
            break;
        case 'getAllServiceRequest':
            suffixURL = baseURL + '/ServicePerson/GetAllAssignedComplaintsBySPId/';
            break;
        case 'getAllServiceRequestBYId':
            suffixURL = baseURL + '/EndUser/GetAllComplaintByStepAndId/';
            break;
        case 'notification':
            suffixURL = baseURL + '/ServicePerson/GetAllNotificationDetails/';
            break;
        case 'acceptService':
            suffixURL = baseURL + '/ServicePerson/AssignServicePerson/';
            break;
        case 'PassNotification':
            suffixURL = baseURL + '/ServicePerson/PassNotification/';
            break;
        case 'stepUpdation':
            suffixURL = baseURL + '/EndUser/CreateEndUserComplaintRegister/';
            break;
        case 'getAllSubtask':
            suffixURL = baseURL + '/ServicePerson/GetAllSubTaskList/';
            break;
        case 'CreateSubTaskList':
            suffixURL = baseURL + '/ServicePerson/CreateSubTaskList/';
            break;
        case 'DeleteSubTaskList':
            suffixURL = baseURL + '/ServicePerson/DeleteSubTaskList/';
            break;
        case 'CreatePurchaseOrder':
            suffixURL = baseURL + '/ServicePerson/CreatePurchaseOrder/';
            break;
        case 'DeletePurchaseOrder':
            suffixURL = baseURL + '/ServicePerson/DeletePurchaseOrder/';
            break;
        case 'CreateEndUserPayments':
            suffixURL = baseURL + '/EndUser/CreateEndUserPayments/';
            break;
        case 'GetEndUserComplaintRegisterById':
            suffixURL = baseURL + '/EndUser/GetEndUserComplaintRegisterById/';
            break;
        case 'GetDoneHoursByServiceId':
            suffixURL = baseURL + '/ServicePerson/GetDoneHoursByServiceId/';
            break;
        case 'GetAllAssignedComplaintsBySPId':
            suffixURL = baseURL + '/ServicePerson/GetAllAssignedComplaintsBySPId/';
            break;
        case 'TimeSlotView':
            suffixURL = baseURL + '/ServicePerson/TimeSlotView/';
            break;
        case 'UpdateAvailabilityServicePerson':
            suffixURL = baseURL + '/ServicePerson/UpdateAvailabilityServicePerson/'
            break;
        case 'StatDetails':
            suffixURL = baseURL + '/ServicePerson/StatDetails/'
            break;
        case 'ServiceActivate':
            suffixURL = baseURL + '/Admin/Activate/'
            break;
        case 'ServiceValidateOtp':
            suffixURL = baseURL2 + '/ServicePerson/ValidateOTP/'
            break;
        case 'UpdateDate':
            suffixURL = baseURL2 + '/ServicePerson/AssignOTPDate/'
            break;
        case 'ListAllDealers':
            suffixURL = baseURL2 + '/ServicePerson/ListAllDealers/'
            break;


    }

    // console.log(passData);

    return (
        fetch(suffixURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passData)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                setReturnData(responseJSON)
                // console.log(responseJSON);
            })
            .catch((error) => { console.error(error) })
            .finally(() => setLoader(false))
    )


}


function FileUploadService(formData, setReturnData, setLoader,) {
    let baseURL = 'http://godlandit.pythonanywhere.com/api/';
    let suffixURL = 'file/upload/';
    return (
        fetch(baseURL + suffixURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                setReturnData(responseJSON)
                console.log(responseJSON);
            })
            .catch((error) => { console.error(error) })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false)
                }, 2000)
            })
    )
}

function FileUploadMultipleService(formData, setReturnData, setLoader,) {
    let baseURL = 'http://godlandit.pythonanywhere.com/api/';
    let suffixURL = 'file/MultipleFile/';
    return (
        fetch(baseURL + suffixURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                setReturnData(responseJSON)
                console.log(responseJSON);
            })
            .catch((error) => { console.error(error) })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false)
                }, 2000)
            })
    )
}


function FileDeleteService(formData, setReturnData, setLoader,) {
    let baseURL = 'http://godlandit.pythonanywhere.com/api/';
    let suffixURL = 'file/delete/';
    return (
        fetch(baseURL + suffixURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': "application/json",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                setReturnData(responseJSON)
                console.log(responseJSON);
            })
            .catch((error) => { console.error(error) })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false)
                }, 2000)
            })
    )
}

