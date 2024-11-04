import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="bottom-0 text-white bg-gray-800">
        <div className="flex flex-col justify-around mx-auto md:flex-row">
          <div className="m-6 px-auto">
            <h3 className="text-2xl">Cuisines</h3>
            <ul>
              <li>Italian</li>
              <li>Mexican</li>
              <li>Chinese</li>
              <li>Indian</li>
              <li>Japanese</li>
              <li>Thai</li>
            </ul>
          </div>
          <div className="m-6">
            <h3 className="text-2xl">Recipes</h3>
            <ul>
              <li>Pizza Margherita</li>
              <li>Guacamole</li>
              <li>General Tso's Chicken</li>
              <li>Butter Chicken</li>
              <li>Sushi Rolls</li>
              <li>Pad Thai</li>
            </ul>
          </div>
          <div className="m-6">
            <h3 className="text-2xl">Desserts</h3>
            <ul>
              <li>Tiramisu</li>
              <li>Churros</li>
              <li>Matcha Ice Cream</li>
              <li>Gulab Jamun</li>
              <li>Mochi</li>
              <li>Mango Sticky Rice</li>
            </ul>
          </div>
          <div className="m-6">
            <h3 className="text-2xl">Locations</h3>
            <ul>
              <li>New York</li>
              <li>Mexico City</li>
              <li>Beijing</li>
              <li>Mumbai</li>
              <li>Tokyo</li>
              <li>Bangkok</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="flex justify-center py-4 ">
          {" "}
          <FaFacebook size={50} />
        </p>
        <div className="flex flex-col items-center px-4 py-4  md:m-14">
          <p>One signal is the market leading self serve customer engagment </p>
          <br />
          <p>Solutions for push notifications, E-mail,SMS & In-App.</p>
        </div>
        <div className="flex justify-center gap-8 py-5">
          <FaLinkedin />
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
        </div>
        <div className="flex flex-wrap justify-center gap-8 py-5 md:flex-row">
          <p>Privacy</p>
          <p>Terms of Use</p>
          <p>Acceptable use Privacy</p>
          <p>Software Life cycle policy</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
