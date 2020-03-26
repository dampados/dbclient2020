import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:2000/api',
})

export const getAllStaffTable   = () => api.get(`/staff`)
export const getStaffByID       = id => api.get(`/staff/${id}`)
export const getAllStaffByBra   = id => api.get(`/staff_by_bra/${id}`)
export const getAllStaffWithAcademic   = () => api.get(`/staff_with_academic/`)

export const addAWorker         = payload => api.post('/staff/add', payload)
export const updateAWorkerById  = (id, payload) => api.put(`/staff/${id}`, payload)
export const deleteAWorker      = id => api.delete(`/staff/${id}`)


export const getAllLaboratories = () => api.get('/laboratories')
export const getLaboratoryByID  = id => api.get(`laboratories/${id}`)
export const addALaboratory     = payload => api.post(`/laboratories/add`, payload)
export const updateLaboratoryById = (id, payload) => api.put(`/laboratories/${id}`, payload)
export const deleteALaboratory  = id => api.delete(`/laboratories/${id}`)


export const getAllFaculties    = () => api.get('/faculties')
export const getAllBranches     = () => api.get('/branches')

export const getFacultyByID     = id => api.get(`/faculty/${id}`)
export const getBranchByID      = id => api.get(`/branch/${id}`)

export const getBranchesByFac   = id => api.get(`/faculty_b/${id}`)  //unikum

export const addAFaculty        = payload => api.post(`/faculty/add`, payload)
export const addABranch         = (id, payload) => api.post(`/faculty_b/${id}/add`, payload)  

export const updateFacById      = (id, payload) => api.put(`/faculty/${id}`, payload)
export const updateBraById      = (id, payload) => api.put(`/faculty_bu/${id}`, payload)

export const deleteAFaculty     = id => api.delete(`/faculty/${id}`)
export const deleteABranch      = id => api.delete(`/branch/${id}`)


const apis = {
    getAllStaffTable,
    getStaffByID,
    addAWorker,
    updateAWorkerById,
    deleteAWorker,
    getAllStaffByBra,
    getAllStaffWithAcademic,

    getAllLaboratories,
    getLaboratoryByID,
    addALaboratory,
    updateLaboratoryById,
    deleteALaboratory,

    getAllFaculties,
    getAllBranches,
    getFacultyByID,
    getBranchByID,
    getBranchesByFac,
    addAFaculty,
    addABranch,
    updateFacById,
    updateBraById,
    deleteAFaculty,
    deleteABranch,

}

export default apis