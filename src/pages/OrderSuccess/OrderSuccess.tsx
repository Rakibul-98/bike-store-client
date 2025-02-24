import { Link, useSearchParams } from 'react-router-dom';
import successGif from '../../assets/gif/success.gif';
import { useVerifyPaymentQuery } from '../../redux/features/orders/ordersApi';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function OrderSuccess() {
  const [paramId] = useSearchParams();
  const orderId = paramId.get("order_id");

  // Verify payment
  const { data, isSuccess, isError } = useVerifyPaymentQuery({ order_id: orderId });
  const bankStatus = data?.data[0]?.bank_status;
  // Handle verification result
  useEffect(() => {
    if (isSuccess && data) {
      if (bankStatus === 'success') {
        toast.success("Payment verified successfully!");
      } else if (bankStatus === 'Cancel') {
        toast.error("Order Canceled. Please order again.");
      } else {
        toast.error("Payment processing failed. Please try again.");
      }
    }
    if (isError) {
      toast.error("Payment verification failed!");
    }
  }, [isSuccess, isError, data, bankStatus]);

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