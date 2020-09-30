/**
 * Defining action objects and function for handling API calls
 *
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */

import { post, deleted, get, put } from "../../ultis/index"
import { edgeAPIs } from "../../config"

//''' Define action type
export const NOTIFICATION_DATA = "NOTIFICATION_DATA"
export const SUCCESS = "SUCCESS"
export const PENDING = "PENDING"
export const ERROR = "ERROR"

//``` Define action object
function notificationData(data) {
    return {
        type: NOTIFICATION_DATA,
        payload: data
    }
}

function success(isSuccess) {
    return {
        type: SUCCESS,
        payload: isSuccess
    }
}

function feedBack(data) {
    return {
        type: FEED_BACK,
        payload: data
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
export function getNotificationData() {
    return dispatch => {
        dispatch(pending(true))
        get('http://192.168.1.110:5000/metrics').then(res => {
            dispatch(notificationData(res))
            console.log(res)
        }).catch(err => {
            dispatch(error(err))
        }).finally(() => dispatch(pending(false)))
    }

}

export function sendFeedBack(data) {
    return dispatch => {
        dispatch(pending(true))
        post(edgeAPIs.feedback(edgeAPIs.server()), data).then(res => {
            dispatch(success(res))
        }).catch(err => {
            dispatch(error(err))
        }).finally(() => dispatch(pending(false)))
    }

}

export function deleteMainData(id) {
    return dispatch => {
        dispatch(pending(true))
        deleted(edgeAPIs.server(), id).then(res => {
            dispatch(mainData(res))
        }).catch(err => {
            dispatch(error(err))
        }).finally(() => dispatch(pending(false)))
    }

}

export function addNewData(mainDto) {
    return dispatch => {
        dispatch(pending(true))
        post(edgeAPIs.server(), mainDto).then(res => {
            dispatch(mainData(res))
        }).catch(err => {
            dispatch(error(err))
        }).finally(() => dispatch(pending(false)))
    }

}