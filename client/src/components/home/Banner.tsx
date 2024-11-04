import { FaPlay } from "react-icons/fa";
import bannerImage from "../../assets/banner.png";

const Banner = () => {
  return (
    <section className="relative md:flex items-center max-w-[1200px] w-full mx-auto justify-center text-gray-700 md:h-[600px] ">
      <section className="flex flex-col justify-center h-full px-4 mb-6 md:mb-0">
        <p className="mb-2 text-2xl font-medium text-[#0C7060] font-montserrat">
          Where Taste Meets Adventure
        </p>
        <h2 className=" md::ml-2 lg:text-5xl  text-[28px] font-bold leading-[2.4rem] lg:leading-[3.4rem]  font-poppins mb-2 ">
          Ordering
          <span className="text-[#0C7060]"> Delights </span>
          Satisfy Your
          <span className="text-[#0C7060]"> Cravings </span>
          Here
        </h2>
        <p className="mb-2 text-base md:text-lg text-[#0C7060] font-montserrat">
          Unlock a World of Flavorful Discoveries
        </p>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-full bg-[#0C7060] text-white">
            Order Now
          </button>
          <button className="relative flex items-center px-4 py-3 overflow-hidden rounded-full rounded-tl-full rounded-bl-full hover:bg-green-200 group">
            {/* <span className=" px-4 py-4 rounded-tl-full border-r-0 border-t-0 border-b-0 rounded-bl-full border-l-8  border-[#FE5722] "> */}
            <span className="relative z-20 ">
              <span className="absolute px-4 py-4 rotate-45 border-8 rounded-full top-[-1rem] left-[-1.1rem]   group-hover:border-[#f79577]  border-b-[#f79577]  border-l-[#f79577]  border-white"></span>
              <FaPlay className="w-4 h-4" />
            </span>
            <span className="ml-5 font-semibold ">Watch Video</span>
          </button>
        </div>
      </section>

      <section className="grid items-center justify-center h-full px-4 md:justify-end md:pr-4">
        <img
          src={bannerImage}
          alt="banner image"
          className="sm:w-[30rem] md:w-[42rem] inline-block"
        />
      </section>
    </section>
  );
};

export default Banner;
