import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show success message
    setSubmitted(true);

    // Here you can add form submission logic (e.g., send email or save to DB)
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

      {submitted ? (
        <p className="text-green-600 text-center text-lg">
          Thank you for reaching out! We will get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Your email address"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Write your message here"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
