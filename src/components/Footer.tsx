"use client";

import { MadeWithDyad } from "./made-with-dyad";

const Footer = () => { // Removed React.FC
  return (
    <footer className="py-4">
      <MadeWithDyad />
    </footer>
  );
};

export default Footer;