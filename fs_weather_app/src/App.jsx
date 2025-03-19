import './App.css';
import Weather from './components/Weather';
import NavBar from "./components/NavBar/index.jsx";
import Footer from "./components/Footer/index.jsx";

function App() {
    return (
        <div>
            <NavBar/>
            <div className="App">
                <Weather/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;