import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const banners = [
  {
    id: 1,
    title: "Share a Meal, Spread the Joy",
    subtitle: "Join our mission to reduce food waste and fight hunger",
    image: "https://i.ibb.co/G3kjpqzT/Food1.jpg",
  },
  {
    id: 2,
    title: "Be Someone’s Ahar Bondhu",
    subtitle: "Donate your extra food to those in need",
    image: "https://i.ibb.co/HfHqX7R2/Food2.jpg",
  },
  {
    id: 3,
    title: "Community Powered Kindness",
    subtitle: "Support, Share, and Serve with Love",
    image: "https://i.ibb.co/21FyWz3Q/Food3.jpg",
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  return (
    <div className="mt-8">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="relative h-[80vh] w-full">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
            <div className="absolute inset-45 bg-opacity-40 rounded-lg flex flex-col justify-center items-center  text-center px-6">
              <h2 className="bg-white text-3xl md:text-5xl text- font-bold mb-2 drop-shadow-md">
                {banner.title}
              </h2>
              <p className="bg-white text-lg md:text-2xl drop-shadow">
                {banner.subtitle}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
