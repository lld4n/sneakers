import React from 'react';
import FooterTop from './FooterTop';
import '../scss/Footer.scss';
import FooterBottom from './FooterBottom';

export default function Footer() {
  return (
    <footer className="footer">
      <FooterTop />
      <FooterBottom />
    </footer>
  );
}
