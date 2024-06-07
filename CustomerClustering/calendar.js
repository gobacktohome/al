const calendarElement = document.getElementById('calendar');

function renderCalendar() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    let html = '<table>';

    // 테이블 헤더
    html += `<thead><tr><b>${currentMonth + 1}월</b></tr><tr>`;
    html += '<th style="color: red;">일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th style="color: blue;">토</th>';
    html += '</tr></thead>';

    // 테이블 바디
    html += '<tbody><tr>';

    let dayCount = 1;
    let dayOfWeek = firstDayOfMonth;

    // 첫째 주의 공백 채우기
    for (let i = 0; i < firstDayOfMonth; i++) {
        html += '<td></td>';
    }

    // 날짜 채우기
    while (dayCount <= daysInMonth) {
        // 토요일(6)일 때 파란색, 일요일(0)일 때 빨간색으로 스타일 지정
        if (dayOfWeek === 6) {
            html += `<td style="color: blue;">${dayCount}</td>`;
        } else if (dayOfWeek === 0) {
            html += `<td style="color: red;">${dayCount}</td>`;
        } else {
            html += `<td>${dayCount}</td>`;
        }

        // 다음 날짜로 이동
        dayCount++;
        dayOfWeek = (dayOfWeek + 1) % 7;

        // 주가 바뀌면 새로운 행 추가
        if (dayOfWeek === 0 && dayCount <= daysInMonth) {
            html += '</tr><tr>';
        }
    }

    html += '</tbody></table>';

    calendarElement.innerHTML = html;
}

renderCalendar();