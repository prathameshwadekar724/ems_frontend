import api from "./api";

export const getEmployees = (keyword, page) =>
  api.get(`/api/employees?keyword=${keyword}&page=${page}&size=5`);

export const createEmployee = (employee) =>
  api.post("/api/employees", employee);

export const updateEmployee = (id, employee) =>
  api.put(`/api/employees/${id}`, employee);

export const deleteEmployee = (id) =>
  api.delete(`/api/employees/${id}`);
export const getAllEmployeesNoPaging = () =>
  api.get("/api/employees?size=1000");