
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const orderData = [
    {
      id: 'ORD12345',
      status: 'Pending',
      statusColor: 'bg-yellow-500',
      orderBy: 'John Doe',
      deliveryBy: 'Alex Smith',
      storeName: 'SuperMart',
      address: '123 Main St, Springfield',
      mode: 'Online',
      total: '$100',
      orderPlacedAt: '2023-09-25 12:30 PM',
      timeElapsed: '10 mins ago',
    },
    {
      id: 'ORD12346',
      status: 'Delivered',
      statusColor: 'bg-green-500',
      orderBy: 'Jane Smith',
      deliveryBy: 'Tom Johnson',
      storeName: 'Tech World',
      address: '456 Elm St, Springfield',
      mode: 'In-Store',
      total: '$200',
      orderPlacedAt: '2023-09-25 10:00 AM',
      cancelledIn: '30 mins ago',
    },
  ];

  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = orderData.find((order) => order.id === orderId);

  if (!order) return <p>Order not found</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Order Details for {order.id}</h2>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Store Name:</strong> {order.storeName}</p>
      <p><strong>Address:</strong> {order.address}</p>
      <p><strong>Mode:</strong> {order.mode}</p>
      <p><strong>Total:</strong> {order.total}</p>
      <p><strong>Order Placed At:</strong> {order.orderPlacedAt}</p>
      <button
        onClick={() => navigate('/')}
        className="text-blue-500 hover:underline mt-4"
      >
        Back to Orders
      </button>
    </div>
  );
};

export default OrderDetails;
