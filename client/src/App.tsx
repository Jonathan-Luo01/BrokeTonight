import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DiscoveryPage } from '@/pages/DiscoveryPage';
import { SharedPlanPage } from '@/pages/SharedPlanPage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<DiscoveryPage initialMode="cards" />} />
        <Route path="/chat" element={<DiscoveryPage initialMode="chat" />} />
        <Route path="/share" element={<SharedPlanPage />} />
      </Routes>
    </BrowserRouter>
  );
}
