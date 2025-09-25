import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes";
import Layout from "./components/Layout";
import Providers from "./components/Providers"; // Import the new Providers component

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