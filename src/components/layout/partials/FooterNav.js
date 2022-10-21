import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="button button-primary button-wide-mobile button-sm">
        <li>
          <Link to="https://discord.gg/fhZeRhEFPn">Servidor de Soporte</Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;