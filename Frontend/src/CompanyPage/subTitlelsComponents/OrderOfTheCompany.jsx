import React, { useEffect, useState } from "react";
import CombaibnedNavCompany from "../../nav/CombaibnedNavCompany";
import axios from "axios";

function OrderOfTheCompany() {
  const [OrderData, setOrdersData] = useState([]);
  const [oldOrders, setOldOrders] = useState(null);
  
  useEffect(() => {
    async function getOrdersData(){
      try{
      const {data} = await axios.get("http://localhost:4000/getAllOrders")
      console.log(data);
      const currdate = new Date().getTime();
      const oldOrders= [];
      const OngoingOrders = []; ///do with splice to save memory
      data.forEach((item)=>{
        if(currdate > item.DateTime) oldOrders.push(item);
        else OngoingOrders.push(item);
      })
      
      setOldOrders(oldOrders);
      setOrdersData(OngoingOrders);
      }catch(err){
        console.log(err);
      }
    }
    getOrdersData();
  }, [])
  
  return (
    <div>
      <CombaibnedNavCompany />
      <div className="main-ordeList-container">
   <div className="orderReceipts-container" >
   <h3>הזמנות פעילות</h3>
     
      <table>
  <tr>
    <th>תאריכים</th>
    <th>הזמנה</th>
    <th>שם בודק</th>
    <th>מספר הזמנה</th>
  </tr>

  <tr id="Active">
    <td >Peter</td>
    <td>Griffin</td>
    <td>$100</td>
    <td>$100</td>
  </tr>
  <tr>
    <td>Lois</td>
    <td>Griffin</td>
    <td>$150</td>
    <td>$100</td>

  </tr>
  <tr>
    <td>Joe</td>
    <td>Swanson</td>
    <td>$300</td>
    <td>$100</td>

  </tr>
  <tr>
    <td>Cleveland</td>
    <td>Brown</td>
    <td>$250</td>
    <td>$100</td>

  </tr>
      </table>
   </div>
   <div className="orderReceipts-container" id="B">
   <h3>הזמנות ישנות</h3>
     
   <table>
  <tr>
    <th>תאריכים</th>
    <th>הזמנה</th>
    <th>סכום</th>
    <th>מספר הזמנה</th>
  </tr>
  <tr>
    <td>Peter</td>
    <td>Griffin</td>
    <td>$100</td>
    <td>$100</td>
  </tr>
  <tr>
    <td>Lois</td>
    <td>Griffin</td>
    <td>$150</td>
    <td>$100</td>

  </tr>
  <tr>
    <td>Joe</td>
    <td>Swanson</td>
    <td>$300</td>
    <td>$100</td>

  </tr>
  <tr>
    <td>Cleveland</td>
    <td>Brown</td>
    <td>$250</td>
    <td>$100</td>

  </tr>
      </table>
   </div>
   {/* need to add styling  */}
   <div className="orderReceipts-container" id="B">
   <h3>הכנסות</h3>
     
   <table>
  <tr>
    <th>תאריכים</th>
    <th>הזמנה</th>
    <th>סכום</th>
    <th>מספר הזמנה</th>
  </tr>
  <tr>
    <td>Peter</td>
    <td>Griffin</td>
    <td>$100</td>
    <td>$100</td>
  </tr>
  <tr>
    <td>Lois</td>
    <td>Griffin</td>
    <td>$150</td>
    <td>$100</td>

  </tr>
  <tr>
    <td>Joe</td>
    <td>Swanson</td>
    <td>$300</td>
    <td>$100</td>

  </tr>
  <tr>
    <td>Cleveland</td>
    <td>Brown</td>
    <td>$250</td>
    <td>$100</td>

  </tr>
      </table>
   </div>
      </div>
    </div>
  );
}

export default OrderOfTheCompany;
