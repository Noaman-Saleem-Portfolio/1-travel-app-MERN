import { Container } from "react-bootstrap";
import BannerHome from "../components/BannerHome";
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

import image1 from "../assets/images/home/popular-packages/tour-1-2.jpg";
import image2 from "../assets/images/home/popular-packages/tour-1-3.jpg";
import image3 from "../assets/images/home/popular-packages/tour-1-4.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <BannerHome />
      <div className="popularPackages">
        <Container>
          <h2>Popular Holiday Packages</h2>

          <div className="cardsContainer">
            <div className="packageCard">
              <div className="cardImage">
                <img src={image1} alt="" />
              </div>
              <div className="cardData">
                <h3 className="packageName">Explore Our World</h3>
                <p className="destination">California, USA</p>

                <hr />

                <div className="details">
                  <p>
                    <MdDateRange
                      size={"18"}
                      // style={{ position: "relative", bottom: "2px" }}
                    />{" "}
                    Days: 4
                  </p>

                  <p>
                    {" "}
                    <FaUser
                      size={"14"}
                      style={{ position: "relative", bottom: "2px" }}
                    />{" "}
                    People: 3
                  </p>
                </div>

                <div className="price">
                  <p>$259</p>
                  <Link to={"/"}>VIEW DETAILS</Link>
                </div>
              </div>
              {/* cardData */}
            </div>
            {/* card */}

            <div className="packageCard">
              <div className="cardImage">
                <img src={image2} alt="" />
              </div>
              <div className="cardData">
                <h3 className="packageName">Explore Our World</h3>
                <p className="destination">California, USA</p>

                <hr />

                <div className="details">
                  <p>
                    <MdDateRange
                      size={"18"}
                      // style={{ position: "relative", bottom: "2px" }}
                    />{" "}
                    Days: 4
                  </p>

                  <p>
                    {" "}
                    <FaUser
                      size={"14"}
                      style={{ position: "relative", bottom: "2px" }}
                    />{" "}
                    People: 3
                  </p>
                </div>

                <div className="price">
                  <p>$259</p>
                  <Link to={"/"}>VIEW DETAILS</Link>
                </div>
              </div>
              {/* cardData */}
            </div>
            {/* card */}

            <div className="packageCard">
              <div className="cardImage">
                <img src={image3} alt="" />
              </div>
              <div className="cardData">
                <h3 className="packageName">Explore Our World</h3>
                <p className="destination">California, USA</p>

                <hr />

                <div className="details">
                  <p>
                    <MdDateRange
                      size={"18"}
                      // style={{ position: "relative", bottom: "2px" }}
                    />{" "}
                    Days: 4
                  </p>

                  <p>
                    {" "}
                    <FaUser
                      size={"14"}
                      style={{ position: "relative", bottom: "2px" }}
                    />{" "}
                    People: 3
                  </p>
                </div>

                <div className="price">
                  <p>$259</p>
                  <Link to={"/"}>VIEW DETAILS</Link>
                </div>
              </div>
              {/* cardData */}
            </div>
            {/* card */}

            <div className="packageCard">
              <div className="cardImage">
                <img src={image1} alt="" />
              </div>
              <div className="cardData">
                <h3 className="packageName">Explore Our World</h3>
                <p className="destination">California, USA</p>

                <hr />

                <div className="details">
                  <p>
                    <MdDateRange
                      size={"18"}
                      // style={{ position: "relative", bottom: "2px" }}
                    />{" "}
                    Days: 4
                  </p>

                  <p>
                    {" "}
                    <FaUser
                      size={"14"}
                      style={{ position: "relative", bottom: "2px" }}
                    />{" "}
                    People: 3
                  </p>
                </div>

                <div className="price">
                  <p>$259</p>
                  <Link to={"/"}>VIEW DETAILS</Link>
                </div>
              </div>
              {/* cardData */}
            </div>
            {/* card */}

            <div className="packageCard">
              <div className="cardImage">
                <img src={image3} alt="" />
              </div>
              <div className="cardData">
                <h3 className="packageName">Explore Our World</h3>
                <p className="destination">California, USA</p>

                <hr />

                <div className="details">
                  <p>
                    <MdDateRange
                      size={"18"}
                      // style={{ position: "relative", bottom: "2px" }}
                    />{" "}
                    Days: 4
                  </p>

                  <p>
                    {" "}
                    <FaUser
                      size={"14"}
                      style={{ position: "relative", bottom: "2px" }}
                    />{" "}
                    People: 3
                  </p>
                </div>

                <div className="price">
                  <p>$259</p>
                  <Link to={"/"}>VIEW DETAILS</Link>
                </div>
              </div>
              {/* cardData */}
            </div>
            {/* card */}

            <div className="packageCard">
              <div className="cardImage">
                <img src={image2} alt="" />
              </div>
              <div className="cardData">
                <h3 className="packageName">Explore Our World</h3>
                <p className="destination">California, USA</p>

                <hr />

                <div className="details">
                  <p>
                    <MdDateRange
                      size={"18"}
                      // style={{ position: "relative", bottom: "2px" }}
                    />{" "}
                    Days: 4
                  </p>

                  <p>
                    {" "}
                    <FaUser
                      size={"14"}
                      style={{ position: "relative", bottom: "2px" }}
                    />{" "}
                    People: 3
                  </p>
                </div>

                <div className="price">
                  <p>$259</p>
                  <Link to={"/"}>VIEW DETAILS</Link>
                </div>
              </div>
              {/* cardData */}
            </div>
            {/* card */}
          </div>
        </Container>
        <Link to={"/"} className="viewMore">
          View More
        </Link>
      </div>
      {/* popularPackages */}
    </>
  );
};

export default Home;
