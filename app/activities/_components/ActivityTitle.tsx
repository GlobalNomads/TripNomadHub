/*
    체험상세(activities) 페이지의 제목(Title) 컴포넌트
    체험상세 page에서 받아온 정보 중 category, title, rating, reviewCount, address를 전달받음
    Todo: API 연결
*/

import React from 'react';
import Image from 'next/image';
import star from '@/app/assets/icon/ic_star_on.svg';
import location from '@/app/assets/icon/ic_location.svg';

function ActivityTitle() {
    return (
    <>
       <div className="md-regular pb-[10px]">
            카테고리
        </div>
        <div className="text-2xl-bold md:text-3xl-bold xl:text-3xl-bold pb-[16px]">
            제목
        </div> 
        <div className="md-regular flex items-center space-x-3">
            <span className="flex items-center space-x-[4px] md:space-x-[6px] xl:space-x-[6px]">
                <Image src={star} alt="rating" width={16} height={16} />
                <span>별점</span>
                <span>(총리뷰수)</span>
            </span>
        <span className="flex items-center space-x-[2px]">
             <Image src={location} alt="location" width={18} height={18} />
            <span>주소</span>
        </span>
      </div>
    </>
    );
  }
  
  export default ActivityTitle;
  