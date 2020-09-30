/**
 * Defining action objects and function for handling API calls
 *
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */
import { post, deleted, get, put } from "../../../ultis/index"
import { edgeAPIs } from "../../../config"

//''' Define action type
export const HISTORY_DATA = "HISTORY_DATA"
export const SUCCESS = "SUCCESS"
export const PENDING = "PENDING"
export const ERROR = "ERROR"

//``` Define action object
function historyData(data) {
    return {
        type: HISTORY_DATA,
        payload: data
    }
}

function success(isSuccess) {
    return {
        type: SUCCESS,
        payload: isSuccess
    }
}

function pending(isPending) {
    return {
        type: PENDING,
        payload: isPending
    }
}

function error(isError) {
    return {
        type: ERROR,
        payload: isError
    }
}

//''' Define function to handle calling API process by dispatching actions
export function getAllHistoryData() {
    return dispatch => {
        dispatch(pending(true))
        get(edgeAPIs.history(edgeAPIs.server())).then(res => {
            dispatch(historyData(res))
        }).catch(err => {
            dispatch(error(err))
        }).finally(() => dispatch(pending(false)))
    }

}

export function updateMainData(historyDto) {
    return dispatch => {
        dispatch(pending(true))
        put(edgeAPIs.server(), historyDto).then(res => {
            dispatch(historyData(res))
        }).catch(err => {
            dispatch(error(err))
        }).finally(() => dispatch(pending(false)))
    }

}

export function deleteMainData(id) {
    return dispatch => {
        dispatch(pending(true))
        deleted(edgeAPIs.server(), id).then(res => {
            dispatch(historyData(res))
        }).catch(err => {
            dispatch(error(err))
        }).finally(() => dispatch(pending(false)))
    }

}

export function addNewData(historyDto) {
    return dispatch => {
        dispatch(pending(true))
        post(edgeAPIs.server(), historyDto).then(res => {
            dispatch(historyData(res))
        }).catch(err => {
            dispatch(error(err))
        }).finally(() => dispatch(pending(false)))
    }

}