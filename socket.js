// 웹소켓 저장 변수
let socket = null;

function connectToWebSocket() {
    // 이미 연결된 웹소켓이 있다면 연결 해제
    if (socket) {
        disconnectFromWebSocket();
    }

    // 웹소켓 연결
    let ip = document.getElementById('socketIP').value;
    let port = document.getElementById('socketPort').value;
    socket = io.connect('http://' + ip + ':' + port);

    // 웹소켓이 연결 되었을 때
    socket.on('connect', function() {
        document.getElementById('levelDisplay').innerText = ip + ':' + port + ' 연결';
        console.log('Connected to Server');
    });

    // 웹소켓이 연결 해제되었을 때
    socket.on('disconnect', function() {
        document.getElementById('levelDisplay').innerText = ip + ':' + port + ' 연결 해제';
        console.log('Disconnected from Server');
    });

    // 에러 발생시
    socket.on('error', function(err) {
        document.getElementById('levelDisplay').innerText = ip + ':' + port + ' 연결 실패';
        console.error('Error:', err);
    });

    // CCTV에 위험도 요청 받기
    socket.on('sendWarning', function(level) {
        console.log('Received warning: ' + level);
        if (level == -1) {
            disconnectFromWebSocket();
        } else {
            document.getElementById('levelDisplay').innerText = '경고 수준: ' + level;
        }
            
    });
}

// 웹소켓 연결 해제
function disconnectFromWebSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}

// CCTV에 위험도 요청 하기
function getWarning() {
    if (socket) {
        socket.emit('get_warning');
    } else {
        document.getElementById('levelDisplay').innerText = '웹소켓 연결 안됨';
    }
}
