import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home} from "./pages/home.js";
import {Auth} from "./pages/auth.js";
import {CreateRecipe} from "./pages/createRecipe.js";
import {SavedRecipes} from "./pages/savedRecipes.js";
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/createRecipe" element={<CreateRecipe />} />
          <Route path="/savedRecipes" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
