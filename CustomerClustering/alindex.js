// 로그인 처리 함수
function handleLogin(event) {
    event.preventDefault(); // 폼 제출 기본 동작 막기

    // 사용자 입력 값 가져오기
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 사용자 이름과 비밀번호 확인
    if (username === '1111' && password === '0000') {
        alert('로그인 성공');
        document.getElementById('login-error').textContent = '';
        document.getElementById('login-box').innerHTML = '<h2>환영합니다, 백석대님!</h2>';
    } else {
        document.getElementById('login-error').textContent = '잘못된 사용자 이름 또는 비밀번호입니다.';
    }
}
window.onload = function () {
    document.getElementById("intro").style.display = "block";
    document.getElementById("avg").style.display = "none";
    document.getElementById("process").style.display = "none";
}
function showIntro() {
    document.getElementById("intro").style.display = "block";
    document.getElementById("avg").style.display = "none";
    document.getElementById("process").style.display = "none";
}
function showAvg() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("avg").style.display = "block";
    document.getElementById("process").style.display = "none";
}
function showProcess() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("avg").style.display = "none";
    document.getElementById("process").style.display = "block";
}
function runClustering() {
    fetch('/run-clustering')
        .then(response => response.json())
        .then(data => {
            const img = document.createElement('img');
            img.src = 'data:image/png;base64,' + data.plot_url;
            document.getElementById('result').appendChild(img);
        })
        .catch(error => console.error('Error:', error));
}