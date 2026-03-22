#!/bin/bash
# 3000 포트 점유 프로세스 종료
fuser -k 3000/tcp || true
# 3000 포트로 고정 실행
PORT=3000 NODE_ENV=development tsx watch server/_core/index.ts
