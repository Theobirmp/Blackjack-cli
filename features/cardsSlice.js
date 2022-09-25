const createSlice=require('@reduxjs/toolkit').createSlice
const emojis = require('./data/emojis')


 const initialState={
    cards:[
        //spades
        {number:1,sign:'spades',emoji:emojis.spades,value:1},
        {number:2,sign:'spades',emoji:emojis.spades,value:2},
        {number:3,sign:'spades',emoji:emojis.spades,value:3},
        {number:4,sign:'spades',emoji:emojis.spades,value:4},
        {number:5,sign:'spades',emoji:emojis.spades,value:5},
        {number:6,sign:'spades',emoji:emojis.spades,value:6},
        {number:7,sign:'spades',emoji:emojis.spades,value:7},
        {number:8,sign:'spades',emoji:emojis.spades,value:8},
        {number:9,sign:'spades',emoji:emojis.spades,value:9},
        {number:10,sign:'spades',emoji:emojis.spades,value:10},
        //hearts
        {number:1,sign:'hearts',emoji:emojis.hearts,value:1},
        {number:2,sign:'hearts',emoji:emojis.hearts,value:2},
        {number:3,sign:'hearts',emoji:emojis.hearts,value:3},
        {number:4,sign:'hearts',emoji:emojis.hearts,value:4},
        {number:5,sign:'hearts',emoji:emojis.hearts,value:5},
        {number:6,sign:'hearts',emoji:emojis.hearts,value:6},
        {number:7,sign:'hearts',emoji:emojis.hearts,value:7},
        {number:8,sign:'hearts',emoji:emojis.hearts,value:8},
        {number:9,sign:'hearts',emoji:emojis.hearts,value:9},
        {number:10,sign:'hearts',emoji:emojis.hearts,value:10},
        //clubs
        {number:1,sign:'clubs',emoji:emojis.clubs,value:1},
        {number:2,sign:'clubs',emoji:emojis.clubs,value:2},
        {number:3,sign:'clubs',emoji:emojis.clubs,value:3},
        {number:4,sign:'clubs',emoji:emojis.clubs,value:4},
        {number:5,sign:'clubs',emoji:emojis.clubs,value:5},
        {number:6,sign:'clubs',emoji:emojis.clubs,value:6},
        {number:7,sign:'clubs',emoji:emojis.clubs,value:7},
        {number:8,sign:'clubs',emoji:emojis.clubs,value:8},
        {number:9,sign:'clubs',emoji:emojis.clubs,value:9},
        {number:10,sign:'clubs',emoji:emojis.clubs,value:10},
        //diamonds
        {number:1,sign:'diamonds',emoji:emojis.diamonds,value:1},
        {number:2,sign:'diamonds',emoji:emojis.diamonds,value:2},
        {number:3,sign:'diamonds',emoji:emojis.diamonds,value:3},
        {number:4,sign:'diamonds',emoji:emojis.diamonds,value:4},
        {number:5,sign:'diamonds',emoji:emojis.diamonds,value:5},
        {number:6,sign:'diamonds',emoji:emojis.diamonds,value:6},
        {number:7,sign:'diamonds',emoji:emojis.diamonds,value:7},
        {number:8,sign:'diamonds',emoji:emojis.diamonds,value:8},
        {number:9,sign:'diamonds',emoji:emojis.diamonds,value:9},
        {number:10,sign:'diamonds',emoji:emojis.diamonds,value:10},
    ],
    playerCards:[],
    dealerCards:[],
    playerPoints:0,
    dealerPoints:0,
    selectedCard:null,
}

const cardsSlice= createSlice({
    name:'cards',
    initialState,
    reducers:{
        pickACard:(state)=>{
            const cardIndex=Math.floor(Math.random()*state.cards.length)
            state.selectedCard=cardIndex
        },
        playerDrawCard:(state)=>{
            state.playerCards.push(state.cards[state.selectedCard])
            state.cards.splice(state.selectedCard,1)
            state.selectedCard=null
        },
        dealerDrawCard:(state)=>{
            state.dealerCards.push(state.cards[state.selectedCard])
            state.cards.splice(state.selectedCard,1)
            state.selectedCard=null
        },
        resetGame:(state)=>{
            state.cards=[...initialState.cards]
            state.playerCards=[]
            state.dealerCards=[]
        },
        showPlayerCards:(state)=>{
            console.log('Your Cards')
            let output=''
            state.playerCards?.forEach(card=>{
                output+=`${card.number}${card.emoji} `
            })
            console.log(output)
        },
        showDealerCardsStart:(state)=>{
            console.log('Dealer Cards')
            let output=`${state.dealerCards[0].number}${state.dealerCards[0].emoji} x?`
            console.log(output)
        },
        showDealerCards:(state)=>{
            console.log('Dealer Cards')
            let output=''
            state.dealerCards?.forEach(card=>{
                output+=`${card.number}${card.emoji} `
            })
            console.log(output)
        },
        getPlayerPoints:(state)=>{
            state.playerPoints=state.playerCards.reduce((points,item)=>{
                return points=points+item.value
            },0)
        },
        getDealerPoints:(state)=>{
            state.dealerPoints=state.dealerCards.reduce((points,item)=>{
                return points=points+item.value
            },0)
        },
        //helpers
        getCards:(state)=>{
            state.cards.forEach(card=>console.log(card.number,card.sign))
        },
        getPlayerCards:(state)=>{
            console.log('player cards')
            state.playerCards?.forEach(card=>console.log(card.number,card.sign))
        },
        getDealerCards:(state)=>{
            console.log('dealer cards')
            state.dealerCards?.forEach(card=>console.log(card.number,card.sign))
        },
        playerDrawFirstCard:(state)=>{
            state.playerCards.push(state.cards[0])
            state.cards.splice(0,1)
            state.selectedCard=null
        },
        getSelectedCard:(state)=>{
            console.log('selected card is: ',state.cards[state.selectedCard].number,state.cards[state.selectedCard].sign)
        }
    }
})

module.exports = cardsSlice
module.exports.cardsReducer = cardsSlice.reducer
module.exports.cardsActions = cardsSlice.actions