// const initialState = require('./features/cardsSlice')
const store = require('./app/store')
//all actions
const cardsActions=require('./features/cardsSlice').actions
const inquirer=require("inquirer")
const gameEndStates=require('./features/data/gameEndStates')

const sleep=require('./helpers/sleep')
const randomChance=require('./helpers/randomChance')

const game=async()=>{
    startGame()
    const dealerPlays=await doesPlayerDrawCard()
    showDealerCards()
    if(!dealerPlays) return
    const checkWin = await doesDealerDrawCard()
    if(!checkWin) return
    checkWinner()

    // if(dealerPlays) {
    //     const checkWin = 
    //     if(checkWin) checkWinner()
    // }
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
    store.dispatch(cardsActions.getPlayerPoints())
    store.dispatch(cardsActions.getDealerPoints())
    showPlayerCards()
    showDealerCardsStart()
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
    showPlayerCards()
    showDealerCardsStart()
}
const hasPlayerBurnt=()=>{
    const {cardsReducer:{playerPoints}}=store.getState()
    if(playerPoints>21){
        endGame(gameEndStates.PLAYER_BURNT)
        return true
    } else {
        return false
    }
}
const dealerHasBurnt=()=>{
    const {cardsReducer:{dealerPoints}}=store.getState()
    // console.log(dealerPoints)
    // console.log('player points are:',dealerPoints)
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
                message:'Draw Card',
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
    store.dispatch(cardsActions.getDealerPoints())
    const {cardsReducer:{dealerPoints}} = store.getState()
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
        showDealerCards()
        if(dealerHasBurnt())return false
        con=await dealerThinks()
    }
    console.log('I dont want to draw more cards')
    showPlayerCards()
    showDealerCards()
    return true
}
const checkWinner=()=>{
    const {cardsReducer:{playerPoints}}=store.getState()
    const {cardsReducer:{dealerPoints}}=store.getState()
    if(playerPoints>dealerPoints) endGame(gameEndStates.PLAYER_WINS)
    if(playerPoints<dealerPoints) endGame(gameEndStates.DEALER_WINS)
    if(playerPoints===dealerPoints) endGame(gameEndStates.DRAW)
}
const showPlayerCards=()=>{
    const {cardsReducer:{playerCards}}=store.getState()
    let totalPoints=playerCards.reduce((points,item)=>{
        return points=points+item.value
    },0)
    let output='You: ' 
    playerCards.forEach(card=>{
        output+=`${card.number}${card.emoji} `
    })
    output+='==> ' + totalPoints
    console.log(output)
}
const showDealerCards=()=>{
    const {cardsReducer:{dealerCards}}=store.getState()
    let totalPoints=dealerCards.reduce((points,item)=>{
       return points=points+item.value
    },0)
    let output='Dealer: ' 
    dealerCards.forEach(card=>{
        output+=`${card.number}${card.emoji} `
    })
    output+='==> ' + totalPoints
    console.log(output)
}
const showDealerCardsStart=()=>{
    const {cardsReducer:{dealerCards}}=store.getState()
    let totalPoints=dealerCards.reduce((points,item)=>{
       return points=points+item.value
    },0)
    let output=`Dealer: ${dealerCards[0].number}${dealerCards[0].emoji} x? ==> ${dealerCards[0].value}`
    console.log(output)
}
module.exports = game
module.exports.startGame=startGame
module.exports.doesPlayerDrawCard=doesPlayerDrawCard
module.exports.doesDealerDrawCard=doesDealerDrawCard