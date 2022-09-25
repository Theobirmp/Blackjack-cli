//e.g. parameter 15 means 15% chance to return true
const randomChance=(inputChance)=>{
    const chance = (Math.floor(Math.random()*100) ) + 1
    if(chance<inputChance) return true
    return false
}
module.exports = randomChance