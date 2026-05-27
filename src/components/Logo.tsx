import Logo from "../assets/MIDAS_crown.png";

export const LogoComponent = () => {
  return (
    <img
      src={Logo}
      alt="Midas Logo"
      style={{ width: "100px", height: "100px" }}
    />
  );
};
