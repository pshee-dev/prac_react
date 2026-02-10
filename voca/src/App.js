import './App.css';
import Hello from './component/Hello';
import Welcome from './component/Welcome';
import styles from './App.module.css'

function App() {
  return (
    <div className="App">
      {/* 동일한 컴포넌트여도 state는 각각 관리됨 */}
      <Hello />
      <Hello />
      <Hello />
    </div>
  );
}

export default App;
