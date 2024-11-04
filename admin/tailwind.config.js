/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "350px",
      sm: "550px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        cookie: ["Cookie", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
        // boge: ["Boge", "sans-serif"],
        // trasandina: ["Trasandina", "sans-serif"],
      },
      gridTemplateColumns: {
        // custom: "40px repeat(6, 1fr)",
        customDashboard: "40px 2.6fr 1.4fr  1.4fr 2fr 1fr 1fr 0.6fr",
        customRider: "40px 1fr 1fr 1fr 1fr 1fr 1fr",
        customReview: "40px 1fr 1.4fr 1fr 1fr 1fr 1fr 0.8fr",
        // customDashboard: "40px repeat(7, 1fr)",
        // customDishes: "40px repeat(7, 1fr)",
        customDishes: "40px 1fr 0.8fr 1fr 1.4fr 2fr 180px 0.8fr 1fr 1fr ",
        customBanner: "40px 1fr 0.8fr 1fr  0.6fr ",
        customCategoryDishes:
          "40px 1fr 0.8fr 1fr 1.4fr 2fr 180px 0.8fr 0.8fr  ",
        customRestaurant:
          "40px 1.4fr 2fr 0.8fr 1.2fr 1fr 1fr 1.4fr 1fr 1fr 1fr 0.6fr",
        customOrder: "40px  1.2fr 1.8fr 2.6fr 1.4fr 0.6fr 1fr 1fr 1.4fr 0.6fr",
        // customOrderItem: "40px  repeat(3, fr)",
        customeOrderItem: "40px repeat(3, 1fr)",
        customeCategory: "40px 2fr  0.6fr",
        customeUserOrder: "40px 1fr 1fr 1fr 1fr",
        customeCoupon: "40px 1fr 1fr 1fr 0.8fr",
        customResOwner: "40px 2.6fr 1.4fr  1.4fr 1fr 1fr ",
        customeOrderUserProfile: "40px 1fr 1fr 1fr 1fr 1fr 1fr",
        // customrRestOwnerOrder: "40px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.8fr",
      },
    },
  },
  plugins: [],
};
