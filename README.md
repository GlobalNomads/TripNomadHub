# Global Nomad 
![1](https://github.com/user-attachments/assets/0848c4f9-71d7-4b85-a7ec-33a7f901f159)


- 🚀배포사이트 : https://global-nomad.netlify.app/

## 📣 프로젝트 소개
여행 고민 해결사 등장! 😎

여행 계획 짜기가 번거롭고 복잡하다고요? 걱정 마세요! **GlobalNomad**가 다 알아서 해드립니다.

5명의 여행✈ 덕후 프론트엔드 개발자들이 만든 **GlobalNomad**는 당신의 여행 고민을 한방에 해결해 줄 마법✨의 플랫폼입니다. 

여행 가서 뭘 할지, 얼마나 쓸지, 머리 아프게 고민하지 말고 우리만 믿고 따라오세요!

**GlobalNomad**에서는 잘 짜여진 다양한 체험 상품을 한눈에 보고, 원하시는 날짜📅에 클릭 한 번으로 간편하게 예약할 수 있어요.

체험 상품에 대한 설명과 리뷰도 가득하니, 실패 없는 여행이 보장됩니다!

떠날 준비 되셨나요? 그럼 **GlobalNomad**와 함께 재미있고 편안한 여행을 시작해보세요! 😍


  
## ⌛ 개발 기간
프로젝트 기간 : 2024.07.25 ~ 2024.09.02 

-------------------------------------------------------------------------------------
# 1. 개발자 소개 및 역할 분담
![2](https://github.com/user-attachments/assets/420de5e9-a96b-4c51-85a0-7a1561716af9)

### [역할 분담]
### [김세민](https://github.com/sermain2)
- 메인페이지
  
### [김영운](https://github.com/YoungUnKim)
- 로그인 & 회원가입 페이지
- 예약 현황 페이지
- 내 체험 수정 페이지
- 내 정보 페이지

### [김진윤](https://github.com/EveryYawm)
- 공용 버튼 컴포넌트, 모달 컴포넌트
- 체험 상세 페이지
- 내 체험 관리 페이지
- 예약 정보 모달(예약 현황 페이지)

### [박지민](https://github.com/JiminN2)
- 사이드 바
- 예약 내역 페이지

### [장익재](https://github.com/Ik5606)
- 체험 등록 페이지

-------------------------------------------------------------------------------------
# 2.  채택한 기술 및 개발 환경 🛠️
#### [기술 스택]
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react&logoColor=white) 

#### [기술 도구]
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

#### [협력 도구]
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)

#### [배포]
 ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) 

#### [라이브러리]
| 라이브러리              | 목적                                                                         |
| ------------------------| -----------------------------------------------------------------------------|
| TanStack Query          | Client side에서 서버 상태를 관리하고, 데이터 페칭 및 캐싱을 간편하게 구현.        |
| FullCalendar            | 피그마 디자인에 맞춰 예약 현황을 표시하기 위한 큰 달력 기능 구현.                 |
| react-hook-form         | Form을 효율적으로 관리하고 유효성 검사를 쉽게 처리.                              |
| dayjs                   | 날짜/시간을 쉽게 파싱하고 계산하며, 원하는 형식으로 포맷.                         |
| js-cookie               | Client side에서 쿠키를 간편하게 관리.                                           |
| react-datepicker        | 체험 예약 시스템에서, 신청 가능한 날짜를 보여주고, 날짜 선택 기능을 구현.          |
| swiper                  | 사진을 슬라이드 방식으로 넘겨볼 수 있도록 구현.                                  |
| lodash                  | 윈도우 사이즈 확인과 같은 기능을 구현.                                           |
| zustand                 | 상태 관리.                                                                    |

