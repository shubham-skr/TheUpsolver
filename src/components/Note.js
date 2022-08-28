import React, { useState } from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import styled from 'styled-components';

const NoteBtn = styled.div`
  cursor: pointer;
  font-size: 1.3em;
`;

const Note = ({ id, noteText }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <div>
      <NoteBtn id={id} onClick={toggle}>
        <i class='fa-solid fa-file'></i>
      </NoteBtn>
      <Popover placement='top' isOpen={open} target={id} toggle={toggle}>
        <PopoverBody>{noteText}</PopoverBody>
      </Popover>
    </div>
  );
};

export default Note;
