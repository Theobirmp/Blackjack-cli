//imports
//configure store
const configureStore = require('@reduxjs/toolkit').configureStore
//all reducers
const cardsReducer=require('../features/cardsSlice').cardsReducer

const store=configureStore({
    reducer:{
        cardsReducer:cardsReducer,
    }
})


module.exports=store