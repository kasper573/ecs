import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import styled from "styled-components";

export type ConsoleProps = React.HTMLAttributes<HTMLDivElement> & {
  onCommand: (command: string) => void;
};

export const Console = ({ children, onCommand, ...props }: ConsoleProps) => {
  const [command, setCommand] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCommand(e.target.value);
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onCommand(command);
      setCommand("");
    }
  };
  return (
    <Container {...props}>
      {children}
      <br />
      <InputFieldContainer>
        {"> "}
        <InputField
          autoFocus
          value={command}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={(e) => e.target.focus()}
        />
      </InputFieldContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  box-sizing: border-box;
  white-space: pre;
`;

const InputFieldContainer = styled.div`
  display: flex;
  margin-top: 10px;
  line-height: 20px;
`;

const InputField = styled.input`
  background-color: inherit;
  color: inherit;
  border: none;
  outline: none;
  font: inherit;
`;
