//imports
//configure store
const configureStore = require('@reduxjs/toolkit').configureStore
//all reducers
const { dealerCardsReducer } = require('../features/dealerCardsSlice')
const cardsReducer=require('../features/cardsSlice').cardsReducer
const playerCardsReducer=require('../features/playerCardsSlice').playerCardsReducer

const store=configureStore({
    reducer:{
        cardsReducer:cardsReducer,
        playerCardsReducer:playerCardsReducer,
        dealerCardsReducer:dealerCardsReducer,
    }
})


module.exports=store