import { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const EnhancedSearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const location = useLocation();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearch(transcript);
        toast.success(`Searching for: ${transcript}`);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'no-speech') {
          toast.error('No speech detected. Please try again.');
        } else if (event.error === 'not-allowed') {
          toast.error('Microphone access denied. Please enable it in your browser settings.');
        } else {
          toast.error('Voice recognition error. Please try again.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [setSearch]);

  // Voice Search Handler
  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      toast.error('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast.info('Listening... Please speak now');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast.error('Failed to start voice recognition');
      }
    }
  };

  // Camera Search Handler
  const handleCameraSearch = async () => {
    setShowCameraModal(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Camera access denied. Please enable it in your browser settings.');
      setShowCameraModal(false);
    }
  };

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Here you would typically send the image to a backend API for image recognition
          // For now, we'll just show a message
          toast.info('Image uploaded! Visual search feature coming soon.');
          setShowCameraModal(false);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please upload a valid image file');
      }
    }
  };

  // Capture Image from Camera
  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      
      // Here you would typically send the image to a backend API for image recognition
      // For now, we'll just show a message
      toast.info('Image captured! Visual search feature coming soon.');
      closeCamera();
    }
  };

  // Close Camera
  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCameraModal(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      closeCamera();
    };
  }, []);

  return (
    <>
      {showSearch && visible ? (
        <div className="border-t border-b bg-gray-50 text-center py-5">
          <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white shadow-sm">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none bg-inherit text-sm"
              type="text"
              placeholder="Search for products..."
            />
            
            {/* Voice Search Button */}
            <button
              onClick={handleVoiceSearch}
              className={`ml-2 p-1 rounded-full transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'hover:bg-gray-100'
              }`}
              title="Voice Search"
              aria-label="Voice Search"
            >
              <svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Camera Search Button */}
            <button
              onClick={handleCameraSearch}
              className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-all"
              title="Camera Search"
              aria-label="Camera Search"
            >
              <svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Regular Search Icon */}
            <img className="w-4 ml-2" src={assets.search_icon} alt="search" />
          </div>
          
          {/* Close Button */}
          <img
            onClick={() => setShowSearch(false)}
            className="inline w-3 cursor-pointer mt-3 hover:scale-110 transition-transform"
            src={assets.cross_icon}
            alt="close"
          />
        </div>
      ) : null}

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Visual Search</h3>
              <button
                onClick={closeCamera}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex justify-center gap-4">
                <button
                  onClick={captureImage}
                  className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all"
                >
                  Capture & Search
                </button>
                <button
                  onClick={closeCamera}
                  className="border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
              </div>
              
              {/* Upload Image Option */}
              <div className="text-center">
                <p className="text-gray-500 mb-2">or</p>
                <label className="cursor-pointer inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-full transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                    <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                  </svg>
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedSearchBar;
