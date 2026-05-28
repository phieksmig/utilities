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
import { ArrowLeftRight, Search, PencilRuler, Home } from "lucide-react";
import { NavLink } from "./components/NavLink";
import { LogoComponent } from "./components/Logo";
import { GlobalToastRegion } from "@midas-ds/components";

function App() {
  return (
    <Layout>
      <Header>
        <LogoComponent />
      </Header>

      <LayoutContent>
        <Sidebar title="Navigation">
          <Navigation>
            <NavigationItem>
              <NavLink path="/" icon={<Home />}>
                Hem
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
          <Outlet />
        </Main>
      </LayoutContent>
    </Layout>
  );
}

export default App;
