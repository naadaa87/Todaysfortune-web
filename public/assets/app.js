(() => {
  const root = document.documentElement;
  const storageKey = 'oneul-saju-theme';
  const getAutoTheme = () => {
    const hour = new Date().getHours();
    return hour >= 5 && hour < 18 ? 'day' : 'night';
  };

  const getQueryTheme = () => {
    const value = new URLSearchParams(window.location.search).get('theme');
    return ['day', 'night', 'auto'].includes(value) ? value : null;
  };

  const applyTheme = (mode) => {
    const actual = mode === 'auto' ? getAutoTheme() : mode;
    root.dataset.theme = actual;
    root.dataset.themeMode = mode;
    document.querySelectorAll('[data-theme-choice]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.themeChoice === mode);
      btn.setAttribute('aria-pressed', btn.dataset.themeChoice === mode ? 'true' : 'false');
    });
    document.querySelectorAll('[data-theme-state]').forEach((el) => {
      el.textContent = actual === 'day' ? '낮의 그린 테마' : '밤의 핑크 테마';
    });
    document.querySelectorAll('[data-time-greeting]').forEach((el) => {
      el.textContent = actual === 'day' ? '오늘의 흐름을 가볍게 정리해보세요.' : '하루를 돌아보며 내 마음의 결을 살펴보세요.';
    });
    document.querySelectorAll('[data-time-label]').forEach((el) => {
      el.textContent = actual === 'day' ? '오전·오후' : '저녁·밤';
    });
  };

  const queryTheme = getQueryTheme();
  const saved = queryTheme || localStorage.getItem(storageKey) || 'auto';
  applyTheme(saved);

  document.querySelectorAll('[data-theme-choice]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.themeChoice;
      localStorage.setItem(storageKey, value);
      applyTheme(value);
    });
  });

  window.setInterval(() => {
    if ((root.dataset.themeMode || 'auto') === 'auto') applyTheme('auto');
  }, 60_000);

  const dateNodes = document.querySelectorAll('[data-today-date]');
  if (dateNodes.length) {
    const dateText = new Intl.DateTimeFormat('ko-KR', {
      month: 'long', day: 'numeric', weekday: 'long'
    }).format(new Date());
    dateNodes.forEach((node) => { node.textContent = dateText; });
  }

  const nav = document.querySelector('.main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  if (nav && menuToggle) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

  document.querySelectorAll('[data-tab-group]').forEach((group) => {
    const buttons = group.querySelectorAll('[data-tab]');
    const panels = group.querySelectorAll('[data-panel]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        button.classList.add('active');
        const panel = group.querySelector(`[data-panel="${button.dataset.tab}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  document.querySelectorAll('.faq-button').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      item.classList.toggle('open');
      button.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
    });
  });

  const toast = document.querySelector('.toast');
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(window.__oneulToast);
    window.__oneulToast = window.setTimeout(() => toast.classList.remove('show'), 2600);
  };

  document.querySelectorAll('[data-coming-soon]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      showToast(button.dataset.comingSoon || '준비 중인 기능입니다.');
    });
  });

  document.querySelectorAll('[data-copy-link]').forEach((button) => {
    button.addEventListener('click', async () => {
      const link = button.dataset.copyLink || window.location.href;
      try {
        await navigator.clipboard.writeText(link);
        showToast('초대 링크를 복사했습니다.');
      } catch {
        showToast('링크 복사에 실패했습니다. 주소창의 링크를 복사해주세요.');
      }
    });
  });

  const demoForm = document.querySelector('[data-analysis-form]');
  if (demoForm) {
    demoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const result = document.querySelector('[data-analysis-result]');
      if (result) {
        result.hidden = false;
        result.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      showToast('체험용 결과 화면을 열었습니다. 실제 만세력 계산은 백엔드 연동 단계에서 적용됩니다.');
    });
  }

  const relationForm = document.querySelector('[data-relation-form]');
  if (relationForm) {
    relationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const result = document.querySelector('[data-relation-result]');
      if (result) {
        result.hidden = false;
        result.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      showToast('관계 비교 샘플을 열었습니다. 실제 궁합 산식은 명리 엔진 연동 후 제공됩니다.');
    });
  }
})();
