(function () {
  const { etiquette, exercises, typeLabels, bodyPartLabels } = window.FITGUIDE_DATA;

  const state = {
    view: 'welcome',
    typeFilter: 'all',
    partFilter: 'all',
    searchQuery: '',
    activeExerciseId: null,
    routineIds: loadRoutine(),
    timerDuration: 60,
    timerRemaining: 60,
    timerInterval: null
  };

  // DOM 참조 / DOM 元素引用
  const views = {
    welcome: document.getElementById('view-welcome'),
    etiquette: document.getElementById('view-etiquette'),
    catalog: document.getElementById('view-catalog')
  };

  const etiquetteGrid = document.getElementById('etiquette-grid');
  const etiquetteCheck = document.getElementById('etiquette-confirm-check');
  const exerciseGrid = document.getElementById('exercise-grid');
  const emptyState = document.getElementById('empty-state');
  const resultSummary = document.getElementById('result-summary');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('btn-clear-search');
  const routineCountBadge = document.getElementById('routine-count-badge');

  // 모달 요소 / 弹窗元素
  const modal = document.getElementById('exercise-modal');
  const modalBadges = document.getElementById('modal-badges');
  const modalIllustration = document.getElementById('modal-illustration');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalPrimaryMuscle = document.getElementById('modal-primary-muscle');
  const modalSecondaryMuscle = document.getElementById('modal-secondary-muscle');
  const modalSets = document.getElementById('modal-sets');
  const modalSetupList = document.getElementById('modal-setup-list');
  const modalStepsList = document.getElementById('modal-steps-list');
  const modalBreathing = document.getElementById('modal-breathing');
  const modalCautionList = document.getElementById('modal-caution-list');
  const routineBtnText = document.getElementById('routine-btn-text');

  // 타이머 요소 / 计时器元素
  const timerDisplay = document.getElementById('timer-display');
  const timerStatus = document.getElementById('timer-status');
  const btnTimerStart = document.getElementById('btn-timer-start');
  const btnTimerReset = document.getElementById('btn-timer-reset');

  // 루틴 서랍 요소 / 训练计划抽屉元素
  const routineDrawer = document.getElementById('routine-drawer');
  const routineList = document.getElementById('routine-list');
  const routineEmpty = document.getElementById('routine-empty');
  const toastEl = document.getElementById('toast');
  let toastTimeout = null;

  function loadRoutine() {
    try {
      const raw = localStorage.getItem('fitguide_routine');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveRoutine() {
    try {
      localStorage.setItem('fitguide_routine', JSON.stringify(state.routineIds));
    } catch {
      // 스토리지 비활성 환경 무시 / 忽略本地存储不可用情况
    }
  }

  function showView(target) {
    state.view = target;
    Object.entries(views).forEach(([key, el]) => {
      const active = key === target;
      el.hidden = !active;
      el.classList.toggle('view--active', active);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.hidden = true;
    }, 2400);
  }

  function renderEtiquette() {
    etiquetteGrid.innerHTML = etiquette
      .map(
        (item, index) => `
        <article class="etiquette-card" role="listitem">
          <div class="etiquette-card-top">
            <span class="etiquette-icon" aria-hidden="true">${item.icon}</span>
            <span class="etiquette-num">RULE 0${index + 1}</span>
          </div>
          <h3>
            ${item.titleKo}
            <span>${item.titleZh}</span>
          </h3>
          <p>
            ${item.descKo}
            <span class="zh-block">${item.descZh}</span>
          </p>
        </article>
      `
      )
      .join('');
  }

  function getFilteredExercises() {
    const query = state.searchQuery.trim().toLowerCase();
    return exercises.filter((ex) => {
      if (state.typeFilter !== 'all' && ex.type !== state.typeFilter) return false;
      if (state.partFilter !== 'all' && ex.part !== state.partFilter) return false;
      if (!query) return true;

      const haystack = [
        ex.name.ko,
        ex.name.zh,
        ex.primaryMuscle.ko,
        ex.primaryMuscle.zh,
        ex.keywords
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }

  function renderExercises() {
    const filtered = getFilteredExercises();
    resultSummary.textContent = `총 ${filtered.length}개 운동 표시 중 / 共显示 ${filtered.length} 个训练动作`;

    if (filtered.length === 0) {
      exerciseGrid.innerHTML = '';
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    exerciseGrid.innerHTML = filtered
      .map((ex) => {
        const typeLabel = typeLabels[ex.type];
        const partLabel = bodyPartLabels[ex.part];
        const inRoutine = state.routineIds.includes(ex.id);

        return `
          <button
            type="button"
            class="exercise-card"
            data-id="${ex.id}"
            role="listitem"
            aria-label="${ex.name.ko} / ${ex.name.zh} 상세 보기 / 查看详情"
          >
            <div class="card-top">
              <span class="type-pill type-pill--${ex.type}">${typeLabel.ko} / ${typeLabel.zh}</span>
              <span class="part-pill">${partLabel.ko} / ${partLabel.zh}</span>
            </div>

            ${inRoutine ? '<span class="card-routine-mark">✓ 루틴 / 已加入</span>' : ''}

            <div class="card-illustration">
              ${window.getExerciseIllustration(ex.id)}
            </div>

            <div class="card-bottom">
              <div class="card-title-ko">${ex.name.ko}</div>
              <div class="card-title-zh">${ex.name.zh}</div>
            </div>
          </button>
        `;
      })
      .join('');
  }

  function renderBilingualList(items) {
    return items
      .map(
        (item) => `
        <li>
          <span>${item.ko}</span>
          <span class="zh-block">${item.zh}</span>
        </li>
      `
      )
      .join('');
  }

  function openExerciseModal(id) {
    const ex = exercises.find((item) => item.id === id);
    if (!ex) return;

    state.activeExerciseId = id;
    const typeLabel = typeLabels[ex.type];
    const partLabel = bodyPartLabels[ex.part];

    modalBadges.innerHTML = `
      <span class="type-pill type-pill--${ex.type}">${typeLabel.ko} / ${typeLabel.zh}</span>
      <span class="part-pill">${partLabel.ko} / ${partLabel.zh}</span>
      <span class="part-pill">난이도 / 难度: ${ex.level.ko} / ${ex.level.zh}</span>
    `;

    modalIllustration.innerHTML = window.getExerciseIllustration(ex.id);
    modalTitle.textContent = ex.name.ko;
    modalSubtitle.textContent = ex.name.zh;
    modalPrimaryMuscle.textContent = `${ex.primaryMuscle.ko} / ${ex.primaryMuscle.zh}`;
    modalSecondaryMuscle.textContent = `${ex.secondaryMuscle.ko} / ${ex.secondaryMuscle.zh}`;
    modalSets.textContent = `${ex.sets.ko} (${ex.sets.zh})`;

    modalSetupList.innerHTML = renderBilingualList(ex.setup);
    modalStepsList.innerHTML = renderBilingualList(ex.steps);
    modalBreathing.innerHTML = `
      <span>${ex.breathing.ko}</span>
      <span class="zh-block">${ex.breathing.zh}</span>
    `;
    modalCautionList.innerHTML = renderBilingualList(ex.cautions);

    updateRoutineModalButton();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeExerciseModal() {
    modal.hidden = true;
    state.activeExerciseId = null;
    if (routineDrawer.hidden) {
      document.body.style.overflow = '';
    }
  }

  function updateRoutineModalButton() {
    if (!state.activeExerciseId) return;
    const exists = state.routineIds.includes(state.activeExerciseId);
    routineBtnText.textContent = exists
      ? '내 루틴에서 제거 / 移出我的计划'
      : '내 루틴에 추가 / 加入我的计划';
  }

  function updateRoutineCount() {
    routineCountBadge.textContent = String(state.routineIds.length);
  }

  function toggleRoutineItem(id) {
    const idx = state.routineIds.indexOf(id);
    if (idx >= 0) {
      state.routineIds.splice(idx, 1);
      showToast('루틴에서 제거했습니다 / 已从计划中移除');
    } else {
      state.routineIds.push(id);
      showToast('오늘의 루틴에 추가했습니다 / 已加入今日计划');
    }
    saveRoutine();
    updateRoutineCount();
    updateRoutineModalButton();
    renderExercises();
    renderRoutineDrawer();
  }

  function renderRoutineDrawer() {
    if (state.routineIds.length === 0) {
      routineList.innerHTML = '';
      routineEmpty.hidden = false;
      return;
    }

    routineEmpty.hidden = true;
    routineList.innerHTML = state.routineIds
      .map((id, idx) => {
        const ex = exercises.find((item) => item.id === id);
        if (!ex) return '';
        return `
          <div class="routine-item">
            <div class="routine-item-info" data-open-id="${ex.id}">
              <strong>${idx + 1}. ${ex.name.ko}</strong>
              <span>${ex.name.zh} · ${ex.sets.ko}</span>
            </div>
            <button
              type="button"
              class="btn btn-ghost btn-sm"
              data-remove-id="${ex.id}"
              aria-label="제거 / 移除"
            >
              삭제 / 删除
            </button>
          </div>
        `;
      })
      .join('');
  }

  function openRoutineDrawer() {
    renderRoutineDrawer();
    routineDrawer.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeRoutineDrawer() {
    routineDrawer.hidden = true;
    if (modal.hidden) {
      document.body.style.overflow = '';
    }
  }

  // 타이머 로직 / 计时器逻辑
  function formatTime(sec) {
    const mins = String(Math.floor(sec / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  }

  function updateTimerUI() {
    timerDisplay.textContent = formatTime(state.timerRemaining);
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
    btnTimerStart.textContent = '시작 / 开始';
  }

  function resetTimer(seconds = state.timerDuration) {
    stopTimer();
    state.timerDuration = seconds;
    state.timerRemaining = seconds;
    timerStatus.textContent = '대기 중 / 待机中';
    updateTimerUI();
  }

  function toggleTimer() {
    if (state.timerInterval) {
      stopTimer();
      timerStatus.textContent = '일시정지 / 已暂停';
      return;
    }

    if (state.timerRemaining <= 0) {
      state.timerRemaining = state.timerDuration;
    }

    timerStatus.textContent = '휴식 진행 중 / 休息计时中...';
    btnTimerStart.textContent = '일시정지 / 暂停';

    state.timerInterval = setInterval(() => {
      state.timerRemaining -= 1;
      updateTimerUI();
      if (state.timerRemaining <= 0) {
        stopTimer();
        timerStatus.textContent = '휴식 완료! 다음 세트 시작 / 休息结束！请开始下一组';
        showToast('휴식 시간이 종료되었습니다! / 组间休息时间到！');
      }
    }, 1000);
  }

  function navigateModalExercise(step) {
    const filtered = getFilteredExercises();
    const pool = filtered.length > 0 ? filtered : exercises;
    const currentIdx = pool.findIndex((item) => item.id === state.activeExerciseId);
    const nextIdx = (currentIdx + step + pool.length) % pool.length;
    openExerciseModal(pool[nextIdx].id);
  }

  // 이벤트 바인딩 / 绑定事件
  document.getElementById('btn-enter').addEventListener('click', () => {
    showView('etiquette');
  });

  document.getElementById('btn-back-welcome').addEventListener('click', () => {
    showView('welcome');
  });

  document.getElementById('btn-next-catalog').addEventListener('click', () => {
    if (!etiquetteCheck.checked) {
      etiquetteCheck.checked = true;
    }
    showView('catalog');
  });

  document.getElementById('btn-logo-home').addEventListener('click', () => {
    showView('welcome');
  });

  document.getElementById('btn-open-etiquette').addEventListener('click', () => {
    showView('etiquette');
  });

  document.getElementById('type-filters').addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-type]');
    if (!btn) return;
    state.typeFilter = btn.dataset.type;
    document.querySelectorAll('#type-filters .chip').forEach((el) => {
      el.classList.toggle('chip--active', el === btn);
    });
    renderExercises();
  });

  document.getElementById('body-filters').addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-part]');
    if (!btn) return;
    state.partFilter = btn.dataset.part;
    document.querySelectorAll('#body-filters .chip').forEach((el) => {
      el.classList.toggle('chip--active', el === btn);
    });
    renderExercises();
  });

  searchInput.addEventListener('input', () => {
    state.searchQuery = searchInput.value;
    clearSearchBtn.hidden = searchInput.value.length === 0;
    renderExercises();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    clearSearchBtn.hidden = true;
    renderExercises();
    searchInput.focus();
  });

  document.getElementById('btn-reset-filters').addEventListener('click', () => {
    state.typeFilter = 'all';
    state.partFilter = 'all';
    state.searchQuery = '';
    searchInput.value = '';
    clearSearchBtn.hidden = true;
    document.querySelectorAll('#type-filters .chip').forEach((el) => {
      el.classList.toggle('chip--active', el.dataset.type === 'all');
    });
    document.querySelectorAll('#body-filters .chip').forEach((el) => {
      el.classList.toggle('chip--active', el.dataset.part === 'all');
    });
    renderExercises();
  });

  exerciseGrid.addEventListener('click', (event) => {
    const card = event.target.closest('.exercise-card[data-id]');
    if (!card) return;
    openExerciseModal(card.dataset.id);
  });

  document.getElementById('btn-close-modal').addEventListener('click', closeExerciseModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeExerciseModal();
  });

  document.getElementById('btn-toggle-routine').addEventListener('click', () => {
    if (state.activeExerciseId) toggleRoutineItem(state.activeExerciseId);
  });

  document.getElementById('btn-prev-exercise').addEventListener('click', () => navigateModalExercise(-1));
  document.getElementById('btn-next-exercise').addEventListener('click', () => navigateModalExercise(1));

  document.querySelectorAll('.preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.preset-btn').forEach((el) => el.classList.remove('preset-btn--active'));
      btn.classList.add('preset-btn--active');
      resetTimer(Number(btn.dataset.seconds));
    });
  });

  btnTimerStart.addEventListener('click', toggleTimer);
  btnTimerReset.addEventListener('click', () => resetTimer(state.timerDuration));

  document.getElementById('btn-open-routine').addEventListener('click', openRoutineDrawer);
  document.getElementById('btn-close-routine').addEventListener('click', closeRoutineDrawer);
  document.getElementById('btn-close-routine-bottom').addEventListener('click', closeRoutineDrawer);
  routineDrawer.addEventListener('click', (event) => {
    if (event.target === routineDrawer) closeRoutineDrawer();
  });

  routineList.addEventListener('click', (event) => {
    const removeBtn = event.target.closest('button[data-remove-id]');
    if (removeBtn) {
      toggleRoutineItem(removeBtn.dataset.removeId);
      return;
    }
    const openInfo = event.target.closest('[data-open-id]');
    if (openInfo) {
      closeRoutineDrawer();
      openExerciseModal(openInfo.dataset.openId);
    }
  });

  document.getElementById('btn-clear-routine').addEventListener('click', () => {
    if (state.routineIds.length === 0) return;
    state.routineIds = [];
    saveRoutine();
    updateRoutineCount();
    renderRoutineDrawer();
    renderExercises();
    showToast('루틴을 비웠습니다 / 已清空计划列表');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (!modal.hidden) closeExerciseModal();
      if (!routineDrawer.hidden) closeRoutineDrawer();
    }
  });

  // 초기 렌더링 / 初始化渲染
  renderEtiquette();
  renderExercises();
  updateRoutineCount();
  updateTimerUI();
})();

