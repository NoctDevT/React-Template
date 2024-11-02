import React from 'react';
import { Link } from 'react-router-dom';

interface UiLayoutProps {
  links: { label: string; path: string }[];
  children: React.ReactNode;
}

export const UiLayout: React.FC<UiLayoutProps> = ({ links, children }) => {
  return (
    <div>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};
