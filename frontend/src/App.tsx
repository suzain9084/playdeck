import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlayGame from "./pages/PlayGame";
import { useIsMobile } from "./hooks/use-mobile";
import { useDispatch } from "react-redux";
import { setIsMobile } from "./lib/appState";
import { AppDispatch } from "./lib/store";
import MobileCodeInput from "./pages/Mobile/mobileCodeInput";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useIsMobile();
  dispatch(setIsMobile(isMobile));

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index/>} />
          <Route path="/playgames" element={isMobile ? <MobileCodeInput /> : <PlayGame />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
