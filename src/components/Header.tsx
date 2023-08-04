import React from 'react';
import Navigation from './Navigation';

const navItems = [
  { label: 'Home', link: '/' },
  { label: 'Blog', link: '/blog' },
  { label: 'About', link: '/about' },
];

const Header = () => {
  return (
    <header>
      <Navigation navLinks={navItems} />
    </header>
  );
};

export default Header;
