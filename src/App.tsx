import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import HomePage from "./pages/HomePage.tsx";
import LessonsPage from "./pages/LessonsPage.tsx";
import LessonDetailPage from "./pages/LessonDetailPage.tsx";
import { ProgressProvider } from "./contexts/ProgressContext.tsx";

function App() {
  const [activeModalFromHeader, setActiveModalFromHeader] = useState<
    string | null
  >(null);

  return (
    <ProgressProvider>
      <BrowserRouter>
        <Header onModalOpen={setActiveModalFromHeader} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                externalModal={activeModalFromHeader}
                onCloseExternalModal={() => setActiveModalFromHeader(null)}
              />
            }
          />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lesson/:id" element={<LessonDetailPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ProgressProvider>
  );
}

export default App;
