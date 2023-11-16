from flask import Flask
from flask_socketio import SocketIO
from random import randint
import sys

app = Flask(__name__)
app.secret_key = 'secret'
socketio = SocketIO(app, cors_allowed_origins="*")
# 여기에 모델 로딩 model = ...


def get_warning_level():
    return randint(-1, 2) # 여기서 모델 예측 결과를 반환(-1은 범위 벗어남)

# 클라이언트로부터 위험도 요청 받음
@socketio.on('get_warning')
def get_warning():
    level = get_warning_level()
    print('get warning :', level)
    socketio.emit('sendWarning', level)


# 실행 및 커맨드라인 처리
def main(argv):
    if len(argv) == 1:
        socketio.run(app, host='0.0.0.0', port=5000)
    elif len(argv) == 2:
        address = argv[1].split(':')
        socketio.run(app, host=address[0], port=address[1])


if __name__ == '__main__':
    main(sys.argv)
