// import logo from './logo.svg';
// import { render } from '@testing-library/react';
import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const FirstScreenJSX = ({ amount}) => {
  let [current, setcurrent] = useState(amount)
  const [inputAmount, setInputAmount] = useState("");
  const [statu, setStatu] = useState('');
  // console.log(amount,current,"firstcreee")

  const handleButtonClick = async (type, e) => {
    // e.preventDefault();    
    const date = new Date();
    console.log(type, date)
    const amountArset = parseInt(inputAmount);
    if (isNaN(inputAmount) || inputAmount <= 0) {
      alert("input");
    }

    setcurrent(current + amount);
    setInputAmount("")



    if (type === "Add") {
      setcurrent(current + amountArset);
      setInputAmount("")
      // console.log("-------!!!!!->>>", setcurrent += inputAmount);
    } else {
      setcurrent(current - amountArset);
      setInputAmount("")
    }
    const item = { amountArset, type, date }
    const amountOBJ = "http://localhost:3001/posts";
    axios.post(amountOBJ, item)
      .then(res => {
        console.log(setStatu(res))
      }).catch(err => {
        console.log(err)
      })

  }

  return (
    <>
      {/* <div>
        <h1>Balance : {current}</h1>
      </div> */}
      <div>
        <input type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", flex: "rows", justifyContent: 'center', paddingTop: 10 }}>
        <div style={{ paddingRight: 10 }}>
          <button onClick={() => handleButtonClick('Add')}>Add</button>
        </div>
        <div>
          <button onClick={() => handleButtonClick('Remove')}>remove</button>
        </div>
      </div>
    </>
  )
}

const SecondScreenJSX = ({data}) => {

  console.log(data)
  return (
    <>
    <h1>Transations:</h1>
      {
        data.map((item)=>(     
          <h3>
            {item.date} - {item.amountArset} - {item.type}
          </h3>
        ))
      }
    </>
  )
}

function App() {

  let amount = 0;
  // const data = require('./../data.json');
  // console.log(data.posts)
  // let [amount, setamount] = useState(0);
  const [value, setValue] = useState([]);
  const portal = " http://localhost:3001/posts" //json-server  --watch data.json --port 3001 the json server run cmd
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(portal);
        console.log(JSON.stringify(response.data));
        setValue(response.data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };
    fetchData();
  }, []);

  const calculateTotal = (value) => {
    // let total = 0;
    for (const entry of value) {
      if (entry.type === "Add") {
        amount += entry.amountArset;
      } else if (entry.type === "Remove") {
        amount -= entry.amountArset;
      }
    }
    return amount;
  };
  let totalamount=(calculateTotal(value));

  return (
    <div className="App">
    <div>
        <h1>Balance : {totalamount}</h1>
      </div>
      <FirstScreenJSX amount={totalamount}  />
          <SecondScreenJSX  data={value}/>
    </div>
  );
}

export default App;
