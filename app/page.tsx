import Banner from "@/components/MainPage/Banner";
import MainPage from "@/components/MainPage/MainPage";
import Footer from "@footer/Footer";

const LandingPage = () => {
  return (
    <>
      <Banner />
      <div className="main-layout">
        <MainPage />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
