import Banner from "@/components/MainPage/Banner";
import MainPage from "@/components/MainPage/MainPage";
import Footer from "@footer/Footer";
import Header from "@header/Header";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Banner />
      <div className="main-layout">
        <MainPage />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
