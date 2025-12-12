import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const servicesData = [
  {
    id: 1,
    title: "Strength Training",
    desc: "Increase muscle mass and build full-body strength.",
    img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZW5ndGglMjB0cmFpbmluZ3xlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000",
  },
  {
    id: 2,
    title: "Personal Coaching",
    desc: "One-on-one guidance with certified gym trainers.",
    img: "https://www.futurefit.co.uk/wp-content/uploads/2022/11/IN-GYM-2-900x600.jpg",
  },
  {
    id: 3,
    title: "CrossFit Workouts",
    desc: "High-intensity exercises to boost power and endurance.",
    img: "https://www.godigit.com/content/dam/godigit/directportal/en/isabel.JPG",
  },
  {
    id: 4,
    title: "Weight Loss Program",
    desc: "Structured fat-burning workouts with expert monitoring.",
    img: "https://thecandidlifestyle.com/wp-content/uploads/2024/08/image-9-768x525.jpeg",
  },
  {
    id: 5,
    title: "Cardio Training",
    desc: "Improve heart health and stamina with cardio sessions.",
    img: "https://www.shape.com/thmb/DjCIHGX6cWaIniuqHeBAAreNE08=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-cardio-exercises-promo-2000-498cbfb8f07541b78572bf810e7fb600.jpg",
  },
  {
    id: 6,
    title: "Diet & Nutrition",
    desc: "Customized meal plans for fitness and health goals.",
    img: "https://crazynutrition.co.uk/cdn/shop/articles/HERO_90b4c138-fe7f-48bc-a0c7-bb0830620338.jpg?v=1705485335",
  },
];

function Services() {

  return (
<>
    <Header/>
    <div className="bg-black min-h-screen text-white px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-10">Our Services</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {servicesData.map((item) => (
          <div
            key={item.id}
            className="relative group cursor-pointer overflow-hidden"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center px-4">
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
     
    </div>
     <Footer/>
</>
  );
}

export default Services;
