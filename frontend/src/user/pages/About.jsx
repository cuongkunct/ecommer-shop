import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

function About() {
  return (
    <div className="border-t border-gray-300">
      <div className="flex justify-center items-center mt-12 text-3xl">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col gap-8 justify-center">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <p className="font-bold text-lg">Our Mission</p>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
