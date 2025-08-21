import React from "react";
import Hero from "../components/Hero";
import Collection from "../components/Collection";
import BestSeller from "../components/BestSeller";

function Home() {
  return (
    <div>
      <Hero />
      <Collection />
      <BestSeller />
    </div>
  );
}

export default Home;
