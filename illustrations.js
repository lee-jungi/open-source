let fitguideSvgCounter = 0;

window.getExerciseIllustration = function getExerciseIllustration(id) {
  const wrap = (inner, accent = '#0EA5E9') => {
    const markerId = `arrow-${id}-${++fitguideSvgCounter}`;
    const safeInner = inner.split(`arrow-${id}`).join(markerId);
    return `
      <svg viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="6" width="168" height="128" rx="16" fill="#F8FAFC" />
        <line x1="22" y1="120" x2="158" y2="120" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round" />
        <defs>
          <marker id="${markerId}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${accent}" />
          </marker>
        </defs>
        ${safeInner}
      </svg>
    `;
  };

  const drawings = {
    // 1. 체스트 프레스 머신 / 坐姿推胸机
    'chest-press-machine': wrap(`
      <!-- 머신 프레임 & 웨이트 스택 -->
      <rect x="30" y="26" width="18" height="94" rx="4" fill="#E2E8F0" stroke="#64748B" stroke-width="2" />
      <rect x="33" y="48" width="12" height="24" rx="2" fill="#0284C7" />
      <path d="M48 34 H84 V120" stroke="#64748B" stroke-width="3" stroke-linecap="round" />
      <!-- 등받이 & 시트 -->
      <rect x="76" y="48" width="9" height="44" rx="4" fill="#334155" />
      <rect x="76" y="88" width="32" height="9" rx="4" fill="#334155" />
      <!-- 사람 (앉아서 앞으로 밀기) -->
      <circle cx="94" cy="40" r="8.5" fill="#0F172A" />
      <path d="M90 50 L92 84" stroke="#0EA5E9" stroke-width="11" stroke-linecap="round" />
      <path d="M92 84 L118 86 L120 116" stroke="#1E293B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 프레스 암 & 팔 -->
      <path d="M62 34 L126 60" stroke="#64748B" stroke-width="3" stroke-linecap="round" />
      <circle cx="128" cy="60" r="4" fill="#0284C7" />
      <path d="M93 56 L112 62 L127 60" stroke="#0F172A" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 이동 방향 화살표 -->
      <path d="M132 50 H152" stroke="#0EA5E9" stroke-width="2.5" stroke-dasharray="3 3" marker-end="url(#arrow-chest-press-machine)" />
    `),

    // 2. 펙 덱 플라이 머신 / 蝴蝶机夹胸
    'pec-deck-fly': wrap(`
      <!-- 중앙 기둥 & 양쪽 플라이 암 -->
      <rect x="85" y="22" width="10" height="98" rx="3" fill="#CBD5E1" stroke="#64748B" stroke-width="2" />
      <rect x="76" y="86" width="28" height="9" rx="4" fill="#334155" />
      <path d="M40 34 H140" stroke="#64748B" stroke-width="3" stroke-linecap="round" />
      <path d="M40 34 V68" stroke="#64748B" stroke-width="3.5" stroke-linecap="round" />
      <path d="M140 34 V68" stroke="#64748B" stroke-width="3.5" stroke-linecap="round" />
      <!-- 사람 정면/반측면 -->
      <circle cx="90" cy="42" r="8.5" fill="#0F172A" />
      <path d="M90 52 V84" stroke="#0EA5E9" stroke-width="14" stroke-linecap="round" />
      <path d="M84 88 L74 116 M96 88 L106 116" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" />
      <!-- 양팔 모으기 -->
      <path d="M82 56 L58 66 L42 66" stroke="#0F172A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M98 56 L122 66 L138 66" stroke="#0F172A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 화살표 -->
      <path d="M46 78 C58 84, 70 84, 78 78" stroke="#0EA5E9" stroke-width="2.3" marker-end="url(#arrow-pec-deck-fly)" />
      <path d="M134 78 C122 84, 110 84, 102 78" stroke="#0EA5E9" stroke-width="2.3" marker-end="url(#arrow-pec-deck-fly)" />
    `),

    // 3. 바벨 벤치 프레스 / 杠铃卧推
    'barbell-bench-press': wrap(`
      <!-- 벤치 & 랙 -->
      <rect x="44" y="88" width="84" height="10" rx="4" fill="#334155" />
      <line x1="56" y1="98" x2="56" y2="120" stroke="#64748B" stroke-width="3.5" />
      <line x1="116" y1="98" x2="116" y2="120" stroke="#64748B" stroke-width="3.5" />
      <line x1="48" y1="44" x2="48" y2="120" stroke="#94A3B8" stroke-width="3" />
      <!-- 누운 사람 -->
      <circle cx="52" cy="79" r="8" fill="#0F172A" />
      <path d="M62 81 L104 82" stroke="#10B981" stroke-width="11" stroke-linecap="round" />
      <path d="M104 82 L128 84 L132 116" stroke="#1E293B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 팔 & 바벨 -->
      <path d="M78 79 L78 44" stroke="#0F172A" stroke-width="6.5" stroke-linecap="round" />
      <line x1="58" y1="42" x2="98" y2="42" stroke="#0F172A" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="78" cy="42" r="12" fill="#10B981" fill-opacity="0.25" stroke="#059669" stroke-width="3" />
      <path d="M104 54 V30" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow-barbell-bench-press)" />
    `, '#10B981'),

    // 4. 랫 풀다운 / 高位下拉机
    'lat-pulldown': wrap(`
      <!-- 랫 풀다운 타워 & 케이블 -->
      <rect x="36" y="22" width="16" height="98" rx="4" fill="#E2E8F0" stroke="#64748B" stroke-width="2" />
      <rect x="39" y="54" width="10" height="22" rx="2" fill="#0284C7" />
      <path d="M44 22 H112 V34" stroke="#64748B" stroke-width="3" stroke-linecap="round" />
      <line x1="112" y1="34" x2="112" y2="48" stroke="#0284C7" stroke-width="2.5" />
      <line x1="88" y1="48" x2="136" y2="48" stroke="#0F172A" stroke-width="3.5" stroke-linecap="round" />
      <!-- 시트 & 허벅지 패드 -->
      <rect x="94" y="88" width="30" height="9" rx="4" fill="#334155" />
      <line x1="108" y1="97" x2="108" y2="120" stroke="#64748B" stroke-width="3.5" />
      <rect x="86" y="76" width="16" height="7" rx="3.5" fill="#475569" />
      <!-- 사람 -->
      <circle cx="110" cy="54" r="8" fill="#0F172A" />
      <path d="M110 64 L108 86" stroke="#0EA5E9" stroke-width="11" stroke-linecap="round" />
      <path d="M108 86 L86 86 L84 116" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M102 64 L92 49 M118 64 L128 49" stroke="#0F172A" stroke-width="5.5" stroke-linecap="round" />
      <path d="M144 42 V64" stroke="#0EA5E9" stroke-width="2.5" marker-end="url(#arrow-lat-pulldown)" />
    `),

    // 5. 시티드 케이블 로우 / 坐姿划船机
    'seated-cable-row': wrap(`
      <!-- 케이블 타워 & 발판 -->
      <rect x="28" y="24" width="16" height="96" rx="4" fill="#E2E8F0" stroke="#64748B" stroke-width="2" />
      <rect x="31" y="58" width="10" height="22" rx="2" fill="#0284C7" />
      <rect x="76" y="96" width="70" height="9" rx="4" fill="#334155" />
      <path d="M62 84 L74 106" stroke="#475569" stroke-width="5" stroke-linecap="round" />
      <!-- 케이블 -->
      <line x1="44" y1="74" x2="90" y2="74" stroke="#0284C7" stroke-width="2.5" />
      <!-- 사람 -->
      <circle cx="114" cy="48" r="8.5" fill="#0F172A" />
      <path d="M114 58 L112 92" stroke="#0EA5E9" stroke-width="11" stroke-linecap="round" />
      <path d="M112 92 L92 92 L70 96" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M112 63 L98 76 L88 74" stroke="#0F172A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M98 60 H120" stroke="#0EA5E9" stroke-width="2.5" marker-end="url(#arrow-seated-cable-row)" />
    `),

    // 6. 덤벨 원암 로우 / 单臂哑铃划船
    'one-arm-dumbbell-row': wrap(`
      <!-- 벤치 -->
      <rect x="44" y="80" width="84" height="9" rx="4" fill="#334155" />
      <line x1="56" y1="89" x2="56" y2="120" stroke="#64748B" stroke-width="3.5" />
      <line x1="116" y1="89" x2="116" y2="120" stroke="#64748B" stroke-width="3.5" />
      <!-- 사람 (벤치에 한손/한무릎 짚고 당기기) -->
      <circle cx="118" cy="48" r="8" fill="#0F172A" />
      <path d="M110 53 L74 58" stroke="#10B981" stroke-width="11" stroke-linecap="round" />
      <!-- 지지 팔 & 지지 다리 -->
      <path d="M108 56 L108 79" stroke="#475569" stroke-width="5.5" stroke-linecap="round" />
      <path d="M74 60 L76 79 L58 79" stroke="#475569" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 바닥 다리 -->
      <path d="M72 62 L60 116" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" />
      <!-- 당기는 팔 & 덤벨 -->
      <path d="M102 58 L88 74 L90 96" stroke="#0F172A" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="81" y="96" width="18" height="7" rx="2.5" fill="#059669" />
      <path d="M104 94 V70" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow-one-arm-dumbbell-row)" />
    `, '#10B981'),

    // 7. 레그 프레스 머신 / 倒蹬机腿举
    'leg-press-machine': wrap(`
      <!-- 45도 레그 프레스 레일 & 발판 -->
      <line x1="56" y1="98" x2="136" y2="34" stroke="#94A3B8" stroke-width="4" stroke-linecap="round" />
      <rect x="38" y="84" width="38" height="9" rx="4" transform="rotate(-35 38 84)" fill="#334155" />
      <rect x="52" y="96" width="30" height="9" rx="4" fill="#334155" />
      <rect x="116" y="34" width="10" height="36" rx="4" transform="rotate(-35 116 34)" fill="#0284C7" />
      <circle cx="136" cy="40" r="9" fill="#0EA5E9" fill-opacity="0.25" stroke="#0284C7" stroke-width="2.5" />
      <!-- 사람 -->
      <circle cx="48" cy="70" r="8" fill="#0F172A" />
      <path d="M54 76 L72 95" stroke="#0EA5E9" stroke-width="11" stroke-linecap="round" />
      <path d="M72 95 L98 76 L118 54" stroke="#1E293B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M108 38 L128 24" stroke="#0EA5E9" stroke-width="2.5" marker-end="url(#arrow-leg-press-machine)" />
    `),

    // 8. 레그 익스텐션 / 坐姿腿屈伸机
    'leg-extension': wrap(`
      <!-- 시트 & 등받이 -->
      <rect x="54" y="48" width="9" height="44" rx="4" fill="#334155" />
      <rect x="54" y="86" width="42" height="9" rx="4" fill="#334155" />
      <line x1="72" y1="95" x2="72" y2="120" stroke="#64748B" stroke-width="3.5" />
      <!-- 머신 암 & 패드 -->
      <circle cx="96" cy="90" r="4.5" fill="#0284C7" />
      <line x1="96" y1="90" x2="132" y2="76" stroke="#64748B" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="130" cy="74" r="5.5" fill="#0284C7" />
      <!-- 사람 -->
      <circle cx="70" cy="42" r="8" fill="#0F172A" />
      <path d="M68 52 L70 84" stroke="#0EA5E9" stroke-width="11" stroke-linecap="round" />
      <path d="M70 84 L96 84 L132 70" stroke="#1E293B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M120 104 C132 98, 138 88, 140 76" stroke="#0EA5E9" stroke-width="2.5" marker-end="url(#arrow-leg-extension)" />
    `),

    // 9. 레그 컬 머신 / 俯卧腿弯举机
    'leg-curl': wrap(`
      <!-- 엎드리는 벤치 -->
      <path d="M40 84 H84 L112 92" stroke="#334155" stroke-width="9" stroke-linecap="round" />
      <line x1="56" y1="88" x2="56" y2="120" stroke="#64748B" stroke-width="3.5" />
      <line x1="102" y1="92" x2="102" y2="120" stroke="#64748B" stroke-width="3.5" />
      <!-- 레버 & 패드 -->
      <line x1="112" y1="90" x2="138" y2="54" stroke="#64748B" stroke-width="3" stroke-linecap="round" />
      <circle cx="136" cy="56" r="5" fill="#0284C7" />
      <!-- 사람 -->
      <circle cx="44" cy="70" r="8" fill="#0F172A" />
      <path d="M52 75 L86 78" stroke="#0EA5E9" stroke-width="10.5" stroke-linecap="round" />
      <path d="M86 78 L112 84 L134 54" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M144 84 C148 72, 146 60, 140 50" stroke="#0EA5E9" stroke-width="2.5" marker-end="url(#arrow-leg-curl)" />
    `),

    // 10. 바벨 백 스쿼트 / 杠铃深蹲
    'barbell-back-squat': wrap(`
      <!-- 스쿼트 랙 기둥 -->
      <line x1="42" y1="24" x2="42" y2="120" stroke="#94A3B8" stroke-width="3.5" stroke-linecap="round" />
      <line x1="42" y1="92" x2="64" y2="92" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
      <!-- 사람 (스쿼트 자세) -->
      <circle cx="96" cy="40" r="8" fill="#0F172A" />
      <path d="M94 50 L80 78" stroke="#10B981" stroke-width="11" stroke-linecap="round" />
      <path d="M80 78 L108 82 L102 116" stroke="#1E293B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 등 위 바벨 -->
      <line x1="68" y1="48" x2="112" y2="48" stroke="#0F172A" stroke-width="3" stroke-linecap="round" />
      <circle cx="88" cy="48" r="11" fill="#10B981" fill-opacity="0.25" stroke="#059669" stroke-width="3" />
      <path d="M128 54 V78 M128 78 V54" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow-barbell-back-squat)" />
    `, '#10B981'),

    // 11. 루마니안 데드리프트 / 罗马尼亚硬拉
    'romanian-deadlift': wrap(`
      <!-- 힙 힌지 자세 -->
      <circle cx="116" cy="48" r="8" fill="#0F172A" />
      <path d="M108 54 L76 68" stroke="#10B981" stroke-width="11" stroke-linecap="round" />
      <path d="M76 68 L84 94 L82 118" stroke="#1E293B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 내린 팔 & 바벨 -->
      <path d="M104 58 L102 96" stroke="#0F172A" stroke-width="6" stroke-linecap="round" />
      <circle cx="102" cy="100" r="11" fill="#10B981" fill-opacity="0.25" stroke="#059669" stroke-width="3" />
      <!-- 힙 힌지 화살표 -->
      <path d="M74 56 H54" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow-romanian-deadlift)" />
      <path d="M126 88 V64" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow-romanian-deadlift)" />
    `, '#10B981'),

    // 12. 숄더 프레스 머신 / 坐姿推肩机
    'shoulder-press-machine': wrap(`
      <!-- 머신 -->
      <rect x="40" y="28" width="16" height="92" rx="4" fill="#E2E8F0" stroke="#64748B" stroke-width="2" />
      <rect x="43" y="54" width="10" height="22" rx="2" fill="#0284C7" />
      <rect x="74" y="48" width="9" height="44" rx="4" fill="#334155" />
      <rect x="74" y="88" width="32" height="9" rx="4" fill="#334155" />
      <!-- 사람 -->
      <circle cx="92" cy="48" r="8" fill="#0F172A" />
      <path d="M90 58 L92 86" stroke="#0EA5E9" stroke-width="11" stroke-linecap="round" />
      <path d="M92 86 L116 86 L118 116" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 오버헤드 암 -->
      <path d="M56 32 L106 32" stroke="#64748B" stroke-width="3" stroke-linecap="round" />
      <path d="M92 60 L108 48 L106 32" stroke="#0F172A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M126 52 V28" stroke="#0EA5E9" stroke-width="2.5" marker-end="url(#arrow-shoulder-press-machine)" />
    `),

    // 13. 덤벨 숄더 프레스 / 哑铃推举
    'dumbbell-shoulder-press': wrap(`
      <!-- 인클라인/직각 벤치 -->
      <path d="M74 44 L80 90 H108" stroke="#334155" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="90" y1="90" x2="90" y2="120" stroke="#64748B" stroke-width="3.5" />
      <!-- 사람 -->
      <circle cx="92" cy="48" r="8" fill="#0F172A" />
      <path d="M90 58 L92 86" stroke="#10B981" stroke-width="11" stroke-linecap="round" />
      <path d="M92 86 L116 88 L118 116" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 양손 덤벨 위로 밀기 -->
      <path d="M84 60 L70 46 L72 28" stroke="#0F172A" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M98 60 L114 46 L112 28" stroke="#0F172A" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="64" y="23" width="16" height="6" rx="2.5" fill="#059669" />
      <rect x="104" y="23" width="16" height="6" rx="2.5" fill="#059669" />
      <path d="M132 52 V26" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow-dumbbell-shoulder-press)" />
    `, '#10B981'),

    // 14. 덤벨 사이드 레터럴 레이즈 / 哑铃侧平举
    'dumbbell-lateral-raise': wrap(`
      <!-- 정면 서있는 사람 + 양팔 옆으로 들기 -->
      <circle cx="90" cy="34" r="8.5" fill="#0F172A" />
      <path d="M90 46 V80" stroke="#10B981" stroke-width="14" stroke-linecap="round" />
      <path d="M84 82 L78 116 M96 82 L102 116" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" />
      <!-- 팔 옆으로 -->
      <path d="M81 50 L44 54" stroke="#0F172A" stroke-width="6" stroke-linecap="round" />
      <path d="M99 50 L136 54" stroke="#0F172A" stroke-width="6" stroke-linecap="round" />
      <rect x="34" y="48" width="10" height="12" rx="3" fill="#059669" />
      <rect x="136" y="48" width="10" height="12" rx="3" fill="#059669" />
      <path d="M40 76 C36 68, 36 62, 38 58" stroke="#10B981" stroke-width="2.3" marker-end="url(#arrow-dumbbell-lateral-raise)" />
      <path d="M140 76 C144 68, 144 62, 142 58" stroke="#10B981" stroke-width="2.3" marker-end="url(#arrow-dumbbell-lateral-raise)" />
    `, '#10B981'),

    // 15. 케이블 트라이셉스 푸시다운 / 绳索下压
    'cable-triceps-pushdown': wrap(`
      <!-- 케이블 타워 -->
      <rect x="38" y="20" width="14" height="100" rx="4" fill="#E2E8F0" stroke="#64748B" stroke-width="2" />
      <rect x="40" y="50" width="10" height="22" rx="2" fill="#0284C7" />
      <line x1="52" y1="24" x2="76" y2="24" stroke="#64748B" stroke-width="3" stroke-linecap="round" />
      <line x1="76" y1="24" x2="76" y2="76" stroke="#0284C7" stroke-width="2.5" />
      <!-- 서있는 사람 -->
      <circle cx="104" cy="36" r="8" fill="#0F172A" />
      <path d="M104 46 L108 82" stroke="#0EA5E9" stroke-width="11" stroke-linecap="round" />
      <path d="M108 82 L106 116" stroke="#1E293B" stroke-width="8" stroke-linecap="round" />
      <!-- 삼두 푸시다운 팔 -->
      <path d="M102 50 L98 66 L76 76" stroke="#0F172A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M64 62 V84" stroke="#0EA5E9" stroke-width="2.5" marker-end="url(#arrow-cable-triceps-pushdown)" />
    `),

    // 16. 덤벨 바이셉스 컬 / 哑铃二头弯举
    'dumbbell-biceps-curl': wrap(`
      <!-- 서있는 사람 + 컬 동작 -->
      <circle cx="88" cy="34" r="8.5" fill="#0F172A" />
      <path d="M88 44 V80" stroke="#10B981" stroke-width="11.5" stroke-linecap="round" />
      <path d="M88 80 L84 116 M90 80 L98 116" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" />
      <!-- 이두 컬 팔 -->
      <path d="M90 50 L90 70 L110 54" stroke="#0F172A" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="104" y="47" width="16" height="7" rx="2.5" transform="rotate(-20 104 47)" fill="#059669" />
      <path d="M116 74 C124 64, 124 54, 118 46" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow-dumbbell-biceps-curl)" />
    `, '#10B981'),

    // 17. 이지바 프리처 컬 / 牧师凳弯举
    'preacher-curl': wrap(`
      <!-- 프리처 벤치 -->
      <rect x="52" y="88" width="24" height="9" rx="4" fill="#334155" />
      <line x1="64" y1="97" x2="64" y2="120" stroke="#64748B" stroke-width="3.5" />
      <path d="M86 58 L108 78" stroke="#334155" stroke-width="10" stroke-linecap="round" />
      <line x1="98" y1="74" x2="98" y2="120" stroke="#64748B" stroke-width="3.5" />
      <!-- 앉은 사람 -->
      <circle cx="70" cy="44" r="8" fill="#0F172A" />
      <path d="M70 54 L66 86" stroke="#10B981" stroke-width="11" stroke-linecap="round" />
      <path d="M66 86 L84 90 L82 116" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 팔 & 바 -->
      <path d="M74 56 L96 66 L110 48" stroke="#0F172A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="112" cy="46" r="7" fill="#10B981" fill-opacity="0.3" stroke="#059669" stroke-width="2.5" />
      <path d="M122 68 C126 58, 124 48, 118 40" stroke="#10B981" stroke-width="2.3" marker-end="url(#arrow-preacher-curl)" />
    `, '#10B981'),

    // 18. 복근 크런치 머신 / 坐姿卷腹机
    'ab-crunch-machine': wrap(`
      <!-- 머신 -->
      <rect x="38" y="28" width="16" height="92" rx="4" fill="#E2E8F0" stroke="#64748B" stroke-width="2" />
      <rect x="41" y="54" width="10" height="22" rx="2" fill="#0284C7" />
      <rect x="74" y="88" width="32" height="9" rx="4" fill="#334155" />
      <line x1="90" y1="97" x2="90" y2="120" stroke="#64748B" stroke-width="3.5" />
      <!-- 사람 (상체 앞으로 말기) -->
      <circle cx="102" cy="46" r="8" fill="#0F172A" />
      <path d="M98 54 C92 64, 88 74, 88 86" stroke="#0EA5E9" stroke-width="11" stroke-linecap="round" />
      <path d="M88 86 L116 86 L116 116" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M96 56 L108 50 L106 38" stroke="#0F172A" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M114 48 C124 54, 128 66, 124 76" stroke="#0EA5E9" stroke-width="2.5" marker-end="url(#arrow-ab-crunch-machine)" />
    `),

    // 19. 행잉 레그 레이즈 / 悬垂举腿
    'hanging-leg-raise': wrap(`
      <!-- 치닝 디핑 / 캡틴스 체어 프레임 -->
      <path d="M58 24 V120 M58 24 H98" stroke="#64748B" stroke-width="3.5" stroke-linecap="round" />
      <rect x="64" y="48" width="8" height="32" rx="3" fill="#334155" />
      <!-- 사람 (팔 지지 + 다리 들어올리기) -->
      <circle cx="80" cy="36" r="8" fill="#0F172A" />
      <path d="M78 46 V78" stroke="#10B981" stroke-width="11" stroke-linecap="round" />
      <path d="M78 52 L94 52" stroke="#0F172A" stroke-width="5.5" stroke-linecap="round" />
      <!-- 다리 앞으로 들어올림 -->
      <path d="M80 78 L122 72" stroke="#1E293B" stroke-width="8" stroke-linecap="round" />
      <path d="M108 102 C122 96, 128 86, 128 74" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow-hanging-leg-raise)" />
    `, '#10B981'),

    // 20. 덤벨 런지 / 哑铃箭步蹲
    'dumbbell-lunge': wrap(`
      <!-- 런지 자세 -->
      <circle cx="90" cy="34" r="8" fill="#0F172A" />
      <path d="M90 44 V78" stroke="#10B981" stroke-width="11" stroke-linecap="round" />
      <!-- 앞다리 & 뒷다리 -->
      <path d="M90 78 L116 80 L116 116" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M88 78 L64 98 L50 116" stroke="#475569" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 양손 덤벨 -->
      <path d="M88 50 L86 84" stroke="#0F172A" stroke-width="5.5" stroke-linecap="round" />
      <rect x="78" y="84" width="16" height="6" rx="2.5" fill="#059669" />
      <path d="M134 54 V78" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow-dumbbell-lunge)" />
    `, '#10B981'),

    // 21. 케이블 페이스 풀 / 绳索面拉
    'cable-face-pull': wrap(`
      <!-- 케이블 타워 -->
      <rect x="34" y="20" width="14" height="100" rx="4" fill="#E2E8F0" stroke="#64748B" stroke-width="2" />
      <rect x="36" y="54" width="10" height="20" rx="2" fill="#0284C7" />
      <line x1="48" y1="38" x2="94" y2="38" stroke="#0284C7" stroke-width="2.5" />
      <!-- 서있는 사람 -->
      <circle cx="114" cy="36" r="8" fill="#0F172A" />
      <path d="M114 46 L118 82" stroke="#0EA5E9" stroke-width="11" stroke-linecap="round" />
      <path d="M118 82 L114 116 M120 82 L128 116" stroke="#1E293B" stroke-width="7.5" stroke-linecap="round" />
      <!-- 얼굴 쪽으로 당기는 팔 -->
      <path d="M112 50 L98 40 L94 38" stroke="#0F172A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M76 26 H100" stroke="#0EA5E9" stroke-width="2.5" marker-end="url(#arrow-cable-face-pull)" />
    `),

    // 22. 케틀벨 고블릿 스쿼트 / 壶铃高脚杯深蹲
    'kettlebell-goblet-squat': wrap(`
      <!-- 스쿼트 내려간 자세 -->
      <circle cx="96" cy="46" r="8" fill="#0F172A" />
      <path d="M94 56 L78 82" stroke="#10B981" stroke-width="11" stroke-linecap="round" />
      <path d="M78 82 L106 84 L102 116" stroke="#1E293B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 가슴 앞 케틀벨 -->
      <path d="M92 58 L108 66" stroke="#0F172A" stroke-width="6" stroke-linecap="round" />
      <circle cx="114" cy="68" r="7.5" fill="#059669" />
      <path d="M111 61 C111 56, 117 56, 117 61" stroke="#059669" stroke-width="2.5" />
      <path d="M132 58 V82" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow-kettlebell-goblet-squat)" />
    `, '#10B981')
  };

  return drawings[id] || wrap(`<circle cx="90" cy="70" r="24" fill="#E2E8F0" />`);
};

