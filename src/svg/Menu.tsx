import React, { FC } from "react";

interface MenuProps {
  className?: string;
  active: boolean;
  onClick?: () => void;
}

const Menu: FC<MenuProps> = ({ className, active, onClick }) => {
  if (active) {
    return (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        className={className}
        onClick={onClick}
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M7.19995 16.8L16.8 7.19995'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.8 16.8L7.19995 7.19995'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  } else {
    return (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        className={className}
        onClick={onClick}
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M5 7H19'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M5 12H19'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M5 17H19'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  }
};

export default Menu;
