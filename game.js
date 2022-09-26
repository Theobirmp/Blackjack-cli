const store = require('./app/store')
//all actions
const cardsActions=require('./features/cardsSlice').actions
const inquirer=require("inquirer")
const gameEndStates=require('./features/data/gameEndStates')



const game=async()=>{
    startGame()
    const dealerPlays=await doesPlayerDrawCard()
    showDealerCards()
    if(!dealerPlays) return
    const checkWin =  doesDealerDrawCard()
    if(!checkWin) return
    checkWinner()
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
    const {cardsReducer:{playerBurnt,dealerBurnt}}=store.getState()
    if(playerBurnt || dealerBurnt) {
        return
    }
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
    let {cardsReducer:{playerPoints,playerCards}}=store.getState()
        if(playerPoints>21){
            store.dispatch(cardsActions.playerBurnt())
            endGame(gameEndStates.PLAYER_BURNT)
            return true
    } else {
        return false
    }
}
const dealerHasBurnt=()=>{
    const {cardsReducer:{dealerPoints,dealerCards}}=store.getState()
        if(dealerPoints>21){
            store.dispatch(cardsActions.dealerBurnt())
            console.log('Dealer burnt - You win')
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
    if(hasPlayerBurnt()) {
        store.dispatch(cardsActions.playerBurnt())
        console.log('You burnt - Dealer wins')
        return false
    }
    return true

}
//checks if the dealer wants to draw a card
const dealerThinks=()=>{
    store.dispatch(cardsActions.getDealerPoints())
    const {cardsReducer:{dealerPoints}} = store.getState()
    console.log('Dealer Thinking...')
    // await sleep(2000)
    switch (dealerPoints) {
        case 21:
        case 20:
        case 19:
        case 18:
        case 17:
            return false
        case 16:
            return true
        default: 
            return true
    }
}

const doesDealerDrawCard=async()=>{
    let con= dealerThinks()
    while(con===true){
        console.log('Dealer Draws')
        store.dispatch(cardsActions.pickACard())
        store.dispatch(cardsActions.dealerDrawCard())
        store.dispatch(cardsActions.getDealerPoints())
        showDealerCards()
        if(dealerHasBurnt())return false
        con= dealerThinks()
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
    const {cardsReducer:{playerCards,playerPoints}}=store.getState()
    let output='You: ' 
    playerCards.forEach(card=>{
        output+=`${card.number}${card.emoji} `
    })
    output+='==> ' + playerPoints
    console.log(output)
}

const showDealerCards=()=>{
    const {cardsReducer:{dealerCards,dealerPoints}}=store.getState()
    let output='Dealer: ' 
    dealerCards.forEach(card=>{
        output+=`${card.number}${card.emoji} `
    })
    output+='==> ' + dealerPoints
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
const checkForAces=(cards)=>{
    return cards.some(card=>card.number==1)
}
module.exports = game
module.exports.startGame=startGame
module.exports.doesPlayerDrawCard=doesPlayerDrawCard
module.exports.doesDealerDrawCard=doesDealerDrawCard