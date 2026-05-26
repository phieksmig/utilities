import { Link, useMatch } from "react-router";
import { NavigationLink } from "@midas-ds/layout";

type NavLinkProps = {
  path: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export function NavLink({ path, icon, children }: NavLinkProps) {
  const match = useMatch(path);
  return (
    <NavigationLink as={Link} to={path} icon={icon} isActive={!!match}>
      {children}
    </NavigationLink>
  );
}
