import SERVERURL from "./serverURL"
import commonAPI from "./commonAPI"

//register
export const registerAPI = async (reqBody)=> {
    return await commonAPI("POST", `${SERVERURL}/register`, reqBody) //reBody-username,email,password is passed $ reqHeader is not needed
}

//login
export const loginAPI = async (reqBody)=> {
    return await commonAPI("POST", `${SERVERURL}/login`, reqBody) //reBody-username,email,password is passed $ reqHeader is not needed
}


// -------------admin----------------

// add trainer
export const addTrainerAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST", `${SERVERURL}/add-trainer`, reqBody, reqHeader)
}
  
export const getAllTrainerAPI = async () => {
    return await commonAPI("GET", `${SERVERURL}/all-trainer`); // Removed reqHeader for public access
};


// delete trainer
export const deleteTrainerAPI = async(id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/delete-trainer/${id}`)
}

// Get all requests (admin)
export const getAllRequestsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/all-requests`, {}, reqHeader);
};


// Approve request
export const approveRequestAPI = async (id, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/approve-request/${id}`, {}, reqHeader); // No reqBody, just header
};

// Reject request
export const rejectRequestAPI = async (id, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/reject-request/${id}`, {}, reqHeader); // No reqBody, just header
};


// / ------------- User ----------------
// Submit request
export const submitRequestAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/submit-request`, reqBody); // No reqHeader for public submission
};
