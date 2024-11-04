// import Card from "../components/card/Card";
// import Banner from "../components/home/Banner";

import Card from "../components/card/Card";
import Banner from "../components/home/Banner";
import React from "react";
import Slidder from "../components/home/Slidder";
import Cities from "../components/cities/Cities";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <React.Fragment>
      {/* Banner */}
      <Banner />

      {/* slider top Food */}
      <Slidder />
      {/* categories */}
      {/* <section> */}
      <Card />
      {/* </section> */}

      <Cities />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
