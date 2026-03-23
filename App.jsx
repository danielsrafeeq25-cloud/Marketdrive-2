import React, { useState, useEffect } from 'react';
import { Search, Filter, Globe, DollarSign, Phone, Video, Shield, Star, MapPin, Calendar, Eye, Share2, Heart, MessageCircle, Camera, Mic, X, Check, Upload, CreditCard, Lock, Truck, ChevronRight, Menu, User, Bell, Settings, Plus, TrendingUp, Package, Clock, AlertCircle } from 'lucide-react';

// CAPITEC BANKING DETAILS
const BANKING_DETAILS = {
  accountHolder: "MARKETDRIVE PTY LTD",
  bank: "Capitec Bank",
  accountNumber: "1662785710",
  accountType: "Business Account",
  reference: "REG-{userId}" // Dynamic reference per user
};

// Platform fees
const PLATFORM_FEE_PERCENTAGE = 3; // 3% platform fee
const REGISTRATION_FEE = 20; // R20 registration fee

// Currency data
const CURRENCIES = {
  ZA: { code: 'ZAR', symbol: 'R', country: 'South Africa' },
  US: { code: 'USD', symbol: '$', country: 'United States' },
  GB: { code: 'GBP', symbol: '£', country: 'United Kingdom' },
  DE: { code: 'EUR', symbol: '€', country: 'Germany' },
  AE: { code: 'AED', symbol: 'د.إ', country: 'UAE' },
  JP: { code: 'JPY', symbol: '¥', country: 'Japan' },
  AU: { code: 'AUD', symbol: 'A$', country: 'Australia' },
  CA: { code: 'CAD', symbol: 'C$', country: 'Canada' },
};

// Country and city data
const COUNTRIES = {
  ZA: {
    name: 'South Africa',
    cities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth']
  },
  US: {
    name: 'United States',
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami']
  },
  GB: {
    name: 'United Kingdom',
    cities: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Edinburgh']
  },
  DE: {
    name: 'Germany',
    cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne']
  },
  AE: {
    name: 'UAE',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah']
  },
};

// Vehicle brands and models
const BRANDS = {
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Hilux', 'Land Cruiser', 'Prado', 'Fortuner'],
  BMW: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X7', 'M3', 'M5'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS', 'AMG GT'],
  Tesla: ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck'],
  Ferrari: ['488', 'F8', 'SF90', 'Roma', 'Portofino', '812'],
  Lamborghini: ['Huracán', 'Aventador', 'Urus'],
  Porsche: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
  Audi: ['A3', 'A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron'],
  Ford: ['F-150', 'Mustang', 'Explorer', 'Ranger', 'Bronco'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V'],
};

// Demo listings
const DEMO_LISTINGS = [
  {
    id: 1,
    title: '2023 BMW M5 Competition',
    brand: 'BMW',
    model: 'M5',
    year: 2023,
    price: 1850000,
    currency: 'ZAR',
    country: 'ZA',
    city: 'Cape Town',
    type: 'Sports Car',
    mileage: 8500,
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    seller: 'Premium Motors SA',
    verified: true,
    featured: true,
    views: 2847,
    worldwide: true,
    description: 'Full carbon fiber package, executive seating, night vision'
  },
  {
    id: 2,
    title: '2024 Tesla Model S Plaid',
    brand: 'Tesla',
    model: 'Model S',
    year: 2024,
    price: 95000,
    currency: 'USD',
    country: 'US',
    city: 'Los Angeles',
    type: 'Electric',
    mileage: 1200,
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800',
    seller: 'Tesla Direct LA',
    verified: true,
    featured: true,
    views: 5234,
    worldwide: true,
    description: 'Tri-Motor AWD, 1020hp, Full Self-Driving, white interior'
  },
  {
    id: 3,
    title: '2022 Lamborghini Huracán EVO',
    brand: 'Lamborghini',
    model: 'Huracán',
    year: 2022,
    price: 165000,
    currency: 'GBP',
    country: 'GB',
    city: 'London',
    type: 'Sports Car',
    mileage: 3400,
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800',
    seller: 'Luxury Motors UK',
    verified: true,
    featured: false,
    views: 8921,
    worldwide: true,
    description: 'Giallo Orion yellow, carbon ceramic brakes, lifting system'
  },
  {
    id: 4,
    title: '2023 Toyota Land Cruiser 300',
    brand: 'Toyota',
    model: 'Land Cruiser',
    year: 2023,
    price: 1250000,
    currency: 'ZAR',
    country: 'ZA',
    city: 'Johannesburg',
    type: '4x4',
    mileage: 12000,
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    seller: 'Safari Autos JHB',
    verified: true,
    featured: false,
    views: 1876,
    worldwide: true,
    description: 'GR-Sport, off-road package, full service history'
  },
  {
    id: 5,
    title: '2024 Porsche Taycan Turbo S',
    brand: 'Porsche',
    model: 'Taycan',
    year: 2024,
    price: 185000,
    currency: 'EUR',
    country: 'DE',
    city: 'Munich',
    type: 'Electric',
    mileage: 2100,
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800',
    seller: 'Porsche Zentrum München',
    verified: true,
    featured: true,
    views: 6543,
    worldwide: true,
    description: '761hp, Sport Chrono, Burmester audio, ceramic brakes'
  },
  {
    id: 6,
    title: '2023 Mercedes-AMG GT 63 S',
    brand: 'Mercedes',
    model: 'AMG GT',
    year: 2023,
    price: 420000,
    currency: 'AED',
    country: 'AE',
    city: 'Dubai',
    type: 'Sports Car',
    mileage: 5600,
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    seller: 'Elite Motors Dubai',
    verified: true,
    featured: false,
    views: 4231,
    worldwide: true,
    description: '4-door coupe, 639hp, Designo interior, carbon package'
  },
  {
    id: 7,
    title: '2022 Ford F-150 Raptor',
    brand: 'Ford',
    model: 'F-150',
    year: 2022,
    price: 78000,
    currency: 'USD',
    country: 'US',
    city: 'Houston',
    type: '4x4',
    mileage: 18000,
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    seller: 'Texas Trucks',
    verified: true,
    featured: false,
    views: 3124,
    worldwide: false,
    description: 'SuperCrew, twin-turbo V6, Fox shocks, Recaro seats'
  },
  {
    id: 8,
    title: '2024 Audi e-tron GT',
    brand: 'Audi',
    model: 'e-tron',
    year: 2024,
    price: 98000,
    currency: 'GBP',
    country: 'GB',
    city: 'Manchester',
    type: 'Electric',
    mileage: 800,
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f8172?w=800',
    seller: 'Audi Manchester',
    verified: true,
    featured: false,
    views: 2187,
    worldwide: true,
    description: 'Quattro AWD, 522hp, Matrix LED, virtual cockpit'
  },
  {
    id: 9,
    title: '2023 Toyota Hilux GR-Sport',
    brand: 'Toyota',
    model: 'Hilux',
    year: 2023,
    price: 785000,
    currency: 'ZAR',
    country: 'ZA',
    city: 'Durban',
    type: '4x4',
    mileage: 15000,
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    seller: 'Coastal Autos KZN',
    verified: true,
    featured: false,
    views: 1543,
    worldwide: false,
    description: 'Double cab, automatic, tow bar, canopy, service plan'
  }
];

