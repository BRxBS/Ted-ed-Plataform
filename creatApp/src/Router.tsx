import { Route,Routes } from "react-router-dom";
import { Event } from "./pages/Event";
import { ConogramaAulas } from "./components/ConogramaAulas";
import { Subscribe } from "./pages/Subscribe";

export function Router(){
    return (
      <Routes>
        <Route path="/" element={<Subscribe />} />
        <Route path="/event" element={<Event />} />
        <Route path="/event/bar" element={<ConogramaAulas />} />
        <Route path="/event/lesson/:slug" element={<Event />} />
      </Routes>
    );
}