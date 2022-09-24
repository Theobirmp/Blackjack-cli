const createSlice=require('@reduxjs/toolkit').createSlice

const initialState={
    cards:[]
}

const dealerCardsSlice=createSlice({
    name:'dealerCards',
    initialState,
    reducers:{

    }
})

module.exports = dealerCardsSlice
module.exports.dealerCardsReducer=dealerCardsSlice.reducer
module.exports.dealerCardsActions = dealerCardsSlice.actions
