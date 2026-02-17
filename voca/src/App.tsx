import CreateDay from './component/CreateDay';
import CreateWord from './component/CreateWord';
import Day from './component/Day';
import DayList from './component/DayList';
import EmptyPage from './component/EmptyPage';
import Header from './component/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// BrowserRouter: 앱을 SPA 라우팅 시스템으로 만들어줌(url 기반으로 동작)
// Routes(React Router v6부터 등장): 내부 = url에 따라 각각 다른 페이지 노출, 외부 = 모든 페이지에 공통으로 노출(ex. 헤더, 푸터)

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<DayList />} />
          <Route path="/day/:day" element={<Day />} />
          <Route path="/create_word" element={<CreateWord />} />
          <Route path="/create_day" element={<CreateDay />} />
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
