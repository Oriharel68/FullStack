import { setDate } from '../../../Helpjs/help';
function ActiceOrdersList({ order }: any) {
  const { _id, ClientName, WorkerName, DateTime, Price } = order;
  console.log(order);
  

  return (
    <>
      <td id="emphasis">{setDate(DateTime)}</td>
      <td>{ClientName}</td>
      <td>{WorkerName}</td>
      <td>{Price?.toLocaleString()}₪</td>
      <td>{_id}</td>
      <td>
        <button id="Active">פעיל</button>
      </td>
    </>
  );
}

export default ActiceOrdersList;
