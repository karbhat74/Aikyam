import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowRight, BookOpen, Bus, Coffee, Leaf, MapPin, Share2, Train, Trees as Tree, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import FileUploadButton from "./FileUploadButton";

import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import "./Friends.css"; // Make sure you have this file

const friendsData = [
  {
    name: "Dakshesh S",
    location: "CHITRADURGA",
    imgSrc: "/images/dakshesh.jpg",
    quote:
      "This app is super intuitive and easy to use! Logging my trips has never been this seamless. The design is clean, and I love the CO2 impact tracking feature. Highly recommend!",
  },
  {
    name: "Gowtham D V",
    location: "CHIKMAGALURU",
    imgSrc: "/images/gow.jpg",
    quote:
      "Great concept and execution! The QR scanner makes entering ticket codes hassle-free. Would love to see more transport options added in the future.",
  },
  {
    name: "Adarsh S Naik",
    location: "HONNAVARA",
    imgSrc: "/images/adarsh.jpg",
    quote:
      "Absolutely love how this app promotes eco-friendly commuting! The UI is smooth, and the trip-logging process is straightforward. Looking forward to future updates!",
  },
];

interface Trip {
  type: 'bus' | 'train';
  distance: number;
  savings: number;
  timestamp: Date;
  ticketCode?: string;
}

interface Badge {
  name: string;
  threshold: number;
  icon: string;
}

