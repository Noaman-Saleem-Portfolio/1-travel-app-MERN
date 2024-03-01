import React from "react";
import { Container } from "react-bootstrap";
import twoTraverlers from "../assets/images/home/banner-five-img.png";

const Home = () => {
  return (
    <div className="home-page">
      <div className="banner">
        <Container>
          <div>
            <h2>LETS TRAVEL THE WORLD WITH US</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Amet enim tincidunt mauris
              tellus nunc eleifend. Odio suspendisse ut arcu eget enim
              vulputate.
            </p>
          </div>

          <div className="form">
            <img src={twoTraverlers} height={450} alt="" />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
