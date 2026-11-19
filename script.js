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
        '엔터프라이즈 ERP(20여 건)와 금융 데이터·SOC 2 거버넌스 구축 경험을 바탕으로, 복잡한 비즈니스 규칙을 코드와 시스템 아키텍처로 구현하는 프로덕트 기획자이자 빌더입니다. DB·로직 단의 깊은 기술 이해도(IT Literacy)를 토대로 기획과 개발 간의 간극을 없애고, 검증 가능한 데이터 기반 프로덕트를 만듭니다.',
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
        '표준 기준의 개발 공수 산정으로 프로젝트 수주 경쟁력을 강화하고, 글로벌 B2B SaaS 확장을 위한 SOC 2 Type 1·2 보안 인증 프로젝트를 총괄했습니다.',
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
      'projects.sub': '거버넌스·내부통제, ERP, PMO 경험이 녹아 있는 주요 수행 내역입니다.',
      'proj.soc.title': 'SOC 인증',
      'proj.soc.desc': '인증 기획/총괄 및 유관부서 협업으로 전 통제항목 통과',
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
        'A product planner and builder who turns complex business rules into code and system architecture, drawing on 20+ enterprise ERP builds and financial-data and SOC 2 governance work. With deep IT literacy down to the DB and logic layer, I close the gap between planning and development and build verifiable, data-driven products.',
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
        'Strengthened bid competitiveness through standards-based development effort estimation, and led the SOC 2 Type 1·2 security certification for global B2B SaaS expansion.',
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
        'Key engagements that capture my experience in governance/internal control, ERP and PMO.',
      'proj.soc.title': 'SOC Certification',
      'proj.soc.desc': 'Planned & led certification; passed all controls via cross-team collaboration',
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
      const selectedId = selected ? selected.dataset.project : 'soc';
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
      period: '2021.06 - 2022.01',
      client: '에이치이엠파마',
      clientEn: 'HEM Pharmaco',
      role: 'PL',
      industry: '바이오/제조',
      industryEn: 'Bio · Mfg',
      desc: '프로젝트 원가/배부, 용역매출원가 계산 및 손익 관리 구축',
      descEn: 'Built project costing/allocation, service COGS calculation, and P&L management',
      tags: ['원가관리', 'PL'],
    },
    {
      period: '2020.04 - 2021.01',
      client: '벽산',
      clientEn: 'Byucksan',
      role: 'PL',
      industry: '건자재/제조',
      industryEn: 'Building Mat. · Mfg',
      desc: '관리회계(사업계획, 표준/제조원가, 수익성분석) 구축',
      descEn: 'Built managerial accounting: business planning, standard/manufacturing cost, profitability analysis',
      tags: ['원가관리', 'PL'],
    },
    {
      period: '2019.11 - 2020.04',
      client: '지엔엠라이프',
      clientEn: 'GNM Life',
      role: 'PL',
      industry: '유통',
      industryEn: 'Distribution',
      desc: '외주구매 및 원가 구축, 사방넷 인터페이스 연동',
      descEn: 'Outsourced purchasing & costing; Sabangnet interface integration',
      tags: ['원가관리', '구매/물류', 'PL'],
    },
    {
      period: '2019.05 - 2020.01',
      client: '쿠도커뮤니케이션',
      clientEn: 'Kudo Communication',
      role: 'PL',
      industry: 'IT',
      industryEn: 'IT',
      desc: 'PMS(프로젝트 관리 시스템) 및 원가 시스템 구축',
      descEn: 'Built a PMS (project management system) and costing system',
      tags: ['원가관리', 'PM', 'PL'],
    },
    {
      period: '2018.11 - 2019.11',
      client: '엑사이엔씨',
      clientEn: 'EXA E&C',
      role: 'PL',
      industry: '전자/제조',
      industryEn: 'Electronics · Mfg',
      desc: '인천공장 전체 담당: 원가/영업/구매/생산/무역/기준정보 구축',
      descEn: 'Full ownership of the Incheon plant: cost, sales, purchasing, production, trade, master data',
      tags: ['원가관리', '구매/물류', 'PL'],
    },
    {
      period: '2019.08 - 2019.08',
      client: '와이디생명과학',
      clientEn: 'YD Life Science',
      role: 'PM',
      industry: '바이오',
      industryEn: 'Bio',
      desc: '물류 고도화 데이터 VIEW 생성 및 제공',
      descEn: 'Logistics enhancement — created and delivered data views',
      tags: ['구매/물류', 'PM'],
    },
    {
      period: '2018.12 - 2019.07',
      client: '새턴바스',
      clientEn: 'Saturn Bath',
      role: 'PL',
      industry: '제조',
      industryEn: 'Manufacturing',
      desc: '실제원가 구축 지원 및 시스템 안정화',
      descEn: 'Supported actual-costing build and system stabilization',
      tags: ['원가관리', 'PL'],
    },
    {
      period: '2018.12 - 2019.06',
      client: '선일케미칼',
      clientEn: 'Sunil Chemical',
      role: 'PL',
      industry: '화학/제조',
      industryEn: 'Chemical · Mfg',
      desc: '표준/실제원가 및 한계이익 관리 체계 구축',
      descEn: 'Built standard/actual costing and contribution-margin management',
      tags: ['원가관리', 'PL'],
    },
    {
      period: '2018.08 - 2019.02',
      client: '지피클럽',
      clientEn: 'GP Club',
      role: 'PL',
      industry: '제조',
      industryEn: 'Manufacturing',
      desc: 'EC모듈, 구매자재 및 수입모듈 프로세스 구축',
      descEn: 'Built EC module, purchasing/materials, and import module processes',
      tags: ['구매/물류', 'PL'],
    },
    {
      period: '2018.11 - 2018.12',
      client: '니콘이미징코리아',
      clientEn: 'Nikon Imaging Korea',
      role: 'PM',
      industry: '전자/제조',
      industryEn: 'Electronics · Mfg',
      desc: 'ERP - 그룹웨어(GW) 연동 고도화',
      descEn: 'ERP–groupware (GW) integration enhancement',
      tags: ['PM'],
    },
    {
      period: '2018.07 - 2018.12',
      client: '포스코터미날',
      clientEn: 'POSCO Terminal',
      role: 'PL',
      industry: '물류/운송',
      industryEn: 'Logistics · Transport',
      desc: '구매자재 구축, 자재표준화 및 선석/도면관리 I/F 개발',
      descEn: 'Purchasing/materials build, material standardization, berth/drawing management interfaces',
      tags: ['구매/물류', 'PL'],
    },
    {
      period: '2017.04 - 2018.09',
      client: '하츠',
      clientEn: 'Haatz',
      role: 'PL',
      industry: '가전/제조',
      industryEn: 'Home Appliance · Mfg',
      desc: '통합원가/결산관리 구축, 렌탈관리 시스템(PL보조) 구축',
      descEn: 'Built integrated costing/closing management and a rental management system (PL support)',
      tags: ['원가관리', 'PL'],
    },
    {
      period: '2018.04 - 2018.07',
      client: '한국코와',
      clientEn: 'Kowa Korea',
      role: 'PM',
      industry: '제약/유통',
      industryEn: 'Pharma · Distribution',
      desc: '영업모듈 고도화 (2차 프로젝트)',
      descEn: 'Sales module enhancement (phase 2)',
      tags: ['PM'],
    },
    {
      period: '2017.03 - 2018.04',
      client: '야놀자',
      clientEn: 'Yanolja',
      role: 'PL',
      industry: 'IT/플랫폼',
      industryEn: 'IT · Platform',
      desc: 'EC모듈 및 구매자재 모듈 구축',
      descEn: 'Built EC module and purchasing/materials module',
      tags: ['구매/물류', 'PL'],
    },
    {
      period: '2017.05 - 2017.06',
      client: '한국코와',
      clientEn: 'Kowa Korea',
      role: 'PM',
      industry: '제약/유통',
      industryEn: 'Pharma · Distribution',
      desc: 'PG사 결제 시스템 변경 및 최적화',
      descEn: 'Payment-gateway system change and optimization',
      tags: ['PM'],
    },
    {
      period: '2015.12 - 2017.02',
      client: '코스콤',
      clientEn: 'Koscom',
      role: 'QA/PL',
      industry: '금융IT',
      industryEn: 'Fintech',
      desc: '품질 관리(QA) 및 BT(Back-up Tape) 모듈 구축',
      descEn: 'Quality assurance (QA) and BT (back-up tape) module build',
      tags: ['PM', 'PL'],
    },
  ];

  const projectDetailById = {
    soc: {
      kicker: 'Tab 01',
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
      kicker: 'Tab 02',
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
      kicker: 'Tab 04',
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

  // resolve a value that may be a plain string or a { ko, en } object
  function L(value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return value[currentLang] ?? value.ko ?? '';
    }
    return value;
  }

  // UI strings for the JS-rendered ERP table
  const erpUi = {
    summary: { ko: '* 총 20건 이상의 프로젝트 수행', en: '* 20+ projects delivered in total' },
    roleLabel: { ko: '역할', en: 'Role' },
    industryLabel: { ko: '산업군', en: 'Industry' },
    all: { ko: '전체', en: 'All' },
    thPeriod: { ko: '기간', en: 'Period' },
    thClient: { ko: '고객사 / 산업군', en: 'Client / Industry' },
    thRole: { ko: '역할', en: 'Role' },
    thDesc: { ko: '주요 수행 내역', en: 'Key Deliverables' },
  };

  // display labels for the single-token industry filter chips
  // (data-industry stays Korean so the existing filter logic is unchanged)
  const industryLabels = {
    '바이오': 'Bio',
    '제조': 'Mfg',
    '건자재': 'Building Mat.',
    '유통': 'Distribution',
    IT: 'IT',
    '화학': 'Chemical',
    '물류': 'Logistics',
    '운송': 'Transport',
    '가전': 'Appliance',
    '제약': 'Pharma',
    '플랫폼': 'Platform',
    '금융': 'Finance',
  };

  function escapeHtml(unsafe) {
    return String(unsafe)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function renderErpDetail() {
    if (detailKicker) detailKicker.textContent = projectDetailById.erp.kicker;
    if (detailTitle) {
      detailTitle.textContent = L(projectDetailById.erp.title);
      detailTitle.classList.add('is-erp');
    }
    if (detailSub) {
      detailSub.textContent = L(projectDetailById.erp.sub);
      detailSub.classList.add('is-erp');
    }
    if (!detailBody) return;

    const industries = [
      '바이오',
      '제조',
      '건자재',
      '유통',
      'IT',
      '화학',
      '물류',
      '운송',
      '가전',
      '제약',
      '플랫폼',
      '금융',
    ];

    const rowsHtml = erpRows
      .map((row, index) => {
        const tagsAttr = row.tags.join(',');
        const zebra = index % 2 === 0 ? 'erp-row-even' : 'erp-row-odd';
        const clientName = currentLang === 'en' && row.clientEn ? row.clientEn : row.client;
        const industryText = currentLang === 'en' && row.industryEn ? row.industryEn : row.industry;
        const descText = currentLang === 'en' && row.descEn ? row.descEn : row.desc;
        return `
          <tr class="erp-row ${zebra}" data-tags="${escapeHtml(tagsAttr)}" data-role="${escapeHtml(
           row.role
         )}" data-industry="${escapeHtml(row.industry)}">
            <td>${escapeHtml(row.period)}</td>
            <td>
              <div class="erp-client">
                <span class="erp-client-name">${escapeHtml(clientName)}</span>
                <span class="erp-client-industry">${escapeHtml(industryText)}</span>
              </div>
            </td>
            <td>${escapeHtml(row.role)}</td>
            <td>${escapeHtml(descText)}</td>
          </tr>
        `;
      })
      .join('');

    const allLabel = L(erpUi.all);

    detailBody.innerHTML = `
      <p class="erp-summary-text">${escapeHtml(L(erpUi.summary))}</p>
      <div class="erp-filters">
        <div class="erp-filter-group">
          <span class="erp-filter-label">${escapeHtml(L(erpUi.roleLabel))}</span>
          <div class="erp-filter-chips" role="tablist">
            <button type="button" class="chip is-active" data-role="전체">${escapeHtml(allLabel)}</button>
            <button type="button" class="chip" data-role="PM">PM</button>
            <button type="button" class="chip" data-role="PL">PL</button>
          </div>
        </div>
        <div class="erp-filter-group">
          <span class="erp-filter-label">${escapeHtml(L(erpUi.industryLabel))}</span>
          <div class="erp-filter-chips">
            <button type="button" class="chip is-active" data-industry="전체">${escapeHtml(allLabel)}</button>
            ${industries
              .map((ind) => {
                const label = currentLang === 'en' && industryLabels[ind] ? industryLabels[ind] : ind;
                return `<button type="button" class="chip" data-industry="${escapeHtml(ind)}">${escapeHtml(label)}</button>`;
              })
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
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;

    setupErpFilters();
  }

  function renderProjectDetail(projectId) {
    if (projectId === 'erp') {
      renderErpDetail();
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

  function setupErpFilters() {
    let selectedRole = '전체';
    let selectedIndustry = '전체';

    const roleButtons = Array.from(document.querySelectorAll('.chip[data-role]'));
    const industryButtons = Array.from(document.querySelectorAll('.chip[data-industry]'));
    const rows = Array.from(document.querySelectorAll('.erp-row'));

    function applyFilters() {
      rows.forEach((row) => {
        const rowRole = row.dataset.role || '';
        const rowIndustry = row.dataset.industry || '';

        const roleParts = rowRole.split('/').map((part) => part.trim()).filter(Boolean);
        const matchRole =
          selectedRole === '전체' || roleParts.includes(selectedRole) || rowRole === selectedRole;
        const matchIndustry =
          selectedIndustry === '전체' || rowIndustry.includes(selectedIndustry);

        const isVisible = matchRole && matchIndustry;
        row.style.display = isVisible ? '' : 'none';
      });
    }

    roleButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedRole = btn.dataset.role || '전체';
        roleButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
        applyFilters();
      });
    });

    industryButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedIndustry = btn.dataset.industry || '전체';
        industryButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
        applyFilters();
      });
    });

    applyFilters();
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

    const initialId = projectTabs.find((t) => t.classList.contains('is-selected'))?.dataset.project || 'soc';
    selectProjectTab(initialId);
  }
});

