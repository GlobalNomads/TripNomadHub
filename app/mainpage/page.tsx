import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Banner from './Banner';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import ExperienceList from './ExperienceList';
import PopularExperiences from './PopularExperiences';

const MainPage = () => {
  return (
    <div>
      <Header />
      <Banner />
      <CategoryFilter />
      <SearchBar />
      <PopularExperiences />
      <ExperienceList />
      <Footer />
    </div>
  );
};

export default MainPage;
