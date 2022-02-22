import styled from "styled-components";

export const Container = styled.header`
  height: 5rem;
  border-bottom: 1px solid var(--gray-700);

  div {
    max-width: 1120px;
    height: 5rem;
    margin: 0 auto;
    padding: 0 2rem;

    display: flex;
    align-items: center;

    nav {
      margin-left: 5rem;
      height: 5rem;

      a {
        display: inline-block;
        position: relative;
        height: 5rem;
        line-height: 5rem;
        color: var(--gray-300);
        transition: color 0.2s;

        &:hover {
          color: var(--white);
        }

        &.active::after {
          content: "";
          height: 3px;
          width: 100%;
          border-radius: 3px 3px 0 0;
          background: var(--yellow-500);
          position: absolute;
          bottom: 1px;
          left: 0;
        }

        &.active {
          color: var(--white);
          font-weight: bold;
        }

        & + a {
          margin-left: 2rem;
        }
      }
    }
  }
`;
