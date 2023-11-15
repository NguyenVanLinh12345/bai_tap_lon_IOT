// const baseAPI = "http://localhost:8080/";

const api = {
    baseAPI: "http://localhost:8080/",

    // login & create
    login: "api/v1/login",
    createAccount: "api/v1/signup?role=1",

    // User
    getListUser: "",
    getUser: "",
    createUser: "",
    updateUser: "",
    deleteUser: "",

    // Machine
    getListMachine: "",
    getMachine: "",
    createMachine: "",
    updateMachine: "",
    deleteMachine: "",

    // Schedule
    getListSchedule: "",
    getSchedule: "",
    createSchedule: "",
    updateSchedule: "",
    deleteSchedule: "",

    // TypeEgg
    getListTypeEgg: "",
    getTypeEgg: "",
    createTypeEgg: "",
    updateTypeEgg: "",
    deleteTypeEgg: "",

    // Problem
    getListProblem: "",
    getProblem: "",
    createProblem: "",
    updateProblem: "",
    deleteProblem: "",
}

export default api;