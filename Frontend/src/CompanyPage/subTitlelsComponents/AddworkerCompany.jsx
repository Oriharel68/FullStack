import React from 'react'
import CombaibnedNavCompany from '../../nav/CombaibnedNavCompany'
import ServerStatus from '../../FireBase/ServerStatus';
import axios from 'axios';
// import ServerStatus from "../FireBase/ServerStatus";
function AddworkerCompany() {

  async function handleOnSubmit(event) {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const workerName = formData.get("workerName");
      const serviceType = formData.get("serviceType");
      const price = formData.get("price");
      
      if (!price || !workerName || !serviceType ) {
        alert("missing info");
        return;
      }
      // if(rPassword !== password){
      // alert('password not the same');
      // return;
      // } 
      // if (!(await ServerStatus())) {
      //   alert("Server down");
      //   return;
      // }
      
      const {serviceProvider} = await axios.post("http://localhost:4000/addProvider", {
       price,
       workerName,
       serviceType,
      }).then(()=>{
         alert("worker was created Succsesfuly");
      })
     
      if (!serviceProvider.ok) {
        alert(serviceProvider.error);
        // userCred.user.delete();
        return;
      }      
      

        // updateProfile(userCred.user, {
        //   displayName: `${FirstName} ${LastName}`,
        // })


          // .then(() => {
          //   // alert("user was created Succsesfuly");
          //   navigate("/client/registrationCompalete")
          //   setTimeout(() => {
          //     navigate("/client/access");
          //   }, 3000);

          // })


         
          
        

      // createUserWithEmailAndPassword(auth, Email, password)
      //   .then(async (userCred) => {
      //     //what happen after a user register
      //     const { data } = await axios.post("http://localhost:4000/register", {
      //       FirstName,
      //       LastName,
      //       Email,
      //       PhoneNumber,
      //     });

      //     if (!data.ok) {
      //       alert(data.error);
      //       userCred.user.delete();
      //       return;
      //     }

      //     updateProfile(userCred.user, {
      //       displayName: `${FirstName} ${LastName}`,
      //     })


      //       .then(() => {
      //         // alert("user was created Succsesfuly");
      //         navigate("/client/registrationCompalete")
      //         setTimeout(() => {
      //           navigate("/client/access");
      //         }, 3000);

      //       })


      //       .catch((err) => {
      //         alert(err);
      //       });
      //   })
      //   .catch((err) => {
      //     alert(err);
      //   });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <div className="navCompany-container">

      <CombaibnedNavCompany/>
      </div>
      
      <div className="mainAddWorker-Page">
        <div className="main-container">
          <form action=""  onSubmit={(event) => handleOnSubmit(event)}>
          <h3>הוספת עובד</h3>
            
        <input type="text" id="W2" name="workerName" placeholder='שם עובד'/>
        <input type="text" id="W2" name="serviceType" placeholder='סוג איש מקצוע'/>
        <input type="number" id="W3" name="price" placeholder='מחיר/עלות בדיקה' min="0"/>
         
          <button>
            הוספה
          </button>
          </form>

            
            </div>
            <div className="Worker-list-cintainer">
              <h3>ניהול עובדים קיימים</h3>
              <p>שם עובדת ,עריכה, הסרה</p>
            </div>
      </div>

    </div>
  )
}
// input[type=text]:focus {
  // background-color: lightblue;
// }
export default AddworkerCompany