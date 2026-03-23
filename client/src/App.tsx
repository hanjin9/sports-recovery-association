import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Board from "./pages/Board";
import Community from "./pages/Community";
import SkillGuide from "./pages/SkillGuide";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";
import Membership from "./pages/Membership";
import Appointments from "./pages/Appointments";
import PaymentSuccess from "./pages/PaymentSuccess";

function Router() {
  return (
    <Switch>
      <Route path="/"               component={Home} />
      <Route path="/login"          component={Login} />
      <Route path="/board"          component={Board} />
      <Route path="/community"      component={Community} />
      <Route path="/skill-guide"    component={SkillGuide} />
      <Route path="/admin"          component={AdminDashboard} />
      <Route path="/profile"        component={UserProfile} />
      <Route path="/membership"     component={Membership} />
      <Route path="/appointments"   component={Appointments} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route path="/404"            component={NotFound} />
      <Route                        component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
