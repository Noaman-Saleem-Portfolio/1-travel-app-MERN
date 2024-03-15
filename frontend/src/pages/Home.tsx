import { Container } from "react-bootstrap";
import BannerHome from "../components/BannerHome";

const Home = () => {
  return (
    <>
      <BannerHome />
      <div className="popularPackages">
        <Container>
          <h2>Popular Holiday Packages</h2>

          <div className="packageCard">
            <div className="cardImage"></div>
            <div className="cardData">
              <h3 className="packageName">Explore Our World</h3>
              <p className="destination">California, USA</p>

              <hr />

              <div className="details">
                <p>Days: 4 </p>
                <p>People: 3</p>
              </div>

              <div className="price">
                <p>$259</p>
                <span>VIEW DETAILS</span>
              </div>
            </div>
            {/* cardData */}
          </div>
          {/* card */}
        </Container>
      </div>
      {/* popularPackages */}
    </>
  );
};

export default Home;
