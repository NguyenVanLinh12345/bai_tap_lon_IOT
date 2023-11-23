// const baseAPI = "http://localhost:8080/";

const api = {
    baseAPI: "http://localhost:8080/",

    // login & create
    login: "api/v1/login",
    createAccount: "api/v1/signup?role=1",

    // User
    getListUser: "admin/api/users",
    getUser: "",
    createUser: "api/v1/signup?role=", //   0: employee, 1: admin, 2: employee + admin
    updateUser: "",
    deleteUser: "admin/api/user?id=",

    // Machine
    getListMachine: "api/machines",
    getMachine: "",
    createMachine: "api/machine",
    updateMachine: "",
    deleteMachine: "api/machine?id=",

    // Schedule
    getListSchedule: "",
    getSchedule: "",
    createSchedule: "api/schedule/import",
    updateSchedule: "api/schedule",
    deleteSchedule: "api/schedule?id=",

    // TypeEgg
    getListTypeEgg: "api/typeEgges",
    getTypeEgg: "",
    createTypeEgg: "",
    updateTypeEgg: "",
    deleteTypeEgg: "api/typeEgg?id=",

    // Problem
    getListProblem: "",
    getProblem: "",
    createProblem: "",
    updateProblem: "",
    deleteProblem: "",
}

export default api;