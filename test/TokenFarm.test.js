// using mocha testing framework
// using chai testing library

const DappToken = artifacts.require('DappToken')
const DaiToken  = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm');

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n){
    return web3.utils.toWei(n,'ether');
}

contract('TokenFarm', ([owner,investor])=>{
    //write tests here...
    let daiToken, dappToken, tokenFarm

    before(async() =>{
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address,daiToken.address)

        await dappToken.transfer(tokenFarm.address,'1000000000000000000')
    
        await daiToken.transfer(investor, tokens('100'), {from:owner})
    })
    describe('Mock DAI deployment', async()=>{
        it('has a name', async()=>{
            let daiToken = await DaiToken.new()
            const name  = await daiToken.name()
            assert.equal(name,'Mock DAI Token')
        })
    })
    describe('Dapp Token deployment', async()=>{
        it('has a name', async()=>{
            const name  = await dappToken.name()
            assert.equal(name,'DApp Token')
        })
    })
    describe('Token Farm Deployment', async()=>{
        it('has a name', async()=>{
            const name  = await tokenFarm.name()
            assert.equal(name,'Dapp Token')
        })
        it('contract has tokens', async()=>{
            let balance = await dappToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(),tokens('1000000'))
        })
    })
})