# 오늘의사주 홈페이지

시간대에 따라 화면의 분위기가 달라지는 정적 웹사이트 시제품입니다.

- 오전 05:00~오후 17:59: 그린 테마
- 오후 18:00~오전 04:59: 핑크 테마
- 사용자가 `자동 / 낮 / 밤`을 직접 선택할 수 있으며 선택값은 브라우저에 저장됩니다.
- 별도의 프레임워크나 빌드 과정이 없어 Cloudflare Pages에 바로 배포할 수 있습니다.

## 페이지 구성

1. `index.html` — 브랜드 소개, 핵심 기능, 운의 리듬, 가격, 명리 콘텐츠
2. `analysis.html` — 사주 정보 입력 UI, 분석 체계, 체험용 결과 화면
3. `relationship.html` — 친구·연인·가족·동료 비교, 초대·동의 구조, 관계 기능
4. `knowledge.html` — 사주팔자·오행·십성·합충형파해·대운·세운·주역 설명

## 폴더 구조

```text
oneul-saju-homepage/
├─ public/
│  ├─ index.html
│  ├─ analysis.html
│  ├─ relationship.html
│  ├─ knowledge.html
│  ├─ assets/
│  │  ├─ styles.css
│  │  ├─ app.js
│  │  ├─ favicon.svg
│  │  └─ og-image.png
│  ├─ manifest.webmanifest
│  ├─ _headers
│  ├─ _redirects
│  ├─ robots.txt
│  └─ sitemap.xml
└─ docs/
   └─ DEVELOPMENT_GUIDE.md
```

## GitHub에 올리는 방법

1. GitHub에서 새 저장소를 만듭니다.
2. 이 압축파일을 풀고, `oneul-saju-homepage` 폴더 안의 파일을 저장소에 업로드합니다.
3. 저장소의 기본 브랜치는 `main`으로 둡니다.

## Cloudflare Pages 설정

- **Framework preset:** None
- **Build command:** 비워두기
- **Build output directory:** `public`
- **Root directory:** 비워두기

배포가 끝나면 Cloudflare가 제공하는 `pages.dev` 주소에서 사이트를 확인할 수 있습니다.

## 배포 전 반드시 수정할 항목

현재 도메인을 알 수 없어 아래 파일에는 `https://example.com`이 들어 있습니다.

- `public/index.html`
- `public/analysis.html`
- `public/relationship.html`
- `public/knowledge.html`
- `public/sitemap.xml`
- `public/robots.txt`
- 관계 초대 링크의 샘플 URL

실제 도메인이 정해지면 전체 검색 후 한 번에 바꾸면 됩니다.

## 현재 구현 범위와 한계

현재 버전은 디자인과 사용자 흐름을 확인하는 프론트엔드 시제품입니다.

- 사주 입력값은 서버로 전송하거나 저장하지 않습니다.
- 체험 결과의 사주팔자와 관계 점수는 실제 계산 결과가 아니라 화면 예시입니다.
- 결제, 로그인, 커뮤니티, 알림, PDF 생성은 아직 연결하지 않았습니다.
- 정식 서비스 전에는 절기, 야자시, 음력 윤달, 해외 출생 시간대, 대운 산식 등을 명리 전문가와 검수한 만세력 엔진이 필요합니다.

## 테스트용 테마 강제 적용

주소 뒤에 쿼리를 붙이면 시간과 관계없이 테마를 확인할 수 있습니다.

- 낮: `?theme=day`
- 밤: `?theme=night`
- 자동: `?theme=auto`
