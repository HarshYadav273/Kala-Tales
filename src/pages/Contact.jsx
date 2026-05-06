import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Placeholder submit — backend will be wired later
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-[#fffaf5] min-h-screen">
      {/* Page Header */}
      <div className="border-b border-[#e8ddd4] bg-[#fff8f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8441A] mb-2">
            Get in Touch
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2a1f1a] tracking-wide mb-3">
            Contact Us
          </h1>
          <p className="text-sm text-[#7a6a60] max-w-xl leading-relaxed">
            We'd love to hear from you — whether it's about a custom order,
            corporate gifting, or just saying hello.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left — Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Info Cards */}
            <div className="flex flex-col gap-5">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919999944552"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-white border border-[#e8ddd4] rounded-lg hover:border-[#C8441A] transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/20 transition-colors duration-200">
                  <svg
                    className="h-5 w-5 text-[#25D366]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#aaa] mb-0.5">
                    WhatsApp
                  </p>
                  <p className="text-sm font-medium text-[#2a1f1a]">
                    +91-9999944552
                  </p>
                  <p className="text-xs text-[#7a6a60] mt-0.5">
                    Chat with us directly
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@kalatails.com"
                className="flex items-start gap-4 p-4 bg-white border border-[#e8ddd4] rounded-lg hover:border-[#C8441A] transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#C8441A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C8441A]/20 transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#C8441A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#aaa] mb-0.5">
                    Email
                  </p>
                  <p className="text-sm font-medium text-[#2a1f1a]">
                    info@kalatails.com
                  </p>
                  <p className="text-xs text-[#7a6a60] mt-0.5">
                    We reply within 24 hours
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-white border border-[#e8ddd4] rounded-lg hover:border-[#C8441A] transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#E1306C]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E1306C]/20 transition-colors duration-200">
                  <svg
                    className="h-5 w-5 text-[#E1306C]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#aaa] mb-0.5">
                    Instagram
                  </p>
                  <p className="text-sm font-medium text-[#2a1f1a]">
                    @kalatales
                  </p>
                  <p className="text-xs text-[#7a6a60] mt-0.5">
                    Follow our craft journey
                  </p>
                </div>
              </a>
            </div>

            {/* Custom orders note */}
            <div className="p-4 bg-[#fff3eb] border border-[#f0d5c0] rounded-lg">
              <p className="text-[10px] tracking-widest uppercase text-[#C8441A] mb-1">
                Bulk & Custom Orders
              </p>
              <p className="text-xs text-[#7a6a60] leading-relaxed">
                Looking for corporate gifting, bulk orders, or custom
                collections? Drop us a message and we'll get back to you with a
                personalised quote.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
                <div className="w-14 h-14 rounded-full bg-[#C8441A]/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-[#C8441A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-light text-[#2a1f1a]">
                  Message Received!
                </h3>
                <p className="text-sm text-[#7a6a60] max-w-xs">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="mt-2 text-xs tracking-widest uppercase text-[#C8441A] border-b border-[#C8441A] pb-0.5"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white border border-[#e8ddd4] rounded-lg p-6 sm:p-8">
                <h2 className="text-xs tracking-[0.25em] uppercase text-[#2a1f1a] font-medium mb-6">
                  Send us a Message
                </h2>

                <div className="flex flex-col gap-5">
                  {/* Name + Phone row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] tracking-widest uppercase text-[#7a6a60]">
                        Full Name <span className="text-[#C8441A]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="border border-[#e8ddd4] rounded-sm px-3 py-2.5 text-sm text-[#2a1f1a] placeholder-[#ccc] focus:outline-none focus:border-[#C8441A] transition-colors duration-200 bg-[#fffaf5]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] tracking-widest uppercase text-[#7a6a60]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="border border-[#e8ddd4] rounded-sm px-3 py-2.5 text-sm text-[#2a1f1a] placeholder-[#ccc] focus:outline-none focus:border-[#C8441A] transition-colors duration-200 bg-[#fffaf5]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-widest uppercase text-[#7a6a60]">
                      Email Address <span className="text-[#C8441A]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="border border-[#e8ddd4] rounded-sm px-3 py-2.5 text-sm text-[#2a1f1a] placeholder-[#ccc] focus:outline-none focus:border-[#C8441A] transition-colors duration-200 bg-[#fffaf5]"
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-widest uppercase text-[#7a6a60]">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="border border-[#e8ddd4] rounded-sm px-3 py-2.5 text-sm text-[#2a1f1a] focus:outline-none focus:border-[#C8441A] transition-colors duration-200 bg-[#fffaf5] appearance-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Enquiry</option>
                      <option value="custom">Custom / Bulk Order</option>
                      <option value="corporate">Corporate Gifting</option>
                      <option value="return">Return / Exchange</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-widest uppercase text-[#7a6a60]">
                      Message <span className="text-[#C8441A]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="border border-[#e8ddd4] rounded-sm px-3 py-2.5 text-sm text-[#2a1f1a] placeholder-[#ccc] focus:outline-none focus:border-[#C8441A] transition-colors duration-200 bg-[#fffaf5] resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#C8441A] hover:bg-[#a83615] text-white text-xs tracking-widest uppercase py-3 rounded-sm transition-colors duration-200 mt-1"
                  >
                    Send Message
                  </button>

                  <p className="text-[10px] text-[#aaa] text-center">
                    * Required fields. Backend integration coming soon.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
