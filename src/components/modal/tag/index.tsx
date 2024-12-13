import toast from "react-hot-toast";
import CloseIcon from '@mui/icons-material/Close';
import EColorPalette from "../../../enums/EColorPalette";

import React, { useState } from "react";
import { StyledButton } from "../../style";
import { Box, IconButton } from "@mui/material";
import { api } from "../../../services/api";
import { StyledContainer, StyledInput, StyledLabel, StyledModal, StyledTitle } from "../style"

interface ITagModalProps {
    onClose: () => void;
}

const TagModal = ({ onClose }: ITagModalProps) => {

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
        ).then(onClose);
    }

    return (
        <>
            <Box onClick={onClose} sx={{ cursor: "default", position: "fixed", width: "100%", height: "100%", backgroundColor: "rgba(51, 49, 56, 0.25)", top: 0, left: 0, zIndex: 9999 }} />
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
                        <IconButton onClick={onClose} size="small" style={{ position: "absolute", top: "5px", right: "5px" }}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </StyledModal>
                </form>
        </>
    )
}

export default TagModal;