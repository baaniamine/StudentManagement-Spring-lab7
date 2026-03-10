import axios from 'axios';

const API_BASE_URL = '/students';

export const studentApi = {
    getAllStudents: async () => {
        const response = await axios.get(`${API_BASE_URL}/All`);
        return response.data;
    },
    getStudentById: async (id) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },
    createStudent: async (student) => {
        const response = await axios.post(`${API_BASE_URL}/Create`, student);
        return response.data;
    },
    updateStudent: async (id, student) => {
        const response = await axios.put(`${API_BASE_URL}/update/${id}`, student);
        return response.data;
    },
    deleteStudent: async (id) => {
        const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
        return response.data;
    },
    countStudents: async () => {
        const response = await axios.get(`${API_BASE_URL}/count`);
        return response.data;
    }
};
