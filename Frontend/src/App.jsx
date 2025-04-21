import { useState , useEffect } from "react"

function App() {
  const [name , setname] = useState("")
  const [datetime , setdatetime] = useState("")
  const [desc, setdesc] = useState("")
  const [transactions , setTransactions] = useState([])


  useEffect(() => {
    getTransactions().then(transactions=>{
      setTransactions(transactions)
    })
  }, [getTransactions])
  

  async function getTransactions() {
    const url = import.meta.env.VITE_APP_URL+'/transactions'
    const response = await fetch(url)
    return await response.json()
  }

  function addNewTransactions(ev) {
    ev.preventDefault();
    const url = import.meta.env.VITE_APP_URL+'/transaction'
    const priceText = name.split(" ")[0]
    const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
    console.log({ price, name, desc, datetime });
    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        price,
        name:name.substring(priceText.length+1),
        desc,
        datetime
      }),
    })
    .then(response=>{
      response.json().then(json=>{
        setname('')
        setdesc('')
        setdatetime('')
        console.log("result" , json);
        
      })
    })
  }

  let balance = 0;
  for(const transaction of transactions){
    balance = balance + transaction.price
  }
  balance = balance.toFixed(2)
  const fraction = balance.split('.')[1]
  balance = balance.split('.')[0]

  return (
    <div className="bg-[#17181F] text-white min-h-screen min-w-full">
      <div className="max-w-5xl mx-auto py-10">
        <h1 className="text-5xl font-bold mb-5 text-center">${balance}<span className="text-xl">{fraction}</span></h1>
        <form className="flex flex-col gap-1.5" onSubmit={addNewTransactions}>
          <div className="flex  text-center gap-[1%]">
          <input type="text"
           value={name} 
           onChange={ev=>setname(ev.target.value)} 
           placeholder="+$1000 new macbook" 
           className="border-2 min-w-[49.5%] bg-transparent text-[#fff] px-3 py-1  border-gray-600 focus:border-gray-400 rounded-md focus:outline-none"/>
          <input type="datetime-local"
           value={datetime} 
           onChange={ev=>setdatetime(ev.target.value)}
            className="border-2 min-w-[49.5%] bg-transparent text-[#ddd] px-3 py-1 border-gray-600 focus:border-gray-400 rounded-md focus:outline-none" 
            />
          </div>
          <div>
          <input type="text"
           value={desc} 
           onChange={ev=>setdesc(ev.target.value)}
           placeholder="description"
           className="border-2 min-w-full bg-transparent text-[#ddd] px-3 py-1 border-gray-600 focus:border-gray-400 rounded-md focus:outline-none"/>
          </div>
          <button type="submit" className="border-2 bg-slate-400 text-black p-1.5 rounded-md border-none">Add new Transaction</button>
        </form>



        <div className="transactions mt-5 flex flex-col gap-4">
          {transactions.length>0 && transactions.map(transaction=>(
            <div key={transaction._id} className="transaction flex justify-between  border-t-[1.5px] border-t-gray-600">
            <div className="left text-2xl">
              <div className="name">{transaction.name}</div>
              <div className="description text-lg text-[#888]">{transaction.desc}</div>
            </div>
            <div className="right text-2xl text-right">
              <div className={"price " + ((transaction.price<0)?"red":"green")}>
                {((transaction.price>0)?("+"+(transaction.price).toString()):transaction.price)}
                </div>
              <div className="datetime text-lg text-[#888]">{transaction.datetime}</div>
            </div>
          </div>
          ))}
          
          
        </div>
      </div>
    </div>
  )
}

export default App
