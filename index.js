// const initialState = require('./features/cardsSlice')
const store = require('./app/store')
//all actions
const cardsActions=require('./features/cardsSlice').actions
const playerCardsActions=require('./features/playerCardsSlice').actions
const dealerCardsActions=require('./features/dealerCardsSlice').actions



//player gets two cards
//dealer gets one card
store.dispatch(cardsActions.pickACard())
store.dispatch(cardsActions.getSelectedCard())
store.dispatch(cardsActions.playerDrawCard())
store.dispatch(cardsActions.pickACard())
store.dispatch(cardsActions.getSelectedCard())
store.dispatch(cardsActions.playerDrawCard())
store.dispatch(cardsActions.pickACard())
store.dispatch(cardsActions.getSelectedCard())
store.dispatch(cardsActions.dealerDrawCard())

// store.dispatch(cardsActions.getCards())
store.dispatch(cardsActions.getPlayerCards())
store.dispatch(cardsActions.getDealerCards())
// store.dispatch(cardsActions.resetGame())
// console.log(store.getState())
// console.log(store.getState())