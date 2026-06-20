import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import TopicGenerator from "./pages/TopicGenerator/TopicGenerator";
import ResearchQuestions from "./pages/ResearchQuestions/ResearchQuestions";
import ChapterOutline from "./pages/ChapterOutline/ChapterOutline";
import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/History/History";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
      }
    />
        <Route
          path="/topic-generator"
          element={
        <ProtectedRoute>
        <TopicGenerator />
        </ProtectedRoute>
     }
    />
         <Route
            path="/research-questions"
            element={
          <ProtectedRoute>
          <ResearchQuestions />
          </ProtectedRoute>
      }
    />
        <Route
            path="/chapter-outline"
            element={
          <ProtectedRoute>
          <ChapterOutline />
          </ProtectedRoute>
  }
/>
        <Route
            path="/history"
            element={
          <ProtectedRoute>
          <History />
          </ProtectedRoute>
  }
/>
        <Route
            path="/profile"
            element={
          <ProtectedRoute>
          <Profile />
          </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;