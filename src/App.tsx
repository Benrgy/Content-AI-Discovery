import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appRoutes } from "@/constants/routes"; // Import from new constants file
import Layout from "./components/Layout";
import Providers from "./components/Providers";

const App = () => (
  <Providers>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </Providers>
);

export default App;