const VEHICLE_TYPES = ['All', 'Sedan', 'SUV', 'Electric', 'Sports Car', '4x4', 'Luxury'];

export default function MarketDrive() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCountry, setSelectedCountry] = useState('ZA');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState('card-entry');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [registrationStep, setRegistrationStep] = useState(0);
  const [registrationData, setRegistrationData] = useState({});
  const [listingStep, setListingStep] = useState(0);
  const [listingData, setListingData] = useState({});
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [likedListings, setLikedListings] = useState([]);

  // Video call timer
  useEffect(() => {
    let interval;
    if (showVideoCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [showVideoCall]);

  // Format time for video call
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format price with currency
  const formatPrice = (price, currency) => {
    const currencyData = Object.values(CURRENCIES).find(c => c.code === currency);
    return `${currencyData?.symbol || '$'}${price.toLocaleString()}`;
  };

  // Calculate platform fee
  const calculateFee = (price) => {
    return Math.round(price * (PLATFORM_FEE_PERCENTAGE / 100));
  };

  // Filter and sort listings
  const getFilteredListings = () => {
    let filtered = [...DEMO_LISTINGS];

    if (selectedCountry) {
      filtered = filtered.filter(l => l.country === selectedCountry);
    }
    if (selectedCity) {
      filtered = filtered.filter(l => l.city === selectedCity);
    }
    if (selectedBrand) {
      filtered = filtered.filter(l => l.brand === selectedBrand);
    }
    if (selectedType !== 'All') {
      filtered = filtered.filter(l => l.type === selectedType);
    }
    if (searchQuery) {
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'views') {
      filtered.sort((a, b) => b.views - a.views);
    } else {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  };

  // Banking payment component
  const BankingPayment = ({ amount, reference }) => (
    <div className="banking-payment">
      <div className="banking-header">
        <Lock size={24} />
        <h3>Bank Transfer Payment</h3>
      </div>
      <div className="banking-details">
        <div className="detail-row">
          <span className="label">Bank:</span>
          <span className="value">{BANKING_DETAILS.bank}</span>
        </div>
        <div className="detail-row">
          <span className="label">Account Holder:</span>
          <span className="value">{BANKING_DETAILS.accountHolder}</span>
        </div>
        <div className="detail-row highlight">
          <span className="label">Account Number:</span>
          <span className="value">{BANKING_DETAILS.accountNumber}</span>
        </div>
        <div className="detail-row">
          <span className="label">Account Type:</span>
          <span className="value">{BANKING_DETAILS.accountType}</span>
        </div>
        <div className="detail-row highlight">
          <span className="label">Reference:</span>
          <span className="value">{reference}</span>
        </div>
        <div className="detail-row total">
          <span className="label">Amount to Transfer:</span>
          <span className="value">R {amount.toLocaleString()}</span>
        </div>
      </div>
      <div className="banking-instructions">
        <AlertCircle size={18} />
        <p>Please use the reference number exactly as shown for payment tracking</p>
      </div>
    </div>
  );

  // Render different pages
  const renderContent = () => {
    switch(currentPage) {
      case 'home':
        return renderHome();
      case 'listing':
        return renderListingDetail();
      case 'register':
        return renderRegistration();
      case 'post':
        return renderPostListing();
      case 'messages':
        return renderMessages();
      case 'profile':
        return renderProfile();
      default:
        return renderHome();
    }
  };

  const renderHome = () => {
    const listings = getFilteredListings();

    return (
      <div className="home-page">
        {/* Hero Section */}
        <div className="hero">
          <div className="hero-content">
            <h1>
              <span className="gradient-text">Global Vehicle</span>
              <br />
              Marketplace
            </h1>
            <p>Buy and sell premium vehicles worldwide with secure escrow payments</p>
            <div className="hero-stats">
              <div className="stat">
                <Globe size={20} />
                <span>80+ Countries</span>
              </div>
              <div className="stat">
                <Shield size={20} />
                <span>Secure Escrow</span>
              </div>
              <div className="stat">
                <Video size={20} />
                <span>Live Video Calls</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <label>Country</label>
            <select value={selectedCountry} onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedCity('');
            }}>
              {Object.entries(COUNTRIES).map(([code, data]) => (
                <option key={code} value={code}>{data.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>City</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">All Cities</option>
              {COUNTRIES[selectedCountry]?.cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Brand</label>
            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              <option value="">All Brands</option>
              {Object.keys(BRANDS).map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>

        {/* Vehicle Type Chips */}
        <div className="type-chips">
          {VEHICLE_TYPES.map(type => (
            <button
              key={type}
              className={`chip ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="results-header">
          <h2>{listings.length} Vehicles Found</h2>
        </div>

        {/* Listings Grid */}
        <div className="listings-grid">
          {listings.map(listing => (
            <div key={listing.id} className="listing-card" onClick={() => {
              setSelectedListing(listing);
              setCurrentPage('listing');
            }}>
              {listing.featured && (
                <div className="featured-badge">
                  <Star size={14} fill="currentColor" />
                  Featured
                </div>
              )}
              {listing.worldwide && (
                <div className="worldwide-badge">
                  <Truck size={14} />
                  Worldwide
                </div>
              )}
              <div className="card-image">
                <img src={listing.image} alt={listing.title} />
                <button
                  className={`like-btn ${likedListings.includes(listing.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLikedListings(prev =>
                      prev.includes(listing.id)
                        ? prev.filter(id => id !== listing.id)
                        : [...prev, listing.id]
                    );
                  }}
                >
                  <Heart size={20} fill={likedListings.includes(listing.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3>{listing.title}</h3>
                  {listing.verified && (
                    <Shield size={16} className="verified-icon" />
                  )}
                </div>
                <div className="card-details">
                  <div className="detail">
                    <MapPin size={14} />
                    <span>{listing.city}, {COUNTRIES[listing.country]?.name}</span>
                  </div>
                  <div className="detail">
                    <Calendar size={14} />
                    <span>{listing.year} • {listing.mileage.toLocaleString()} km</span>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="price">
                    {formatPrice(listing.price, listing.currency)}
                  </div>
                  <div className="views">
                    <Eye size={14} />
                    {listing.views.toLocaleString()}
                  </div>
                </div>
                <div className="seller-info">
                  <span>{listing.seller}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListingDetail = () => {
    if (!selectedListing) return null;

    const platformFee = calculateFee(selectedListing.price);
    const total = selectedListing.price;

    return (
      <div className="listing-detail">
        <button className="back-btn" onClick={() => setCurrentPage('home')}>
          ← Back to Listings
        </button>

        <div className="detail-grid">
          <div className="detail-main">
            <div className="detail-image">
              <img src={selectedListing.image} alt={selectedListing.title} />
              {selectedListing.featured && (
                <div className="featured-badge">
                  <Star size={16} fill="currentColor" />
                  Featured
                </div>
              )}
            </div>

            <div className="detail-header">
              <div>
                <h1>{selectedListing.title}</h1>
                <div className="detail-meta">
                  <span><MapPin size={16} /> {selectedListing.city}, {COUNTRIES[selectedListing.country]?.name}</span>
                  <span><Calendar size={16} /> {selectedListing.year}</span>
                  <span><Eye size={16} /> {selectedListing.views.toLocaleString()} views</span>
                </div>
              </div>
              <div className="price-large">
                {formatPrice(selectedListing.price, selectedListing.currency)}
              </div>
            </div>

            <div className="detail-specs">
              <div className="spec">
                <label>Mileage</label>
                <value>{selectedListing.mileage.toLocaleString()} km</value>
              </div>
              <div className="spec">
                <label>Condition</label>
                <value>{selectedListing.condition}</value>
              </div>
              <div className="spec">
                <label>Type</label>
                <value>{selectedListing.type}</value>
              </div>
              <div className="spec">
                <label>Brand</label>
                <value>{selectedListing.brand}</value>
              </div>
            </div>

            <div className="detail-description">
              <h3>Description</h3>
              <p>{selectedListing.description}</p>
            </div>

            {selectedListing.worldwide && (
              <div className="shipping-info">
                <Truck size={20} />
                <div>
                  <h4>Worldwide Shipping Available</h4>
                  <p>We can ship this vehicle anywhere in the world using trusted carriers</p>
                </div>
              </div>
            )}
          </div>

          <div className="detail-sidebar">
            <div className="seller-card">
              <div className="seller-header">
                <div className="seller-avatar">
                  {selectedListing.seller[0]}
                </div>
                <div>
                  <h3>{selectedListing.seller}</h3>
                  {selectedListing.verified && (
                    <div className="verified-badge">
                      <Shield size={14} />
                      Verified Seller
                    </div>
                  )}
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="btn-primary"
                  onClick={() => setShowPayment(true)}
                >
                  <CreditCard size={18} />
                  Buy with Escrow
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setShowVideoCall(true)}
                >
                  <Video size={18} />
                  Video Call
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setCurrentPage('messages')}
                >
                  <MessageCircle size={18} />
                  Message
                </button>
                <button className="btn-secondary">
                  <Share2 size={18} />
                  Share
                </button>
              </div>

              <div className="trust-signals">
                <div className="signal">
                  <Shield size={18} />
                  <span>Secure Escrow Payment</span>
                </div>
                <div className="signal">
                  <Lock size={18} />
                  <span>Payment Protection</span>
                </div>
                <div className="signal">
                  <Truck size={18} />
                  <span>Tracked Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPayment && (
          <div className="modal-overlay" onClick={() => setShowPayment(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowPayment(false)}>
                <X size={24} />
              </button>

              <h2>Secure Escrow Payment</h2>

              {paymentStep === 'card-entry' && (
                <div className="payment-content">
                  <div className="card-preview">
                    <div className="card-chip"></div>
                    <div className="card-number">
                      {cardDetails.number || '**** **** **** ****'}
                    </div>
                    <div className="card-info">
                      <div>
                        <div className="label">Cardholder</div>
                        <div>{cardDetails.name || 'YOUR NAME'}</div>
                      </div>
                      <div>
                        <div className="label">Expires</div>
                        <div>{cardDetails.expiry || 'MM/YY'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="payment-form">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength="5"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength="3"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      />
                    </div>

                    <div className="payment-breakdown">
                      <div className="breakdown-row">
                        <span>Vehicle Price</span>
                        <span>{formatPrice(selectedListing.price, selectedListing.currency)}</span>
                      </div>
                      <div className="breakdown-row fee">
                        <span>Platform Fee (3%)</span>
                        <span>{formatPrice(platformFee, selectedListing.currency)}</span>
                      </div>
                      <div className="breakdown-row total">
                        <span>Total</span>
                        <span>{formatPrice(total, selectedListing.currency)}</span>
                      </div>
                    </div>

                    <button
                      className="btn-primary full-width"
                      onClick={() => setPaymentStep('escrow-flow')}
                    >
                      Continue to Escrow
                    </button>
                  </div>
                </div>
              )}

              {paymentStep === 'escrow-flow' && (
                <div className="escrow-flow">
                  <div className="escrow-steps">
                    <div className="step active">
                      <div className="step-icon">1</div>
                      <div className="step-content">
                        <h4>Payment Captured</h4>
                        <p>Your payment is securely held</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-icon">2</div>
                      <div className="step-content">
                        <h4>Seller Notified</h4>
                        <p>Seller prepares the vehicle</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-icon">3</div>
                      <div className="step-content">
                        <h4>Vehicle Shipped</h4>
                        <p>Tracking link provided</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-icon">4</div>
                      <div className="step-content">
                        <h4>Delivery Confirmed</h4>
                        <p>You confirm receipt</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-icon">5</div>
                      <div className="step-content">
                        <h4>Payment Released</h4>
                        <p>Seller receives funds</p>
                      </div>
                    </div>
                  </div>

                  <div className="shipping-options">
                    <h3>Shipping Method</h3>
                    <div className="shipping-option">
                      <input type="radio" name="shipping" id="dhl" defaultChecked />
                      <label htmlFor="dhl">
                        <strong>DHL Express</strong>
                        <span>7-10 business days • Tracked & Insured</span>
                      </label>
                    </div>
                    <div className="shipping-option">
                      <input type="radio" name="shipping" id="fedex" />
                      <label htmlFor="fedex">
                        <strong>FedEx International</strong>
                        <span>5-7 business days • Premium Service</span>
                      </label>
                    </div>
                    <div className="shipping-option">
                      <input type="radio" name="shipping" id="ups" />
                      <label htmlFor="ups">
                        <strong>UPS Worldwide</strong>
                        <span>6-9 business days • Full Coverage</span>
                      </label>
                    </div>
                  </div>

                  <button
                    className="btn-primary full-width"
                    onClick={() => {
                      alert('Purchase confirmed! Escrow payment initiated.');
                      setShowPayment(false);
                      setPaymentStep('card-entry');
                    }}
                  >
                    Confirm Purchase
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Video Call Modal */}
        {showVideoCall && (
          <div className="video-call-overlay">
            <div className="video-call">
              <div className="video-main">
                <div className="remote-video">
                  <div className="video-placeholder">
                    <User size={80} />
                    <p>{selectedListing.seller}</p>
                    <div className="connection-pulse"></div>
                  </div>
                </div>
                <div className="local-video">
                  <div className="video-placeholder small">
                    <User size={40} />
                  </div>
                </div>
              </div>

              <div className="call-controls">
                <div className="call-info">
                  <span className="call-duration">{formatTime(callDuration)}</span>
                  <span className="call-status">Connected</span>
                </div>

                <div className="control-buttons">
                  <button
                    className={`control-btn ${isMuted ? 'active' : ''}`}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    <Mic size={24} />
                  </button>
                  <button
                    className={`control-btn ${!isCameraOn ? 'active' : ''}`}
                    onClick={() => setIsCameraOn(!isCameraOn)}
                  >
                    <Camera size={24} />
                  </button>
                  <button
                    className="control-btn end-call"
                    onClick={() => setShowVideoCall(false)}
                  >
                    <Phone size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderRegistration = () => {
    const steps = ['Personal Info', 'Location', 'Verification', 'Documents', 'Payment'];
    const userId = 'USER' + Math.floor(Math.random() * 100000);

    return (
      <div className="registration-page">
        <div className="registration-container">
          <h1>Seller Registration</h1>
          <p className="subtitle">Join the global marketplace</p>

          <div className="progress-bar">
            {steps.map((step, index) => (
              <div key={index} className={`progress-step ${index <= registrationStep ? 'active' : ''}`}>
                <div className="step-number">{index + 1}</div>
                <div className="step-label">{step}</div>
              </div>
            ))}
          </div>

          <div className="registration-form">
            {registrationStep === 0 && (
              <div className="step-content">
                <h2>Personal Information</h2>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="+27 123 456 789" />
                </div>
              </div>
            )}

            {registrationStep === 1 && (
              <div className="step-content">
                <h2>Location</h2>
                <div className="form-group">
                  <label>Country</label>
                  <select>
                    {Object.entries(COUNTRIES).map(([code, data]) => (
                      <option key={code} value={code}>{data.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>City</label>
                  <select>
                    {COUNTRIES['ZA'].cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" placeholder="Street address" />
                </div>
              </div>
            )}

            {registrationStep === 2 && (
              <div className="step-content">
                <h2>Verification</h2>
                <div className="verification-info">
                  <Shield size={48} />
                  <h3>Identity Verification Required</h3>
                  <p>To ensure marketplace safety, we verify all sellers.</p>
                  <ul className="verification-list">
                    <li><Check size={16} /> Government-issued ID</li>
                    <li><Check size={16} /> Selfie verification</li>
                    <li><Check size={16} /> POPIA/GDPR compliant</li>
                  </ul>
                </div>
              </div>
            )}

            {registrationStep === 3 && (
              <div className="step-content">
                <h2>Upload Documents</h2>
                <div className="upload-section">
                  <div className="upload-box">
                    <Upload size={32} />
                    <h4>ID Document</h4>
                    <p>Driver's license, passport, or national ID</p>
                    <button className="btn-secondary">Choose File</button>
                  </div>
                  <div className="upload-box">
                    <Camera size={32} />
                    <h4>Selfie Photo</h4>
                    <p>Clear photo of your face</p>
                    <button className="btn-secondary">Take Photo</button>
                  </div>
                </div>
                <div className="gdpr-notice">
                  <AlertCircle size={18} />
                  <p>Your documents are encrypted and stored securely. We comply with POPIA and GDPR regulations.</p>
                </div>
              </div>
            )}

            {registrationStep === 4 && (
              <div className="step-content">
                <h2>Registration Fee</h2>
                <div className="fee-info">
                  <div className="fee-amount">
                    <span className="currency">R</span>
                    <span className="amount">{REGISTRATION_FEE}</span>
                  </div>
                  <p>One-time registration fee to verify your account</p>
                </div>

                <BankingPayment 
                  amount={REGISTRATION_FEE} 
                  reference={`REG-${userId}`} 
                />

                <div className="payment-confirmation">
                  <h4>After Payment</h4>
                  <ol>
                    <li>Complete the bank transfer using the details above</li>
                    <li>Keep your payment reference for tracking</li>
                    <li>Your account will be activated within 24 hours</li>
                    <li>You'll receive a confirmation email</li>
                  </ol>
                </div>
              </div>
            )}

            <div className="step-actions">
              {registrationStep > 0 && (
                <button
                  className="btn-secondary"
                  onClick={() => setRegistrationStep(registrationStep - 1)}
                >
                  Back
                </button>
              )}
              {registrationStep < steps.length - 1 ? (
                <button
                  className="btn-primary"
                  onClick={() => setRegistrationStep(registrationStep + 1)}
                >
                  Continue
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={() => {
                    alert('Registration submitted! Please complete the bank transfer.');
                    setCurrentPage('home');
                    setRegistrationStep(0);
                  }}
                >
                  Complete Registration
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPostListing = () => {
    const steps = ['Vehicle Info', 'Details', 'Pricing', 'Photos', 'Review'];
    const estimatedPrice = listingData.price || 0;
    const platformFee = calculateFee(estimatedPrice);
    const sellerReceives = estimatedPrice - platformFee;

    return (
      <div className="post-listing-page">
        <div className="post-container">
          <h1>Post a Listing</h1>
          <p className="subtitle">Sell your vehicle to buyers worldwide</p>

          <div className="progress-bar">
            {steps.map((step, index) => (
              <div key={index} className={`progress-step ${index <= listingStep ? 'active' : ''}`}>
                <div className="step-number">{index + 1}</div>
                <div className="step-label">{step}</div>
              </div>
            ))}
          </div>

          <div className="listing-form">
            {listingStep === 0 && (
              <div className="step-content">
                <h2>Vehicle Information</h2>
                <div className="form-group">
                  <label>Brand</label>
                  <select onChange={(e) => setListingData({...listingData, brand: e.target.value})}>
                    <option value="">Select Brand</option>
                    {Object.keys(BRANDS).map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Model</label>
                  <select onChange={(e) => setListingData({...listingData, model: e.target.value})}>
                    <option value="">Select Model</option>
                    {listingData.brand && BRANDS[listingData.brand]?.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Year</label>
                    <input type="number" placeholder="2023" min="1900" max="2026" />
                  </div>
                  <div className="form-group">
                    <label>Mileage (km)</label>
                    <input type="number" placeholder="50000" />
                  </div>
                </div>
              </div>
            )}

            {listingStep === 1 && (
              <div className="step-content">
                <h2>Vehicle Details</h2>
                <div className="form-group">
                  <label>Type</label>
                  <select>
                    {VEHICLE_TYPES.filter(t => t !== 'All').map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Condition</label>
                  <select>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea rows="5" placeholder="Describe your vehicle in detail..."></textarea>
                </div>
                <div className="form-group checkbox">
                  <input type="checkbox" id="worldwide" />
                  <label htmlFor="worldwide">Offer worldwide shipping</label>
                </div>
              </div>
            )}

            {listingStep === 2 && (
              <div className="step-content">
                <h2>Pricing</h2>
                <div className="form-group">
                  <label>Currency</label>
                  <select onChange={(e) => setListingData({...listingData, currency: e.target.value})}>
                    {Object.entries(CURRENCIES).map(([code, data]) => (
                      <option key={code} value={data.code}>{data.code} - {data.country}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    onChange={(e) => setListingData({...listingData, price: parseInt(e.target.value) || 0})}
                  />
                </div>

                <div className="price-calculator">
                  <h3>Fee Breakdown</h3>
                  <div className="calc-row">
                    <span>Listing Price</span>
                    <span>{estimatedPrice.toLocaleString()}</span>
                  </div>
                  <div className="calc-row fee">
                    <span>Platform Fee (3%)</span>
                    <span>- {platformFee.toLocaleString()}</span>
                  </div>
                  <div className="calc-row total">
                    <span>You Receive</span>
                    <span>{sellerReceives.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {listingStep === 3 && (
              <div className="step-content">
                <h2>Photos</h2>
                <div className="photo-upload-grid">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="photo-upload-box">
                      <Upload size={32} />
                      <p>Photo {i}</p>
                      <button className="btn-secondary small">Upload</button>
                    </div>
                  ))}
                </div>
                <p className="upload-tip">Upload high-quality photos from multiple angles</p>
              </div>
            )}

            {listingStep === 4 && (
              <div className="step-content">
                <h2>Review & Publish</h2>
                <div className="review-summary">
                  <div className="summary-section">
                    <h3>Vehicle Information</h3>
                    <p>{listingData.brand} {listingData.model}</p>
                  </div>
                  <div className="summary-section">
                    <h3>Pricing</h3>
                    <p>Listed at: {estimatedPrice.toLocaleString()}</p>
                    <p>You receive: {sellerReceives.toLocaleString()} (after 3% fee)</p>
                  </div>
                  <div className="terms">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">I agree to the MARKETDRIVE terms and conditions</label>
                  </div>
                </div>
              </div>
            )}

            <div className="step-actions">
              {listingStep > 0 && (
                <button
                  className="btn-secondary"
                  onClick={() => setListingStep(listingStep - 1)}
                >
                  Back
                </button>
              )}
              {listingStep < steps.length - 1 ? (
                <button
                  className="btn-primary"
                  onClick={() => setListingStep(listingStep + 1)}
                >
                  Continue
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={() => {
                    alert('Listing published successfully!');
                    setCurrentPage('home');
                    setListingStep(0);
                  }}
                >
                  Publish Listing
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMessages = () => {
    const conversations = [
      { id: 1, name: 'Premium Motors SA', lastMessage: 'The vehicle is still available', time: '2m ago', unread: 2 },
      { id: 2, name: 'Tesla Direct LA', lastMessage: 'When can we schedule a call?', time: '1h ago', unread: 0 },
      { id: 3, name: 'Luxury Motors UK', lastMessage: 'Price is negotiable', time: '3h ago', unread: 1 },
    ];

    const messages = [
      { from: 'them', text: 'Hi! Is the BMW still available?', time: '10:23 AM' },
      { from: 'me', text: 'Yes, it is! Would you like to schedule a video call?', time: '10:25 AM' },
      { from: 'them', text: 'That would be great. Also, do you ship internationally?', time: '10:27 AM' },
      { from: 'me', text: 'Absolutely! We can ship worldwide with full tracking and insurance.', time: '10:28 AM' },
    ];

    return (
      <div className="messages-page">
        <div className="messages-container">
          <div className="conversations-list">
            <h2>Messages</h2>
            {conversations.map(conv => (
              <div key={conv.id} className="conversation-item">
                <div className="conv-avatar">{conv.name[0]}</div>
                <div className="conv-content">
                  <div className="conv-header">
                    <h4>{conv.name}</h4>
                    <span className="conv-time">{conv.time}</span>
                  </div>
                  <p className="conv-message">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="unread-badge">{conv.unread}</div>
                )}
              </div>
            ))}
          </div>

          <div className="chat-area">
            <div className="chat-header">
              <div className="chat-user">
                <div className="chat-avatar">P</div>
                <div>
                  <h3>Premium Motors SA</h3>
                  <span className="status online">Online</span>
                </div>
              </div>
              <button className="btn-secondary" onClick={() => setShowVideoCall(true)}>
                <Video size={18} />
                Video Call
              </button>
            </div>

            <div className="messages-list">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.from}`}>
                  <div className="message-content">
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="message-input">
              <input type="text" placeholder="Type a message..." />
              <button className="btn-primary">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar large">
              <User size={48} />
            </div>
            <div className="profile-info">
              <h1>John Doe</h1>
              <p>Member since March 2024</p>
              <div className="profile-badges">
                <div className="badge verified">
                  <Shield size={16} />
                  Verified Seller
                </div>
              </div>
            </div>
            <button className="btn-secondary">
              <Settings size={18} />
              Edit Profile
            </button>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <Package size={24} />
              <div>
                <h3>5</h3>
                <p>Active Listings</p>
              </div>
            </div>
            <div className="stat-card">
              <TrendingUp size={24} />
              <div>
                <h3>12</h3>
                <p>Completed Sales</p>
              </div>
            </div>
            <div className="stat-card">
              <Eye size={24} />
              <div>
                <h3>24.5K</h3>
                <p>Total Views</p>
              </div>
            </div>
            <div className="stat-card">
              <Star size={24} />
              <div>
                <h3>4.9</h3>
                <p>Rating</p>
              </div>
            </div>
          </div>

          <div className="profile-content">
            <div className="activity-feed">
              <h2>Recent Activity</h2>
              <div className="activity-item">
                <Clock size={18} />
                <div>
                  <p>New message from <strong>Premium Motors</strong></p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <Eye size={18} />
                <div>
                  <p>Your listing <strong>BMW M5</strong> received 45 new views</p>
                  <span>5 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <Heart size={18} />
                <div>
                  <p>Someone liked your <strong>Tesla Model S</strong></p>
                  <span>1 day ago</span>
                </div>
              </div>
            </div>

            <div className="settings-panel">
              <h2>Settings</h2>
              <div className="setting-item">
                <div>
                  <h4>Email Notifications</h4>
                  <p>Receive updates about your listings</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="setting-item">
                <div>
                  <h4>SMS Alerts</h4>
                  <p>Get text messages for important events</p>
                </div>
                <input type="checkbox" />
              </div>
              <div className="setting-item">
                <div>
                  <h4>Auto-reply</h4>
                  <p>Send automatic responses to inquiries</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="marketdrive">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={() => setCurrentPage('home')}>
            <Globe size={28} />
            <span>MARKETDRIVE</span>
          </div>

          <nav className="desktop-nav">
            <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'active' : ''}>
              Browse
            </button>
            <button onClick={() => setCurrentPage('post')} className={currentPage === 'post' ? 'active' : ''}>
              <Plus size={18} />
              Sell
            </button>
            <button onClick={() => setCurrentPage('messages')} className={currentPage === 'messages' ? 'active' : ''}>
              <MessageCircle size={18} />
              Messages
            </button>
          </nav>

          <div className="header-actions">
            <button className="btn-secondary" onClick={() => setCurrentPage('register')}>
              Register
            </button>
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <button className="icon-btn" onClick={() => setCurrentPage('profile')}>
              <User size={20} />
            </button>
            <button className="icon-btn mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <Menu size={24} />
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="mobile-menu">
            <button onClick={() => { setCurrentPage('home'); setShowMobileMenu(false); }}>
              Browse Vehicles
            </button>
            <button onClick={() => { setCurrentPage('post'); setShowMobileMenu(false); }}>
              Sell Vehicle
            </button>
            <button onClick={() => { setCurrentPage('messages'); setShowMobileMenu(false); }}>
              Messages
            </button>
            <button onClick={() => { setCurrentPage('register'); setShowMobileMenu(false); }}>
              Register as Seller
            </button>
            <button onClick={() => { setCurrentPage('profile'); setShowMobileMenu(false); }}>
              My Profile
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MARKETDRIVE</h3>
            <p>Global vehicle marketplace with secure escrow payments</p>
          </div>
          <div className="footer-section">
            <h4>Platform</h4>
            <a href="#">How It Works</a>
            <a href="#">Fees</a>
            <a href="#">Security</a>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
            <a href="#">Terms</a>
          </div>
          <div className="footer-section">
            <h4>Banking Details</h4>
            <p><strong>{BANKING_DETAILS.bank}</strong></p>
            <p>Account: {BANKING_DETAILS.accountNumber}</p>
            <p>{BANKING_DETAILS.accountHolder}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 MARKETDRIVE. All rights reserved.</p>
          <p>Secure payments • 80+ countries • Verified sellers</p>
        </div>
      </footer>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .marketdrive {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
        }

        /* Header */
        .header {
          background: #111;
          border-bottom: 1px solid #222;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .desktop-nav {
          display: flex;
          gap: 1rem;
        }

        .desktop-nav button {
          background: transparent;
          border: none;
          color: #aaa;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        .desktop-nav button:hover,
        .desktop-nav button.active {
          background: #1a1a1a;
          color: #00d4ff;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-primary, .btn-secondary {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          color: #000;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
        }

        .btn-secondary {
          background: #1a1a1a;
          color: #fff;
          border: 1px solid #333;
        }

        .btn-secondary:hover {
          background: #222;
          border-color: #00d4ff;
        }

        .icon-btn {
          background: #1a1a1a;
          border: 1px solid #333;
          color: #aaa;
          padding: 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: #222;
          color: #00d4ff;
          border-color: #00d4ff;
        }

        .mobile-menu-btn {
          display: none;
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: #0d0d0d;
          border-top: 1px solid #222;
        }

        .mobile-menu button {
          background: #1a1a1a;
          border: 1px solid #333;
          color: #fff;
          padding: 1rem;
          border-radius: 8px;
          cursor: pointer;
          text-align: left;
        }

        /* Main Content */
        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          min-height: calc(100vh - 200px);
        }

        /* Hero */
        .hero {
          background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
          border-radius: 16px;
          padding: 4rem 2rem;
          text-align: center;
          margin-bottom: 3rem;
          border: 1px solid #222;
        }

        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .gradient-text {
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          font-size: 1.25rem;
          color: #aaa;
          margin-bottom: 2rem;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #00d4ff;
        }

        /* Search */
        .search-section {
          margin-bottom: 2rem;
        }

        .search-bar {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 12px;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: #fff;
          flex: 1;
          font-size: 1rem;
          outline: none;
        }

        .search-bar input::placeholder {
          color: #666;
        }

        /* Filters */
        .filters {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-group label {
          color: #aaa;
          font-size: 0.9rem;
        }

        .filter-group select {
          background: #1a1a1a;
          border: 1px solid #333;
          color: #fff;
          padding: 0.75rem;
          border-radius: 8px;
          font-size: 0.95rem;
          cursor: pointer;
        }

        .filter-group select:focus {
          outline: none;
          border-color: #00d4ff;
        }

        /* Type Chips */
        .type-chips {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .chip {
          background: #1a1a1a;
          border: 1px solid #333;
          color: #aaa;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .chip:hover,
        .chip.active {
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          color: #000;
          border-color: transparent;
        }

        /* Results */
        .results-header {
          margin-bottom: 2rem;
        }

        .results-header h2 {
          font-size: 1.5rem;
          color: #00d4ff;
        }

        /* Listings Grid */
        .listings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .listing-card {
          background: #111;
          border: 1px solid #222;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }

        .listing-card:hover {
          transform: translateY(-4px);
          border-color: #00d4ff;
          box-shadow: 0 12px 24px rgba(0, 212, 255, 0.15);
        }

        .featured-badge, .worldwide-badge {
          position: absolute;
          top: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 2;
        }

        .featured-badge {
          left: 1rem;
          background: linear-gradient(135deg, #ffd700, #ffb700);
          color: #000;
        }

        .worldwide-badge {
          right: 1rem;
          background: rgba(0, 212, 255, 0.9);
          color: #000;
        }

        .card-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .listing-card:hover .card-image img {
          transform: scale(1.05);
        }

        .like-btn {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid #333;
          color: #fff;
          padding: 0.75rem;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 2;
        }

        .like-btn:hover,
        .like-btn.active {
          background: #ff3366;
          border-color: #ff3366;
          color: #fff;
        }

        .card-content {
          padding: 1.5rem;
        }

        .card-header {
          display: flex;
          align-items: start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .card-header h3 {
          font-size: 1.1rem;
          color: #fff;
        }

        .verified-icon {
          color: #00d4ff;
          flex-shrink: 0;
        }

        .card-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .detail {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #888;
          font-size: 0.9rem;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #222;
        }

        .price {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .views {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          font-size: 0.9rem;
        }

        .seller-info {
          margin-top: 1rem;
          color: #666;
          font-size: 0.85rem;
        }

        /* Listing Detail */
        .listing-detail {
          animation: fadeIn 0.3s;
        }

        .back-btn {
          background: #1a1a1a;
          border: 1px solid #333;
          color: #00d4ff;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 2rem;
          transition: all 0.2s;
        }

        .back-btn:hover {
          background: #222;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .detail-image {
          position: relative;
          width: 100%;
          height: 500px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .detail-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 2rem;
        }

        .detail-header h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .detail-meta {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          color: #888;
        }

        .detail-meta span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .price-large {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .detail-specs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          background: #111;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .spec {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .spec label {
          color: #666;
          font-size: 0.85rem;
        }

        .spec value {
          color: #fff;
          font-weight: 600;
        }

        .detail-description {
          background: #111;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .detail-description h3 {
          margin-bottom: 1rem;
          color: #00d4ff;
        }

        .detail-description p {
          color: #aaa;
          line-height: 1.6;
        }

        .shipping-info {
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 153, 255, 0.1));
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          align-items: start;
        }

        .shipping-info h4 {
          color: #00d4ff;
          margin-bottom: 0.5rem;
        }

        .shipping-info p {
          color: #aaa;
        }

        /* Sidebar */
        .seller-card {
          background: #111;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 2rem;
          position: sticky;
          top: 100px;
        }

        .seller-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .seller-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: #000;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 212, 255, 0.2);
          color: #00d4ff;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .full-width {
          width: 100%;
        }

        .trust-signals {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid #222;
        }

        .signal {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #888;
          font-size: 0.9rem;
        }

        .signal svg {
          color: #00d4ff;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s;
        }

        .modal {
          background: #111;
          border: 1px solid #222;
          border-radius: 16px;
          padding: 2rem;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s;
        }

        .modal h2 {
          margin-bottom: 2rem;
          color: #00d4ff;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #1a1a1a;
          border: 1px solid #333;
          color: #fff;
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
        }

        /* Card Preview */
        .card-preview {
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
          color: #fff;
        }

        .card-chip {
          width: 50px;
          height: 40px;
          background: linear-gradient(135deg, #ffd700, #ffb700);
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .card-number {
          font-size: 1.5rem;
          letter-spacing: 4px;
          margin-bottom: 2rem;
        }

        .card-info {
          display: flex;
          justify-content: space-between;
        }

        .card-info .label {
          font-size: 0.75rem;
          color: #aaa;
          margin-bottom: 0.25rem;
        }

        /* Payment Form */
        .payment-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          color: #aaa;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group textarea {
          background: #1a1a1a;
          border: 1px solid #333;
          color: #fff;
          padding: 0.75rem;
          border-radius: 8px;
          font-size: 0.95rem;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #00d4ff;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group.checkbox {
          flex-direction: row;
          align-items: center;
        }

        .form-group.checkbox input {
          width: auto;
          margin-right: 0.5rem;
        }

        /* Payment Breakdown */
        .payment-breakdown {
          background: #0d0d0d;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .breakdown-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
        }

        .breakdown-row.fee {
          color: #888;
          font-size: 0.9rem;
        }

        .breakdown-row.total {
          font-size: 1.25rem;
          font-weight: 700;
          color: #00d4ff;
          border-top: 1px solid #222;
          padding-top: 1rem;
          margin-top: 0.5rem;
        }

        /* Escrow Flow */
        .escrow-flow {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .escrow-steps {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .step {
          display: flex;
          gap: 1rem;
          align-items: start;
          padding: 1rem;
          background: #0d0d0d;
          border: 1px solid #222;
          border-radius: 8px;
          opacity: 0.5;
          transition: all 0.3s;
        }

        .step.active {
          opacity: 1;
          border-color: #00d4ff;
          background: rgba(0, 212, 255, 0.05);
        }

        .step-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .step.active .step-icon {
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          color: #000;
        }

        .step-content h4 {
          margin-bottom: 0.25rem;
        }

        .step-content p {
          color: #888;
          font-size: 0.9rem;
        }

        /* Shipping Options */
        .shipping-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .shipping-option {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #0d0d0d;
          border: 1px solid #222;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .shipping-option:hover {
          border-color: #00d4ff;
        }

        .shipping-option input {
          margin-top: 0.25rem;
        }

        .shipping-option label {
          cursor: pointer;
          flex: 1;
        }

        .shipping-option label strong {
          display: block;
          margin-bottom: 0.25rem;
        }

        .shipping-option label span {
          color: #888;
          font-size: 0.9rem;
        }

        /* Video Call */
        .video-call-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #000;
          z-index: 1000;
          animation: fadeIn 0.2s;
        }

        .video-call {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .video-main {
          flex: 1;
          position: relative;
        }

        .remote-video {
          width: 100%;
          height: 100%;
          background: #0d0d0d;
        }

        .video-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .video-placeholder.small {
          padding: 1rem;
        }

        .connection-pulse {
          width: 12px;
          height: 12px;
          background: #00ff88;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .local-video {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          width: 200px;
          height: 150px;
          background: #1a1a1a;
          border: 2px solid #333;
          border-radius: 12px;
          overflow: hidden;
        }

        .call-controls {
          background: #111;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .call-info {
          text-align: center;
        }

        .call-duration {
          font-size: 1.5rem;
          font-weight: 700;
          color: #00d4ff;
          display: block;
        }

        .call-status {
          color: #00ff88;
          font-size: 0.9rem;
        }

        .control-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .control-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          background: #1a1a1a;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .control-btn:hover {
          background: #222;
        }

        .control-btn.active {
          background: #ff3366;
        }

        .control-btn.end-call {
          background: #ff3366;
        }

        .control-btn.end-call:hover {
          background: #ff1144;
        }

        /* Registration */
        .registration-page,
        .post-listing-page {
          animation: fadeIn 0.3s;
        }

        .registration-container,
        .post-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .registration-container h1,
        .post-container h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .subtitle {
          text-align: center;
          color: #888;
          margin-bottom: 3rem;
        }

        .progress-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 3rem;
          position: relative;
        }

        .progress-bar::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 2px;
          background: #222;
          z-index: 0;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 2px solid #222;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          transition: all 0.3s;
        }

        .progress-step.active .step-number {
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          border-color: #00d4ff;
          color: #000;
        }

        .step-label {
          font-size: 0.85rem;
          color: #666;
          text-align: center;
        }

        .progress-step.active .step-label {
          color: #00d4ff;
        }

        .registration-form,
        .listing-form {
          background: #111;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 2rem;
        }

        .step-content {
          animation: slideUp 0.3s;
        }

        .step-content h2 {
          margin-bottom: 2rem;
          color: #00d4ff;
        }

        .step-actions {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #222;
        }

        /* Banking Payment */
        .banking-payment {
          background: #0d0d0d;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 2rem;
          margin: 2rem 0;
        }

        .banking-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          color: #00d4ff;
        }

        .banking-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
          background: #111;
          border-radius: 8px;
        }

        .detail-row .label {
          color: #888;
        }

        .detail-row .value {
          color: #fff;
          font-weight: 600;
        }

        .detail-row.highlight {
          border: 1px solid #00d4ff;
          background: rgba(0, 212, 255, 0.05);
        }

        .detail-row.highlight .value {
          color: #00d4ff;
          font-family: monospace;
          font-size: 1.1rem;
        }

        .detail-row.total {
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 153, 255, 0.1));
          border: 1px solid #00d4ff;
          font-size: 1.25rem;
        }

        .detail-row.total .value {
          color: #00d4ff;
          font-size: 1.5rem;
        }

        .banking-instructions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          padding: 1rem;
          background: rgba(255, 153, 0, 0.1);
          border: 1px solid rgba(255, 153, 0, 0.3);
          border-radius: 8px;
          color: #ffa500;
        }

        .payment-confirmation {
          margin-top: 2rem;
          padding: 1.5rem;
          background: #111;
          border-radius: 8px;
        }

        .payment-confirmation h4 {
          color: #00d4ff;
          margin-bottom: 1rem;
        }

        .payment-confirmation ol {
          padding-left: 1.5rem;
          color: #aaa;
        }

        .payment-confirmation li {
          margin-bottom: 0.75rem;
        }

        /* Upload Section */
        .upload-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .upload-box {
          background: #0d0d0d;
          border: 2px dashed #333;
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          transition: all 0.2s;
          cursor: pointer;
        }

        .upload-box:hover {
          border-color: #00d4ff;
          background: rgba(0, 212, 255, 0.05);
        }

        .upload-box svg {
          color: #00d4ff;
          margin-bottom: 1rem;
        }

        .upload-box h4 {
          margin-bottom: 0.5rem;
        }

        .upload-box p {
          color: #888;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .verification-info {
          text-align: center;
          padding: 2rem;
        }

        .verification-info svg {
          color: #00d4ff;
          margin-bottom: 1rem;
        }

        .verification-info h3 {
          margin-bottom: 1rem;
        }

        .verification-list {
          list-style: none;
          display: inline-block;
          text-align: left;
          margin-top: 1.5rem;
        }

        .verification-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: #aaa;
        }

        .verification-list svg {
          color: #00ff88;
        }

        .gdpr-notice {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(0, 212, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 8px;
          color: #00d4ff;
          font-size: 0.9rem;
          margin-top: 2rem;
        }

        .fee-info {
          text-align: center;
          margin: 2rem 0;
        }

        .fee-amount {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .fee-amount .currency {
          color: #888;
        }

        .fee-amount .amount {
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Price Calculator */
        .price-calculator {
          background: #0d0d0d;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
        }

        .price-calculator h3 {
          margin-bottom: 1rem;
          color: #00d4ff;
        }

        .calc-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
        }

        .calc-row.fee {
          color: #ff3366;
        }

        .calc-row.total {
          font-size: 1.25rem;
          font-weight: 700;
          color: #00ff88;
          border-top: 1px solid #222;
          padding-top: 1rem;
          margin-top: 0.5rem;
        }

        /* Photo Upload Grid */
        .photo-upload-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .photo-upload-box {
          background: #0d0d0d;
          border: 2px dashed #333;
          border-radius: 8px;
          padding: 1.5rem 1rem;
          text-align: center;
          transition: all 0.2s;
          cursor: pointer;
        }

        .photo-upload-box:hover {
          border-color: #00d4ff;
        }

        .photo-upload-box svg {
          color: #00d4ff;
          margin-bottom: 0.5rem;
        }

        .upload-tip {
          color: #888;
          font-size: 0.9rem;
          text-align: center;
        }

        /* Review Summary */
        .review-summary {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .summary-section {
          padding: 1.5rem;
          background: #0d0d0d;
          border-radius: 8px;
        }

        .summary-section h3 {
          color: #00d4ff;
          margin-bottom: 1rem;
        }

        .summary-section p {
          color: #aaa;
          margin-bottom: 0.5rem;
        }

        .terms {
          display: flex;
          align-items: start;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(0, 212, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 8px;
        }

        .terms input {
          margin-top: 0.25rem;
        }

        .terms label {
          color: #aaa;
          flex: 1;
        }

        /* Messages */
        .messages-container {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2rem;
          height: calc(100vh - 250px);
        }

        .conversations-list {
          background: #111;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 1.5rem;
          overflow-y: auto;
        }

        .conversations-list h2 {
          margin-bottom: 1.5rem;
        }

        .conversation-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #0d0d0d;
          border-radius: 8px;
          margin-bottom: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .conversation-item:hover {
          background: #1a1a1a;
          border: 1px solid #00d4ff;
        }

        .conv-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #000;
          flex-shrink: 0;
        }

        .conv-content {
          flex: 1;
          min-width: 0;
        }

        .conv-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .conv-header h4 {
          font-size: 0.95rem;
        }

        .conv-time {
          color: #666;
          font-size: 0.85rem;
        }

        .conv-message {
          color: #888;
          font-size: 0.9rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .unread-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: #00d4ff;
          color: #000;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .chat-area {
          background: #111;
          border: 1px solid #222;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          padding: 1.5rem;
          border-bottom: 1px solid #222;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-user {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .chat-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          color: #000;
        }

        .status {
          color: #666;
          font-size: 0.85rem;
        }

        .status.online {
          color: #00ff88;
        }

        .messages-list {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message {
          display: flex;
          animation: slideUp 0.2s;
        }

        .message.me {
          justify-content: flex-end;
        }

        .message-content {
          max-width: 70%;
          padding: 1rem 1.25rem;
          border-radius: 12px;
        }

        .message.them .message-content {
          background: #1a1a1a;
        }

        .message.me .message-content {
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          color: #000;
        }

        .message-content p {
          margin-bottom: 0.5rem;
        }

        .message-time {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .message-input {
          padding: 1.5rem;
          border-top: 1px solid #222;
          display: flex;
          gap: 1rem;
        }

        .message-input input {
          flex: 1;
          background: #1a1a1a;
          border: 1px solid #333;
          color: #fff;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.95rem;
        }

        .message-input input:focus {
          outline: none;
          border-color: #00d4ff;
        }

        /* Profile */
        .profile-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .profile-header {
          display: flex;
          gap: 2rem;
          align-items: center;
          background: #111;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff, #0099ff);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .profile-avatar.large {
          width: 120px;
          height: 120px;
        }

        .profile-info {
          flex: 1;
        }

        .profile-info h1 {
          margin-bottom: 0.5rem;
        }

        .profile-info p {
          color: #888;
        }

        .profile-badges {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .badge.verified {
          background: rgba(0, 212, 255, 0.2);
          color: #00d4ff;
        }

        .profile-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: #111;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-card svg {
          color: #00d4ff;
        }

        .stat-card h3 {
          font-size: 1.75rem;
          margin-bottom: 0.25rem;
        }

        .stat-card p {
          color: #888;
          font-size: 0.9rem;
        }

        .profile-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .activity-feed,
        .settings-panel {
          background: #111;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 2rem;
        }

        .activity-feed h2,
        .settings-panel h2 {
          margin-bottom: 1.5rem;
          color: #00d4ff;
        }

        .activity-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #0d0d0d;
          border-radius: 8px;
          margin-bottom: 0.75rem;
        }

        .activity-item svg {
          color: #00d4ff;
          flex-shrink: 0;
        }

        .activity-item p {
          margin-bottom: 0.25rem;
        }

        .activity-item span {
          color: #666;
          font-size: 0.85rem;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 0;
          border-bottom: 1px solid #222;
        }

        .setting-item:last-child {
          border-bottom: none;
        }

        .setting-item h4 {
          margin-bottom: 0.25rem;
        }

        .setting-item p {
          color: #888;
          font-size: 0.9rem;
        }

        /* Footer */
        .footer {
          background: #0d0d0d;
          border-top: 1px solid #222;
          margin-top: 4rem;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 3rem 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
        }

        .footer-section h3,
        .footer-section h4 {
          margin-bottom: 1rem;
          color: #00d4ff;
        }

        .footer-section p {
          color: #888;
          line-height: 1.6;
        }

        .footer-section a {
          display: block;
          color: #888;
          text-decoration: none;
          margin-bottom: 0.75rem;
          transition: color 0.2s;
        }

        .footer-section a:hover {
          color: #00d4ff;
        }

        .footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem 2rem;
          border-top: 1px solid #222;
          text-align: center;
          color: #666;
          font-size: 0.9rem;
        }

        .footer-bottom p {
          margin-bottom: 0.5rem;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2rem;
          }

          .hero-stats {
            gap: 1.5rem;
          }

          .listings-grid {
            grid-template-columns: 1fr;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }

          .filters {
            grid-template-columns: 1fr;
          }

          .messages-container {
            grid-template-columns: 1fr;
          }

          .conversations-list {
            display: none;
          }

          .profile-header {
            flex-direction: column;
            text-align: center;
          }

          .profile-content {
            grid-template-columns: 1fr;
          }

          .footer-content {
            grid-template-columns: 1fr;
          }

          .desktop-nav {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .mobile-menu {
            display: flex;
          }

          .local-video {
            width: 120px;
            height: 90px;
            bottom: 1rem;
            right: 1rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .progress-bar {
            overflow-x: auto;
          }

          .step-label {
            display: none;
          }
        }

        .btn-secondary.small {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
