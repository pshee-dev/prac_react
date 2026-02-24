## Clean Architecture
비즈니스 로직을 UI, 프레임워크, 데이터베이스 같은 외부 기술로부터 분리하는 설계 방식

의존성이 바깥에서 안으로만 흐르게 하여(Dependency Rule) 기술이 바뀌어도 핵심 로직은 영향받지 않도록 만드는 것


### React + TypeScript 프로젝트 설치
```bash
npm create vite@latest
```
1. 프로젝트명 설정
2. framework 설정 (React)
3. variant 설정 (TypeScript)
4. Use Vite 8 beta 설정 X

### React Router 라이브러리 설치
```bash
npm install react-router-dom
```