#### [프로젝트 구조]
```
📁 GlobalNomad  
┣ 📁 app  
┃ ┣ 📄 layout.tsx  .......... ## root layout  
┃ ┣ 📄 page.tsx  ............ ## 랜딩페이지  
┃ ┣ 📁 (auth)  
┃ ┃ ┣ 📁 signin ....................... ## 로그인 페이지  
┃ ┃ ┗ 📁 signup ....................... ## 회원가입 페이지  
┃ ┣ 📁 (features)  
┃ ┃ ┣ 📄 layout.tsx ........... ## features layout: header + {children} + footer  
┃ ┃ ┣ 📁 activity ...................... ## 체험 상세 페이지  
┃ ┃ ┃ ┗ 📁 [activityId]  
┃ ┃ ┗ 📁 (user)  
┃ ┃ ┃ ┣ 📄 layout.tsx ......... ## user layout: side nav + {children}  
┃ ┃ ┃ ┣ 📁 myactivities ................ ## 내 체험관리 페이지  
┃ ┃ ┃ ┃ ┣ 📁 activity-registration ..... ## 체험 등록 페이지  
┃ ┃ ┃ ┃ ┗ 📁 activity-edit ............. ## 체험 수정 페이지  
┃ ┃ ┃ ┃ ┗ 📁 [activityId]  
┃ ┃ ┃ ┣ 📁 myprofile ................... ## 내 정보 페이지  
┃ ┃ ┃ ┣ 📁 myreservations .............. ## 예약 내역 페이지  
┃ ┃ ┃ ┗ 📁 reservation-schedule ........ ## 예약 현황 페이지  
┃ ┣ 📁 api .................. ## api  
┃ ┣ 📁 assets ............... ## font, icon, image  
┃ ┣ 📁 components ........... ## 공용 컴포넌트  
┃ ┣ 📁 context .............. ## context들: AlarmContext  
┃ ┣ 📁 hooks ................ ## 공용 커스텀 hooks  
┃ ┣ 📁 lib  
┃ ┣ 📁 styles ............... ## 전역 스타일  
┃ ┣ 📁 types ................ ## 타입 정의  
┃ ┗ 📁 utils ................ ## 공용 유틸리티  
┣ 📁 public .................. ## 각종 소스들: favicon 등  
⋮
```

#### [브랜치 전략]
- Git Flow 전략: 프로젝트의 원활한 관리를 위해 `Main`과 `Develop` 두 개의 주요 브랜치를 중심으로 **Git Flow** 전략을 사용합니다. 모든 새로운 기능 개발은 `Develop 브랜치`에서 진행되며, 이를 위해 각 이슈별로 `Feature 브랜치`를 생성합니다.

- Feature 브랜치: 각 기능은 **Jira**와 연동되어 `KAN-(no.)-(name)`형식으로 브랜치가 생성되며, 이를 통해 효율적인 작업 분배와 진행 상황을 추적합니다. 이슈가 해결되면 Feature 브랜치를 Develop 브랜치에 병합합니다.

- Pull Request(PR): 코드의 품질을 보장하기 위해 **PR 최소 승인 인원을 2명**으로 설정합니다. 이를 통해 협업 과정에서 코드 리뷰가 철저히 이루어지며, 최종적으로 Main 브랜치에 반영됩니다.

#### [이슈 관리]
- 백로그 등록: 프로젝트의 모든 작업을 **Jira**에 **백로그**로 등록하여 체계적으로 관리합니다. 작업의 우선순위를 설정하고, 팀원 간 명확한 역할을 분담 합니다.

- 보드 관리: Jira 보드를 활용하여 각 작업의 진행 상황을 시각적으로 확인하고 추적합니다. `해야 할 일`, `진행 중`, `완료` 상태로 작업을 분류하여 프로젝트의 현재 상태를 한눈에 파악합니다.

- 스프린트 계획: **1주 단위로 스프린트**를 계획하고, 각 스프린트마다 목표를 설정하여 단계별로 프로젝트를 진행합니다. 이를 통해 작업의 집중도를 높이고, 목표 달성도를 극대화합니다.

- 이슈 트래킹: 각 작업에 대해 상세한 이슈 트래킹을 수행하여, 문제 발생 시 신속하게 대응할 수 있도록 합니다. 모든 변경 사항과 논의를 `Notion` 기록하여, 투명한 협업 환경을 조성합니다.

- 통합 및 연동: GitHub와 연동하여 코드 변경 사항을 자동으로 Jira 이슈와 연결합니다.

-------------------------------------------------------------------------------------
# 3. 주요기능 💜

#### 🌷 랜딩페이지
- 배너 컴포넌트에 Swiper 라이브러리 적용
- 검색 기능에 debounce 기능을 추가하여서 검색 로직을 구현
- 등록된 체험들을 타입에 따라서 인기 체험을 구분, 스크롤을 통해서 다른 리뷰가 많은 인기 체험을 load
- 모든 체험에서는 sortfilter, categoryfilter에 따라서 가격 순, 리뷰 순, 카테고리 타입 별로 정렬할 수 있는 기능을 구현
- Pagination 구현

#### 🌷 로그인&회원가입 페이지
- React-hook-form을 이용해 Form 태그내의 정보를 관리
- 구글, 카카오 간편로그인 기능 탑재
- 각각의 링크는 React Link를 활용해서 회원가입에서 로그인으로 로그인에서 회원가입으로 이동
- 조건에 안맞는 경우 조건에 안맞는 Input 태그 밑으로 에러 메세지

