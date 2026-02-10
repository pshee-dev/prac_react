import './App.css';

function App() {
  const name = "React";
  const naver = {
    name: "네이버",
    url: "https://naver.com",
  };
  return (
    <div className="App">
      <h1 
        style={{
          color: "#333",
          backgroundColor: "#f5f5f5"
        }}>
          Hello, {name}!
          <p>{2+3}</p>
        </h1>
        <a href={naver.url}>{naver.name}</a>
    </div>
  );
}

export default App;
