import { useState } from "react";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import HomePage from "./pages/HomePage.tsx";

function App() {
  const [activeModalFromHeader, setActiveModalFromHeader] = useState<
    string | null
  >(null);

  return (
    <>
      <Header onModalOpen={setActiveModalFromHeader} />
      <HomePage
        externalModal={activeModalFromHeader}
        onCloseExternalModal={() => setActiveModalFromHeader(null)}
      />
      <Footer />
    </>
  );
}

export default App;
