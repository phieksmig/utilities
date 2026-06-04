import "./App.css";
import { Outlet } from "react-router";
import {
  Layout,
  LayoutContent,
  Main,
  Header,
  Sidebar,
  Navigation,
  NavigationItem,
} from "@midas-ds/layout";
import {
  ArrowLeftRight,
  Search,
  LayoutDashboard,
  ListTodo,
} from "lucide-react";
import { NavLink } from "./components/NavLink";
import { LogoComponent } from "./components/Logo";
import { GlobalToastRegion } from "@midas-ds/components";
import { DetailsPanel } from "./components/DetailsPanel";
import { useState } from "react";

function App() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const openDetails = () => setIsDetailsOpen(true);

  return (
    <Layout>
      <Header>
        <LogoComponent />
      </Header>

      <LayoutContent>
        <Sidebar title="Navigation">
          <Navigation>
            <NavigationItem>
              <NavLink path="/" icon={<LayoutDashboard />}>
                Översikt
              </NavLink>
            </NavigationItem>
            <NavigationItem>
              <NavLink path="/todo" icon={<ListTodo />}>
                Att göra
              </NavLink>
            </NavigationItem>
            <NavigationItem>
              <NavLink path="/pixeltorem" icon={<ArrowLeftRight />}>
                Pixel to REM
              </NavLink>
            </NavigationItem>
            <NavigationItem>
              <NavLink path="/tokenfinder" icon={<Search />}>
                Token Finder
              </NavLink>
            </NavigationItem>
          </Navigation>
        </Sidebar>

        <Main>
          <GlobalToastRegion />
          <Outlet context={{ openDetails }} />
        </Main>
        <DetailsPanel isOpen={isDetailsOpen} onOpenChange={setIsDetailsOpen} />
      </LayoutContent>
    </Layout>
  );
}

export default App;
