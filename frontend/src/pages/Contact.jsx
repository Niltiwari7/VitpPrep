import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { toast } from 'react-hot-toast';
import {
  FaUser,
  FaEnvelope,
  FaComment,
  FaExclamationCircle,
  FaCheckCircle,
  FaPaperPlane,
  FaSpinner
} from 'react-icons/fa';

const Contact = () => {
  // In your form data state:
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const url = import.meta.env.VITE_GOOGLE_APPSCRIPT_URL;



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'Valid email is required.';
    if (!message.trim()) newErrors.message = 'Message cannot be empty.';
    return newErrors;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return;
      }
  
      setErrors({});
  
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);

  
      const response = await fetch(
       url,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
  
      const text = await response.text(); 
    
      
  
      try {
        const result = JSON.parse(text);
      
  
        if (result.success === true) {
          toast.success("Thank you for reaching out! We will get back to you soon.");
          setSuccessMessage("Thank you for contacting us!");
          setFormData({ name: "", email: "", message: "" });
        } else {
          toast.error(result.message || "Something went wrong.");
        }
      } catch (jsonError) {
        console.error("Invalid JSON response:", text);
        toast.error("Invalid response from the server.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  

  return (

    <>
      <Header />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Have a question? We're here to help!
              Drop us a message and we'll respond within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 md:p-12 transition-all hover:shadow-3xl">
            <div className="space-y-6">
              {/* Name Field */}
              <div className="relative group">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 ${errors.name
                      ? 'border-red-500 ring-red-200 dark:ring-red-900'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 ring-blue-200 dark:ring-blue-900'
                      } bg-white dark:bg-gray-900 focus:outline-none transition-all`}
                    placeholder="John Doe"
                  />
                  <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <FaExclamationCircle className="flex-shrink-0" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 ${errors.email
                      ? 'border-red-500 ring-red-200 dark:ring-red-900'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 ring-blue-200 dark:ring-blue-900'
                      } bg-white dark:bg-gray-900 focus:outline-none transition-all`}
                    placeholder="john@example.com"
                  />
                  <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <FaExclamationCircle className="flex-shrink-0" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="relative group">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 ${errors.message
                      ? 'border-red-500 ring-red-200 dark:ring-red-900'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 ring-blue-200 dark:ring-blue-900'
                      } bg-white dark:bg-gray-900 focus:outline-none transition-all resize-none`}
                    rows="5"
                    placeholder="Write your message here..."
                  />
                  <FaComment className="absolute right-4 top-4 text-gray-400 dark:text-gray-500" />
                </div>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <FaExclamationCircle className="flex-shrink-0" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 flex items-center gap-3">
                  <FaCheckCircle className="text-xl flex-shrink-0" />
                  <span className="text-sm">{successMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold 
                    hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-[1.02] 
                    active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="transform -translate-y-px" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <Footer className="mt-20" />
      </div>
    </>
  );
};

export default Contact;
