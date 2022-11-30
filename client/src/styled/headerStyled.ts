import styled from "styled-components";

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 50px;
  }
`;

export const RightNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  height: 50%;
  &ul.ant-menu-overflow {
    background: ${(props) => props.theme.colors.background};
  }
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;
