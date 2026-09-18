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
  Navbar,
} from "@midas-ds/layout";
import {
  ArrowLeftRight,
  Search,
  LayoutDashboard,
  ListTodo,
  FlaskConical,
} from "lucide-react";
import { NavLink } from "./components/NavLink";
import { HeaderLogo } from "./components/HeaderLogo";
import { GlobalToastRegion } from "@midas-ds/components";
import { DetailsPanel } from "./components/DetailsPanel";
import { useState } from "react";

function App() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const openDetails = () => setIsDetailsOpen(true);

  return (
    <Layout>
      <Header>
        <HeaderLogo />
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
            <NavigationItem>
              <NavLink path="/demo" icon={<FlaskConical />}>
                Demosida
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
      <Navbar>
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
          <NavigationItem>
            <NavLink path="/demo" icon={<FlaskConical />}>
              Demosida
            </NavLink>
          </NavigationItem>
        </Navigation>
      </Navbar>
    </Layout>
  );
}

export default App;
