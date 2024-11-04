import { useState } from 'react';
import { Users, Store, DollarSign, ShoppingBag } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { apiGetRequest } from '../api/adminGetApi';
import { format, startOfWeek, startOfMonth } from 'date-fns';



const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Function to calculate the start and end dates based on the time range
  const calculateDateRange = () => {
    const today = new Date();
    let startDate;
    const endDate = today;

    if (timeRange === 'day') {
      startDate = today;
    } else if (timeRange === 'week') {
      startDate = startOfWeek(today, { weekStartsOn: 1 });
    } else if (timeRange === 'month') {
      startDate = startOfMonth(today);
    }
    // Ensure startDate is defined
  if (!startDate) {
    throw new Error("Start date is undefined");
  }

    return {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
    };
  };

  const { startDate, endDate } = calculateDateRange();

  interface ApiResponse<T> {
    data: T;
  }
  

  // Fetch dashboard stats based on the calculated date range
  const { data: statsData } = useQuery<ApiResponse<RTCStatsType>>({
    queryKey: ['dashboard/stats', startDate, endDate],
    queryFn: () => apiGetRequest({
      url: `/dashboard?startDate=${startDate}&endDate=${endDate}`
    }),
    onSuccess: (data: unknown) => console.log('Stats Data:', data),
    onError: (error: Error) => console.error('Stats Error:', error),
  });

  // Fetch recent orders
  const { data: ordersData } = useQuery({
    queryKey: ['dashboard/orders'],
    queryFn: () => apiGetRequest({
      url: '/dashboard/recent-orders?limit=5'
    }),
    onSuccess: (data: unknown) => console.log('Orders Data:', data),
    onError: (error: Error) => console.error('Orders Error:', error),
  });

  // Fetch recent signups
  const { data: signupsData } = useQuery({
    queryKey: ['dashboard/new-signups'],
    queryFn: () => apiGetRequest({
      url: '/dashboard/new-signups?limit=5'
    }),
    onSuccess: (data: unknown) => console.log('Signups Data:', data),
    onError: (error: Error) => console.error('Signups Error:', error),
  });

  // Fetch reviews
  const { data: reviewsData } = useQuery({
    queryKey: ['/dashboard/latest-reviews'],
    queryFn: () => apiGetRequest({
      url: '/dashboard/latest-reviews?limit=3'
    }),
    onSuccess: (data: unknown) => console.log('Reviews Data:', data),
    onError: (error: Error) => console.error('Reviews Error:', error),
  });

  // Fetch order status data
  const { data: orderStatusData } = useQuery({
    queryKey: ['dashboard/order-status'],
    queryFn: () => apiGetRequest({
      url: `/dashboard/orders/status-percentages?startDate=${startDate}&endDate=${endDate}`
    }),
    onSuccess: (data: { data: unknown }) => console.log('Order Status Data:', data),
    onError: (error: Error) => console.error('Order Status Error:', error),
  });

  const stats = statsData?.data?.data || {
    orderCount: 0,
    userCount: 0,
    restaurantCount: 0,
    totalEarnings: 0,
  };

  // Slice the data to show only 5 items
  const orders = ordersData?.data?.slice(0, 5) || [];
