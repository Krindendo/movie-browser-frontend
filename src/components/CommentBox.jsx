import { useState } from "react"
import Box from "./Box"
import styled from "styled-components"
import { formatDate } from "helper/formatDate"
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from "@mui/icons-material/Edit"
import { commentService } from "services/comment.service"
import AddCommentDialog from "./AddCommentDialog"

export default function CommentBox({ comment }) {
  const [open, setOpen] = useState(false)

  const handleOpenDialog = () => {
    setOpen(true)
  }
  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleEdit = (input) => {
    commentService.updateComment(comment._id, { text: input })
    setOpen(false)
  }
  const handleDelete = () => {
    commentService.deleteComment(comment._id)
  }

  if (comment) {
    return (
      <>
        <StyledBox>
          <Text>{formatDate(new Date(comment.date))}</Text>
          <Text>{comment.name}</Text>
          <SubText>{comment.text}</SubText>
          <EditIconStyled onClick={handleOpenDialog} />
          <CloseIconStyled onClick={handleDelete} />
        </StyledBox>
        <AddCommentDialog open={open} handleClose={handleCloseDialog} handleClick={handleEdit} />
      </>
    )
  }
  return <></>
}

const StyledBox = styled(Box)`
  width: 275px;
  position: relative;
`
const Text = styled.p`
  margin: 0;
`
const SubText = styled.p`
  margin: 0;
  font-weight: 600;
`
const EditIconStyled = styled(EditIcon)`
  position: absolute;
  right: 36px;
  top: 6px;
  font-size: 1.7rem !important;
  padding: 2px;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary-color);
    border-radius: 50%;
    color: white;
  }
`

const CloseIconStyled = styled(CloseIcon)`
  position: absolute;
  right: 7px;
  top: 6px;
  width: 1.2em !important;
  height: 1.2em !important;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary-color);
    border-radius: 50%;
    color: white;
  }
`