import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { makeGymPaymentAPI } from "../../services/allAPI";

function Payment() {

  const handleGymPayment = async (duration) => {
    const stripe = await loadStripe(
      "pk_test_51ScrrcRXMmxRbyh1EJVdNS2fWmS9ca3VetFOipQVzgC9rbLQPJGXpR3WFcHYwVQjgCFMGwuPJcl2zohWTUcAerEc00UcZ98XJR"
    );

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please login");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    // 👉 ONLY duration is sent
    const reqBody = {
      duration: duration,
    };

    try {
      const result = await makeGymPaymentAPI(reqBody, reqHeader);
      if (result.status === 200) {
        window.location.href = result.data.url;
      }
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="bg-gray-900 p-10 rounded-xl text-center space-y-4">

        <h2 className="text-3xl font-bold">Choose Your Plan</h2>

        <button
          onClick={() => handleGymPayment(1)}
          className="bg-green-700 px-8 py-3 rounded w-full"
        >
          1 Month – ₹1000
        </button>

        <button
          onClick={() => handleGymPayment(3)}
          className="bg-blue-700 px-8 py-3 rounded w-full"
        >
          3 Months – ₹2800
        </button>

        <button
          onClick={() => handleGymPayment(6)}
          className="bg-purple-700 px-8 py-3 rounded w-full"
        >
          6 Months – ₹5500
        </button>

      </div>
    </div>
  );
}

export default Payment;
