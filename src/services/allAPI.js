import SERVERURL from "./serverURL";
import commonAPI from "./commonAPI";

// Register
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/register`, reqBody);
};

// Login
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/login`, reqBody);
};

// ------------- Admin ----------------
// Add trainer
export const addTrainerAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/add-trainer`, reqBody, reqHeader);
};

// View trainer
export const getAllTrainerAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/all-trainer`, {}, reqHeader);
};

// Delete trainer
export const deleteTrainerAPI = async (id) => {
    return await commonAPI("DELETE", `${SERVERURL}/delete-trainer/${id}`);
};

// Add user
export const addUserAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/add-user`, reqBody, reqHeader);
};

// Get all users
export const getAllUsersAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/all-users`, {}, reqHeader);
};

// Delete user
export const deleteUserAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/delete-user/${id}`, {}, reqHeader);
};

// Get all requests (admin)
export const getAllRequestsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/all-requests`, {}, reqHeader);
};

// Approve request
export const approveRequestAPI = async (id, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/approve-request/${id}`, {}, reqHeader);
};

// Reject request
export const rejectRequestAPI = async (id, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/reject-request/${id}`, {}, reqHeader);
};

// Delete request
export const deleteRequestAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/delete-request/${id}`, {}, reqHeader);
};

// Removed payAPI

// ------------- User ----------------
// Submit request
export const submitRequestAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/submit-request`, reqBody);
};