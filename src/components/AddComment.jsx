import { useState } from "react";
import Box from "./Box";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import AddCommentDialog from "./AddCommentDialog";
import { useParams } from "react-router-dom";
import useCreateComment from "hooks/commentService/useCreateComment";

export default function AddComment({ handleChanged }) {
  let { movieId } = useParams();
  const [open, setOpen] = useState(false);
  const createComment = useCreateComment({ movieId });

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSave = async (input) => {
    await createComment.mutate({ movieId, text: input });
    setOpen(false);
    handleChanged();
  };

  return (
    <>
      <StyledBox onClick={handleOpenDialog}>
        <AddIconStyled />
        <Text>Napisite recenziju</Text>
      </StyledBox>
      <AddCommentDialog open={open} handleClose={handleCloseDialog} handleClick={handleSave} />
    </>
  );
}

const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 275px;
`;
const AddIconStyled = styled(AddIcon)`
  width: 1.4em !important;
  height: 1.4em !important;
  color: var(--secondary-color);
`;
const Text = styled.p`
  color: var(--secondary-color);
  font-size: 1.1rem;
  font-weight: 500;
`;
