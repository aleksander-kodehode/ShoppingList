import styled from "styled-components";
import { AppContainer } from "./appStyled";

export const TrashContainer = styled(AppContainer)`
  & .ant-list-item {
    & button.recover {
      & svg {
        transition: transform 350ms cubic-bezier(0.215, 0.61, 0.355, 1);
      }
      :hover {
        & svg {
          transform: rotate(-180deg);
        }
      }
    }
  }
`;
