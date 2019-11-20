import { getDefaultState } from '@/store/default/-state'
import { getDefaultMutations } from '@/store/default/-mutations'
import { getDefaultActions, actionNames } from '@/store/default/-actions'

const API = '/api/v1/controls'

const acts = getDefaultActions(API)

export const state = () => getDefaultState()
export const mutations = getDefaultMutations()
export const actions = { ...acts, ...{
    [actionNames.GET_ITEM_FRONTEND]: async function ({ commit, dispatch, state }, payload){
		const params = {...payload, ...state.pagination, ...state.criteria}
        
       
        const [ { data } ] = await Promise.all([
            this.$axios.get(`${API}/getControl/`, {params:params}),            
            // dispatch(actionNames.COUNT_ITEMS, state.criteria), 
        ])
        commit('SET_DATA', {data} )    

        
		return data
    }, 
       
} }


export const getters = {

    data: state => state.data.map(data => ({
        ...data,
    })),
    count: state => state.count
}