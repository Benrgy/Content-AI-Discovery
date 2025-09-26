"use client";

import MadeWithDyad from "./made-with-dyad";

const Footer = (): JSX.Element => { // Added explicit return type
  return (
    <footer className="py-4">
      <MadeWithDyad />
    </footer>
  );
};

export default Footer;