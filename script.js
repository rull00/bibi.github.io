const card = document.getElementById('card');
const btn = document.getElementById('toggleBtn');

function setExpanded(isOpen) {
  card.classList.toggle('open', isOpen);
  card.setAttribute('aria-expanded', String(isOpen));
  btn.setAttribute('aria-expanded', String(isOpen));
  btn.textContent = isOpen ? '닫기' : '열어보기';

  if (isOpen) {
    const cardRect = card.getBoundingClientRect();
    const cover = card.querySelector('.cover');
    const inside = card.querySelector('.inside');

    // 위 덮개 하단과 안쪽 면 상단 계산
    const coverBottom = cardRect.top + cover.getBoundingClientRect().height;
    const insideTop = cardRect.top + cover.getBoundingClientRect().height; // 실제 top은 동일
    const middleY = (coverBottom + insideTop) / 2;

    const screenCenter = window.innerHeight / 2;

    // 카드 전체 높이가 화면보다 크면 스케일 조절
    const cardHeight = cardRect.height;
    let scale = 0.95;
    if(cardHeight > window.innerHeight * 0.9) {
      scale = (window.innerHeight * 0.9) / cardHeight;
    }

    const deltaY = middleY - screenCenter;
    card.style.transform = `translateY(${deltaY}px) scale(${scale})`;
    card.style.perspectiveOrigin = 'center center';
  } else {
    card.style.transform = '';
    card.style.perspectiveOrigin = 'top center';
  }
}

function toggle() { setExpanded(!card.classList.contains('open')); }

card.addEventListener('click', toggle);
btn.addEventListener('click', toggle);

// 키보드 접근성
card.setAttribute('tabindex', '0');
card.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggle();
  }
});

// 이미지 미리 로드
['front.jpg','inside.jpg','back.jpg'].forEach(src => {
  const img = new Image();
  img.src = src;
});

// 페이지 로드 후 살짝 보여주기
setTimeout(() => setExpanded(true), 600);
setTimeout(() => setExpanded(false), 2400);

// 창 크기 변경 시 중앙 유지
window.addEventListener('resize', () => {
  if(card.classList.contains('open')) setExpanded(true);
});

