import { Link, useSearchParams } from 'react-router-dom';
import successGif from '../../assets/gif/success.gif';
import { useVerifyPaymentQuery } from '../../redux/features/orders/ordersApi';

export default function OrderSuccess() {
  const [paramId] = useSearchParams();
  const orderId = paramId.get("order_id");

  useVerifyPaymentQuery({ order_id: orderId });

  return (
    <div className='min-h-[70vh] my-10 flex flex-col justify-center items-center'>
      <div className='max-w-lg'>
        <img className='' src={successGif} alt="Payment Successful" />
      </div>
      <Link
        to="/customerDashboard/allOrders"
        className='capitalize text-blue-500 underline hover:text-blue-700 hover:font-semibold'
      >
        See order history
      </Link>
    </div>
  );
}