import './App.css';
import {ethers, Signer} from 'ethers';
import {useEffect, useState} from 'react';
import Token from './artifacts/contracts/Token.sol/Token.json';


const contractAddress   = "0x50e4042548934190CC6e67fA4d381b0B709A1898";
function App() {
  const [coinDetails, setCoinDetails] = useState(undefined)
  const [load, setLoad] = useState(false)
  const [currentAccount, setCurrentAccount] = useState(null)
  const [accountBalance, setAccountBalance] = useState(undefined)
  const [toAddress, setToAddress] = useState(undefined)
  const [amount, setAmount] = useState(undefined)

  // console.log(process.env.REACT_APP_ACCOUNT_KEY)

  const [greetings, setGreetings] = useState();

  const requestAccounts = async () => {
    const acct = await window.ethereum.request({method:'eth_requestAccounts'});
    setCurrentAccount(acct[0]);
    console.log(acct)
    return acct
  }

  const coinDet = async () => {
    if (typeof window.ethereum == undefined){
        alert("Install Metamask Wallet");
        return
    }

    requestAccounts()

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenAbi = Token.abi;
    const contract = new ethers.Contract(contractAddress, tokenAbi, provider);
    const totalCoinInCirc = await contract.totalSupply()
    const name = await contract.name()
    const symbol = await contract.symbol()
    setCoinDetails({name, symbol, totalCoinInCirc})
    


  }

  const Transfer = async () =>{
    if (typeof window.ethereum == undefined){
      alert("Install Metamask Wallet");
      return
     }

    requestAccounts()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenAbi = Token.abi;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, tokenAbi, signer);
    const trans = await contract.Transfer(toAddress, amount);
    await trans.wait();
    const bal = await balance();
    setAccountBalance(bal);
  }

  const balance = async () => {
    
    if (typeof window.ethereum == undefined){
      alert("Install Metamask Wallet");
      return
     }

    const account = await requestAccounts()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenAbi = Token.abi;
    const contract = new ethers.Contract(contractAddress, tokenAbi, provider);
    const bal = await contract.balanceOf(account[0])
    console.log(bal, "LOOKE HERE")
    setAccountBalance(bal.toString())
    return bal.toString();
  }

  useEffect(()=>{
    balance()
    if(!coinDetails){
      coinDet()
    }
  },[coinDetails])

  return (
    <div className="App">

      <section className='borderUp'>
            <div className='account'>
                <div className='crypto-card'>
                  
                  <div>Balance - <span>{accountBalance?accountBalance:0} {coinDetails?coinDetails.symbol:"0 FIS"}</span></div>
                  <div>account - <span>{currentAccount?currentAccount.slice(0, 5)+"..."+currentAccount.slice(currentAccount.length-5, currentAccount.length):"0xacacd...1acd"}</span></div>

                </div>
                <br/>
                <button onClick={e=>requestAccounts()}  className='btn'>Connect Wallet</button>

            </div>
            
        
            <section className='transfer'>
              
                <input onChange={e=>setToAddress(e.target.value)} value={toAddress} className='input' placeholder='Address To' />
                <input onChange={e=>setAmount(e.target.value)} value={amount}  className='input' placeholder='Amount' />
                <button onClick={e=>Transfer()} disabled={toAddress && amount?false:true} className='btn'>Transfer</button>

            </section>
   </section>
    </div>
  );
}

export default App;
