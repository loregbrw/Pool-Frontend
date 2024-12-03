import toast from "react-hot-toast";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StyledTooltip from "../../../../../../../../components/tooltip";

import { StyledCardName } from "../style";
import { ICard } from "../../../../../..";
import { IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { StyledSpaceBetween } from "../../column/style";
import { StyledForm, StyledNameInput } from "../../../../style";
import { StyledModal } from "../../../../../../../../components/modal/style";
import { api } from "../../../../../../../../services/api";

interface ICardModalProps {
    card: ICard;
}

const CardModal = ({ card }: ICardModalProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [currentCard, setCurrentCard] = useState(card);

    const [editingName, setEditingName] = useState("");
    const [editingNameCard, setEditingNameCard] = useState(false);

    useEffect(() => {
        if (editingNameCard && inputRef.current)
            inputRef.current.focus();

    }, [editingNameCard]);

    const openEditName = () => {
        setEditingName(currentCard.name);
        setEditingNameCard(true);
    }

    const apiRequest = async () => {
        const response = await api.patch(`/cards/${currentCard.id}`,
            {
                name: editingName
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });

        const newCard = response.data.card;
        setCurrentCard({ ...card, name: newCard.name })
    }

    const editCardName = async (e: React.FormEvent) => {
        e.preventDefault();

        toast.promise(
            apiRequest().catch(error => {
                throw error.response?.data?.message || error.message;
            }),
            {
                loading: "Updating card name...",
                success: "Card name updated successfully!",
                error: (err) => err,
            }
        ).then(() => setEditingNameCard(false));
    }

    return (
        <>
            <StyledModal style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "calc(100% - 40px)", maxWidth: "700px" }}>
                <StyledSpaceBetween>
                    {
                        !editingNameCard &&
                        <StyledTooltip
                            title={currentCard.name}
                            placement="top-start">

                            <StyledCardName onClick={(e) => e.stopPropagation()} onDoubleClick={openEditName} style={{ fontSize: "15px" }}>{currentCard?.name}</StyledCardName>
                        </StyledTooltip>
                    }
                    {
                        editingNameCard &&
                        <StyledForm onSubmit={editCardName} onClick={(e) => e.stopPropagation()}>
                            <StyledNameInput maxLength={50} ref={inputRef} onBlur={() => setEditingNameCard(false)} type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} style={{ textAlign: "left", fontSize: "14px" }} required />
                        </StyledForm>
                    }
                    <IconButton size="small" aria-label="notifications" onClick={(e) => e.stopPropagation()} >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </StyledSpaceBetween>
            </StyledModal>
        </>
    )
}

export default CardModal;