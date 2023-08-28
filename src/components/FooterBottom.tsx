import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterBottom() {
  return (
    <div className="footer__bottom">
      <Link to="">
        <div className="footer__bottom-logo">sneakers</div>
      </Link>
      <div className="footer__bottom-credits">
        created by <a href="https://google.com">lldan</a>
      </div>
    </div>
  );
}
