# Global Nomad 
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
| [김세민](https://github.com/sermain2) | [김영운](https://github.com/YoungUnKim) | [김진윤](https://github.com/EveryYawm) | [박지민](https://github.com/JiminN2) | [장익재](https://github.com/Ik5606) |
| :-----------------------------------: | :-------------------------------------: | :------------------------------------: | :----------------------------------: | :---------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/87350415?v=4" width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/162089313?v=4" width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/162412765?v=4" width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/162524947?v=4" width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/128791227?v=4" width="150" height="150"> |



### [역할 분담]
### 김세민

### 김영운

### 김진윤

### 박지민

### 장익재



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
| 라이브러리              | 목적                                          |
| ------------------------| -------------------------------------------------|
| TanStack Query          | 서버 상태를 효율적으로 관리하고, 데이터 페칭, 캐싱, 동기화 및 서버 상태 업데이트를 쉽게 처리하기 위해 사용. |

#### [프로젝트 구조]


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

-------------------------------------------------------------------------------------
# 4. 프로젝트 후기 💬

### 김세민
### 김영운
### 김진윤
### 박지민
### 장익재


