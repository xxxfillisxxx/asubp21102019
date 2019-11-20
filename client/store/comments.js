import { getDefaultState } from '@/store/default/-state'
import { getDefaultMutations } from '@/store/default/-mutations'
import { getDefaultActions, actionNames, store } from '@/store/default/-actions'

const API = '/api/v1/comments'

const acts = getDefaultActions(API)

export const state = () => getDefaultState()
export const mutations = getDefaultMutations()
export const actions = { ...acts, ...{
    [actionNames.CREATE_ITEM]: async function ({ commit, dispatch, state }, payload){
	//     const { data } = await this.$axios.post(API, payload)
	// 	// await dispatch(controls.GET_ITEM_FRONTEND, payload.control)
    //     return data
       
       
    // }, 
    let params = Object.entries({ ...state.criteria, ...payload })
    const formData = new FormData()
    //fix, sails skipper require file param LAST
    params.sort(([keyA, valueA], [keyB, valueB]) => valueB instanceof File ? -1 : 1)
    params.forEach(([key, value]) => formData.set(key, value instanceof Date ? value.valueOf() : value))
    const { data } = await this.$axios.post(API, formData)
    commit('SET_DATA', {data} ) 
    const control=await this.$axios.get(`/api/v1/controls/getControl`, {params:{id:payload.control}})
    return control
    
}}}


export const getters = {

    data: state => state.data.map(data => ({
        ...data,
    })),
    count: state => state.count
}