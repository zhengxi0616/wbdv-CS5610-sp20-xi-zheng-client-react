const moduleReducer = (state = {modules: []}, action) => {
    switch (action.type) {
        case 'CREATE_MODULE':
            return {
                modules: [
                    ...state.modules,
                    action.module
                ]
            }
            break;
        case 'DELETE_MODULE':
            return {
                modules: state.modules.filter(
                    module => module._id !== action.moduleId)
            }
            break;
        case 'UPDATE_MODULE':
            return {
                modules: state.modules.map(module =>
                    module._id === action.moduleId ? action.module : module
                )
            }
            break;
        case 'FIND_MODULES_FOR_COURSE':
            return {
                modules: action.modules
            }
        case 'FIND_ALL_MODULES':
            return {
                modules: action.modules
            }
        default:
            return state
    }
}

export default moduleReducer
