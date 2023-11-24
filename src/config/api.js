// const baseAPI = "http://localhost:8080/";

const api = {
    baseAPI: "http://localhost:8080/",

    // login & create
    login: "api/v1/login",

    // User
    getListUser: "admin/api/users",
    getListUserByrole: "admin/api/users?role=",
    getUser: "admin/api/user?id=",
    createUser: "api/v1/signup?role=", //   0: employee, 1: admin, 2: employee + admin
    updateUser: "admin/api/user",
    deleteUser: "admin/api/user?id=",

    // Machine
    getListMachine: "api/machines",
    getListMachineById: "",
    getMachine: "api/machine?id=",
    createMachine: "api/machine",
    updateMachine: "api/machine",
    deleteMachine: "api/machine?id=",

    // Schedule
    getListSchedule: "api/schedules",
    getListScheduleById: "",
    getSchedule: "",
    createSchedule: "api/schedule/import",
    updateSchedule: "api/schedule",
    deleteSchedule: "api/schedule?id=",

    // TypeEgg
    getListTypeEgg: "api/typeEgges",
    getTypeEgg: "api/typeEgg?id=",
    createTypeEgg: "api/typeEgg/import",
    updateTypeEgg: "api/typeEgg/update",
    deleteTypeEgg: "api/typeEgg?id=",

    // Problem
    getListProblemById: "api/problems?machineId=",
    getProblem: "api/problem?id=",
    // createProblem: "api/problem",
    // updateProblem: "",
    deleteProblem: "api/problem?id=",
}

export default api;