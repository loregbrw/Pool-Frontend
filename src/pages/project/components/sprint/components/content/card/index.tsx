import toast from 'react-hot-toast';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useEffect, useRef, useState } from "react";
import { ICard } from "../../../../..";
import { StyledSpaceBetween } from "../column/style";
import { StyledCard, StyledCardDescription, StyledCardName, StyledDate, StyledEmoji, StyledImg, StyledUsers } from "./style";
import { StyledForm, StyledNameInput } from "../../../style";
import { IconButton } from "@mui/material";
import { api } from '../../../../../../../services/api';
import { StyledModalBackground } from '../../../../../../../components/modal/style';
import CardModal from './modal';

interface ICardProps {
    card: ICard;
}

const Card = ({ card }: ICardProps) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const [currentCard, setCurrentCard] = useState(card);

    const [editingName, setEditingName] = useState("");
    const [editingNameCard, setEditingNameCard] = useState(false);

    const [openCard, setOpenCard] = useState(false);

    useEffect(() => {
        setCurrentCard(card);
    }, [card])

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
        setCurrentCard({ ...currentCard, name: newCard.name })
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

    const apiRequestStatus = async () => {
        const response = await api.patch(`/cards/${currentCard.id}`,
            {
                status: !currentCard.status
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });

        const newCard = response.data.card;
        setCurrentCard({ ...currentCard, status: newCard.status });
    }

    const toggleStatus = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();

        toast.promise(
            apiRequestStatus().catch(error => {
                throw error.response?.data?.message || error.message;
            }),
            {
                loading: "Toggling card status...",
                success: !currentCard.status ? "Finished card!" : "Unfinished card!",
                error: (err) => err,
            }
        )
    }

    return (
        <>
            <StyledCard onClick={() => setOpenCard(true)}>
                <StyledSpaceBetween>
                    {
                        !editingNameCard &&
                        <StyledCardName onClick={(e) => e.stopPropagation()} onDoubleClick={openEditName} style={{ fontSize: "15px" }}>{currentCard?.name}</StyledCardName>
                    }
                    {
                        editingNameCard &&
                        <StyledForm onSubmit={editCardName} onClick={(e) => e.stopPropagation()}>
                            <StyledNameInput maxLength={50} ref={inputRef} onBlur={() => setEditingNameCard(false)} type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} style={{ textAlign: "left", fontSize: "14px" }} required />
                        </StyledForm>
                    }
                    <IconButton size="small" aria-label="notifications" onClick={(e) => e.stopPropagation()} style={{ alignSelf: "flex-start" }} >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </StyledSpaceBetween>
                {
                    currentCard.description &&
                    <StyledCardDescription>
                        {currentCard.description}
                    </StyledCardDescription>
                }
                <StyledSpaceBetween style={{ alignItems: "flex-end" }}>
                    <StyledUsers>
                        <StyledImg src="/User.png" />
                        <StyledImg src="/User.png" />
                        <StyledImg src="/User.png" />
                        <StyledCardName>+</StyledCardName>
                    </StyledUsers>
                    <StyledDate>
                        {currentCard?.dueDate ? new Date(currentCard.dueDate).toLocaleDateString() : ''}
                        <StyledEmoji onClick={toggleStatus}>{currentCard?.status === false ? "🔴" : "🟢"}</StyledEmoji>
                    </StyledDate>
                </StyledSpaceBetween>
            </StyledCard>
            {
                openCard &&
                <>
                    <CardModal card={currentCard} />
                    <StyledModalBackground onClick={() => setOpenCard(false)} />
                </>
            }
        </>
    )
}

export default Card;