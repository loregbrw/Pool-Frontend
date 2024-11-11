import toast from "react-hot-toast";
import CloseIcon from '@mui/icons-material/Close';
import EColorPalette from "../../../enums/EColorPalette";

import React, { useState } from "react";
import { StyledButton } from "../../style";
import { IconButton } from "@mui/material";
import { api } from "../../../services/api";
import { StyledContainer, StyledInput, StyledLabel, StyledModal, StyledTitle } from "../style"

interface ITagModalProps {
    closeAction: () => void;
}

const TagModal = ({ closeAction }: ITagModalProps) => {

    const [tagName, setTagName] = useState("");
    const [tagColor, setTagColor] = useState("black");

    const createTag = async (e: React.FormEvent) => {
        e.preventDefault();

        const apiRequest = async () => {
            await api.post("/tags", {
                name: tagName,
                color: tagColor
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                }
            });
        }

        toast.promise(
            apiRequest().catch(error => {
                throw error.response?.data?.message || error.message;
            }),
            {
                loading: "Creating tag",
                success: "Tag created successfully!",
                error: (err) => err,
            }
        ).then(closeAction);
    }

    return (
        <>
            <form onSubmit={createTag}>
                <StyledModal elevation={3} style={{ top: "40px", width: "250px" }} >
                    <StyledTitle>New tag +</StyledTitle>
                    <StyledContainer style={{ gap: "5px" }}>
                        <StyledContainer>
                            <StyledLabel>Name:</StyledLabel>
                            <StyledInput onChange={(e) => setTagName(e.target.value)} />
                        </StyledContainer>
                        <StyledContainer>
                            <StyledLabel>Color:</StyledLabel>
                            <StyledInput type="color" onChange={(e) => setTagColor(e.target.value)} />
                        </StyledContainer>
                    </StyledContainer>
                    <StyledButton bgcolor={EColorPalette.BURNTSIENNA} style={{ width: "100%" }} type="submit" >Create tag</StyledButton>
                    <IconButton onClick={closeAction} size="small" style={{ position: "absolute", top: "5px", right: "5px" }}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </StyledModal>
            </form>
        </>
    )
}

export default TagModal;