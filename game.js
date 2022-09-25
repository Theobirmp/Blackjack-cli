// const initialState = require('./features/cardsSlice')
const store = require('./app/store')
//all actions
const cardsActions=require('./features/cardsSlice').actions
const playerCardsActions=require('./features/playerCardsSlice').actions
const dealerCardsActions=require('./features/dealerCardsSlice').actions
const inquirer=require("inquirer")
const gameEndStates=require('./features/data/gameEndStates')
const sleep=require('./helpers/sleep')
const randomChance=require('./helpers/randomChance')

const game=async()=>{
    startGame()
    const dealerPlays=await doesPlayerDrawCard()
    if(dealerPlays) await doesDealerDrawCard()
    if(dealerPlays)checkWinner()
}
const startGame=()=>{
    store.dispatch(cardsActions.pickACard())
    store.dispatch(cardsActions.playerDrawCard())
    store.dispatch(cardsActions.pickACard())
    store.dispatch(cardsActions.playerDrawCard())
    store.dispatch(cardsActions.pickACard())
    store.dispatch(cardsActions.dealerDrawCard())
    store.dispatch(cardsActions.pickACard())
    store.dispatch(cardsActions.dealerDrawCard())
    store.dispatch(cardsActions.showPlayerCards())
    store.dispatch(cardsActions.showDealerCardsStart())
}
const endGame=(action)=>{
    switch(action){
        case gameEndStates.DEALER_BURNT:
            console.log('Dealer burnt - You won')
            break
        case gameEndStates.PLAYER_BURNT:
            console.log('You burnt - Dealer wins')
            break
        case gameEndStates.PLAYER_WINS:
            console.log('You Win')
            break
        case gameEndStates.DEALER_WINS:
            console.log('Dealer wins')
            break
        case gameEndStates.DRAW:
            console.log("Draw")
            break
    }
}
const playerDrewCard=()=>{
    store.dispatch(cardsActions.pickACard())
    store.dispatch(cardsActions.playerDrawCard())
    store.dispatch(cardsActions.getPlayerPoints())
    store.dispatch(cardsActions.showPlayerCards())
    store.dispatch(cardsActions.showDealerCards())
}
const hasPlayerBurnt=()=>{
    const {cardsReducer:{playerPoints}}=store.getState()
    console.log(playerPoints)
    console.log('player points are:',playerPoints)
    if(playerPoints>21){
        endGame(gameEndStates.PLAYER_BURNT)
        return true
    } else {
        return false
    }
}
const dealerHasBurnt=()=>{
    const {cardsReducer:{dealerPoints}}=store.getState()
    console.log(dealerPoints)
    console.log('player points are:',dealerPoints)
    if(dealerPoints>21){
        endGame(gameEndStates.DEALER_BURNT)
        return true
    } else {
        return false
    }
}
const doesPlayerDrawCard=async()=>{
    let con=true
    while(con){
        await inquirer.prompt([
            {
                type:'list',
                message:'Do you want to draw another card?',
                name:"drawCard",
                choices:['yes','no']
            }
          ])
          .then((answers) => {
            if(answers.drawCard==='yes'){
                playerDrewCard()
                if(hasPlayerBurnt()) {
                    con=false
                    return false
                }
            }else{
                con=false
            }
          })
          .catch((error) => {
            if (error.isTtyError) {
              // Prompt couldn't be rendered in the current environment
            } else {
              // Something else went wrong
            }
          });
    }
    if(hasPlayerBurnt()) return false
    return true

}
//checks if the dealer wants to draw a card
const dealerThinks=async()=>{
    store.dispatch(cardsActions.showDealerCards())
    store.dispatch(cardsActions.getDealerPoints())
    const {cardsReducer:{dealerPoints}} = store.getState()
    console.log('dealer points are: ',dealerPoints)
    console.log('Dealer Thinking...')
    await sleep(2000)
    switch (dealerPoints) {
        case 21:
        case 20:
        case 19:
        case 18:
            return false            
        case 17:
            return randomChance(15)
        case 16:
            return randomChance(35)
        case 15:
            return randomChance(65)
        case 14:
            return randomChance(90)
        case 13:
            return true    
        default: 
            return true
    }
}

const doesDealerDrawCard=async()=>{
    let con=await dealerThinks()
    while(con===true){
        console.log('Dealer Draws')
        store.dispatch(cardsActions.pickACard())
        store.dispatch(cardsActions.dealerDrawCard())
        store.dispatch(cardsActions.showDealerCards())
        if(dealerHasBurnt())return
        con=await dealerThinks()
    }
    console.log('I dont want to draw more cards')
}
const checkWinner=()=>{
    const {cardsReducer:{playerPoints}}=store.getState()
    const {cardsReducer:{dealerPoints}}=store.getState()
    if(playerPoints>dealerPoints) endGame(gameEndStates.PLAYER_WINS)
    if(playerPoints<dealerPoints) endGame(gameEndStates.DEALER_WINS)
    if(playerPoints===dealerPoints) endGame(gameEndStates.DRAW)
}
module.exports = game
module.exports.startGame=startGame
module.exports.doesPlayerDrawCard=doesPlayerDrawCard
module.exports.doesDealerDrawCard=doesDealerDrawCard