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
  HeaderTitle,
  HeaderActions,
  HeaderAction,
} from "@midas-ds/layout";
import {
  ArrowLeftRight,
  Search,
  LayoutDashboard,
  ListTodo,
  FlaskConical,
  Bell,
  Languages,
  User,
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
        <HeaderTitle>Min specialsida</HeaderTitle>
        <HeaderActions>
          <HeaderAction icon={<Bell size={20} />}>Aviseringar</HeaderAction>
          <HeaderAction icon={<Languages size={20} />}>English</HeaderAction>
          <HeaderAction icon={<User size={20} />}>Logga ut</HeaderAction>
        </HeaderActions>
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
