import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaDumbbell, FaUserAlt, FaRunning, FaClipboardList } from "react-icons/fa";
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <Header />

      <div className="bg-black text-white min-h-screen">

        {/* Hero Section */}
        <section
          className="flex flex-col items-center justify-center text-center px-6 py-24 min-h-[90vh] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://cdn.prod.website-files.com/636ad79c285d5e42665bb269/6679cbc219540c9f037d7318_January-9-2024%20The%20Bridge%20Gym%20South-99.jpg')",
          }}
        >
          <div className="bg-black/50 p-6 rounded-xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              Transform Your Fitness Journey
            </h1>
            <p className="text-gray-300 max-w-2xl mb-6 text-lg">
              A complete Gym Management System to manage trainers, members, workout plans,
              payments and progress — all in one seamless platform.
            </p>

            <button className="bg-red-900 hover:bg-red-800 px-8 py-3 rounded-full text-white text-lg transition">
              Get Started
            </button>
          </div>
        </section>
 

        {/* location */}
<section className="py-20 px-6 max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold mb-3">Explore Our Physical Gym Facility</h2>
  <p className="text-gray-300 mb-8">
    Experience a premium fitness environment
  </p>

  <div className="grid md:grid-cols-2 gap-10">

    {/* Left Image */}
    <div>
      <img
        src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba"
        className="w-full"
        alt="Gym Facility"
      />
    </div>

    {/* Right Content */}
    <div className='ps-24 pt-16 '>
      

      <p className="text-lg  text-gray-300 ">
        <span className="font-bold text-white">Fitora</span> <br />
        Near Lulu Mall, Kochi, Kerala<br />
        Pin: 682024 <br />
        <span className="font-semibold">Timing:</span> 5:00 AM – 10:00 PM (All Days)<br/>
        <span>📞+91 98765 43210 </span><br/>
        <span>📞+91 77589 84949 </span><br/>
         <span >📧 fitora@gmail.com</span>

      </p>
    </div>

  </div>
</section>





        {/* Our Trainers Section */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Trainers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg text-center border border-zinc-800 hover:border-red-700 transition">
              <img
                src="https://sochi.edu/wp-content/uploads/successful-personal-trainer.jpg"
                className="w-full h-60 object-cover rounded-xl mb-4"
                alt="Trainer 1"
              />
              <h3 className="text-xl font-semibold mb-1">Jack</h3>
              <p className="text-gray-400 text-sm">Strength & Conditioning Coach</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg text-center border border-zinc-800 hover:border-red-700 transition">
              <img
                src="https://www.nuffieldhealth.com/content/dam/nuffieldhealth/pt-pages-images/Pt%20image%20-%20man%20in%20grey%201.jpg"
                className="w-full h-60 object-cover rounded-xl mb-4"
                alt="Trainer 2"
              />
              <h3 className="text-xl font-semibold mb-1">Ancy</h3>
              <p className="text-gray-400 text-sm">General</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg text-center border border-zinc-800 hover:border-red-600 transition">
              <img
                src="https://oxbridgehomelearning.uk/wp-content/uploads/2021/06/clipboard-smiling.jpg"
                className="w-full h-60 object-cover rounded-xl mb-4"
                alt="Trainer 3"
              />
              <h3 className="text-xl font-semibold mb-1">David</h3>
              <p className="text-gray-400 text-sm">physiqe</p>
            </div>

          </div>
        </section>
{/* Pricing Plans Section */}
<section className="py-20 px-6 bg-black text-white">
  <div className="max-w-5xl mx-auto text-center mb-12">
    <h2 className="text-4xl font-extrabold mb-4">Membership Plans</h2>
    <p className="text-gray-300">
      Choose a plan that fits your fitness goals. No hidden charges.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

    {/* Basic */}
    <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 hover:scale-105 transition flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-2">Basic</h3>
      <p className="text-gray-400 mb-6">Perfect for beginners.</p>
      <h4 className="text-4xl font-bold mb-6">₹999<span className="text-lg"> / month</span></h4>
      <ul className="text-gray-300 space-y-3 mb-6">
        <li>✔ Gym Floor Access</li>
        <li>✔ Basic Equipment Training</li>
        <li>✔ Locker Access</li>
        <li>✘ Personal Trainer</li>
        <li>✘ Diet Plan</li>
      </ul>
    </div>

    {/* Standard */}
    <div className="bg-red-900 p-8 rounded-2xl shadow-xl hover:scale-105 transition flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-2">Standard</h3>
      <p className="text-gray-100 mb-6">Most popular choice.</p>
      <h4 className="text-4xl font-bold mb-6">₹1,599<span className="text-lg"> / month</span></h4>
      <ul className="text-white space-y-3 mb-6">
        <li>✔ All Basic Plan Features</li>
        <li>✔ Personal Trainer</li>
        <li>✔ Custom Diet Plan</li>
      </ul>
    </div>

    {/* Premium */}
    <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 hover:scale-105 transition flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-2">Premium</h3>
      <p className="text-gray-400 mb-6">For serious athletes.</p>
      <h4 className="text-4xl font-bold mb-6">₹1,999<span className="text-lg"> / month</span></h4>
      <ul className="text-gray-300 space-y-3 mb-6">
        <li>✔ Unlimited Personal Training</li>
        <li>✔ Custom Diet Plan</li>
        <li>✔ Gym Access Anytime</li>
        <li>✔ All Classes Included</li>
        <li>✔ Priority Support</li>
      </ul>
    </div>

  </div>

  {/* Common Enquiry Link */}
  <div className="mt-12 text-center">
    <Link to={"/user-request"}
      className="bg-red-900 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition text-lg inline-block"
    >
      Enquire Now
    </Link>
  </div>
</section>


      </div>

      <Footer />
    </>
  );
}

export default LandingPage;
