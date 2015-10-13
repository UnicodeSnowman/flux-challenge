import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunkMiddleware from './middleware/thunk'

export default applyMiddleware(
    thunkMiddleware
)(createStore)(reducers)
