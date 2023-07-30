import React, { useContext, useEffect, useState } from "react";
import CombaibnedNavCompany from "../../nav/CombaibnedNavCompany";
import axios from "axios";
import ActiceOrdersList from "./order list's/ActiceOrdersList";
// import OldOrders from "./order list's/OldOrdersList";
import OldOrdersList from "./order list's/OldOrdersList";
import IncomesList from "./order list's/IncomesList";
import CompantMainPage from "../CompantMainPage";
import { MyContext } from "../../Router/RouterServer";
// import AppContext from "../../Helpjs/AppContexxt";

//  AppContext
// to pass this object we have some methods:
// 1. redux
// 2. context
// export const AppContext = React.createContext();

function OrderOfTheCompany() {
  const [activeOrders, setActiveOrders] = useState([]);
  const [oldOrders, setOldOrders] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const TAX_RATE = 0.17;
   
const context = useContext(MyContext);

   const [colspan, setColspan] = useState(1);
  console.log(allClients);
  // console.log(allClients);
  useEffect(() => {
    async function getOrdersData() {
      let Clients,Orders;
      try {
        await Promise.all([axios.get("http://localhost:4000/findAllClients"),axios.get("http://localhost:4000/getAllOrders"),axios.get('http://localhost:4000/getSumOfClientsOrder')]).then((values)=>{
          Clients= values[0].data;
          Orders = values[1].data.Orders
          setAllClients(values[2].data);
          // console.log(Orders);
          // console.log(allClients);
          // console.log(allClients);
        });
        // console.log(Clients);
        const currdate = new Date().getTime();
        
        const oldOrders = [];
        const OngoingOrders = []; ///do with splice to save memory

        const OrdersWithName = Orders.map((item) => {
          const With = Clients.find((value)=>{
            return value._id === item.ClientId;
          });
          return {...item,ClientName:`${With.FirstName} ${With.LastName}`}
        });
        // setAllClients(OrdersWithName)
        console.log(allClients);
          
        OrdersWithName.forEach((item) => {
          if (currdate > item.DateTime) oldOrders.push(item);
          else OngoingOrders.push(item);
        });
        
        setOldOrders(oldOrders);
        setActiveOrders(OngoingOrders);
      } catch (err) {
        console.log(err);
      }
    }
    getOrdersData();
    const updateColspan = () => {
      setColspan(window.innerWidth <= 552 ? 3: 2);
    };

    updateColspan(); // Set the initial colspan

    // Attach event listener for window resize
    window.addEventListener('resize', updateColspan);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateColspan);
    };
  }, []);


// מעמ
// 17%

  const subtotalSum  = allClients.reduce((accumulator, currentValue) => accumulator + currentValue.Total, 0);
  
  const ordersWithTax = oldOrders.map((order) => ({
    ...order,
    PriceWithTax: (order.Price * (1 + TAX_RATE)).toFixed(2),
  }));
  const subtotalSumTAX  = ordersWithTax.reduce((accumulator, currentValue) => accumulator + (currentValue.PriceWithTax -currentValue.Price) , 0);
 
  // const AppContext = React.createContext();
    const TOTAL_VALUE = subtotalSum - subtotalSumTAX;

  return (
    
    <div>
      <CombaibnedNavCompany />
      <div className="main-ordeList-container">
        <div id="not-in-print" className="orderReceipts-container">
          <h3>הזמנות פעילות</h3>

          <table>
            <tr>
              <th >תאריכים</th>
              <th >הזמנה</th>
              <th >שם בודק</th>
              <th >סכום</th>
              <th >מספר הזמנה</th>
              <th >סטטוס</th>
            </tr>
                {activeOrders.map((item)=>{
                  return(
                  <tr >
          
                    <ActiceOrdersList item={item} key={item._id} />
                 </tr>
                  )
                })}
       
          </table>
        </div>
        <div id="not-in-print" className="orderReceipts-container" >
          <h3>הזמנות ישנות </h3>
          
          <table>
            <tr>
            <th>תאריכים</th>
              <th>הזמנה</th>
              <th>שם בודק</th>
              <th>סכום</th>
              <th>מספר הזמנה</th>
              <th >סטטוס</th>

            </tr>

            {oldOrders.map((item)=>{
              return(
              <tr>
              <OldOrdersList item={item} key={item._id}/>
              </tr>
            )
            })}
           
          </table>
        </div>
        {/* need to add styling  */}
        <div className="orderReceipts-container" >
          <div className="subTititle-container">

          <h3>הכנסות</h3>
         
          <button onClick={()=>window.print()}>הדפס</button>
          </div>
          <table>
            <tr>
              <th>הזמנה</th>
              <th>כתובת אלקטרונית</th>
              <th>סכום</th>
           
            </tr> 

            {/* {allClients.map((client)=>{ */}
   
             {allClients.map((client)=>{
              return  (            
               <tr>
            <IncomesList client={client} key={client._id}/>
        
             </tr>
             )})}    
             <td  colSpan={colspan}>                           
                        
          <div className="subTotal-Incomes-container">
             
              <div className="right-cotainer">
                <p> ₪{subtotalSum.toLocaleString() }</p>
                <p> ₪{subtotalSumTAX.toLocaleString()}</p>
                <p id="emphasis"> <b > ₪{(TOTAL_VALUE).toLocaleString()} </b> </p>
              </div>
              <div className="left-conatiner">
                <p>סכום משנה:</p>
                <p>מע"מ:</p>
                <p id="emphasis"><b>סה"כ:</b> </p>


       

              </div>
             </div>
             </td>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderOfTheCompany;
