import {
    SET_CURRENT_PLANET,
    RECEIVE_APPRENTICE,
    RECEIVE_MASTER,
    SCROLL_UP,
    SCROLL_DOWN
} from '../action_creators'

const identity = (val) => val
const INITIAL_STATE = {
    planet: {},
    items: Array(5).fill(undefined)
}

function setItemAtIndex(collection, index, item) {
    return collection.slice(0, index).concat([item]).concat(collection.slice(index + 1));
}

function receiveApprentice(state, action) {
    let index = state.items.filter(identity).length
    return Object.assign({}, state, {
        items: setItemAtIndex(state.items, index, action.item)
    })
}

function receiveMaster(state, action) {
    let populatedItems = state.items.filter(identity)
    let index = state.items.length - populatedItems.length - 1
    return Object.assign({}, state, {
        items: setItemAtIndex(state.items, index, action.item)
    })
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CURRENT_PLANET:
            return Object.assign({}, state, { planet: action.planet })
        case SCROLL_UP:
            return Object.assign({}, state, {
                items: Array(2).fill(undefined).concat(state.items.slice(0, 3))
            })
        case SCROLL_DOWN:
            return Object.assign({}, state, {
                items: state.items.slice(2).concat(Array(2).fill(undefined))
            })
        case RECEIVE_APPRENTICE:
            return receiveApprentice(state, action)
        case RECEIVE_MASTER:
            return receiveMaster(state, action)
    }
    return state
}
