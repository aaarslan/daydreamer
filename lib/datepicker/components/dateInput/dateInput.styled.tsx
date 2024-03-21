import { styled } from "@linaria/react";

export const DateInputContainer = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: var(--date-input-bg-color);
  box-shadow: var(--date-input-box-shadow);
  font-size: 1rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  user-select: none;
  cursor: text;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  color: var(--font-color-default);
  min-height: 44px;
`;

export const DateInputSeparator = styled.span`
  color: var(--placeholder-color);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
`;

export const DateInputButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover, &:focus {
    background-color: var(--datepicker-today-hover);
    color: var(--datepicker-today-text-hover);
    outline: none;
  }
  &:active {
    color: var(--selected-day-bg-color);
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
  }
`;

export const DateInputElement = styled.input`
  border: none;
  font-size: 1rem;
  transition: color 0.2s ease;
  min-width: 60px;
  &:focus {
    outline: 2px solid var(--focus-outline-color);
  }
`;