#### 🌷 헤더
- 로그인 전: 로그인&회원가입 링크가 있는 헤더를 활성화
- 로그인 후: 유저의 프로필 이미지와 닉네임을 띄운 헤더를 활성화
- 유저 프로필 이미지&닉네임 클릭 밑으로 드롭다운 메뉴 등장 -> 유저 기능 메뉴로 이동 & 로그아웃

#### 🌷 사이드 네비게이션 바
- 프로필 이미지 보여주기
- 클릭하여 다른 페이지로 이동
- 현재 위치한 페이지 bg-color로 강조

#### 🌷 체험 상세 페이지
- activityId에 해당하는 체험 정보 불러옴
- 갤러리: mobile- 이미지 swipe 기능, tablet&pc- grid형식으로 이미지 배치
- 지도: kakao map 스크립트 로드 형식으로 코드 반영, 주소에 해당하는 위치 표시
- 후기: 평점 별로 label 변경, Pagination 기능
- 예약 카드: react-datepicker로 체험 존재하는 날짜 선택 & 시간대별 예약 신청, 인원 선택시 금액 자동 산정, 예약 신청 보내기

#### 🌷 내 정보 페이지
- React-hook-form을 이용해 Form 태그내의 정보를 관리
- 기본 유저 정보를 API 통해 받아와서 기본값으로 세팅
- 정보 갱신되이 없는 경우 버튼 비활성화

#### 🌷 예약 내역 페이지
- useMutation 으로 예약 카드 상태 관리
- 무한스크롤 적용
- 필터로 원하는 상태의 예약 내역 보기
- 승인 되지 않은 예약 완료 상태의 체험카드→ 예약 취소하기
- 체험 완료한 상태의 체험카드→ 후기 작성하기
- 별점과 텍스트를 전송하는 후기 모달

#### 🌷 내 체험 관리 페이지
- user가 생성한 체험 목록
- 무한스크롤 적용
- 수정하기/삭제하기 기능 & 체험 등록 페이지와 연결되어있음

#### 🌷 체험 등록 페이지
- 카테고리: `문화 예술 | 식음료 | 스포츠 | 투어 | 관광 | 웰빙` 으로 제한하고 드롭 다운으로 선택
- 가격: 단위 포맷팅하여 세자릿수로 표기
- 주소: 다음(Daum) 우편번호 서비스를 이용해 주소를 입력받음
- 예약 가능한 시간: react-datepicker를 이용해 달력으로 날짜 선택, 중복 시간 등록시 에러메시지가 뜨도록 설정
- 이미지 추가: 배너 이미지는 1개, 소개 이미지는 최대4개까지 등록 가능

#### 🌷 체험 수정 페이지
- 기존 등록된 체험 데이터를 디폴트로 세팅
- 나머지 기능들은 등록 페이지와 동일

#### 🌷 예약 현황 페이지
- FullCallendar로 달력 구현
- 체험Id별로 예약 관리
- 예약이 존재하는 날짜 클릭시, 예약 정보 모달 팝업
- 예약 정보 모달: 신청이 들어온 각 예약에 대해 승인, 거절

-------------------------------------------------------------------------------------
# 4. 프로젝트 후기 💬

### 김세민
이번 프로젝트를 진행하면서 부족했던 개념을 다시 한 번 확인할 수 있었습니다. 서버와 클라이언트의 개념을 다시 한 번 확인할 수 있었고, tailwind css 스타일Next.js에서 app router 사용법을 알 수 있게 되었습니다.
### 김영운
FullCalendar, TanStack(React) Query 라이브러리나 기본적으로 사이즈 마다 변형되는 css, 많은 페이지 작업이 있었어서 안 쓰는 기능들을 많이 사용하게 된 계기가 되었습니다. 그리고 처음으로 쓴 Jira로 스케줄을 관리했던 점 정말 좋았다고 생각합니다.
### 김진윤
Next.js app router에 대해 심도 있게 공부할 수 있는 기회가 되었습니다. 데이터 페칭 전략에 대해 깊이 있게 토론하고, 성능 최적화를 위해 어떤 컴포넌트를 SSR 또는 CSR로 페칭할지 고민하면서 기술적으로 성장할 수 있었습니다.
### 박지민
App Router, TanStack(React) Query, Tailwind css등 생소했던 기술에 더 익숙해질 수 있었고 좋은 도전이었습니다. 코어타임 시간에 Jira 로 매일 데일리 스크럼을 잘 했던 것이 좋았습니다.
### 장익재
새로운 기술들을 써보며 성장할 수 있는 프로젝트였습니다. 새로  알게 된 기술이 있다는 점도 좋았지만, 팀원들과 멘토님의 조언으로 기술 외적으로도 개발자로서 필요한 것들을 많이 알 수 있었다는 점 또한 좋았습니다.