interface Tip {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface Reward {
  id: number;
  name: string;
  description: string;
  tripCount: number;
  icon: React.ReactNode;
  claimed: boolean;
}

function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [points, setPoints] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedType, setSelectedType] = useState<'bus' | 'train'>('bus');
  const [selectedDistance, setSelectedDistance] = useState(5);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [ticketCode, setTicketCode] = useState('');

  const badges: Badge[] = [
    { name: 'Eco Starter', threshold: 0, icon: '🌱' },
    { name: 'Eco Star', threshold: 50, icon: '⭐' },
    { name: 'Planet Hero', threshold: 100, icon: '🌍' },
    { name: 'Climate Champion', threshold: 200, icon: '👑' },
  ];

  const rewards: Reward[] = [
    { 
      id: 1, 
      name: 'Free Coffee', 
      description: 'Get a free coffee at EcoCafe', 
      tripCount: 10, 
      icon: <Coffee className="w-6 h-6" />,
      claimed: false 
    },
    { 
      id: 2, 
      name: 'Tree Planted', 
      description: 'We\'ll plant a tree in your name', 
      tripCount: 20, 
      icon: <Tree className="w-6 h-6" />,
      claimed: false 
    }
  ];

  const tips: Tip[] = [
    {
      id: 1,
      title: 'Bus vs Car Impact',
      description: 'Did you know? A bus emits 75% less CO2 per passenger than a car. Your bus rides are making a real difference!',
      icon: '🚌'
    },
    {
      id: 2,
      title: 'Train Travel Benefits',
      description: 'Trains are one of the most eco-friendly ways to travel, producing about 90% less emissions than planes for the same journey.',
      icon: '🚂'
    },
    {
      id: 3,
      title: 'Peak Hours',
      description: 'Traveling during off-peak hours not only reduces crowding but also helps transport systems operate more efficiently.',
      icon: '⏰'
    },
    {
      id: 4,
      title: 'Walking Impact',
      description: 'For trips under 2km, walking can save up to 0.5kg of CO2 emissions compared to driving!',
      icon: '👣'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [tips.length]);

  const getCurrentBadge = () => {
    return badges.reduce((acc, badge) => {
      if (points >= badge.threshold) return badge;
      return acc;
    });
  };

  const calculateSavings = (type: 'bus' | 'train', distance: number) => {
    const carEmissions = 0.27; // kg CO2/km
    const emissions = type === 'bus' ? 0.04 : 0.03; // kg CO2/km
    return Number(((carEmissions - emissions) * distance).toFixed(2));
  };

  const logTrip = () => {
    const savings = calculateSavings(selectedType, selectedDistance);
    const newTrip = {
      type: selectedType,
      distance: selectedDistance,
      savings,
      timestamp: new Date(),
      ticketCode: ticketCode || undefined,
    };
    
    setTrips([newTrip, ...trips]);
    setPoints(points + 10);
    setShowModal(false);
    setTicketCode('');
  };

  const totalSavings = trips.reduce((acc, trip) => acc + trip.savings, 0);
  const totalDistance = trips.reduce((acc, trip) => acc + trip.distance, 0);
  const treesEquivalent = Math.floor(totalSavings / 21.7); // Average tree absorbs 21.7 kg CO2 per year
  const carMilesAvoided = Math.floor(totalDistance * 0.62137); // Convert km to miles

  const shareAchievement = () => {
    const text = `I saved ${totalSavings.toFixed(2)} kg CO2 using public transport! That's equivalent to ${treesEquivalent} trees! 🌍 #CoolTheGlobe`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
  };

  const getPersonalizedTip = () => {
    if (trips.length === 0) {
      return "Start your green journey today! Every public transport trip helps reduce carbon emissions.";
    }
    
    const mostUsedType = trips.reduce((acc, trip) => {
      const count = trips.filter(t => t.type === trip.type).length;
      return count > acc.count ? { type: trip.type, count } : acc;
    }, { type: 'bus', count: 0 });

    if (mostUsedType.type === 'bus') {
      return "Great job using the bus! Did you know that trains might save even more CO2 for longer journeys?";
    } else {
      return "You're a train champion! For shorter trips, buses are also an excellent low-carbon option.";
    }
  };

  const getAvailableRewards = () => {
    return rewards.map(reward => ({
      ...reward,
      progress: trips.length,
      isAvailable: trips.length >= reward.tripCount && !reward.claimed
    }));
  };

  function NavigateButtons() {
    const navigate = useNavigate();
    
    return (
      <>
        <button type="button" className="btn btn-outline-primary me-2" onClick={() => navigate("/login")}>
          Login
        </button>
        <button type="button" className="btn btn-primary" onClick={() => navigate("/signup")}>
          Sign-up
        </button>
      </>
    );
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
      
      {/* Header Section
      <header className="p-3 bg-light border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <a href="#" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
              <img
                src="https://w1.pngwing.com/pngs/855/813/png-transparent-green-grass-earth-environmental-protection-energy-conservation-poster-logo-creativity-tree.png"
                alt="Logo"
                width="40"
              />
              <span className="fs-4" style={{ color: "green", marginLeft: "10px" }}>
                Green Track
              </span>
            </a>

            <ul className="nav">
              <li><a href="#" className="nav-link px-2 link-dark">Home</a></li>
              <li><a href="#" className="nav-link px-2 link-dark">About Us</a></li>
              <li><a href="https://www.cooltheglobe.org/about-us" className="nav-link px-2 link-dark">Community</a></li>
              <li><a href="#achievements" className="nav-link px-2 link-dark">Achievements</a></li>
              <li><a href="#services" className="nav-link px-2 link-dark">Services</a></li>
            </ul>

            <div className="text-end">
              <button type="button" className="btn btn-outline-primary me-2">Login</button>
              <button type="button" className="btn btn-primary">Sign-up</button>
            </div>
          </div>
        </div>
      </header>
      <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router> */}

      {/* Main Content
      <div className="container mt-4">
        <h1>Welcome to Green Track</h1>
        <p>Your journey to a greener planet starts here.</p>
      </div> */}
      

      <Router>


          {/* Header Section */}
          <header className="p-3 bg-light border-bottom">
            <div className="container">
              <div className="d-flex flex-wrap align-items-center justify-content-between">
                <a href="#" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                  <img
                    src="https://w1.pngwing.com/pngs/855/813/png-transparent-green-grass-earth-environmental-protection-energy-conservation-poster-logo-creativity-tree.png"
                    alt="Logo"
                    width="40"
                  />
                  <span className="fs-4" style={{ color: "green", marginLeft: "10px" }}>
                    Green Track
                  </span>
                </a>

                <ul className="nav">
                  <li><a href="#" className="nav-link px-2 link-dark">Home</a></li>
                  <li><a href="#about" className="nav-link px-2 link-dark">About Us</a></li>
                  <li><a href="https://www.cooltheglobe.org/about-us" className="nav-link px-2 link-dark">Community</a></li>
                  <li><a href="#achievements" className="nav-link px-2 link-dark">Achievements</a></li>
                  <li><a href="#services" className="nav-link px-2 link-dark">Services</a></li>
                </ul>

                {/* Updated Login & Signup Buttons */}
                <div className="text-end">
                  <NavigateButtons />
                </div>
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>


    </Router>
    

        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">GREEN TRACK</h1>
          <p className="text-gray-600">Track your impact on climate change through smart transportation choices</p>
        </header>

        {/* Education Hub */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-green-600" />
              Carbon Education Hub
            </h2>
            <ArrowRight 
              className="w-5 h-5 text-green-600 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length)}
            />
          </div>
          <div className="relative h-32">
            <div className="absolute w-full transition-opacity duration-500">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <span className="text-4xl">{tips[currentTipIndex].icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{tips[currentTipIndex].title}</h3>
                  <p className="text-gray-600">{tips[currentTipIndex].description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Personalized Tip</h3>
            <p className="text-blue-600">{getPersonalizedTip()}</p>
          </div>
        </div>

        {/* Carbon Education Hub Section */}

        {/* Carbon Education Hub Section */}

{/* About Us Section */}
{/* About Us Section */}
{/* About Us Section */}
<section id="about" className="py-16 bg-white">
  <div className="container mx-auto max-w-5xl bg-white rounded-lg shadow-md p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start">
    {/* Left Side - Image */}
    <div className="flex-1">
      <img 
        className="rounded-lg shadow-md w-full max-w-md" 
        src="https://images.pexels.com/photos/5029853/pexels-photo-5029853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
        alt="Sustainability" 
      />
    </div>

    {/* Right Side - Content */}
    <div className="flex-1 md:pl-12 text-left">
      <h1 className="text-4xl font-bold text-gray-800">
        About <span className="text-green-600">Us</span>
      </h1>
      
      <p className="text-gray-600 leading-relaxed mt-4">
        At <strong>Green Track</strong>, we are dedicated to making a difference in the fight against climate change. 
        Our mission is to <strong>empower individuals and communities</strong> to take meaningful actions toward 
        a more sustainable future.
      </p>

      <h3 className="text-2xl font-semibold text-gray-700 mt-6">What We Do</h3>
      <ul className="text-gray-600 mt-4 space-y-3">
        <li className="flex items-start">
          <span className="text-green-600 text-xl mr-2">✅</span> 
          <strong>Educate & Inspire</strong> – Valuable resources on sustainability and eco-friendly habits.
        </li>
        <li className="flex items-start">
          <span className="text-green-600 text-xl mr-2">✅</span> 
          <strong>Community Engagement</strong> – Connect with like-minded people passionate about the planet.
        </li>
        <li className="flex items-start">
          <span className="text-green-600 text-xl mr-2">✅</span> 
          <strong>Innovative Solutions</strong> – Track and reduce your environmental impact.
        </li>
      </ul>

      <p className="text-gray-600 mt-6">
        Become a part of <strong>Green Track</strong> and take a step towards a cleaner, greener, and more sustainable world. 🌍💚
      </p>

      {/* Social Media Links */}
      <div className="flex space-x-6 mt-6">
        <a href="#" className="hover:opacity-75"><img src="./images/arrow-up-circle.svg" alt="go up" className="w-8 h-8" /></a>
        <a href="https://www.instagram.com/karbhat74?igsh=MWNvZTFhYmYxN2d5Zw==" className="hover:opacity-75"><img src="./images/instagram.svg" alt="Instagram" className="w-8 h-8" /></a>
        <a href="https://www.facebook.com/karthik.as.733450?mibextid=ZbWKwL" className="hover:opacity-75"><img src="./images/facebook.svg" alt="Facebook" className="w-8 h-8" /></a>
        <a href="https://www.linkedin.com/in/karthik-a-s-1a2292263" className="hover:opacity-75"><img src="./images/linkedin.svg" alt="LinkedIn" className="w-8 h-8" /></a>
      </div>
    </div>
  </div>
</section>



{/* Your Environmental Impact Section */}

{/* Your Environmental Impact Section */}


        {/* Environmental Impact Visualization */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Environmental Impact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Tree className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-3xl font-bold text-green-700">{treesEquivalent}</p>
              <p className="text-sm text-green-600">Trees worth of CO2 absorbed</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-3xl font-bold text-blue-700">{carMilesAvoided}</p>
              <p className="text-sm text-blue-600">Car miles avoided</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <Leaf className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-3xl font-bold text-purple-700">{totalSavings.toFixed(1)}</p>
              <p className="text-sm text-purple-600">kg CO2 saved</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Stats Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Your Impact</h2>
                <p className="text-green-600 text-3xl font-bold mt-2">
                  {totalSavings.toFixed(2)} kg CO2 saved
                </p>
              </div>
              <Leaf className="w-12 h-12 text-green-500" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <Leaf className="w-5 h-5" />
                Log My Ride
              </button>
              <button
                onClick={() => setShowWalletModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                Digital Wallet
              </button>
            </div>
          </div>

          {/* Achievements Card */}
          <section id="achievements">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Achievements</h2>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getCurrentBadge().icon}</span>
                <span className="font-medium text-gray-700">{getCurrentBadge().name}</span>
              </div>
              <div className="bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-green-500 rounded-full h-4 transition-all duration-500"
                  style={{ width: `${Math.min((points / badges[badges.length-1].threshold) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{points} points earned</p>
            </div>
            
            <button
              onClick={shareAchievement}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share Achievement
            </button>
          </div>
          </section>
        </div>

        <div>
        <section id="services" className="services py-5">
  <div className="container">
    <h1 className="section-heading text-center mb-4">
      <span>Our </span>Services
    </h1>
    <p className="text-center">
      We offer top-tier, meticulously crafted solutions tailored to meet the high standards of your business.
    </p>
    <div className="row">
      {[ // Service Cards
        {
          title: "Carbon Footprint Tracking",
          imgSrc: "https://www.shutterstock.com/image-vector/reduce-carbon-footprint-vector-illustration-600nw-2345676503.jpg",
          description: "Track your daily transportation emissions and reduce your carbon footprint."
        },
        {
          title: "Eco Friendly Route Suggestion",
          imgSrc: "https://static.vecteezy.com/system/resources/thumbnails/027/800/271/small_2x/green-background-eco-friendly-logo-or-icon-eco-friendly-logo-vector.jpg",
          description: "Get the most sustainable travel routes with minimal environmental impact."
        },
        {
          title: "Smart Ticket Scanner",
          imgSrc: "https://play-lh.googleusercontent.com/2jq_Ws8vDnJxct-Dl35ZRwjGoPP9oBkwHtoWWwuKU1lNbm6M69OUMqNaFUEZuwN3ZuzJ=w240-h480-rw",
          description: "Scan tickets, track trips, and calculate eco savings effortlessly."
        },
        {
          title: "Eco Points",
          imgSrc: "https://i.fbcd.co/products/original/eco-point-1-f4dc4c0c79c5fedcd864997767940c4d040260f01b58b03ad6946293993facf0.jpg",
          description: "Earn and redeem Eco Points for sustainable travel habits."
        }
      ].map((service, index) => (
        <div key={index} className="col-md-3">
          <div className="card text-center p-3 h-100 d-flex flex-column align-items-center">
            <img 
              src={service.imgSrc} 
              alt={service.title} 
              className="mb-3"
              style={{ width: "80px", height: "80px", objectFit: "contain" }}
            />
            <h2 className="fs-5">{service.title}</h2>
            <p className="text-muted">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<div className="App">
      <section id="friends" className="reviews">
        <h1 className="section-heading">
          <span>User</span>Feedback
        </h1>
        <p>Creating endless memories with these three.</p>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="friends-slider"
        >
          {friendsData.map((friend, index) => (
            <SwiperSlide key={index}>
              <div className="slide">
                <img src={friend.imgSrc} alt={friend.name} />
                <p>"{friend.quote}"</p>
                <span>- {friend.name}, {friend.location}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      </div>

        </div>

        {/* Recent Trips */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Trips</h2>
          <div className="space-y-4">
            {trips.map((trip, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {trip.type === 'bus' ? (
                    <Bus className="w-6 h-6 text-blue-500" />
                  ) : (
                    <Train className="w-6 h-6 text-purple-500" />
                  )}
                  <div>
                    <p className="font-medium text-gray-800">
                      {trip.type === 'bus' ? 'Bus' : 'Train'} Journey
                    </p>
                    <p className="text-sm text-gray-600">{trip.distance} km</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">-{trip.savings} kg CO2</p>
                  <p className="text-sm text-gray-600">
                    {new Date(trip.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {trips.length === 0 && (
              <p className="text-center text-gray-500 py-4">No trips logged yet. Start your green journey!</p>
            )}
          </div>
        </div>
      </div>

      {/* Log Trip Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Log Your Trip</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transport Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`p-4 rounded-lg flex items-center justify-center gap-2 ${
                      selectedType === 'bus' 
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setSelectedType('bus')}
                  >
                    <Bus className="w-5 h-5" />
                    Bus
                  </button>
                  <button
                    className={`p-4 rounded-lg flex items-center justify-center gap-2 ${
                      selectedType === 'train'
                        ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setSelectedType('train')}
                  >
                    <Train className="w-5 h-5" />
                    Train
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance (km)
                </label>
                <input
                  type="number"
                  value={selectedDistance}
                  onChange={(e) => setSelectedDistance(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  min="1"
                  max="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Code (Optional)
                </label>
                {/* <div className="flex gap-2">
                  <input
                    type="text"
                    value={ticketCode}
                    onChange={(e) => setTicketCode(e.target.value)}
                    placeholder="Enter ticket code"
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                  />
                  <button className="p-2 bg-gray-100 rounded-lg">
                    <QrCode className="w-5 h-5 text-gray-600" />
                  </button>
                </div> */}
                <div className="app-container">
      <h1 className="text-2xl font-bold">Welcome to My App</h1>

      {/* Use the File Upload Button here */}
      <div className="my-4">
        {/* <input
                    type="text"
                    value={ticketCode}
                    onChange={(e) => setTicketCode(e.target.value)}
                    placeholder="Enter ticket code"
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                  /> */}
        <FileUploadButton />
      </div>
    </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={logTrip}
                  className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Save Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Digital Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Digital Wallet</h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Available Rewards */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Available Rewards</h4>
                <div className="space-y-3">
                  {getAvailableRewards().map((reward) => (
                    <div
                      key={reward.id}
                      className="p-4 border rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-full">
                            {reward.icon}
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800">{reward.name}</h5>
                            <p className="text-sm text-gray-600">{reward.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {reward.progress}/{reward.tripCount} trips
                          </p>
                          {reward.isAvailable && (
                            <button className="mt-2 px-4 py-1 bg-green-500 text-white text-sm rounded-full">
                              Claim
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Tickets */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Recent Tickets</h4>
                <div className="space-y-3">
                  {trips.filter(trip => trip.ticketCode).map((trip, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {trip.type === 'bus' ? (
                          <Bus className="w-6 h-6 text-blue-500" />
                        ) : (
                          <Train className="w-6 h-6 text-purple-500" />
                        )}
                        <div>
                          <p className="font-medium text-gray-800">
                            {trip.type === 'bus' ? 'Bus' : 'Train'} Ticket
                          </p>
                          <p className="text-sm text-gray-600">
                            {trip.ticketCode}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(trip.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  {trips.filter(trip => trip.ticketCode).length === 0 && (
                    <p className="text-center text-gray-500 py-4">No tickets saved yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;