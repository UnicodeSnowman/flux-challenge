import Rx from 'rx-dom'
import { FuncSubject } from 'rx-react'
import { dispatch } from '../store'

export const SET_CURRENT_PLANET = 'SET_CURRENT_PLANET'
export const SCROLL_UP = 'SCROLL_UP'
export const SCROLL_DOWN = 'SCROLL_DOWN'
export const REQUEST_MORE = 'REQUEST_MORE'
export const RECEIVE_APPRENTICE = 'RECEIVE_APPRENTICE'
export const RECEIVE_MASTER = 'RECEIVE_MASTER'

const URL = 'http://localhost:3000/dark-jedis'
const identity = (val) => val

const DIRECTION = {
    DOWN: 'DOWN',
    UP: 'UP'
}

export function setCurrentPlanet(planet) {
    return {
        type: SET_CURRENT_PLANET,
        planet
    }
}

export function scrollDown() {
    return { type: SCROLL_DOWN }
}

export function scrollUp() {
    return { type: SCROLL_UP }
}

function receiveApprentice(item) {
    return {
        type: RECEIVE_APPRENTICE,
        item
    }
}

function receiveMaster(item) {
    return {
        type: RECEIVE_MASTER,
        item
    }
}

const buttonUpSubject = FuncSubject.create()
const buttonDownSubject = FuncSubject.create()

buttonUpSubject.merge(buttonDownSubject)
    .flatMapLatest(obj => batchFetch(obj.id, obj.fetchCount, obj.key))
    .subscribe(
        res => {
            switch (res.key) {
                case 'master':
                    return dispatch(receiveMaster(res.jedi))
                case 'apprentice':
                    return dispatch(receiveApprentice(res.jedi))
                default:
                    throw new Error('whoops... key did not match either `master` or `apprentice`')
            }
        },
        err => console.log('err', err),
        () => console.log('complete...'))

export function getMasters() {
    return (dispatch, getState) => {
        dispatch(scrollUp())
        const { items } = getState()
        const populatedItems = items.filter(identity)
        const fetchCount = items.length - populatedItems.length
        buttonUpSubject({
            id: populatedItems[0]['master'].id,
            fetchCount,
            key: 'master'
        })
    }
}

export function getApprentices() {
    return (dispatch, getState) => {
        dispatch(scrollDown())
        const { items } = getState()
        const populatedItems = items.filter(identity)
        const fetchCount = items.length - populatedItems.length
        buttonDownSubject({
            id: populatedItems[populatedItems.length - 1]['apprentice'].id,
            fetchCount,
            key: 'apprentice'
        })
    }
}

function fetch(jedi, key) {
    return Rx.Observable.return(jedi[key].id)
        .takeWhile(identity) // do not make request if jedi does not have apprentice/master
        .flatMap(id => Rx.DOM.ajax(`${URL}/${id}`))
        .map(val => JSON.parse(val.response))
}

function batchFetch(id, n = 2, key = 'apprentice') {
    return Rx.DOM.ajax(`${URL}/${id}`)
        .map(val => JSON.parse(val.response))
        .expand(jedi => fetch(jedi, key))
        //.takeUntil(Rx.Observable.timer(50000)) // planet matches!
        .take(n)
        .map(jedi => ({ jedi, key }))
}

export function fetchJedisStartingWith(id) {
    return dispatch => {
        batchFetch(id, 5).subscribe(
            res => dispatch(receiveApprentice(res.jedi)),
            err => console.log('whoops...', err))
    }
}
