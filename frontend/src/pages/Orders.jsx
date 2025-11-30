import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { toast } from 'react-toastify';

const Orders = () => {
  const { products, currency, isAuthenticated, setShowLoginPopup } = useContext(ShopContext);
  const [trackingOrders, setTrackingOrders] = useState({});

  // Sample order data - in real app, this would come from backend
  const sampleOrders = products.slice(1, 4).map((item, index) => ({
    id: `ORD${1000 + index}`,
    product: item,
    quantity: 1,
    size: 'M',
    date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    status: index === 0 ? 'Ready to ship' : index === 1 ? 'Out for delivery' : 'Delivered',
    trackingSteps: [
      { label: 'Order Placed', completed: true, date: new Date(Date.now() - (index + 3) * 24 * 60 * 60 * 1000).toLocaleDateString() },
      { label: 'Processing', completed: true, date: new Date(Date.now() - (index + 2) * 24 * 60 * 60 * 1000).toLocaleDateString() },
      { label: 'Shipped', completed: index < 2, date: index < 2 ? new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000).toLocaleDateString() : '-' },
      { label: 'Out for Delivery', completed: index === 2, date: index === 2 ? new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString() : '-' },
      { label: 'Delivered', completed: index === 2, date: index === 2 ? new Date().toLocaleDateString() : '-' },
    ]
  }));

  const handleTrackOrder = (orderId) => {
    setTrackingOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
    if (!trackingOrders[orderId]) {
      toast.success('Order tracking opened');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready to ship': return 'bg-blue-500';
      case 'Out for delivery': return 'bg-yellow-500';
      case 'Delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-6">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {!isAuthenticated ? (
        <div className="text-center py-20 border rounded-lg bg-gray-50">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Login to View Orders</h3>
          <p className="text-gray-500 mb-6">Please login to view your order history and track your orders</p>
          <button
            onClick={() => setShowLoginPopup(true)}
            className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-colors rounded"
          >
            LOGIN NOW
          </button>
        </div>
      ) : sampleOrders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">No orders yet</p>
          <button
            onClick={() => window.location.href = '/collection'}
            className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-colors"
          >
            START SHOPPING
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sampleOrders.map((order, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4">
                <div className="flex items-start gap-6 text-sm">
                  <img className="w-16 sm:w-20 rounded" src={order.product.image[0]} alt="" />
                  <div>
                    <p className="sm:text-base font-medium">{order.product.name}</p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                      <p className="text-lg font-semibold">
                        {currency}
                        {order.product.price}
                      </p>
                      <p className="text-sm">Quantity: {order.quantity}</p>
                      <p className="text-sm">Size: {order.size}</p>
                    </div>
                    <p className="mt-2 text-sm">
                      Order ID: <span className="font-medium">{order.id}</span>
                    </p>
                    <p className="text-sm">
                      Date: <span className="text-gray-500">{order.date}</span>
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <p className={`min-w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></p>
                    <p className="text-sm md:text-base font-medium">{order.status}</p>
                  </div>
                  <button
                    onClick={() => handleTrackOrder(order.id)}
                    className="border border-black px-4 py-2 text-sm font-medium rounded hover:bg-black hover:text-white transition-all"
                  >
                    {trackingOrders[order.id] ? 'Hide Tracking' : 'Track Order'}
                  </button>
                </div>
              </div>

              {/* Tracking Timeline */}
              {trackingOrders[order.id] && (
                <div className="border-t pt-4 mt-4 animate-fadeIn">
                  <h3 className="font-semibold mb-4 text-gray-700">Order Tracking</h3>
                  <div className="space-y-4">
                    {order.trackingSteps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              step.completed
                                ? 'bg-green-500 border-green-500'
                                : 'bg-white border-gray-300'
                            }`}
                          ></div>
                          {stepIndex < order.trackingSteps.length - 1 && (
                            <div
                              className={`w-0.5 h-12 ${
                                step.completed ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                            ></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p
                            className={`font-medium ${
                              step.completed ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            {step.label}
                          </p>
                          <p className="text-sm text-gray-500">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                    <p className="font-medium mb-1">Estimated Delivery:</p>
                    <p className="text-gray-600">
                      {order.status === 'Delivered' 
                        ? 'Order has been delivered' 
                        : `${new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;