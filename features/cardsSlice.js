const createSlice=require('@reduxjs/toolkit').createSlice
const emojis = require('./data/emojis')


 const initialState={
    cards:[
        //spades
        {number:1,sign:'spades',emoji:emojis.spades},
        {number:2,sign:'spades',emoji:emojis.spades},
        {number:3,sign:'spades',emoji:emojis.spades},
        {number:4,sign:'spades',emoji:emojis.spades},
        {number:5,sign:'spades',emoji:emojis.spades},
        {number:6,sign:'spades',emoji:emojis.spades},
        {number:7,sign:'spades',emoji:emojis.spades},
        {number:8,sign:'spades',emoji:emojis.spades},
        {number:9,sign:'spades',emoji:emojis.spades},
        {number:10,sign:'spades',emoji:emojis.spades},
        //hearts
        {number:1,sign:'hearts',emoji:emojis.hearts},
        {number:2,sign:'hearts',emoji:emojis.hearts},
        {number:3,sign:'hearts',emoji:emojis.hearts},
        {number:4,sign:'hearts',emoji:emojis.hearts},
        {number:5,sign:'hearts',emoji:emojis.hearts},
        {number:6,sign:'hearts',emoji:emojis.hearts},
        {number:7,sign:'hearts',emoji:emojis.hearts},
        {number:8,sign:'hearts',emoji:emojis.hearts},
        {number:9,sign:'hearts',emoji:emojis.hearts},
        {number:10,sign:'hearts',emoji:emojis.hearts},
        //clubs
        {number:1,sign:'clubs',emoji:emojis.hearts},
        {number:2,sign:'clubs',emoji:emojis.hearts},
        {number:3,sign:'clubs',emoji:emojis.hearts},
        {number:4,sign:'clubs',emoji:emojis.clubs},
        {number:5,sign:'clubs',emoji:emojis.clubs},
        {number:6,sign:'clubs',emoji:emojis.clubs},
        {number:7,sign:'clubs',emoji:emojis.clubs},
        {number:8,sign:'clubs',emoji:emojis.clubs},
        {number:9,sign:'clubs',emoji:emojis.clubs},
        {number:10,sign:'clubs',emoji:emojis.clubs},
        //diamonds
        {number:1,sign:'diamonds',emoji:emojis.diamonds},
        {number:2,sign:'diamonds',emoji:emojis.diamonds},
        {number:3,sign:'diamonds',emoji:emojis.diamonds},
        {number:4,sign:'diamonds',emoji:emojis.diamonds},
        {number:5,sign:'diamonds',emoji:emojis.diamonds},
        {number:6,sign:'diamonds',emoji:emojis.diamonds},
        {number:7,sign:'diamonds',emoji:emojis.diamonds},
        {number:8,sign:'diamonds',emoji:emojis.diamonds},
        {number:9,sign:'diamonds',emoji:emojis.diamonds},
        {number:10,sign:'diamonds',emoji:emojis.diamonds},
    ],
    playerCards:[],
    dealerCards:[],
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