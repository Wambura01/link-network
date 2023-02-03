import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Routes from "./Routes";

function App() {
  AOS.init();

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
