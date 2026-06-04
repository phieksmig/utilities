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
  PanelProvider,
  PanelRegion,
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

function App() {
  return (
    <PanelProvider panelBehavior="pop-to">
      {/* This will be replaced with "replace" in the next version of Midas Layout */}
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
            <Outlet />
          </Main>
          <PanelRegion />
        </LayoutContent>
      </Layout>
    </PanelProvider>
  );
}

export default App;
