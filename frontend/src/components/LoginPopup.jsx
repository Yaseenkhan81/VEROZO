import { useState } from 'react';
import { assets } from '../assets/assets';

const LoginPopup = ({ isOpen, onClose, onLogin }) => {
  const [currentState, setCurrentState] = useState('Login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Here you would typically make an API call to authenticate
    // For now, we'll simulate a successful login
    console.log('Form submitted:', formData);
    
    // Simulate login success
    onLogin({
      name: formData.name || 'User',
      email: formData.email
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] sm:max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8 relative animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 prata-regular">
                {currentState}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                {currentState === 'Login' 
                  ? 'Welcome back! Please login to continue' 
                  : 'Create an account to get started'}
              </p>
            </div>

            {currentState === 'Sign Up' && (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                placeholder="Full Name"
                required
              />
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              placeholder="Email Address"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              placeholder="Password"
              required
            />

            {currentState === 'Login' && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              {currentState === 'Login' ? 'Sign In' : 'Create Account'}
            </button>

            <div className="text-center text-sm">
              {currentState === 'Login' ? (
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentState('Sign Up')}
                    className="text-black font-medium hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              ) : (
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentState('Login')}
                    className="text-black font-medium hover:underline"
                  >
                    Login
                  </button>
                </p>
              )}
            </div>

            {/* Guest Option */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Continue as Guest
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;
