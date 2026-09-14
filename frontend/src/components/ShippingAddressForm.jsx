import React, { useState, useEffect } from 'react';
import '../styles/shippingAddress.css';

const ShippingAddressForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: 'India',
    addressType: 'Home'
  });

  const [errors, setErrors] = useState({});
  const [loadingCityState, setLoadingCityState] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }

    setFormData({ ...formData, [name]: value });
  };

  // Address type toggle
  const handleAddressType = (type) => {
    setFormData({ ...formData, addressType: type });
  };

  // Fetch City and State based on Pincode
  useEffect(() => {
    const fetchLocation = async () => {
      if (formData.pincode.length === 6 && /^\d+$/.test(formData.pincode)) {
        setLoadingCityState(true);
        try {
          const response = await fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`);
          const data = await response.json();
          
          if (data && data[0] && data[0].Status === 'Success') {
            const postOffice = data[0].PostOffice[0];
            setFormData(prev => ({
              ...prev,
              city: postOffice.District,
              state: postOffice.State
            }));
            setErrors(prev => ({ ...prev, pincode: '' }));
          } else {
            setErrors(prev => ({ ...prev, pincode: 'Invalid Pincode' }));
            setFormData(prev => ({ ...prev, city: '', state: '' }));
          }
        } catch (error) {
          setErrors(prev => ({ ...prev, pincode: 'Error fetching location details' }));
        } finally {
          setLoadingCityState(false);
        }
      }
    };

    fetchLocation();
  }, [formData.pincode]);

  // Validate form
  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    if (validate()) {
      try {
        if (onSubmit) {
          onSubmit(formData);
        }
        setSubmitStatus({ type: 'success', message: 'Shipping address saved successfully!' });
      } catch (error) {
        setSubmitStatus({ type: 'error', message: 'Something went wrong while saving the address.' });
      }
    } else {
      setSubmitStatus({ type: 'error', message: 'Please fix the errors in the form before submitting.' });
    }
  };

  return (
    <div className="shipping-form-container">
      <h2 className="shipping-form-title">Shipping Address</h2>
      
      {submitStatus.message && (
        <div className={`message-alert ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}

      <form className="shipping-form" onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="form-input"
            placeholder="John Doe"
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        {/* Phone & Pincode Row */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="9876543210"
              maxLength="10"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="form-input"
              placeholder="110001"
              maxLength="6"
            />
            {errors.pincode && <span className="error-text">{errors.pincode}</span>}
          </div>
        </div>

        {/* Address Lines */}
        <div className="form-group">
          <label className="form-label">Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="form-input"
            placeholder="Flat, House no., Building, Company, Apartment"
          />
          {errors.addressLine1 && <span className="error-text">{errors.addressLine1}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Address Line 2 (Optional)</label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="form-input"
            placeholder="Area, Street, Sector, Village"
          />
        </div>

        {/* City & State Row (Auto-filled) */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">City / District</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
              placeholder="Auto-filled via Pincode"
              readOnly={loadingCityState || (formData.city !== '' && formData.pincode.length === 6)}
            />
            {errors.city && <span className="error-text">{errors.city}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-input"
              placeholder="Auto-filled via Pincode"
              readOnly={loadingCityState || (formData.state !== '' && formData.pincode.length === 6)}
            />
            {errors.state && <span className="error-text">{errors.state}</span>}
          </div>
        </div>

        {/* Country & Address Type Row */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              className="form-input"
              disabled
            />
          </div>
          <div className="form-group">
            <label className="form-label">Address Type</label>
            <div className="address-type-container">
              <button
                type="button"
                className={`address-type-btn ${formData.addressType === 'Home' ? 'active' : ''}`}
                onClick={() => handleAddressType('Home')}
              >
                🏠 Home
              </button>
              <button
                type="button"
                className={`address-type-btn ${formData.addressType === 'Work' ? 'active' : ''}`}
                onClick={() => handleAddressType('Work')}
              >
                🏢 Work
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Save Address
        </button>
      </form>
    </div>
  );
};

export default ShippingAddressForm;