const signups = signupsData?.data?.slice(0, 5) || [];
const reviews = reviewsData?.data?.slice(0, 3) || [];

  // Transform the API response data into the format required by the PieChart
  interface OrderStatus {
    status: 'complete' | 'driver_assign' | 'cancelled' | 'preparing' | 'picked_up' | 'pending';
    percentage: string;
  }
  
  const transformPieChartData = (data: OrderStatus[]) => {
    const statusColors = {
      complete: '#38B2AC',
      driver_assign: '#63B3ED',
      cancelled: '#F6AD55',
      preparing: '#4FD1C5',
      picked_up: '#7F9CF5',
      pending: '#4A5568'
    };
  
    const statusNames = {
      complete: 'Completed',
      driver_assign: 'Driver Assigned',
      cancelled: 'Cancelled',
      preparing: 'Preparing',
      picked_up: 'Picked Up',
      pending: 'Pending'
    };
  
    return data.map(item => ({
      name: statusNames[item.status as keyof typeof statusNames] || item.status,
      value: parseFloat(item.percentage),
      color: statusColors[item.status as keyof typeof statusColors] || '#4A5568'
    }));
  };

  const pieChartData = orderStatusData?.data?.data 
    ? transformPieChartData(orderStatusData.data.data)
    : [
        { name: 'Completed', value: 66.67, color: '#38B2AC' },
        { name: 'Driver Assigned', value: 33.33, color: '#63B3ED' }
      ];

      const getStatusColor = (status: string): string => {
        switch (status) {
          case 'Order Placed': return 'bg-emerald-500';
          case 'Delivery Assigned': return 'bg-amber-500';
          case 'Cancelled': return 'bg-red-500';
          default: return 'bg-gray-500';
        }
      };
      
      const renderStars = (rating: number): string => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
      };
      
      const getInitials = (name: string): string => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
      };
      interface CustomTooltipProps {
        active?: boolean;
        payload?: { name: string; value: number }[];
      }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow rounded">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-gray-600">{`${payload[0].value.toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 mx-auto space-y-6 bg-gray-50">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg"
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Stats Grid */}
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <li className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">{stats.orderCount}</p>
              <p className="text-gray-500">ORDERS</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-full">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </li>

        <li className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">{stats.userCount}</p>
              <p className="text-gray-500">USERS</p>
            </div>
            <div className="p-4 bg-cyan-100 rounded-full">
              <Users className="h-6 w-6 text-cyan-600" />
            </div>
          </div>
        </li>

        <li className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">{stats.restaurantCount}</p>
              <p className="text-gray-500">STORES</p>
            </div>
            <div className="p-4 bg-pink-100 rounded-full">
              <Store className="h-6 w-6 text-pink-600" />
            </div>
          </div>
        </li>

        <li className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">
                ₹{stats?.totalEarnings ? stats.totalEarnings.toFixed(2) : "0.00"}
              </p>
              <p className="text-gray-500">EARNINGS</p>
            </div>
            <div className="p-4 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </li>
      </ul>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latest Reviews */}
        <div className="bg-yellow-50 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Latest Reviews</h2>
          {reviews.length > 0 ? (
            <ul className="space-y-4">
              {reviews.map((review: ReviewType) => (
                <li key={review._id} className="border-b pb-4">
                  <div className="space-y-2">
                    <p className="font-medium">Customer: {review.userId.name}</p>
                    <p className="text-sm text-gray-500">comments: #{review.comment}</p>
                    {/* <p className="text-sm text-gray-500">Delivery: {review.deliveryPartner}</p> */}
                    <p className="text-yellow-400">{renderStars(review.menuId.rating)}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-400">
              No reviews yet
            </div>
          )}
        </div>

        {/* Order Status Overview */}
        <div className="bg-blue-50 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Overview Of Order Statuses</h2>
          <div className="flex justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={pieChartData}
                cx={150}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieChartData.map((status, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: status.color }}
                />
                <span className="text-sm text-gray-600">
                  {status.name} ({status.value.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-green-50 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order: OrderType) => (
                <li key={order._id} className="flex items-center space-x-4">
                  <img
                    src={order.restaurant.image || "/api/placeholder/50/50"}
                    alt={order.restaurant.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{order.restaurant.name}</p>
                    <p className="text-sm text-gray-500">
                      #{order.orderId} · ₹{order.totalAmount}
                    </p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(order.status)}`}>
                      {order.orderStatus}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{order.timeElapsed}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-400">
              No orders yet
            </div>
          )}
        </div>

        {/* New Signups */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">New Signups</h2>
          {signups.length > 0 ? (
            <ul className="space-y-4">
              {signups.map((signup: SighupType) => (
                <li key={signup._id} className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-lg font-medium">{getInitials(signup.name)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{signup.name}</p>
                      <span className="text-sm text-gray-500">· {signup.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {signup.role}
                      </span>
                      <span className="text-sm text-gray-500">{signup.createdAt}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-400">
              No new signups
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;