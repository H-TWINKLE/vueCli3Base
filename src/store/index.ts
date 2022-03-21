import { createStore } from 'vuex'
import modules from './state'
import { IUserState } from '@/store/modules/user'

interface IStore {
    user: IUserState
}

const store = createStore<IStore>({
    modules
})
export default store
