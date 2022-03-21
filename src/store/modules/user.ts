import { Module } from 'vuex'

export interface IUserState {
    userInfo: object;
}

const UserStore: Module<IUserState, unknown> = {
    mutations: {
        SET_USER_INFO(state, userInfo: object) {
            state.userInfo = userInfo
        }
    },
    actions: {
        setUserInfo(state, userInfo: object) {
            state.commit('SET_USER_INFO', userInfo)
        }
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        }
    }
}
export default UserStore
