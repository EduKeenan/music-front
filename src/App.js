import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { Playlists } from "./components/Playlists/playlists";
import { Login } from "./components/Login/login";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { Usuarios } from "./components/Usuarios/usuarios";
import { AdicionarUsuario } from "./components/Usuarios/adicionarUsuario";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/adicionarUsuario" element={<AdicionarUsuario />} />
          <Route exact element={<PrivateRoutes />}>
            <Route path="/*" element={<Playlists />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/usuarios" element={<Usuarios />} />
          </Route>
          {/* <Route path="/cadastro" element={AdicionarPlaylist} isAuthenticated={isAuthenticated} /> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
