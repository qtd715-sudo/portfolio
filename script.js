document.addEventListener('DOMContentLoaded', () => {
  const htmlEl = document.documentElement;
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  // mobile nav toggle + theme toggle live in site.js (shared by every page)

  const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const header = document.querySelector('.header');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: targetTop - headerHeight - 8,
        behavior: 'smooth',
      });
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        if (!id) return;
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (!href) return;
          link.classList.toggle('is-active', href.slice(1) === id);
        });
      });
    },
    {
      rootMargin: '-60% 0px -35% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));

  const translations = {
    ko: {
      'nav.about': '자기소개',
      'nav.experience': '경력 사항',
      'nav.projects': '수행 이력',
      'nav.featured': '대표 프로젝트',
      'nav.competencies': '핵심 역량',
      'hero.tag': 'AI Agent Architecture · FinTech Product Builder · Enterprise Governance',
      'hero.title': '복잡한 도메인 규칙을 작동하는 AI 에이전트와 프로덕트로 구현하는 전문가입니다',
      'hero.sub':
        '7개 공장(405단계)의 복잡한 통합 결산 프로세스를 시스템화하고, 20여 개 엔터프라이즈 ERP와 SOC 2 보안 거버넌스를 구축한 11년 차 도메인 전문가입니다. 오프라인 업무를 규칙 기반 시스템으로 표준화해 온 역량에 AI 에이전트 오케스트레이션을 결합해, 매뉴얼 후처리 시간을 77% 단축한 자동화 파이프라인과 온디바이스 핀테크 프로덕트를 직접 설계·구현했습니다.',
      'hero.ctaProjects': '대표 프로젝트 보기',
      'hero.ctaAbout': '자기소개 보기',
      'featured.p0.status': 'Beta · Google Play 비공개 테스트',
      'featured.p0.ctx': '개인 앱 · 기업가치평가시스템 구축 경험 + MBA 재무',
      'featured.p0.title': 'SY Valuation — 3접근법·9모델 기업가치평가 시스템',
      'featured.p0.desc': '재직 시절 기업가치평가시스템을 구축한 경험과 FinTech MBA 재무 모델링 역량을 집약한 밸류에이션 시스템입니다. 기업명을 입력하면 매일 자동 수집·갱신되는 DART 재무·시세·베타 데이터를 바탕으로 CAPM·WACC·DCF와 자산·상대가치로 기업가치 범위를 계산하고, 9개 모델과 뉴스 감성을 더해 현재 기업의 가치를 산출합니다.',
      'featured.p0.cta': '케이스 스터디 보기 →',
      'featured.p1.ctx': '사내 AX · 단독 설계·운영',
      'featured.p2.ctx': '개인 앱 · AI · PM / PO 핀테크 서비스 기획',
      'featured.p0.t1': '기업가치평가',
      'featured.p0.t2': '일배치 데이터 파이프라인',
      'featured.p0.t3': 'DART · KRX 자동수집',
      'featured.p0.t4': '전종목 스크리너',
      'featured.p1.t1': '사내 AX',
      'featured.p1.t2': '멀티 에이전트 설계',
      'featured.p1.t3': '가드레일 설계',
      'featured.p1.t4': '정량 검증 체계',
      'featured.p2.t1': '핀테크 서비스 기획',
      'featured.p2.t2': 'PM / PO',
      'featured.p2.t3': '도메인 로직 모델링',
      'featured.p2.t4': '프라이버시 중심 설계',
      'featured.p0.hl': '3대 평가 접근법 · 9개 적정주가 모델 · 코스피·코스닥 전종목 일배치',
      'featured.p1.hl': '제작 기간 20일 → 4일(−80%) · AI 수정 채택률 89~93% · 후처리 77% 단축',
      'featured.p2.hl': '12개 화면 설계 · 온디바이스 구조 · 카카오맵 / 실거래가 연동',
      'featured.title': '대표 프로젝트',
      'featured.sub':
        '기업가치평가 시스템, 사내 AX, 핀테크 프로덕트 — 세 개의 대표 작업입니다. 카드를 누르면 케이스 스터디로 이동합니다.',
      'featured.p1.status': '운영 중 · 2026-04~',
      'featured.p1.title': 'B2B SaaS 제품 매뉴얼 작성·검증 전 주기 자동화 파이프라인',
      'featured.p1.desc':
        'B2B 조달 SaaS 국·영 매뉴얼 제작 리드타임을 약 20일에서 4일로 단축한 4계층 멀티 에이전트 파이프라인. AI 생성과 Python 규칙 엔진 판정을 분리하고, 작성 가이드와 실행 전 훅(Hook) 가드레일로 규칙 위반을 차단해 AI 수정 채택률 국문 88.8% · 영문 93.2%를 기록했습니다.',
      'featured.p1.cta': '케이스 스터디 보기 →',
      'featured.p2.status': 'v1.0 Beta · 비공개 테스트',
      'featured.p2.title': '아워체크(OurCheck) — 청약 자격 판정 앱 v1.0 · 자금 사전승인 설계 v2.0',
      'featured.p2.desc':
        '7대 청약 자격 판정과 카카오맵·국토부 실거래가 연동을 온디바이스(무서버) 구조로 구현해 Beta 테스트 중이며, 이를 바탕으로 LTV·DSR 자금 사전승인, 공고문 조항 추출, 대출 연결까지 확장한 v2.0 서비스 설계안을 구상했습니다.',
      'featured.p2.cta': '케이스 스터디 보기 →',
      'featured.p2.cta2': '전체 화면설계서',
      'comp.c1.proof': '→ Project 02 매뉴얼 자동화',
      'comp.c2.proof': '→ Project 01 기업가치평가 · Project 03 아워체크',
      'comp.c3.proof': '→ 경력 사항 · Project 03 프라이버시 설계',
      'comp.title': '핵심 역량',
      'comp.sub': '세 가지 대표 프로젝트에서 반복해서 쓰인 핵심 설계 역량입니다.',
      'comp.c1.title': 'AI 자동화 & 규칙 기반 가드레일 설계',
      'comp.c1.l1': '역할별 멀티 에이전트 분리와 세션 간 문서 인수인계 구조 설계',
      'comp.c1.l2': 'AI 생성과 규칙 엔진 판정을 분리하고, 작성 가이드와 실행 전 훅(Hook)으로 규칙 위반 오류 차단',
      'comp.c1.l3': '사람 수정 이력(Diff) 기반의 정량 품질 검증 및 야간 자가학습 운영',
      'comp.c2.title': '금융·도메인 로직 모델링 & 데이터 파이프라인',
      'comp.c2.l1': '기업가치평가(DCF·RIM), 청약 자격·LTV/DSR 같은 복잡한 계산 규칙을 알고리즘으로 구현',
      'comp.c2.l2': '코스피·코스닥 전종목 시세·DART 재무 일배치 수집 및 공공 데이터·지도 API 연동',
      'comp.c2.l3': '모든 산출 수치에 법령 조문·공고문 원문·재무 출처를 연결하는 투명한 검증 구조',
      'comp.c3.title': '엔터프라이즈 시스템 설계 & 보안 거버넌스',
      'comp.c3.l1': 'ERP 원가·결산·구매 프로세스의 화면·DB 설계 경험을 바탕으로 복잡한 금융·업무 로직을 시스템화',
      'comp.c3.l2': '글로벌 B2B SaaS 확장을 위한 SOC 2 Type 1·2 보안 인증 및 전사 내부통제 체계 구축',
      'comp.c3.l3': '온디바이스 아키텍처와 최소 권한 원칙 기반의 핀테크 UX 설계',
      'about.title': '자기소개',
      'about.body':
        '대규모 ERP·B2B SaaS·Web/App의 라이프사이클 전체를 주도해 온 11년 차 프로덕트 기획자이자 빌더입니다. 누구도 맡지 않던 원가·관리회계 모듈을 자원해 독학으로 구축해 20여 개 프로젝트를 리딩했습니다. 데이터 법인 설립으로 조직의 의사결정을 데이터 기반으로 전환했고, SOC 2 인증과 Tech 수주·공수 산정으로 기술을 수주 경쟁력으로 연결했습니다. 서버·DB·로직 단까지 이해하는 IT Literacy로 기획과 개발 사이의 간극을 없애고, 이제는 AI 에이전트로 그 규칙들을 자동화합니다.',
      'about.basic': '기본 정보',
      'about.nameLabel': '이름',
      'about.nameValue': '백소영 (SoYoung Back)',
      'about.positionLabel': '포지션',
      'about.skillLabel': '핵심역량',
      'about.skillValue': '도메인 로직 모델링 / AI 에이전트 설계 / DB·프로세스·거버넌스',
      'about.degreeLabel': '학위',
      'about.emailLabel': '이메일',
      'exp.title': '경력 사항',
      'exp.sub': '엔터프라이즈 ERP 구축부터 신설 데이터 법인 세팅, 글로벌 보안 거버넌스, Tech 수주, AI 자동화(AX)까지의 실행 이력입니다.',
      'exp.emro.name': 'EMRO',
      'exp.emro.meta': '2024.09.30 ~ 현재 · Technical Consulting / 사업기획',
      'exp.emro.desc':
        'SK·KT 등 대형 고객사의 기능·보안 요건 정의서 대응을 주도해 수주를 이끌었으며, 16개 주요 기업의 표준 공수 산정을 100% 기한 내(평균 3~5일) 회신해 프로젝트 수주 기반을 마련했습니다. 또한 글로벌 B2B SaaS 확장을 위한 SOC 2 Type 1·2 인증을 총괄하고 수립된 정책을 수주 경쟁력으로 연결했습니다.',
      'exp.dplanex.meta': '2022.08.21 ~ 2024.09.26 · Business Developer / 사업기획',
      'exp.dplanex.desc':
        '교보그룹 데이터 전문법인 설립 초기 멤버로 합류해 3개년 사업·매출 계획과 일 단위 진행매출 산정 프로세스를 제로 베이스에서 정립하고, 100% 데이터 기반 의사결정 체계로 전환했습니다. 그룹사 데이터 레이크 사업을 매출화하고 전사 컴플라이언스 체계를 구축했습니다.',
      'exp.dts.meta': '2021.11.22 ~ 2022.08.20 · DX전략기획파트 / IT 전략기획',
      'exp.dts.desc':
        '전사 영업 실적관리 시스템(Salesforce) 도입과 대시보드 구축을 총괄해 분산된 업무를 데이터 기반 경영진 보고 체계로 통합했습니다. 모바일 커뮤니티 앱 구축 PM을 맡았고, 데이터 전문법인 설립 추진 지원과 그룹사 데이터 거버넌스 체계 수립에 참여했습니다.',
      'exp.douzone.meta': '2015.11.16 ~ 2021.11.11 · ERP구축부 PL/PM',
      'exp.douzone.desc':
        '제조·바이오 등 20여 개 기업의 원가관리·프로젝트관리·구매관리 모듈 구축 PL/PM을 수행하며 AS-IS 분석, 화면·DB 설계, 실데이터 결산 안정화까지 풀사이클을 완수했습니다. 관리회계·표준원가관리·프로젝트관리 모듈의 표준 패키지화를 진행했습니다.',
      'projects.title': '수행 이력',
      'projects.sub': '거버넌스·내부통제, Tech 수주·공수 산정, ERP, PMO 경험이 녹아 있는 주요 수행 내역입니다.',
      'proj.soc.title': 'SOC 인증',
      'proj.soc.desc': '인증 기획/총괄 및 유관부서 협업으로 전 통제항목 통과',
      'proj.bid.title': 'Tech 수주 & 공수 산정',
      'proj.bid.desc': 'SOC 2 기반 요건 대응과 16건 표준 공수 산정 적시 회신',
      'proj.erp.title': 'ERP 구축 및 업무 프로세스 고도화',
      'proj.erp.desc': '요구사항 분석부터 설계/커뮤니케이션/운영 안정화까지',
      'proj.pmo.title': '전략 기획 및 디지털 전환',
      'proj.pmo.desc': 'CRM 도입/내재화 및 데이터 거버넌스 체계 구축',
      'proj.ai.title': 'AI 자동화 멀티 에이전트 워크플로',
      'proj.ai.desc': '매뉴얼 제작을 자동화하는 4계층 멀티 에이전트 체계 설계·구축',
      'footer.top': '위로 올라가기',
    },
    en: {
      'nav.about': 'About',
      'nav.experience': 'Career',
      'nav.projects': 'Projects',
      'nav.featured': 'Featured',
      'nav.competencies': 'Competencies',
      'hero.tag': 'AI Agent Architecture · FinTech Product Builder · Enterprise Governance',
      'hero.title': 'I turn complex domain rules into working AI agents and products',
      'hero.sub':
        'A domain specialist in my 11th year: I systematized a complex consolidated-closing process across 7 plants (405 steps) and built 20+ enterprise ERPs and SOC 2 security governance. Combining that rule-based standardization of offline work with AI agent orchestration, I designed and built an automation pipeline that cut manual post-processing time by 77%, and an on-device fintech product.',
      'hero.ctaProjects': 'View featured work',
      'hero.ctaAbout': 'View profile',
      'featured.p0.status': 'Beta · Google Play closed testing',
      'featured.p0.ctx': 'Personal app · valuation-system build experience + MBA finance',
      'featured.p0.title': 'SY Valuation — a 3-approach, 9-model equity valuation system',
      'featured.p0.desc': 'A valuation system that distills my experience building a corporate valuation system at a previous employer and my FinTech MBA financial-modeling skills. Enter a company name: from DART financials, prices and beta collected and refreshed automatically every day, it computes a valuation range with CAPM, WACC, DCF plus asset and relative value, then adds 9 models and news sentiment to estimate the company\'s value today.',
      'featured.p0.cta': 'Read case study →',
      'featured.p1.ctx': 'In-house AX · designed and operated solo',
      'featured.p2.ctx': 'Personal app · AI · PM / PO fintech service planning',
      'featured.p0.t1': 'Equity valuation',
      'featured.p0.t2': 'Daily batch data pipeline',
      'featured.p0.t3': 'DART · KRX auto-collection',
      'featured.p0.t4': 'All-stock screener',
      'featured.p1.t1': 'In-house AX',
      'featured.p1.t2': 'Multi-agent design',
      'featured.p1.t3': 'Guardrail design',
      'featured.p1.t4': 'Quantitative evaluation',
      'featured.p2.t1': 'Fintech service planning',
      'featured.p2.t2': 'PM / PO',
      'featured.p2.t3': 'Domain logic modeling',
      'featured.p2.t4': 'Privacy-first design',
      'featured.p0.hl': '3 valuation approaches · 9 fair-value models · daily batch over all KOSPI·KOSDAQ stocks',
      'featured.p1.hl': 'Lead time 20 → 4 days (−80%) · AI edit adoption 89–93% · post-processing −77%',
      'featured.p2.hl': '12 screens designed · on-device architecture · Kakao Map / real-transaction prices',
      'featured.title': 'Featured Projects',
      'featured.sub':
        'A valuation system, in-house AX, and a fintech product — three featured works. Open a card for the full case study (in Korean).',
      'featured.p1.status': 'In operation · since 2026-04',
      'featured.p1.title': 'End-to-end automation pipeline for B2B SaaS product manuals',
      'featured.p1.desc':
        'A 4-layer multi-agent pipeline that cut KR/EN manual production lead time for a B2B procurement SaaS from about 20 days to 4. AI generation is separated from Python rule-engine judgment, and writing guides plus pre-execution hook guardrails block rule violations; AI edits were kept at 88.8% (KR) and 93.2% (EN).',
      'featured.p1.cta': 'Read case study →',
      'featured.p2.status': 'v1.0 Beta · closed testing',
      'featured.p2.title': 'OurCheck — eligibility app v1.0 · funding pre-approval design v2.0',
      'featured.p2.desc':
        'Built 7-rule housing-subscription eligibility plus Kakao Map and MOLIT real-transaction price integration on-device (no server), now in beta testing. On top of it, I designed a v2.0 service that extends to LTV/DSR funding pre-approval, notice-clause extraction and loan hand-off.',
      'featured.p2.cta': 'Read case study →',
      'featured.p2.cta2': 'Full screen spec',
      'comp.c1.proof': '→ Project 02 manual automation',
      'comp.c2.proof': '→ Project 01 valuation · Project 03 OurCheck',
      'comp.c3.proof': '→ Career · Project 03 privacy design',
      'comp.title': 'Core Competencies',
      'comp.sub': 'Core design capabilities used repeatedly across all three featured projects.',
      'comp.c1.title': 'AI automation & rule-based guardrail design',
      'comp.c1.l1': 'Role-separated multi-agent design with document-based hand-offs between sessions',
      'comp.c1.l2': 'AI generation separated from rule-engine judgment; writing guides and pre-execution hooks block rule violations',
      'comp.c1.l3': 'Quantitative quality evaluation on human-edit diffs, plus nightly self-learning runs',
      'comp.c2.title': 'Financial & domain logic modeling & data pipelines',
      'comp.c2.l1': 'Complex calculation rules — valuation (DCF, RIM), subscription eligibility, LTV/DSR — implemented as algorithms',
      'comp.c2.l2': 'Daily batch collection of all KOSPI·KOSDAQ prices and DART financials; public-data and map API integration',
      'comp.c2.l3': 'A transparent verification structure linking every output to its statute, notice text or financial source',
      'comp.c3.title': 'Enterprise system design & security governance',
      'comp.c3.l1': 'Systematizing complex financial and business logic, drawing on screen/DB design for ERP costing, closing and purchasing',
      'comp.c3.l2': 'SOC 2 Type 1·2 certification for global B2B SaaS expansion and company-wide internal controls',
      'comp.c3.l3': 'Fintech UX designed on an on-device architecture and the principle of least privilege',
      'about.title': 'About',
      'about.body':
        'A product planner and builder in my 11th year, having led the full lifecycle of large ERP, B2B SaaS and web/app products. I volunteered for the cost and managerial-accounting module nobody wanted, taught myself the domain, and went on to lead 20+ projects. I helped set up a data subsidiary that moved decision-making onto data, and turned SOC 2 certification, tech bids and effort estimation into a competitive edge in winning work. With IT literacy down to the server, DB and logic layers, I close the gap between planning and development — and now automate those rules with AI agents.',
      'about.basic': 'Profile',
      'about.nameLabel': 'Name',
      'about.nameValue': 'SoYoung Back',
      'about.positionLabel': 'Position',
      'about.skillLabel': 'Core Skills',
      'about.skillValue': 'Domain logic modeling / AI agent design / DB · process · governance',
      'about.degreeLabel': 'Degree',
      'about.emailLabel': 'Email',
      'exp.title': 'Career',
      'exp.sub': 'A track record of execution — from enterprise ERP builds to setting up a new data company, global security governance, tech bids, and AI automation (AX).',
      'exp.emro.name': 'EMRO',
      'exp.emro.meta': '2024.09.30 – Present · Technical Consulting / Business Planning',
      'exp.emro.desc':
        'Led responses to functional and security requirement specifications for large clients such as SK and KT, driving wins; returned standard effort estimates for 16 key companies, 100% on time (3–5 days on average), laying the groundwork for project wins. Also led SOC 2 Type 1·2 certification for global B2B SaaS expansion and turned the resulting policies into a competitive edge in bids.',
      'exp.dplanex.meta': '2022.08.21 – 2024.09.26 · Business Developer / Business Planning',
      'exp.dplanex.desc':
        'Joined as a founding member of Kyobo Group\'s data company; built the 3-year business and revenue plan and the daily in-progress revenue process from zero, moving decision-making to 100% data-driven. Monetized the group data-lake business and built company-wide compliance.',
      'exp.dts.meta': '2021.11.22 – 2022.08.20 · DX Strategy Part / IT Strategy',
      'exp.dts.desc':
        'Led the rollout of a company-wide sales performance system (Salesforce) and dashboards, unifying scattered work into data-driven executive reporting. PM for a mobile community app; supported the launch of a data company and helped set up group-wide data governance.',
      'exp.douzone.meta': '2015.11.16 – 2021.11.11 · ERP Implementation Dept. PL/PM',
      'exp.douzone.desc':
        'PL/PM for cost, project and purchasing module builds at 20+ companies in manufacturing, bio and more — full cycle from AS-IS analysis and screen/DB design to stabilizing closing on live data. Packaged the management accounting, standard costing and project management modules as standard products.',
      'projects.title': 'Project Highlights',
      'projects.sub':
        'Key engagements that capture my experience in governance/internal control, tech bids and effort estimation, ERP and PMO.',
      'proj.soc.title': 'SOC Certification',
      'proj.soc.desc': 'Planned & led certification; passed all controls via cross-team collaboration',
      'proj.bid.title': 'Tech Bids & Effort Estimation',
      'proj.bid.desc': 'SOC 2–based requirement responses and 16 on-time effort estimates',
      'proj.erp.title': 'ERP Implementation & Process Improvement',
      'proj.erp.desc': 'From requirements analysis to design, communication, and stabilization',
      'proj.pmo.title': 'Strategic Planning & Digital Transformation',
      'proj.pmo.desc': 'CRM adoption/embedding and data-governance build-out',
      'proj.ai.title': 'AI Automation Multi-Agent Workflow',
      'proj.ai.desc': 'Designed & built a 4-layer multi-agent system to automate manual production',
      'footer.top': 'Back to top',
    },
  };

  let currentLang = 'ko';

  function applyLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    currentLang = lang === 'en' ? 'en' : 'ko';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = dict[key];
      if (!value) return;
      el.textContent = value;
    });

    htmlEl.lang = currentLang;

    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });

    window.localStorage.setItem('lang', lang);
  }

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang || 'ko';
      applyLanguage(lang);
      // re-render the JS-driven project detail in the new language
      const selected = document.querySelector('.project-tab.is-selected');
      const selectedId = selected ? selected.dataset.project : 'bid';
      if (selectedId) selectProjectTab(selectedId);
    });
  });

  const storedLang = window.localStorage.getItem('lang');
  if (storedLang === 'en' || storedLang === 'ko') {
    applyLanguage(storedLang);
  }

  const projectTabs = Array.from(document.querySelectorAll('.project-tab[data-project]'));
  const detailKicker = document.getElementById('project-detail-kicker');
  const detailTitle = document.getElementById('project-detail-title');
  const detailSub = document.getElementById('project-detail-sub');
  const detailBody = document.getElementById('project-detail-body');

  const erpRows = [
    {
      period: '2021.06 - 2022.01', client: '에이치이엠파마', clientEn: 'HEM Pharma', role: 'PL',
      industry: '바이오/제조', industryEn: 'Bio · Mfg', tags: ['원가'],
      desc: '프로젝트관리 모듈 구축 총괄 — 프로젝트원가·배부, 용역매출원가, 사전/사후 손익',
      descEn: 'Led the project-management module — project cost & allocation, service COGS, pre/post P&L',
      points: ['용역매출원가 결산·정산 자동전표로 결산 업무 간소화', '프로젝트원가·사후손익·용역매출원가 표준 패키지(PKG)화', '진행률 매출 개발 및 타 모듈 연계 주도'],
      pointsEn: ['Automated service-COGS closing and settlement journals', 'Packaged project cost, post-P&L and service COGS as standard modules', 'Built percentage-of-completion revenue; led links to other modules'],
    },
    {
      period: '2020.04 - 2021.01', client: '벽산', clientEn: 'Byucksan', role: 'PL',
      industry: '건자재/제조', industryEn: 'Building Mat. · Mfg', tags: ['원가'],
      desc: '관리회계 구축 총괄 — 사업계획, 공장별 표준원가, 제조원가, 수익성분석',
      descEn: 'Led managerial accounting — business plan, per-plant standard cost, manufacturing cost, profitability',
      points: ['7개 공장 통합 결산 프로세스 405단계 수립', '관리회계 개발 리스트 46건 전량 설계', '판관비·이자수익 배부로 부서·품목별 손익과 사업계획 대비 실적 실시간 조회', '.NET → Web 기반 시스템 전환 구축'],
      pointsEn: ['Defined a 405-step consolidated closing process across 7 plants', 'Designed all 46 items on the managerial-accounting build list', 'SG&A and interest allocation for real-time P&L by department/item vs plan', 'Moved from a .NET to a web-based system'],
    },
    {
      period: '2019.11 - 2020.04', client: '지엔엠라이프', clientEn: 'GNM Life', role: 'PL',
      industry: '유통', industryEn: 'Distribution', tags: ['원가', '구매', '연동'],
      desc: '외주구매·제조원가 구축 및 쇼핑몰 통합관리 솔루션 I/F',
      descEn: 'Outsourced purchasing and manufacturing cost; marketplace-integration interfaces',
      points: ['쇼핑몰별 주문 수집 I/F 설계', '송장 데이터 I/F 설계', '제조원가 구축'],
      pointsEn: ['Order-collection interfaces per marketplace', 'Shipping-invoice data interface', 'Manufacturing-cost build'],
    },
    {
      period: '2019.05 - 2020.01', client: '쿠도커뮤니케이션', clientEn: 'Kudo Communication', role: 'PL',
      industry: 'IT', industryEn: 'IT', tags: ['원가'],
      desc: 'PMS(프로젝트 관리 시스템) 및 원가 구축',
      descEn: 'Project management system (PMS) and costing',
      points: ['인력별 타임시트 프로그램', '선매입 대체 프로그램', '진행매출 조회 프로그램'],
      pointsEn: ['Timesheets per person', 'Prepaid-purchase reclassification', 'Progress-revenue inquiry'],
    },
    {
      period: '2018.11 - 2019.11', client: '엑사이엔씨', clientEn: 'EXA E&C', role: 'PL',
      industry: '전자/제조', industryEn: 'Electronics · Mfg', tags: ['원가', '구매'],
      desc: '표준·실제원가·Rolling Plan 구축 및 인천공장 물류·생산 전체 담당',
      descEn: 'Standard/actual cost and rolling plan; owned all logistics and production at the Incheon plant',
      points: ['공사원가와 연계되는 실제원가(제조원가 → 공사 재료비) 프로세스 설계', '본사·공장별 기준(프로젝트·수주유형·제품군)의 계획 대비 실적 Rolling Plan', '공장별 배부 기준 차등화, 차수별 품목 SPEC 관리'],
      pointsEn: ['Actual-cost process feeding construction cost (mfg cost → material cost)', 'Rolling plan vs actuals by project, order type and product group', 'Plant-specific allocation bases; revisioned item specs'],
    },
    {
      period: '2019.08 - 2019.08', client: '와이디생명과학', clientEn: 'YD Life Science', role: 'PM',
      industry: '바이오', industryEn: 'Bio', tags: ['구매', '연동'],
      desc: '물류 고도화 — 외부 연동용 데이터 VIEW 생성 및 제공',
      descEn: 'Logistics upgrade — data views for external integration',
      points: ['품목·거래처·수불·LOT별 수불 VIEW 생성', 'I/F 업체는 VIEW만 조회하도록 DB 권한 설정'],
      pointsEn: ['Item, customer, stock-movement and lot-level views', 'DB permissions limiting the partner to read-only views'],
    },
    {
      period: '2018.12 - 2019.07', client: '새턴바스', clientEn: 'Saturn Bath', role: 'PL',
      industry: '제조', industryEn: 'Manufacturing', tags: ['원가'],
      desc: '실제원가 구축 지원 — 공사원가 연계 실제원가 프로세스 설계·확정',
      descEn: 'Actual-cost support — designed and finalized the process linked to construction cost',
      points: ['제조원가가 공사원가 재료비로 이어지는 흐름 설계'],
      pointsEn: ['Designed the flow from manufacturing cost into construction material cost'],
    },
    {
      period: '2018.12 - 2019.06', client: '선일케미칼', clientEn: 'Sunil Chemical', role: 'PL',
      industry: '화학/제조', industryEn: 'Chemical · Mfg', tags: ['원가'],
      desc: '금형 업종 표준·실제원가 및 한계이익 구축',
      descEn: 'Standard/actual cost and contribution margin for a mold maker',
      points: ['금형·설비·건물 감가상각 등 원가요소별 배부기준 설계', '판가 100원 미만 제품 특성상 공통배부 없이 최대 4차 배부(사업부문·거래처·외주처·품목)', '변동 제조원가·변동 판관비 기반 한계이익 산출'],
      pointsEn: ['Allocation bases per cost element (mold, equipment, building depreciation)', 'Up to 4-stage allocation with no common pool, as unit prices are under ₩100', 'Contribution margin from variable mfg cost and variable SG&A'],
    },
    {
      period: '2018.08 - 2019.02', client: '지피클럽', clientEn: 'GP Club', role: 'PL',
      industry: '제조', industryEn: 'Manufacturing', tags: ['구매', '영업'],
      desc: 'EC·구매자재·수입 모듈 구축',
      descEn: 'EC, purchasing/materials and import modules',
      points: ['추정재고 설계 및 구축'],
      pointsEn: ['Designed and built estimated inventory'],
    },
    {
      period: '2018.11 - 2018.12', client: '니콘이미징코리아', clientEn: 'Nikon Imaging Korea', role: 'PM',
      industry: '전자/제조', industryEn: 'Electronics · Mfg', tags: ['연동'],
      desc: 'ERP - 그룹웨어(GW) 연동 고도화',
      descEn: 'ERP–groupware (GW) integration upgrade',
      points: ['그룹웨어 연동 구간 정리 및 해제'],
      pointsEn: ['Cleaned up and removed groupware integration points'],
    },
    {
      period: '2018.07 - 2018.12', client: '포스코터미날', clientEn: 'POSCO Terminal', role: 'PL',
      industry: '물류/운송', industryEn: 'Logistics · Transport', tags: ['구매', '연동'],
      desc: '구매자재 모듈 신규 구축 및 그룹·현업 시스템 I/F',
      descEn: 'New purchasing/materials module and group/operations interfaces',
      points: ['AS-IS가 없던 구매자재 업무의 TO-BE 프로세스 신규 설계', '그룹 자재표준화·구매포탈·도면관리·선석관리 I/F', '선석관리 연계 용역비 정산 자동 발주~입고'],
      pointsEn: ['Designed TO-BE purchasing from scratch (no AS-IS existed)', 'Interfaces to group material standards, procurement portal, drawings and berth management', 'Service-fee settlement with automatic PO-to-receipt from berth data'],
    },
    {
      period: '2017.04 - 2018.09', client: '하츠', clientEn: 'Haatz', role: 'PL',
      industry: '가전/제조', industryEn: 'Home Appliance · Mfg', tags: ['원가'],
      desc: '통합원가관리(사업계획·표준·참조·실제·실적원가) 및 결산관리 구축',
      descEn: 'Integrated cost management (plan, standard, reference, actual) and closing',
      points: ['재료비·가공비(임율·표준공수) 기반 표준원가 적상 로직 설계', '공정별 원가 계산과 표준 대 실제 차이 분석', '월 결산전표 7종 자동 생성', '렌탈관리 시스템(카드·CMS 연동) PL 보조'],
      pointsEn: ['Standard-cost roll-up from material and conversion cost (rates, standard hours)', 'Per-process costing and standard-vs-actual variance', '7 monthly closing journals generated automatically', 'Rental management with card/CMS links (PL support)'],
    },
    {
      period: '2018.04 - 2018.07', client: '한국코와', clientEn: 'Kowa Korea', role: 'PM',
      industry: '제약/유통', industryEn: 'Pharma · Distribution', tags: ['영업', '연동'],
      desc: '영업모듈 고도화 (2차 프로젝트)',
      descEn: 'Sales module upgrade (phase 2)',
      points: ['최소출하 단가 통제 및 단가이력 관리', '회전일·유효기간 등 반품 통제 4종', 'SFA 주문·수금 관리, 그룹웨어 품의 양식 연동'],
      pointsEn: ['Minimum-shipment price control and price history', 'Four return controls (turnover days, expiry, etc.)', 'SFA orders and collections; groupware approval forms'],
    },
    {
      period: '2017.03 - 2018.04', client: '야놀자', clientEn: 'Yanolja', role: 'PL',
      industry: 'IT/플랫폼', industryEn: 'IT · Platform', tags: ['구매', '영업'],
      desc: 'EC 모듈 및 구매자재 모듈 구축',
      descEn: 'EC module and purchasing/materials module',
      points: ['상품코드 채번 시스템 구축'],
      pointsEn: ['Product-code numbering system'],
    },
    {
      period: '2017.05 - 2017.06', client: '한국코와', clientEn: 'Kowa Korea', role: 'PM',
      industry: '제약/유통', industryEn: 'Pharma · Distribution', tags: ['영업', '연동'],
      desc: 'PG사 결제 시스템 변경',
      descEn: 'Payment-gateway change',
      points: [],
      pointsEn: [],
    },
    {
      period: '2015.12 - 2017.02', client: '코스콤', clientEn: 'Koscom', role: 'QA/PL',
      industry: '금융IT', industryEn: 'Fintech', tags: ['QA'],
      desc: 'PMO 지침 기반 품질관리(QA) 및 BT(Back-up Tape) 모듈 구축',
      descEn: 'QA under PMO guidelines and a back-up-tape (BT) module',
      points: ['분석~이관 전 단계 산출물 템플릿 작성·통합 관리, PMO 1·2차 검수 완료', 'BT 정보·작업스케줄 자동 생성·배정 관리 구축'],
      pointsEn: ['Templates and control of deliverables from analysis to migration; passed PMO reviews 1 and 2', 'BT master, auto-generated job schedules and allocation'],
    },
  ];

  const projectDetailById = {
    soc: {
      kicker: 'Tab 02',
      title: {
        ko: 'SOC Type 1·2 인증 기획 및 총괄',
        en: 'SOC Type 1·2 Certification — Planning & Lead',
      },
      sub: {
        ko: '유관부서 및 계열회사 협업으로 전 통제항목 통과 및 인증서 발급 완료',
        en: 'Passed all control items and obtained certification through cross-team and affiliate collaboration',
      },
      bullets: {
        ko: [
          'SOC 2 Type 1, Type 2 인증 기획 및 총괄',
          '유관부서/계열회사와 협업하여 전 통제항목 통과 및 인증서 발급 완료',
          '글로벌 SaaS 서비스 플랫폼 런칭과 함께 북미 고객 대상 운영 회의 리드',
          '서비스 신뢰성 및 확장성 확보',
        ],
        en: [
          'Planned and led SOC 2 Type 1 and Type 2 certification',
          'Passed all control items and completed certificate issuance with related teams/affiliates',
          'Led operations meetings for North American customers alongside the global SaaS platform launch',
          'Secured service reliability and scalability',
        ],
      },
      links: [
        {
          href: 'https://www.datanews.co.kr/news/article.html?no=142864',
          label: {
            ko: '관련 기사: 엠로 SRM SaaS 솔루션 SOC2 타입2 획득 (DataNews)',
            en: 'Article: EMRO SRM SaaS solution obtains SOC 2 Type 2 (DataNews)',
          },
        },
      ],
    },
    erp: {
      kicker: 'Tab 04',
      title: {
        ko: 'ERP 구축 및 업무 프로세스 고도화',
        en: 'ERP Implementation & Process Improvement',
      },
      sub: {
        ko: '다양한 산업군의 ERP 구축/고도화 프로젝트를 End-to-End로 수행',
        en: 'Delivered end-to-end ERP implementation/enhancement projects across diverse industries',
      },
    },
    pmo: {
      kicker: 'Tab 03',
      title: {
        ko: '전략 기획 및 디지털 전환',
        en: 'Strategic Planning & Digital Transformation',
      },
      sub: {
        ko: 'CRM 도입/내재화 및 그룹 데이터 거버넌스 체계 구축',
        en: 'CRM adoption/embedding and group-wide data governance',
      },
      bullets: {
        ko: [
          'Salesforce(CRM) 도입 및 성공적 내재화',
          '현업 요구사항 분석 및 Salesforce 솔루션 도입 검토/선정 총괄',
          '데이터 분석 전문 법인 설립 및 데이터 거버넌스 구축',
          '그룹 내 흩어진 데이터를 통합 관리하고 분석하기 위한 데이터 분석 전문 자회사(디플래닉스) 설립 기획 지원',
          '금융·비금융 데이터를 아우르는 그룹 통합 데이터 거버넌스 체계 구축 및 매출화',
        ],
        en: [
          'Adopted and successfully embedded Salesforce (CRM)',
          'Led business requirements analysis and Salesforce solution review/selection',
          'Established a specialized data-analytics company and data governance',
          'Supported planning of a dedicated data-analytics subsidiary (DPLANEX) to integrate and analyze scattered group data',
          'Built and monetized a group-wide integrated data governance framework spanning financial and non-financial data',
        ],
      },
      links: [
        {
          href: 'https://magazine.hankyung.com/business/article/202304278076b',
          label: {
            ko: '관련 기사: 교보생명, 5개 자회사 데이터 한곳에…디지털 전환 포석 (매거진한경)',
            en: 'Article: Kyobo Life consolidates data from 5 subsidiaries — a digital-transformation move (Magazine Hankyung)',
          },
        },
      ],
    },
    ai: {
      kicker: 'Tab 05',
      title: {
        ko: '매뉴얼 제작 자동화 멀티 에이전트 워크플로',
        en: 'Multi-Agent Workflow for Manual-Production Automation',
      },
      sub: {
        ko: '판단 기준·실행 절차·역할·워크플로를 4개 계층으로 설계한 멀티 에이전트 자동화 체계 구축',
        en: 'Built a multi-agent automation system structured in four layers: standards, procedures, roles, and workflows',
      },
      bullets: {
        ko: [
          '지식층(판단 기준): 캡처 규격·소스 검증·체크리스트를 표준 가이드(v2)로 확정 → AI가 판단 기준을 스스로 참조',
          '능력층(실행 절차): 공용 캡처 엔진 + 모듈별 설정 구조의 캡처 스킬 등 재사용 가능한 실행 절차 정의',
          '역할층(작업 주체): writer·reviewer 에이전트로 작성·검수 역할 분리',
          '워크플로층(일의 순서): manual-new / manual-update 커맨드로 전체 작업 순서 표준화',
          '결과: /manual-update Item Master 한 줄이면 에이전트가 가이드를 읽고 스킬을 꺼내 정해진 순서대로 매뉴얼 작업 수행',
          '개별 에이전트가 아니라 업무 표준·역할·프로세스를 갖춘 "작은 자동화 부서"를 구축 — 사람 개입 없는 무인 실행(비감독 자동화)의 기반',
        ],
        en: [
          'Knowledge layer (standards): finalized capture specs, source verification, and checklists into a v2 guide — so the AI references its own basis for judgment',
          'Capability layer (procedures): defined reusable skills such as a shared capture engine with per-module configuration',
          'Role layer (who does the work): separate writer and reviewer agents for drafting and review',
          'Workflow layer (order of work): standardized the end-to-end sequence via manual-new / manual-update commands',
          'Result: a single command — /manual-update Item Master — has agents read the guide, pull the right skills, and execute the work in order',
          'Not individual agents but a small self-running "automation department" with its own standards, roles, and process — a foundation for unattended (unsupervised) execution',
        ],
      },
      links: [
        {
          href: 'project-manual-agent.html',
          label: { ko: '케이스 스터디 전체 보기 →', en: 'Read the full case study (KR) →' },
        },
      ],
    },
  };

  // ── Tech bids & effort estimation tab ──────────────────
  // NDA: no M/M, M/D or unit-price figures anywhere in this block.
  projectDetailById.bid = {
    kicker: 'Tab 01',
    title: { ko: 'Tech 수주 & 공수 산정', en: 'Tech Bids & Effort Estimation' },
    sub: {
      ko: '대기업 기술·보안 요건을 근거 기반으로 대응하고, 16건의 표준 공수 산정을 기한 내 회신해 수주 기반을 마련',
      en: 'Answered large-enterprise technical and security requirements with evidence, and returned 16 standard effort estimates on time to set up wins',
    },
  };

  const bidUi = {
    paneTech: { ko: 'Tech 수주', en: 'Tech bids' },
    paneEffort: { ko: '공수 산정', en: 'Effort estimation' },
    techKpis: [
      { v: '2', u: { ko: '건', en: '' }, l: { ko: '대기업 수주 대응', en: 'Enterprise bids' }, n: { ko: '보안·인프라 1 · 기능 요건 1', en: '1 security/infra · 1 functional' } },
      { v: '6', u: { ko: '대 영역', en: ' areas' }, l: { ko: 'SOC 2 정책 매핑', en: 'SOC 2 policy mapping' }, n: { ko: '운영·배포·장애·성능·백업·접근통제', en: 'Ops, release, incident, capacity, backup, access' } },
      { v: '2', u: { ko: '단계', en: '-stage' }, l: { ko: '크로스체크 검수', en: 'Cross-check review' }, n: { ko: '1차 작성 → 개발 유관부서 검수', en: 'Draft → engineering review' } },
    ],
    cases: [
      {
        tag: 'SK · Security & Infra',
        title: { ko: 'SOC 2 기반 보안·인프라 기술 요건 대응', en: 'SOC 2–based security & infrastructure requirements' },
        body: {
          ko: '대기업 고객사의 운영·보안·인프라 검증 요구사항을 6대 영역으로 나누고, 항목마다 SOC 2 정책서의 해당 조항을 근거로 논리적으로 매핑해 사전 대응을 완료했습니다.',
          en: "Split the client's operations, security and infrastructure verification requirements into six areas and mapped each item to the relevant clause of our SOC 2 policies, completing the response ahead of review.",
        },
        tags: {
          ko: ['운영문서', '소스·배포관리', '장애·모니터링', '성능·확장성', '데이터 백업·복구', '접근통제·보안'],
          en: ['Ops documents', 'Source & release', 'Incident & monitoring', 'Capacity & scale', 'Backup & recovery', 'Access control'],
        },
        result: {
          ko: '성과: 보안·운영 안정성에 대한 고객사 신뢰 확보 및 최종 수주 기여',
          en: 'Outcome: earned client trust in security and operational stability; contributed to the final win',
        },
      },
      {
        tag: 'KT · Functional RFP',
        title: { ko: '대규모 기능 요건 정의서 작성 및 유관부서 크로스체크 주도', en: 'Large functional-requirements response & cross-team review' },
        body: {
          ko: '방대한 기능 요건·아키텍처·프로세스 질의서에 대해 자사 솔루션과 IT 이해도를 바탕으로 1차 답변을 작성하고, 개발 유관부서의 2차 취합과 기술적 정합성 검수를 이끌어 완료했습니다.',
          en: 'Drafted first-pass answers to an extensive functional, architecture and process questionnaire from solution and IT knowledge, then led the second-pass consolidation and technical-consistency review with engineering teams.',
        },
        chain: {
          ko: ['질의서 분해', '1차 답변 작성', '유관부서 2차 취합', '기술 정합성 검수', '제출'],
          en: ['Break down RFP', 'Draft answers', 'Consolidate with teams', 'Technical review', 'Submit'],
        },
        result: {
          ko: '성과: 고품질 제안 대응서 완성으로 최종 프로젝트 수주 달성에 기여',
          en: 'Outcome: a high-quality proposal response that contributed to winning the project',
        },
      },
    ],
    effortKpis: [
      { v: '16', u: { ko: '건', en: '' }, l: { ko: '표준 공수 산정', en: 'Standard estimates' }, n: { ko: '제조·금융·의료·물류·항공 등', en: 'Mfg, finance, healthcare, logistics, aviation…' } },
      { v: '100', u: { ko: '%', en: '%' }, l: { ko: '기한 내 회신', en: 'On-time replies' }, n: { ko: '16건 모두 기한 내 · 5건은 기한 전', en: 'All 16 on time · 5 early' } },
      { v: '3~5', u: { ko: '일', en: ' days' }, l: { ko: '평균 회신 리드타임', en: 'Avg. turnaround' }, n: { ko: '요청일 대비 · 영업 골든타임 확보', en: 'From request · keeps sales on schedule' } },
    ],
    flow: [
      {
        t: { ko: '요구사항 유형 분해', en: 'Decompose by type' }, tag: 'FUIGMS',
        l: {
          ko: ['RFP·질의서를 유형별 단위 항목으로 분해', '메뉴 102개·I/F 51종처럼 건 단위로 정량화', 'RFP에 없는 숨은 요건(Hidden Requirement) 선제 도출'],
          en: ['Break the RFP into unit items by type', 'Quantify per item — e.g. 102 menus, 51 interfaces', 'Surface hidden requirements the RFP missed'],
        },
      },
      {
        t: { ko: 'Fit / Customizing / Add-on 판정', en: 'Fit / Customizing / Add-on' }, tag: 'FIT-GAP',
        l: {
          ko: ['표준 솔루션으로 충족되는 요건(Fit)은 산정 제외', '기존 수정(Customizing)은 DB·설계 영향도까지 포함', '신규 개발(Add-on)과 옵션 모듈은 분리 산출'],
          en: ['Requirements met by the standard solution (Fit) excluded', 'Customizing includes DB and design impact', 'New builds (Add-on) and option modules estimated separately'],
        },
      },
      {
        t: { ko: '난이도·생산성 가중치', en: 'Difficulty & productivity weights' }, tag: 'WEIGHT',
        l: {
          ko: ['High · Mid · Low 난이도 등급 부여', '건당 표준 생산성 기준 적용', '유사 구축 실적 벤치마킹으로 현실성 보정'],
          en: ['High · Mid · Low difficulty grades', 'Standard per-item productivity applied', 'Calibrated against similar past builds'],
        },
      },
      {
        t: { ko: 'WBS 배분 및 R&R 경계 통제', en: 'WBS split & R&R control' }, tag: 'CONTROL', wbs: true,
        l: {
          ko: ['다자간 수행사 간 업무범위·책임 경계 분리', '범위 외 항목과 재산정 조건을 단서 조항으로 명시', '선행 검증 단계와 겹치는 테스트 공수 합리화'],
          en: ['Scope and ownership split between multiple vendors', 'Out-of-scope items and re-estimation terms written as clauses', 'Test effort trimmed where earlier checks already cover it'],
        },
      },
    ],
    flowOut: {
      ko: '견적 회신 · 16건 모두 기한 내, 평균 3~5일',
      en: 'Estimate returned · all 16 on time, 3–5 days on average',
    },
    wbs: [
      { k: { ko: '분석', en: 'Analysis' }, p: 19 },
      { k: { ko: '설계', en: 'Design' }, p: 24 },
      { k: { ko: '개발', en: 'Build' }, p: 32 },
      { k: { ko: '테스트', en: 'Test' }, p: 25 },
    ],
    wbsCap: {
      ko: '수주산업(EPC) 구매시스템 견적 사례의 공정별 표준 배분 비율 · 투입 공수는 비공개',
      en: 'Standard phase split from an EPC-industry procurement estimate · effort figures withheld',
    },
    matrixHead: {
      ko: ['요구사항 (재구성 예시)', '유형', '난이도', '적용유형', '산정 포인트'],
      en: ['Requirement (reconstructed)', 'Type', 'Level', 'Fit type', 'Estimation point'],
    },
    matrix: [
      { r: { ko: '메신저 승인 응답 처리 + SMS 알림 연동', en: 'Messenger approval replies + SMS alerts' }, t: 'I/F', d: 'High', f: 'Add-on', p: { ko: '발송 후 응답·후속 처리까지 포함해 누락 방지', en: 'Includes reply handling and follow-up to avoid gaps' } },
      { r: { ko: '대규모 재고 불출·조회 화면 23종', en: '23 inventory issue/inquiry screens' }, t: { ko: '화면', en: 'Screen' }, d: 'High', f: 'Add-on', p: { ko: '화면 수가 아닌 유사 구축 실적으로 벤치마킹', en: 'Benchmarked on similar builds, not screen count' } },
      { r: { ko: '생산지 주소 위·경도 정합성 검증', en: 'Lat/long validation of production sites' }, t: 'I/F', d: 'High', f: 'Add-on', p: { ko: 'Geocoding API 연동 자동 검증', en: 'Automatic check via a geocoding API' } },
      { r: { ko: '공급망 지도·리스크 등급 리포트', en: 'Supply-chain map & risk-grade report' }, t: { ko: '화면', en: 'Screen' }, d: 'Mid', f: 'Fit', p: { ko: '표준 솔루션 적용으로 중복 개발 배제', en: 'Standard solution reused; no duplicate build' } },
      { r: { ko: '기존 화면 수정', en: 'Changes to existing screens' }, t: { ko: '화면', en: 'Screen' }, d: 'Mid', f: 'Customizing', p: { ko: 'DB·설계 영향도 분석 포함을 명시', en: 'DB and design impact analysis stated as included' } },
      { r: { ko: '계약서식 20종 (표준 제공 5종 초과분)', en: '20 contract forms (beyond 5 standard)' }, t: { ko: '서식', en: 'Form' }, d: 'Low', f: 'Customizing', p: { ko: '초과 15종만 분리 산정', en: 'Only the extra 15 estimated separately' } },
      { r: { ko: '업무 단계별 자동 메일 13종', en: '13 workflow-triggered emails' }, t: { ko: '배치', en: 'Batch' }, d: 'Mid', f: 'Customizing', p: { ko: '별도 항목으로 분리해 누락 리스크 차단', en: 'Split out to block omission risk' } },
      { r: { ko: '5개년 핵심 구매 데이터 이관', en: '5-year core procurement data migration' }, t: 'M/G', d: 'High', f: 'Add-on', p: { ko: '초기 견적에 반영해 오픈 리스크 차단', en: 'Included up front to block go-live risk' } },
      { r: { ko: '클라우드 이관 대상 I/F 51종', en: '51 interfaces moved to cloud' }, t: 'I/F', d: 'Mid', f: 'Customizing', p: { ko: '건당 표준 생산성 + "상세 파악 시 재산정" 조건 명시', en: 'Per-item productivity plus a re-estimate clause' } },
      { r: { ko: 'ERP RFC → API 게이트웨이 I/F 31종 전환', en: '31 ERP RFC → API-gateway interfaces' }, t: 'I/F', d: 'High', f: 'Customizing', p: { ko: '인터페이스 단위로 정밀 산출', en: 'Estimated per interface' } },
    ],
    matrixCap: {
      ko: '실제 산정 시트를 항목 단위로 재구성한 예시입니다. M/M·M/D·단가는 NDA로 제외했습니다.',
      en: 'Reconstructed from real estimation sheets. M/M, M/D and unit prices are excluded under NDA.',
    },
    catLabel: { ko: '산정 포인트', en: 'Focus' },
    cats: [
      { id: 'all', l: { ko: '전체', en: 'All' } },
      { id: 'arch', l: { ko: '아키텍처·I/F', en: 'Architecture & I/F' } },
      { id: 'risk', l: { ko: '리스크·스코프 방어', en: 'Risk & scope defense' } },
      { id: 'domain', l: { ko: '도메인 특화', en: 'Domain-specific' } },
    ],
    caseNote: {
      ko: '* 총 16건 중 상세 산정 기록이 있는 15건',
      en: '* 15 of the 16 estimates with detailed records',
    },
    labelCore: { ko: '핵심', en: 'Core' },
    labelPoint: { ko: '요점', en: 'Key points' },
    estimates: [
      {
        c: '파르나스호텔', ce: 'Parnas Hotel', i: { ko: '호텔·리조트', en: 'Hospitality' }, cat: ['arch', 'domain'],
        core: { ko: '대규모 재고 불출·조회 시스템 벤치마킹 견적', en: 'Benchmarked estimate for a large inventory issue/inquiry system' },
        pt: {
          ko: '트리(Node) 기반 다단계 BOM 관리, 23종 재고 불출·조회 화면을 유사 구축 실적으로 벤치마킹, 메신저 승인 응답·SMS 멀티채널 알림 I/F를 고난도로 분리 산정',
          en: 'Tree-based multi-level BOM; 23 inventory screens benchmarked against similar builds; messenger approval-reply and SMS alert interfaces estimated separately as high difficulty',
        },
      },
      {
        c: '현대케피코', ce: 'Hyundai Kefico', i: { ko: '자동차 부품', en: 'Auto parts' }, cat: ['arch', 'risk'],
        core: { ko: 'N-Tier 공급망 리스크(SCRM) 생산지 검증', en: 'N-tier supply-chain risk (SCRM) site verification' },
        pt: {
          ko: '단가결정 품의 내 11개 생산지·공정 필수 항목 저장 차단 로직, Geocoding API 위·경도 정합성 검증, 공급망 가시화는 표준 솔루션(Fit)으로 분류해 중복 개발 배제',
          en: '11 mandatory site/process fields that block saving when missing; geocoding-based lat/long checks; supply-chain visualization classed as standard (Fit) to avoid duplicate build',
        },
      },
      {
        c: '탑머티리얼즈', ce: 'Top Materials', i: { ko: '소재 · 건설용역', en: 'Materials · construction' }, cat: ['domain'],
        core: { ko: '전문건설 면허·인증 기반 구매 고도화', en: 'License-driven procurement for construction services' },
        pt: {
          ko: '대·중·소분류 면허·인증 기준정보와 수행가능지역 관리, 소싱~발주 단계별 면허 검증 로직, 협회 전용 기성실적증명 포털·출력물을 Customizing·Add-on으로 정밀 구분',
          en: 'Three-level license/certification master and service regions; license checks from sourcing to PO; association-only performance-certificate portal and reports, split precisely into Customizing vs Add-on',
        },
      },
      {
        c: '현대제철', ce: 'Hyundai Steel', i: { ko: '철강', en: 'Steel' }, cat: ['risk'],
        core: { ko: '구매 제안 플랫폼 구축', en: 'Supplier proposal platform' },
        pt: {
          ko: '기존 기술 포털의 표준 영역은 Fit으로 제외해 중복 견적 차단, 신규 4대 메뉴만 Add-on 산정, 임시저장 숨김 권한(Privacy) 통제, 목록-상세 화면 간 중복 공수 제거',
          en: 'Standard areas of the existing portal excluded as Fit; only four new menus estimated as Add-on; hidden-draft permission control; duplicate effort removed between list and detail screens',
        },
      },
      {
        c: '세아항공방산소재', ce: 'SeAH Aerospace & Defense', i: { ko: '항공·방산 소재', en: 'Aerospace materials' }, cat: ['risk'],
        core: { ko: '3개월 Fast-Track 경량화 견적', en: '3-month fast-track estimate' },
        pt: {
          ko: '표준 패키지 위에 협력사 등록·승인과 자체 ERP 데이터 수신 필수 요건만 선별 반영하고, 범위 외 제외사항을 명확히 통제한 실속형 견적',
          en: 'Only supplier onboarding and ERP data intake added on the standard package, with out-of-scope items tightly fenced',
        },
      },
      {
        c: '삼성서울병원', ce: 'Samsung Medical Center', i: { ko: '의료', en: 'Healthcare' }, cat: ['arch', 'risk'],
        core: { ko: '다자간 인프라 재구축 및 클라우드 이관', en: 'Multi-vendor rebuild and cloud migration' },
        pt: {
          ko: '6개 유관 수행사(OS·WEB·WAS·DB·리포팅) 간 WBS별 담당 주체 분리, Java 1.8 업그레이드와 메뉴 102개 전수 점검 기준 정량화, I/F 51종 이관, 선행 점검과 겹치는 통합테스트 공수 감축, "상세 파악 시 재산정" 조항으로 스코프 크리프 방어',
          en: 'Ownership split per WBS across six vendors (OS, web, WAS, DB, reporting); Java 1.8 upgrade and a 102-menu inspection baseline; 51 interfaces migrated; integration-test effort trimmed where setup checks overlap; a re-estimate clause to block scope creep',
        },
      },
      {
        c: '한화에너지', ce: 'Hanwha Energy', i: { ko: '에너지 · EPC', en: 'Energy · EPC' }, cat: ['arch', 'risk', 'domain'],
        core: { ko: '수주산업 PJT 예산 통제 구매 전 주기', en: 'Project-budget-controlled procurement for EPC' },
        pt: {
          ko: 'PJT 코드 기점 PR→입찰→계약→발주→납품→기성/검수, 예산 소진 시 구매 신청 차단, ERP 3대 마스터·그룹웨어 4종 결재 I/F, 분석·설계·개발·테스트 배분과 범위 외 고려사항 명시',
          en: 'PR → bid → contract → PO → delivery → progress/acceptance keyed on project code; requests blocked once budget is spent; ERP master and groupware approval interfaces; phase split and out-of-scope terms stated',
        },
      },
      {
        c: '금융보안원', ce: 'Financial Security Institute', i: { ko: '금융 규제', en: 'Financial regulation' }, cat: ['domain'],
        core: { ko: '제3자(수탁사) 보안관리·합동점검 시스템', en: 'Third-party (outsourcer) security management' },
        pt: {
          ko: '일반 구매가 아닌 금융규제 대응형으로, 계약 체결~종료 전 주기의 보안점검·자율점검 체계와 계약 전 리스크 식별·보안 요구사항 반영을 설계',
          en: 'Built for financial regulation rather than purchasing: security and self-inspection across the contract lifecycle, with pre-contract risk identification',
        },
      },
      {
        c: '포스코퓨처엠', ce: 'POSCO Future M', i: { ko: '이차전지 소재', en: 'Battery materials' }, cat: ['arch', 'risk'],
        core: { ko: '2개 구축 시나리오 비교 견적', en: 'Two-scenario comparative estimate' },
        pt: {
          ko: 'ERP 연계형 vs 구매 일원화형의 PR/PO·I/F 공수 차이를 비교 제시, 그룹 공통시스템·신용평가·협회 I/F와 SSO, 5개년 데이터 이관 반영, 미확정 평가 기준은 단서 조항으로 분리해 수익성 방어',
          en: 'Compared PR/PO and interface effort for an ERP-linked vs a procurement-centric design; group system, credit and association interfaces plus SSO; 5-year data migration; undecided criteria fenced by clause to protect margin',
        },
      },
      {
        c: '카버코리아', ce: 'Carver Korea', i: { ko: '뷰티 · 소비재', en: 'Beauty · consumer' }, cat: ['arch'],
        core: { ko: '기본·옵션 모듈 조합(Modular) 견적', en: 'Modular base + option estimate' },
        pt: {
          ko: '표준 기본 모듈 4종 위에 발주·계약·단가 옵션 모듈 3종을 조합하고 옵션별 전용 기능을 분리 산출, 그룹웨어 결재 연계와 SAP HANA 마스터 단방향 수신·신규 등록 통제 조건 반영',
          en: 'Three option modules (ordering, contracts, pricing) layered on four standard base modules with option-specific features estimated separately; groupware approval and one-way SAP HANA master intake with new-record controls',
        },
      },
      {
        c: 'SK렌터카', ce: 'SK Rent-a-car', i: { ko: '모빌리티', en: 'Mobility' }, cat: ['risk'],
        core: { ko: '계열 분리(Carve-out) 분리개발 견적', en: 'Carve-out separation estimate' },
        pt: {
          ko: '그룹 통합 기간계에서 독립해야 하는 분리개발 스코프를 정의하고 R&R 경계를 설정',
          en: 'Defined the scope for separating from the group core systems and set R&R boundaries',
        },
      },
      {
        c: 'HL홀딩스', ce: 'HL Holdings', i: { ko: '지주 · 제조', en: 'Holding · Mfg' }, cat: ['arch', 'domain'],
        core: { ko: 'DX 대시보드 및 통합 협업 포털', en: 'DX dashboard and collaboration portal' },
        pt: {
          ko: '원가절감·신규소싱 KPI 대시보드, 계약서식 20종 중 표준 초과 15종 분리 산정, 신규 협력사 BP 자동 생성·신용평가 I/F, 인사·조직·그룹웨어 통합 결재와 SSO, 공식문서 양방향 수발신',
          en: 'Cost-saving and new-sourcing KPI dashboards; 15 of 20 contract forms estimated as beyond standard; supplier auto-creation and credit interfaces; unified HR/groupware approval with SSO; two-way official documents',
        },
      },
      {
        c: 'PHA', ce: 'PHA', i: { ko: '자동차 부품', en: 'Auto parts' }, cat: ['arch', 'domain'],
        core: { ko: '금형관리 특화 및 자산·감가상각 생애주기 연동', en: 'Mold management tied to asset and depreciation lifecycle' },
        pt: {
          ko: '마스터금형·차수·매몰비용(금형비) 전 주기 관리, 금형 제작·이관·폐기 생애주기 및 SAP ERP 자산·감가상각 연동 프로세스 구현, 누적 타수 기반 예방점검 자동 생성과 13종 자동 메일링',
          en: 'Full lifecycle of master molds, revisions and sunk mold cost; build, transfer and disposal tied to SAP ERP assets and depreciation; shot-count–based preventive checks and 13 automated emails',
        },
      },
      {
        c: '글로비스', ce: 'Glovis', i: { ko: '물류', en: 'Logistics' }, cat: ['arch', 'risk'],
        core: { ko: 'Hidden Requirement 선제 도출', en: 'Hidden requirements surfaced up front' },
        pt: {
          ko: '기존 기간계 양방향 I/F 기반 청구~정산 전 주기, 단가계약 품목 자동발주(Auto-PO), RFP에 없던 쿼터율 등록·발주수량 자동 계산 로직을 선제 반영해 추가 공수 분쟁 차단',
          en: 'Request-to-settlement over two-way interfaces with core systems; auto-PO for contracted items; quota-split screens and order-quantity logic missing from the RFP added up front to prevent later disputes',
        },
      },
      {
        c: '아시아나', ce: 'Asiana', i: { ko: '항공', en: 'Aviation' }, cat: ['arch', 'risk'],
        core: { ko: '인프라·DBMS·프레임워크·I/F 아키텍처 전환', en: 'Infrastructure, DBMS, framework and I/F migration' },
        pt: {
          ko: 'MSSQL→PostgreSQL DB 객체 영향도, Spring 3.2→6·JDK 호환, ERP RFC→API 게이트웨이 I/F 31종 전환, 웹취약점 조치를 분리 산정하고 유관 수행사 간 R&R 경계를 견적서에 명시',
          en: 'Estimated separately: MSSQL→PostgreSQL object impact, Spring 3.2→6 and JDK compatibility, 31 RFC→API-gateway interfaces, and web-vulnerability fixes; vendor R&R boundaries written into the quote',
        },
      },
    ],
  };

  let bidPane = 'tech';

  // resolve a value that may be a plain string or a { ko, en } object
  function L(value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return value[currentLang] ?? value.ko ?? '';
    }
    return value;
  }

  // UI strings shared by the 3-part tabs (ERP, strategy)
  const erpUi = {
    roleLabel: { ko: '역할', en: 'Role' },
    moduleLabel: { ko: '모듈', en: 'Module' },
    all: { ko: '전체', en: 'All' },
    thPeriod: { ko: '기간', en: 'Period' },
    thClient: { ko: '고객사 / 산업군', en: 'Client / Industry' },
    thRole: { ko: '역할', en: 'Role' },
    thDesc: { ko: '주요 수행 내역', en: 'Key Deliverables' },
    flowTitle: { ko: '수행 방법론', en: 'How I deliver' },
    axesTitle: { ko: '4대 핵심 역량', en: 'Four core capabilities' },
  };

  // module filter chips for the ERP archive (data-tags keeps the Korean key)
  const erpModules = [
    { id: '원가', ko: '원가·관리회계', en: 'Cost & mgmt acct' },
    { id: '구매', ko: '구매·물류', en: 'Purchasing & logistics' },
    { id: '영업', ko: '영업·EC', en: 'Sales & EC' },
    { id: '연동', ko: 'I/F·연동', en: 'Interfaces' },
    { id: 'QA', ko: 'QA·PMO', en: 'QA & PMO' },
  ];

  projectDetailById.erp.flow = [
    {
      tag: 'ANALYSIS', t: { ko: 'AS-IS 업무 분석', en: 'AS-IS analysis' },
      l: {
        ko: ['모듈 담당자 인터뷰·업무 분석', 'AS-IS 프로세스 작성', '요구사항 분석 및 개발 리스트 도출'],
        en: ['Interviews and analysis with module owners', 'AS-IS process maps', 'Requirements analysis and build list'],
      },
    },
    {
      tag: 'DESIGN', t: { ko: 'TO-BE · 화면 · DB 설계', en: 'TO-BE, screen & DB design' },
      l: {
        ko: ['고객 중심 TO-BE 프로세스 작성·보고', '화면 UI/UX 및 상세 기능설계서', '테이블·ERD·계산 로직 설계'],
        en: ['Customer-centred TO-BE process and sign-off', 'Screen UI/UX and detailed functional specs', 'Tables, ERD and calculation logic'],
      },
    },
    {
      tag: 'BUILD & TEST', t: { ko: '개발 협업 · 검증', en: 'Build & verify' },
      l: {
        ko: ['설계서 기반 개발자 협업', '테스트 데이터로 조회값 크로스 검증', '10원 단위까지 데이터 정합성 확인'],
        en: ['Build with developers from the specs', 'Cross-check results against prepared test data', 'Data reconciled down to ₩10'],
      },
    },
    {
      tag: 'GO-LIVE', t: { ko: '교육 · Go-Live · 결산 안정화', en: 'Training, go-live & closing' },
      l: {
        ko: ['사용자 교육 및 오픈 지원', '실데이터로 최소 2개월 결산 완료 후 종료', '구축 결과를 표준 패키지(PKG)로 환원'],
        en: ['User training and launch support', 'Closed out only after 2+ months of live closing', 'Fed the build back into the standard package'],
      },
    },
  ];
  projectDetailById.erp.flowOut = { ko: '20건 이상 구축 · 실데이터 결산으로 Go-Live 완수', en: '20+ builds · each signed off on live-data closing' };
  projectDetailById.erp.axes = [
    {
      t: { ko: '원가·관리회계 로직 설계', en: 'Cost & managerial-accounting logic' },
      l: {
        ko: ['재료비·가공비 기반 표준원가 적상, 공정별 표준 대 실제 차이 분석', '공통배부 없는 최대 4차 배부와 한계이익 산출', '프로젝트원가·용역매출원가·사전/사후 손익'],
        en: ['Standard-cost roll-up and per-process standard-vs-actual variance', 'Up to 4-stage allocation with no common pool; contribution margin', 'Project cost, service COGS and pre/post P&L'],
      },
      proof: { ko: '하츠 · 선일케미칼 · 에이치이엠파마', en: 'Haatz · Sunil Chemical · HEM Pharma' },
    },
    {
      t: { ko: '결산 프로세스 표준화', en: 'Standardized closing' },
      l: {
        ko: ['7개 공장 통합 결산 프로세스 405단계 수립', '월 결산전표 7종 자동 생성', '용역매출원가 결산·정산 자동전표'],
        en: ['405-step consolidated closing across 7 plants', '7 monthly closing journals generated automatically', 'Automated service-COGS closing journals'],
      },
      proof: { ko: '벽산 · 하츠 · 에이치이엠파마', en: 'Byucksan · Haatz · HEM Pharma' },
    },
    {
      t: { ko: '표준 패키지화 & 설계 리딩', en: 'Packaging & design lead' },
      l: {
        ko: ['패키지에 없던 관리회계·표준원가·프로젝트관리 모듈을 설계해 표준 PKG화', '관리회계 개발 리스트 46건 전량 설계', '.NET → Web 기반 시스템 전환 구축'],
        en: ['Designed and packaged managerial accounting, standard cost and project modules', 'Designed all 46 managerial-accounting build items', 'Moved a .NET system to the web'],
      },
      proof: { ko: '벽산 · 에이치이엠파마', en: 'Byucksan · HEM Pharma' },
    },
    {
      t: { ko: '이기종 연동 & 품질 관리', en: 'Integration & quality' },
      l: {
        ko: ['그룹 자재표준화·구매포탈·선석·도면 I/F, 쇼핑몰 주문 수집 I/F', '외부 업체용 VIEW와 DB 권한 통제', 'PMO 지침 기반 전 단계 산출물 QA·검수'],
        en: ['Group material-standard, procurement-portal, berth and drawing interfaces; marketplace order intake', 'Read-only views and DB permissions for partners', 'QA of deliverables at every phase under PMO guidelines'],
      },
      proof: { ko: '포스코터미날 · 지엔엠라이프 · 와이디생명과학 · 코스콤', en: 'POSCO Terminal · GNM Life · YD Life Science · Koscom' },
    },
  ];
  projectDetailById.erp.archive = {
    title: { ko: '프로젝트 아카이브', en: 'Project archive' },
    count: { ko: '대표 16건 · 총 20건 이상', en: '16 shown · 20+ total' },
  };

  projectDetailById.pmo.flow = [
    {
      tag: 'DISCOVER', t: { ko: '현업 분석 · 니즈 정의', en: 'Discover needs' },
      l: {
        ko: ['영업 부서별 인터뷰·업무 분석', '그룹 데이터 취합 니즈 파악·설명자료 작성', '분산된 수기 관리 방식의 문제 정의'],
        en: ['Interviews and analysis per sales team', 'Group data-consolidation needs documented', 'Problems of scattered manual tracking defined'],
      },
    },
    {
      tag: 'DESIGN', t: { ko: 'TO-BE 프로세스 · 기준 설계', en: 'Design process & rules' },
      l: {
        ko: ['영업전략·관리 TO-BE 프로세스', '진행매출(일 단위)·분개 기준 정립', 'draw.io 기반 매입·매출 프로세스 일원화'],
        en: ['TO-BE sales strategy and management process', 'Daily progress-revenue and journal rules', 'Purchase/sales processes unified in draw.io'],
      },
    },
    {
      tag: 'BUILD', t: { ko: '시스템 도입 · 조직 구축', en: 'Adopt & build' },
      l: {
        ko: ['Salesforce 도입 및 경영 대시보드 구축', '데이터 분석 전문 법인 설립 초기 세팅', '그룹 데이터 프로젝트 수주·PM'],
        en: ['Salesforce rollout and management dashboards', 'Initial set-up of a data-analytics subsidiary', 'Won and ran group data projects'],
      },
    },
    {
      tag: 'GOVERN', t: { ko: '내재화 · 거버넌스 운영', en: 'Embed & govern' },
      l: {
        ko: ['영업대표 교육·시스템 운영', '주간/월간 경영진 데이터 보고', '컴플라이언스·이사회·주총 운영 체계'],
        en: ['Training for sales reps and system operation', 'Weekly/monthly data reporting to executives', 'Compliance, board and shareholder-meeting processes'],
      },
    },
  ];
  projectDetailById.pmo.flowOut = { ko: '수기·분산 관리 → 100% 데이터 기반 의사결정 체계', en: 'Manual, scattered tracking → fully data-driven decisions' };
  projectDetailById.pmo.axes = [
    {
      t: { ko: 'CRM 도입 · 내재화 (Salesforce)', en: 'CRM adoption & embedding (Salesforce)' },
      l: {
        ko: ['요구사항 분석부터 솔루션 검토·선정, 도입까지 총괄', '리드·기회·매출계획 대비 실적·수주 적시성·실패원인 대시보드', '수기·분산 영업관리를 전사 통합 체계로 전환'],
        en: ['Led requirements, solution review/selection and rollout', 'Dashboards for leads, opportunities, plan vs actual, win timing and loss reasons', 'Replaced scattered manual sales tracking with one company-wide system'],
      },
      proof: { ko: '교보DTS · DX전략기획파트', en: 'Kyobo DTS · DX Strategy' },
    },
    {
      t: { ko: '데이터 법인 설립 · 경영기획', en: 'Data subsidiary set-up & planning' },
      l: {
        ko: ['그룹 데이터 분석 전문 법인 설립 기획 지원 및 초기 멤버 합류', '3개년 사업·매출·인력 계획, 진행매출 산정 체계', '등급별 표준단가 산정(법률 검토)과 견적 시뮬레이션 시트'],
        en: ['Supported planning of the group data subsidiary and joined as an early member', '3-year business, revenue and headcount plans; progress-revenue system', 'Graded standard rates (legal review) and a quote-simulation sheet'],
      },
      proof: { ko: '교보DTS → 디플래닉스', en: 'Kyobo DTS → DPLANEX' },
    },
    {
      t: { ko: '그룹 데이터 거버넌스 · 사업화', en: 'Group data governance & revenue' },
      l: {
        ko: ['금융·비금융 데이터를 아우르는 그룹 통합 데이터 거버넌스 구축', '그룹사 데이터 레이크 사업 매출화', '보험 분석 모델·HR Analytics·통합 로그관리 프로젝트 수주·PM'],
        en: ['Group-wide governance across financial and non-financial data', 'Monetized the group data-lake business', 'Won and ran insurance-model, HR-analytics and unified-log projects'],
      },
      proof: { ko: '디플래닉스 · 교보생명 · 교보증권', en: 'DPLANEX · Kyobo Life · Kyobo Securities' },
    },
    {
      t: { ko: '보안 · 컴플라이언스', en: 'Security & compliance' },
      l: {
        ko: ['HR 민감 데이터 프로젝트의 법률 확인과 보안 이슈 예방', 'CISO 지정·등록 프로세스 주도', '내부거래 공시 대응 및 이사회·주총 운영'],
        en: ['Legal checks and security safeguards for an HR-data project', 'Led CISO appointment and registration', 'Related-party disclosure, board and shareholder meetings'],
      },
      proof: { ko: '디플래닉스', en: 'DPLANEX' },
    },
  ];
  projectDetailById.pmo.archive = {
    title: { ko: '프로젝트 아카이브', en: 'Project archive' },
    count: { ko: '7건', en: '7 items' },
    rows: [
      { period: '2023.09 - 2024.02', client: { ko: '교보증권', en: 'Kyobo Securities' }, role: '기획/PM', desc: { ko: '그룹 고객 통합 로그관리(GA4 행태 데이터) 프로젝트 수주·관리 — 범위 산정, 구축 업체 선정, 손익 고려 견적', en: 'Group unified customer-log project (GA4 behaviour data) — scoping, vendor selection, margin-aware quote' } },
      { period: '2023.09 - 2023.12', client: { ko: '교보생명', en: 'Kyobo Life' }, role: '기획/PM', desc: { ko: '데이터 기반 HR 의사결정 지원(HR Analytics) 프로젝트 수주·관리 — 공수 산정·제안·계약·검수·수금', en: 'HR-analytics project — estimate, proposal, contract, acceptance and collection' } },
      { period: '2022.11 - 2023.08', client: { ko: '교보생명', en: 'Kyobo Life' }, role: '기획/PM', desc: { ko: '보험산업 분석 및 모델 개발 프로젝트 수주·관리 — 과제 선정부터 최종 결과 보고까지', en: 'Insurance-industry analysis and model project — from topic selection to final report' } },
      { period: '2021.12 - 2022.05', client: { ko: '교보정보통신', en: 'Kyobo Information & Communication' }, role: '기획/PM', desc: { ko: '계열사 반응형 웹페이지 구축 — 업체 선정·계약, 스토리보드·문구·모션 기획, GDWEB 디자인어워드 WEB부문 수상', en: 'Responsive site for an affiliate — vendor contract, storyboard, copy and motion; GDWEB Design Award (web)' } },
      { period: '2021.11 - 2022.04', client: { ko: '교보핫트랙스', en: 'Kyobo Hottracks' }, role: 'PM/PMO', desc: { ko: '꾸밍 커뮤니티 모바일 앱 구축 — 일정·이슈 관리, 완료 산출물 검수, Go-Live까지 지휘', en: 'Community mobile app — schedule and issue management, deliverable review, through go-live' } },
      { period: '2021.11 - 2022.08', client: { ko: '교보DTS', en: 'Kyobo DTS' }, role: '기획/운영', desc: { ko: 'Salesforce 영업관리 체계 도입 — 부서별 인터뷰, TO-BE 프로세스, 대시보드 구축, 교육·운영', en: 'Salesforce sales management — team interviews, TO-BE process, dashboards, training and operation' } },
      { period: '2021.11 - 2022.08', client: { ko: '교보DTS', en: 'Kyobo DTS' }, role: '기획', desc: { ko: 'NFT 활용 서비스 기획안 — Figma UI/UX 프로토타입 설계 및 경영진 제언', en: 'NFT service concept — Figma UI/UX prototype and executive pitch' } },
    ],
  };

  projectDetailById.soc.flow = [
    {
      tag: 'SCOPE', t: { ko: '범위 · 조직 설계', en: 'Scope & organization' },
      l: {
        ko: ['글로벌 SaaS 서비스화를 위한 첫 SOC 인증을 전사 프로젝트로 기획', '서비스 조직도 설계', '조직별 R&R 정의'],
        en: ['Planned the first SOC certification company-wide for global SaaS', 'Designed the service organization chart', 'Defined R&R per team'],
      },
    },
    {
      tag: 'POLICY', t: { ko: '정책 · 통제 수립', en: 'Policies & controls' },
      l: {
        ko: ['운영·개발·보안 정책서 및 운영체계 수립', '장애·백업·접근통제 등 통제항목 정의', '위험관리 담당(대규모 QA 경험 활용)'],
        en: ['Operations, development and security policies', 'Controls for incidents, backup, access and more', 'Owned risk management, drawing on large-scale QA'],
      },
    },
    {
      tag: 'EVIDENCE', t: { ko: '증적 · 감사 대응', en: 'Evidence & audit' },
      l: {
        ko: ['조직별 산출물 취합 및 초안 작성', 'Confluence 기반 통제 모니터링·증적관리', '외부 감사인 커뮤니케이션 총괄'],
        en: ['Collected and drafted deliverables from each team', 'Control monitoring and evidence in Confluence', 'Led communication with external auditors'],
      },
    },
    {
      tag: 'CERTIFY', t: { ko: '인증 · 글로벌 운영', en: 'Certify & operate' },
      l: {
        ko: ['Type 1 → Type 2 전 통제항목 통과 및 인증서 발급', 'SLA·운영 보고 체계 구축', '북미 고객 대상 운영 회의 리드'],
        en: ['Type 1 → Type 2: all controls passed, certificates issued', 'SLA and operational reporting', 'Led operations meetings with North American customers'],
      },
    },
  ];
  projectDetailById.soc.flowOut = { ko: '수립한 정책서를 고객 보안 요건 대응 근거로 재사용 → Tech 수주', en: 'Policies reused as evidence for client security requirements → tech bids' };
  projectDetailById.soc.axes = [
    {
      t: { ko: '인증 기획 · 총괄 PM', en: 'Certification planning & PM' },
      l: {
        ko: ['개발·운영·외부 감사인 간 일정·이슈·산출물 관리', '유관부서·계열회사 협업으로 전 통제항목 통과', '글로벌 보안 인증을 기한 내 완료'],
        en: ['Schedules, issues and deliverables across dev, ops and auditors', 'All controls passed with related teams and affiliates', 'Global security certification delivered on time'],
      },
      proof: { ko: 'SOC 2 Type 1 · Type 2', en: 'SOC 2 Type 1 · Type 2' },
    },
    {
      t: { ko: '정책 · 통제 체계 설계', en: 'Policy & control design' },
      l: {
        ko: ['서비스 조직도와 R&R 설계', '운영문서·배포·장애·성능·백업·접근통제 정책', '위험관리 체계 운영'],
        en: ['Service organization and R&R', 'Policies for ops docs, release, incidents, capacity, backup and access', 'Risk-management process'],
      },
      proof: { ko: '운영정책 · 개발정책 · 보안 사고 관리 지침', en: 'Operations, development and incident policies' },
    },
    {
      t: { ko: '증적관리 · 협업 체계', en: 'Evidence & collaboration' },
      l: {
        ko: ['Confluence 기반 SOC 2 모니터링·증적관리', '협업툴 기반 유관부서 커뮤니케이션 주도', '증적관리 문서 표준화'],
        en: ['SOC 2 monitoring and evidence in Confluence', 'Led cross-team communication in a shared workspace', 'Standardized evidence documents'],
      },
      proof: { ko: '유관부서 협업 체계화', en: 'Cross-team collaboration' },
    },
    {
      t: { ko: '글로벌 운영 · 수주 연결', en: 'Global operations & bids' },
      l: {
        ko: ['SLA 계약 체계와 SaaS 보안 컴플라이언스 대응', '북미 고객 운영 회의로 서비스 신뢰성·확장성 확보', '정책서를 대기업 보안·인프라 요건 대응 근거로 활용'],
        en: ['SLA contracts and SaaS security compliance', 'Operations meetings with North American customers', 'Policies used as evidence in enterprise security reviews'],
      },
      proof: { ko: 'Tech 수주 & 공수 산정 탭', en: 'Tech Bids & Effort Estimation tab' },
    },
  ];
  projectDetailById.soc.archive = {
    title: { ko: '인증 아카이브', en: 'Certification archive' },
    count: { ko: '5단계', en: '5 stages' },
    head: {
      ko: ['단계', '산출물 · 활동', '역할', '내용'],
      en: ['Stage', 'Output', 'Role', 'Details'],
    },
    rows: [
      { period: { ko: '기획', en: 'Plan' }, client: { ko: '인증 프로젝트 전사 기획', en: 'Company-wide plan' }, role: '기획/총괄', desc: { ko: '인증 범위 정의, 서비스 조직도·R&R 설계', en: 'Scope, service organization and R&R' } },
      { period: { ko: '준비', en: 'Prepare' }, client: { ko: '정책서 · 통제 수립', en: 'Policies & controls' }, role: '총괄', desc: { ko: '운영·개발·보안 정책 및 위험관리 체계', en: 'Operations, development and security policies; risk management' } },
      { period: 'Type 1', client: { ko: '인증서 발급', en: 'Certificate issued' }, role: '총괄', desc: { ko: '조직별 산출물 취합·초안 작성, 감사 대응', en: 'Deliverables collected and drafted; audit response' } },
      { period: 'Type 2', client: { ko: '전 통제항목 통과 · 발급', en: 'All controls passed' }, role: '총괄', desc: { ko: '운영 기간 증적 관리와 외부 감사인 커뮤니케이션', en: 'Evidence over the operating period; auditor communication' } },
      { period: { ko: '활용', en: 'Reuse' }, client: { ko: '고객 보안 요건 대응', en: 'Client security reviews' }, role: '리드', desc: { ko: '정책서 기반 6대 영역 매핑으로 대기업 수주 기여', en: 'Six-area policy mapping that supported an enterprise win' } },
    ],
  };

  projectDetailById.ai.flow = [
    {
      tag: 'KNOWLEDGE', t: { ko: '지식층 · 판단 기준', en: 'Knowledge · standards' },
      l: {
        ko: ['캡처 규격·소스 검증·체크리스트를 표준 가이드(v2)로 확정', 'AI가 판단 기준을 스스로 참조'],
        en: ['Capture specs, source checks and checklists fixed in a v2 guide', 'The AI looks up its own basis for judgment'],
      },
    },
    {
      tag: 'CAPABILITY', t: { ko: '능력층 · 실행 절차', en: 'Capability · procedures' },
      l: {
        ko: ['공용 캡처 엔진 + 모듈별 설정 구조', '재사용 가능한 스킬로 실행 절차 정의'],
        en: ['Shared capture engine with per-module settings', 'Procedures defined as reusable skills'],
      },
    },
    {
      tag: 'ROLE', t: { ko: '역할층 · 작업 주체', en: 'Role · who works' },
      l: {
        ko: ['writer · reviewer 에이전트로 작성·검수 분리', 'AI 생성과 규칙 엔진 판정 분리'],
        en: ['Writer and reviewer agents split drafting and review', 'AI generation separated from rule-engine judgment'],
      },
    },
    {
      tag: 'WORKFLOW', t: { ko: '워크플로층 · 일의 순서', en: 'Workflow · order of work' },
      l: {
        ko: ['manual-new / manual-update 커맨드로 순서 표준화', '한 줄 명령으로 가이드 → 스킬 → 작성·검수 자동 실행'],
        en: ['Order standardized as manual-new / manual-update commands', 'One command runs guide → skills → draft → review'],
      },
    },
  ];
  projectDetailById.ai.flowOut = { ko: '매뉴얼 제작 리드타임 약 20일 → 4일', en: 'Manual lead time cut from ~20 days to 4' };

  // ── shared 3-part renderer: 4-step flow → 2x2 capability grid → collapsible archive ──
  function flowBlock(flow, out) {
    const boxes = flow
      .map(
        (f, i) => `${i ? '<span class="bid-flow-arrow" aria-hidden="true"></span>' : ''}` +
          `<li class="bid-flow-box${i === flow.length - 1 ? ' is-last' : ''}">` +
          `<span class="bid-flow-no">${String(i + 1).padStart(2, '0')} · ${escapeHtml(f.tag)}</span>` +
          `<b>${escapeHtml(L(f.t))}</b>` +
          `<ul>${L(f.l).map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul></li>`
      )
      .join('');
    return `<ol class="bid-flow">${boxes}</ol>` +
      (out ? `<p class="bid-flow-out"><span>${escapeHtml(L(out))}</span></p>` : '');
  }

  function axesBlock(axes) {
    return `<div class="axis-grid">${axes
      .map(
        (a, i) => `<div class="comp-card axis-card"><span class="comp-no">AXIS ${String(i + 1).padStart(2, '0')}</span>` +
          `<h3>${escapeHtml(L(a.t))}</h3>` +
          `<ul>${L(a.l).map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>` +
          `<p class="proof">→ ${escapeHtml(L(a.proof))}</p></div>`
      )
      .join('')}</div>`;
  }

  function archiveBlock(archive, inner) {
    return `<details class="acc-item archive">
        <summary>
          <span class="acc-no">ARC</span>
          <span class="acc-title">${escapeHtml(L(archive.title))}</span>
          <span class="acc-meta"><span class="acc-cat">${escapeHtml(L(archive.count))}</span><span class="acc-caret">▾</span></span>
        </summary>
        <div class="archive-body">${inner}</div>
      </details>`;
  }

  function setHeader(data, isErp) {
    if (detailKicker) detailKicker.textContent = data.kicker;
    if (detailTitle) {
      detailTitle.textContent = L(data.title);
      detailTitle.classList.toggle('is-erp', !!isErp);
    }
    if (detailSub) {
      detailSub.textContent = L(data.sub);
      detailSub.classList.toggle('is-erp', !!isErp);
    }
  }

  function tripleBody(data, archiveInner, after) {
    return `
      <div class="bid-pane">
        <section>
          <h4 class="bid-h">${escapeHtml(L(erpUi.flowTitle))}</h4>
          ${flowBlock(data.flow, data.flowOut)}
        </section>
        ${data.axes ? `<section>
          <h4 class="bid-h">${escapeHtml(L(erpUi.axesTitle))}</h4>
          ${axesBlock(data.axes)}
        </section>` : ''}
        ${data.archive ? archiveBlock(data.archive, archiveInner) : ''}
        ${after || ''}
      </div>`;
  }

  function escapeHtml(unsafe) {
    return String(unsafe)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function renderErpDetail() {
    const data = projectDetailById.erp;
    setHeader(data, true);
    if (!detailBody) return;

    const rowsHtml = erpRows
      .map((row, index) => {
        const zebra = index % 2 === 0 ? 'erp-row-even' : 'erp-row-odd';
        const en = currentLang === 'en';
        const pts = (en ? row.pointsEn : row.points) || [];
        return `
          <tr class="erp-row ${zebra}" data-tags="${escapeHtml(row.tags.join(','))}" data-role="${escapeHtml(row.role)}">
            <td>${escapeHtml(row.period)}</td>
            <td>
              <div class="erp-client">
                <span class="erp-client-name">${escapeHtml(en ? row.clientEn : row.client)}</span>
                <span class="erp-client-industry">${escapeHtml(en ? row.industryEn : row.industry)}</span>
              </div>
            </td>
            <td>${escapeHtml(row.role)}</td>
            <td>
              <span class="erp-desc">${escapeHtml(en ? row.descEn : row.desc)}</span>
              ${pts.length ? `<ul class="erp-points">${pts.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul>` : ''}
            </td>
          </tr>`;
      })
      .join('');

    const allLabel = escapeHtml(L(erpUi.all));
    const archiveInner = `
      <div class="erp-filters">
        <div class="erp-filter-group">
          <span class="erp-filter-label">${escapeHtml(L(erpUi.roleLabel))}</span>
          <div class="erp-filter-chips">
            <button type="button" class="chip is-active" data-role="전체">${allLabel}</button>
            <button type="button" class="chip" data-role="PM">PM</button>
            <button type="button" class="chip" data-role="PL">PL</button>
          </div>
        </div>
        <div class="erp-filter-group">
          <span class="erp-filter-label">${escapeHtml(L(erpUi.moduleLabel))}</span>
          <div class="erp-filter-chips">
            <button type="button" class="chip is-active" data-module="전체">${allLabel}</button>
            ${erpModules
              .map((m) => `<button type="button" class="chip" data-module="${escapeHtml(m.id)}">${escapeHtml(currentLang === 'en' ? m.en : m.ko)}</button>`)
              .join('')}
          </div>
        </div>
      </div>
      <div class="erp-table-wrapper">
        <table class="erp-table">
          <thead>
            <tr>
              <th>${escapeHtml(L(erpUi.thPeriod))}</th>
              <th>${escapeHtml(L(erpUi.thClient))}</th>
              <th>${escapeHtml(L(erpUi.thRole))}</th>
              <th>${escapeHtml(L(erpUi.thDesc))}</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>`;

    detailBody.innerHTML = tripleBody(data, archiveInner);
    setupErpFilters();
  }

  function renderTripleDetail(id) {
    const data = projectDetailById[id];
    setHeader(data, false);
    if (!detailBody) return;
    const en = currentLang === 'en';
    let archiveInner = '';
    if (data.archive) {
      const roleText = (r) =>
        typeof r === 'string' && en ? r.replace('기획', 'Planning').replace('운영', 'Ops').replace('총괄', 'Lead').replace('리드', 'Lead') : L(r);
      const head = data.archive.head
        ? L(data.archive.head)
        : [L(erpUi.thPeriod), en ? 'Client' : '고객사', L(erpUi.thRole), L(erpUi.thDesc)];
      const rows = data.archive.rows
        .map(
          (r, i) => `<tr class="erp-row ${i % 2 ? 'erp-row-odd' : 'erp-row-even'}">
              <td>${escapeHtml(L(r.period))}</td>
              <td><span class="erp-client-name">${escapeHtml(L(r.client))}</span></td>
              <td>${escapeHtml(roleText(r.role))}</td>
              <td>${escapeHtml(L(r.desc))}</td>
            </tr>`
        )
        .join('');
      archiveInner = `
        <div class="erp-table-wrapper">
          <table class="erp-table">
            <thead><tr>${head.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`;
    }
    const links = (data.links || [])
      .map((link) =>
        /^https?:/.test(link.href)
          ? `<a href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer noopener">${escapeHtml(L(link.label))}</a>`
          : `<a href="${escapeHtml(link.href)}">${escapeHtml(L(link.label))}</a>`
      )
      .join('');
    detailBody.innerHTML = tripleBody(data, archiveInner, links ? `<div class="project-detail-links">${links}</div>` : '');
  }

  function setupErpFilters() {
    let selectedRole = '전체';
    let selectedModule = '전체';
    const roleButtons = Array.from(detailBody.querySelectorAll('.chip[data-role]'));
    const moduleButtons = Array.from(detailBody.querySelectorAll('.chip[data-module]'));
    const rows = Array.from(detailBody.querySelectorAll('.erp-row'));

    function applyFilters() {
      rows.forEach((row) => {
        const roleParts = (row.dataset.role || '').split('/').map((p) => p.trim());
        const tags = (row.dataset.tags || '').split(',');
        const ok =
          (selectedRole === '전체' || roleParts.includes(selectedRole)) &&
          (selectedModule === '전체' || tags.includes(selectedModule));
        row.style.display = ok ? '' : 'none';
      });
    }
    roleButtons.forEach((btn) =>
      btn.addEventListener('click', () => {
        selectedRole = btn.dataset.role || '전체';
        roleButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
        applyFilters();
      })
    );
    moduleButtons.forEach((btn) =>
      btn.addEventListener('click', () => {
        selectedModule = btn.dataset.module || '전체';
        moduleButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
        applyFilters();
      })
    );
  }

  function renderBidDetail() {
    const data = projectDetailById.bid;
    if (detailKicker) detailKicker.textContent = data.kicker;
    if (detailTitle) {
      detailTitle.textContent = L(data.title);
      detailTitle.classList.remove('is-erp');
    }
    if (detailSub) {
      detailSub.textContent = L(data.sub);
      detailSub.classList.remove('is-erp');
    }
    if (!detailBody) return;
    const e = escapeHtml;
    const u = bidUi;

    const kpis = (list) =>
      `<div class="kpi-grid bid-kpis">${list
        .map(
          (k) => `<div class="kpi accent"><span class="k-label">${e(L(k.l))}</span>` +
            `<span class="k-value">${e(k.v)}<small>${e(L(k.u))}</small></span>` +
            `<span class="k-note">${e(L(k.n))}</span></div>`
        )
        .join('')}</div>`;

    const casesHtml = u.cases
      .map((c) => {
        const tags = c.tags ? `<div class="tag-row">${L(c.tags).map((t) => `<span class="tag">${e(t)}</span>`).join('')}</div>` : '';
        const chain = c.chain
          ? `<div class="chain">${L(c.chain).map((s) => `<span>${e(s)}</span>`).join('<i>→</i>')}</div>`
          : '';
        return `<article class="list-card bid-case">
            <p class="bid-tag">${e(c.tag)}</p>
            <h4>${e(L(c.title))}</h4>
            <p class="bid-body">${e(L(c.body))}</p>
            ${tags}${chain}
            <p class="feature-hl">${e(L(c.result))}</p>
          </article>`;
      })
      .join('');

    const wbsHtml = u.wbs
      .map((w, i) => `<span class="wbs-seg wbs-${i}" style="flex:${w.p}"><b>${e(L(w.k))}</b> ${w.p}%</span>`)
      .join('');

    const flowHtml = u.flow
      .map(
        (f, i) => `${i ? '<span class="bid-flow-arrow" aria-hidden="true"></span>' : ''}` +
          `<li class="bid-flow-box${i === u.flow.length - 1 ? ' is-last' : ''}">` +
          `<span class="bid-flow-no">${String(i + 1).padStart(2, '0')} · ${e(f.tag)}</span>` +
          `<b>${e(L(f.t))}</b>` +
          `<ul>${L(f.l).map((t) => `<li>${e(t)}</li>`).join('')}</ul>` +
          (f.wbs ? `<div class="wbs-bar">${wbsHtml}</div><span class="bid-flow-cap">${e(L(u.wbsCap))}</span>` : '') +
          `</li>`
      )
      .join('');

    const head = L(u.matrixHead);
    const matrixRows = u.matrix
      .map(
        (m) => `<tr><td>${e(L(m.r))}</td><td>${e(L(m.t))}</td>` +
          `<td><span class="state ${m.d === 'High' ? 'none' : m.d === 'Mid' ? 'cond' : 'only'}">${e(m.d)}</span></td>` +
          `<td><span class="state ${m.f === 'Fit' ? 'pre' : m.f === 'Add-on' ? 'cond' : 'only'}">${e(m.f)}</span></td>` +
          `<td>${e(L(m.p))}</td></tr>`
      )
      .join('');

    const estHtml = u.estimates
      .map(
        (x) => `<article class="bid-est" data-cat="${e(x.cat.join(','))}">
            <header><span class="erp-client-name">${e(currentLang === 'en' ? x.ce : x.c)}</span><span class="tag">${e(L(x.i))}</span></header>
            <p class="bid-core"><b>${e(L(u.labelCore))}</b>${e(L(x.core))}</p>
            <p class="bid-point"><b>${e(L(u.labelPoint))}</b>${e(L(x.pt))}</p>
          </article>`
      )
      .join('');

    detailBody.innerHTML = `
      <div class="erp-filter-chips bid-switch" role="tablist">
        <button type="button" class="chip" data-pane="tech" role="tab">${e(L(u.paneTech))}</button>
        <button type="button" class="chip" data-pane="effort" role="tab">${e(L(u.paneEffort))}</button>
      </div>

      <div class="bid-pane" data-pane="tech">
        ${kpis(u.techKpis)}
        <div class="two-up">${casesHtml}</div>
      </div>

      <div class="bid-pane" data-pane="effort">
        ${kpis(u.effortKpis)}
        <section>
          <h4 class="bid-h">${e(currentLang === 'en' ? 'Estimation framework' : '공수 산정 프레임워크')}</h4>
          <ol class="bid-flow">${flowHtml}</ol>
          <p class="bid-flow-out"><span>${e(L(u.flowOut))}</span></p>
        </section>
        <section>
          <h4 class="bid-h">${e(currentLang === 'en' ? 'Type · weight matrix' : '요구사항 유형 · 가중치 산출 매트릭스')}</h4>
          <div class="tbl-scroll">
            <table class="plain wide">
              <thead><tr>${head.map((h) => `<th>${e(h)}</th>`).join('')}</tr></thead>
              <tbody>${matrixRows}</tbody>
            </table>
          </div>
          <p class="diagram-caption">${e(L(u.matrixCap))}</p>
        </section>
        <section>
          <h4 class="bid-h">${e(currentLang === 'en' ? 'Estimates by client' : '고객사별 산정 포인트')}</h4>
          <div class="erp-filter-group bid-filter">
            <span class="erp-filter-label">${e(L(u.catLabel))}</span>
            <div class="erp-filter-chips">${u.cats
              .map((c) => `<button type="button" class="chip${c.id === 'all' ? ' is-active' : ''}" data-cat="${c.id}">${e(L(c.l))}</button>`)
              .join('')}</div>
          </div>
          <p class="erp-summary-text">${e(L(u.caseNote))}</p>
          <div class="bid-est-grid">${estHtml}</div>
        </section>
      </div>
    `;

    const paneBtns = Array.from(detailBody.querySelectorAll('.bid-switch .chip'));
    const panes = Array.from(detailBody.querySelectorAll('.bid-pane'));
    const showPane = (id) => {
      bidPane = id;
      paneBtns.forEach((b) => {
        const on = b.dataset.pane === id;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panes.forEach((p) => (p.hidden = p.dataset.pane !== id));
    };
    paneBtns.forEach((b) => b.addEventListener('click', () => showPane(b.dataset.pane)));
    showPane(bidPane);

    const catBtns = Array.from(detailBody.querySelectorAll('.bid-filter .chip'));
    const ests = Array.from(detailBody.querySelectorAll('.bid-est'));
    catBtns.forEach((b) =>
      b.addEventListener('click', () => {
        const id = b.dataset.cat;
        catBtns.forEach((x) => x.classList.toggle('is-active', x === b));
        ests.forEach((el) => (el.hidden = id !== 'all' && !el.dataset.cat.split(',').includes(id)));
      })
    );
  }

  function renderProjectDetail(projectId) {
    if (projectId === 'erp') {
      renderErpDetail();
      return;
    }
    if (projectId === 'bid') {
      renderBidDetail();
      return;
    }
    if (projectId === 'pmo' || projectId === 'soc' || projectId === 'ai') {
      renderTripleDetail(projectId);
      return;
    }

    const data = projectDetailById[projectId];
    if (!data) return;

    if (detailKicker) detailKicker.textContent = data.kicker;
    if (detailTitle) {
      detailTitle.textContent = L(data.title);
      detailTitle.classList.remove('is-erp');
    }
    if (detailSub) {
      detailSub.textContent = L(data.sub);
      detailSub.classList.remove('is-erp');
    }
    if (!detailBody) return;

    const bulletsHtml = (L(data.bullets) || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join('');

    const linksHtml = (data.links || [])
      .map((link) =>
        /^https?:/.test(link.href)
          ? `<a href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer noopener">${escapeHtml(L(link.label))}</a>`
          : `<a href="${escapeHtml(link.href)}">${escapeHtml(L(link.label))}</a>`
      )
      .join('');

    detailBody.innerHTML = `
      <ul class="project-detail-list">${bulletsHtml}</ul>
      ${linksHtml ? `<div class="project-detail-links">${linksHtml}</div>` : ''}
    `;
  }

  function selectProjectTab(nextId) {
    projectTabs.forEach((tab) => {
      const isSelected = tab.dataset.project === nextId;
      tab.classList.toggle('is-selected', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });
    renderProjectDetail(nextId);
  }

  if (projectTabs.length) {
    projectTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const id = tab.dataset.project;
        if (!id) return;
        selectProjectTab(id);
      });
    });

    const initialId = projectTabs.find((t) => t.classList.contains('is-selected'))?.dataset.project || 'bid';
    selectProjectTab(initialId);
  }
});

