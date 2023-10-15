const initState = {
    checkLogin: false,
    loading: false
}

function reducer(state, action) {
    let newstate;
    switch (action.type) {
        case "login":
            newstate = { ...state, checkLogin: true }
            break;
        case "logout":
            newstate = { ...state, checkLogin: false }
            break
        case "loading":
            newstate = { ...state, loading: true }
            break
        case "un-loading":
            newstate = { ...state, loading: false }
            break

        default:
            throw console.error("error action");
    }
    return newstate;
}

export { initState };
export default reducer;