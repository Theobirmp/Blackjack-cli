const createSlice=require('@reduxjs/toolkit').createSlice

const initialState={
    cards:[]
}

const playerCardsSlice=createSlice({
    name:'playerCards',
    initialState,
    reducers:{

    }
})

module.exports = playerCardsSlice
module.exports.playerCardsReducer=playerCardsSlice.reducer
module.exports.playerCardsActions=playerCardsSlice.actions