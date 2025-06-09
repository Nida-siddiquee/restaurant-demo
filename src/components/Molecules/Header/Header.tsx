import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import LogoSVG from '@/assets/logo.svg';
import Pin from '@/assets/pin.svg';
import { HeaderWrapper, LogoContainer, PostcodeInfo } from './Header.styled';

const Header: React.FC = () => {
  const selectedPostcode = useSelector((state: RootState) => state.postcodes.selected);

  return (
    <HeaderWrapper>
      <LogoContainer>
        <img src={LogoSVG} alt="logo" />
      </LogoContainer>
      {selectedPostcode && (
        <PostcodeInfo to="/">
          <img src={Pin} alt="Pin icon" />
          {selectedPostcode ? <span>{selectedPostcode.label}</span> : <span>Select Area</span>}
        </PostcodeInfo>
      )}
    </HeaderWrapper>
  );
};

export default Header;
