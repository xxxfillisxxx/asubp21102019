import { getDefaultState } from '@/store/default/-state'
import { getDefaultMutations } from '@/store/default/-mutations'
import { getDefaultActions, actionNames } from '@/store/default/-actions'

const API = '/api/v1/document'

const acts = getDefaultActions(API)

export const state = () => getDefaultState()
export const mutations = getDefaultMutations()
export const actions = { ...acts, 
    [actionNames.CREATE_ITEM]: async function (context, payload) {
        payload = {
            ...payload,
            publishedAt: payload.publishedAt.valueOf()
        }
        return acts[actionNames.CREATE_ITEM].call(this, context, payload)
    },
    [actionNames.EDIT_ITEM]: async function (context, payload) {
        payload = {
            ...payload,
            publishedAt: payload.publishedAt.valueOf()
        }
        return acts[actionNames.EDIT_ITEM].call(this, context, payload)
    }
}

export const getters = {
	data: state => state.data.map(data => ({
        ...data,
        file: data.file.filename,
        publishedAt: new Date(data.publishedAt)
	})),
	count: state => state.count
}