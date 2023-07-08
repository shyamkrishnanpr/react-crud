import {configureStore} from '@reduxjs/toolkit'
import  tokenSlice  from './token'



export default configureStore({
    reducer:{
       token:tokenSlice
    }
})  