import toast from 'react-hot-toast';
import Column from './components/content/column';
import Loading from '../../../../components/loading';
import HeaderSprint from './components/header-sprint';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { IColumn, ISprint } from "../..";
import { IconButton } from "@mui/material";
import { api } from '../../../../services/api';
import { useEffect, useRef, useState } from "react";
import { StyledDescription, StyledName } from "../style";
import { StyledFooter, StyledForm, StyledNameInput, StyledSprint, StyledSprintName } from "./style";
import { StyledContent } from './components/content/style';
import { StyledAdd, StyledAddSpan } from './components/content/card/style';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

const Sprint = () => {

    const { sprintId } = useParams();
    const inputRef = useRef<HTMLInputElement>(null);

    const [currentSprint, setCurrentSprint] = useState<ISprint>();
    const [editingNameSprint, setEditingNameSprint] = useState(false);

    const [inputWidth, setInputWidth] = useState("");
    const [editingName, setEditingName] = useState("");

    const [progress, setProgress] = useState<{ totalCards: number, completedCards: number }>({
        totalCards: 0, completedCards: 0
    });
    const [loading, setLoading] = useState(true);

    const getData = async () => {

        if (!sprintId) return;

        try {
            const response = await api.get(`/sprints/${sprintId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                }
            );

            setCurrentSprint(response.data.sprint);
            setLoading(false);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [sprintId])


    useEffect(() => {
        if (editingNameSprint && inputRef.current)
            inputRef.current.focus();

    }, [editingNameSprint]);

    if (loading || !currentSprint || !sprintId) {

        return (
            <>
                <StyledSprint>
                    <Loading />
                </StyledSprint>
                <StyledFooter />
            </>
        )
    }

    const openEditName = () => {
        setEditingName(currentSprint.name);
        setEditingNameSprint(true);

        calculateWidth(currentSprint.name);
    }

    const calculateWidth = (s: string) => {
        const spaces = s.split(" ").length - 1;
        const uppercaseLetters = (s.match(/[A-Z]/g) || []).length;
        const width = s.match(/\S/g)!.length + spaces * 0.15 + uppercaseLetters * 0.2 + 2;

        setInputWidth(width + "ch");
        console.log("width: " + width + "\last inputWidth: " + inputWidth);
    }

    const editInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingName(e.target.value)
        calculateWidth(e.target.value);
    }

    const apiRequest = async () => {
        const response = await api.patch(`/sprints/${sprintId}`,
            {
                name: editingName
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            }
        );

        const newSprint = response.data.sprint;
        setCurrentSprint({ ...currentSprint, name: newSprint.name });
    }

    const editSprintName = async (e: React.FormEvent) => {
        e.preventDefault();

        toast.promise(
            apiRequest().catch(error => {
                throw error.response?.data?.message || error.message;
            }),
            {
                loading: "Updating sprint name...",
                success: "Sprint name updated successfully!",
                error: (err) => err,
            }
        ).then(() => setEditingNameSprint(false));
    }

    const apiRequestAdd = async () => {
        const response = await api.post(`/columns`,
            {
                name: "New Column",
                index: currentSprint?.columns?.length ? currentSprint.columns.length : 0,

                sprintId: currentSprint?.id
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            }
        );

        const newColumn: IColumn = response.data.column;
        setCurrentSprint({ ...currentSprint!, columns: [...currentSprint?.columns!, { ...newColumn, cards: [] }] });
    }

    const addColumn = async () => {
        toast.promise(
            apiRequestAdd().catch(error => {
                throw error.response?.data?.message || error.message;
            }),
            {
                loading: "Creating column...",
                success: "Column created successfully!",
                error: (err) => err,
            }
        )
    }

    const processColumnUpdate = async (newColumns: IColumn[]) => {
        await api.patch(`/sprints/reorder/${currentSprint.id}`,
            {
                columns: newColumns.map((col) => (col.id)),
            }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }
        );
    };

    const handleColumnReorder = async (newColumns: IColumn[]) => {
        setCurrentSprint((prevSprint) => {
            const updatedSprint = { ...prevSprint!, columns: newColumns };
            toast.promise(
                processColumnUpdate(newColumns).catch(error => {
                    getData();
                    throw error.response?.data?.message || error.message;
                }),
                {
                    loading: "Saving...",
                    success: "Saved!",
                    error: (err) => err,
                }
            )
            return updatedSprint;
        });
    };

    const processCardUpdate = async (cardId: string, destColumnId: string, newIndex: number) => {
        await api.patch(`/cards/move/${cardId}`,
            {
                destColumnId,
                newIndex,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            }
        );
    }

    const handleCardReorder = async (cardId: string, destColumnId: string, destIndex: number, newColumns: IColumn[]) => {
        setCurrentSprint((prevSprint) => {

            const updatedSprint = { ...prevSprint!, columns: newColumns };
            toast.promise(
                processCardUpdate(cardId, destColumnId, destIndex).catch(error => {
                    getData();
                    throw error.response?.data?.message || error.message;
                }),
                {
                    loading: "Saving...",
                    success: "Saved!",
                    error: (err) => err,
                }
            )
            return updatedSprint;
        });
    }

    return (
        <>
            <StyledSprint>
                <HeaderSprint
                    timeProgress={
                        Math.min(
                            (Math.floor(Math.abs(new Date().getTime() - new Date(currentSprint.initialDate).getTime()) / (1000 * 60 * 60 * 24)) + 1) / currentSprint.duration,
                            1
                        )
                    }
                    tasksProgress={progress.totalCards > 0 ? (progress.completedCards / progress.totalCards) * 100 : 0}
                />
                <StyledContent>
                    <DragDropContext
                        onDragEnd={async (result: any) => {
                            const { source, destination, draggableId, type } = result;

                            if (!destination) return;

                            if (type === "CARD") {

                                const newColumns = [...currentSprint.columns!];

                                const sourceColumn = newColumns.find(col => col.id === source.droppableId);
                                const destColumn = newColumns.find(col => col.id === destination.droppableId);

                                if (!sourceColumn || !destColumn) return;

                                const card = sourceColumn.cards.find(card => card.id === draggableId)!;

                                if (sourceColumn === destColumn) {

                                    if (source.index === destination.index) return;

                                    const newCards = sourceColumn.cards || [];

                                    newCards.splice(card.index, 1);
                                    newCards.splice(destination.index, 0, card);
                                    newCards.forEach((card, index) => (card.index = index));

                                    sourceColumn.cards = newCards;

                                } else {

                                    sourceColumn.cards = sourceColumn.cards || [];
                                    destColumn.cards = destColumn.cards || [];

                                    sourceColumn.cards = sourceColumn.cards.filter((c) => c.id !== draggableId);
                                    sourceColumn.cards.forEach((card, index) => {
                                        card.index = index;
                                    });

                                    destColumn.cards.splice(destination.index, 0, card);
                                    destColumn.cards.forEach((card, index) => {
                                        card.index = index;
                                    });
                                }

                                handleCardReorder(draggableId, destColumn.id, destination.index, newColumns);

                            } else if (type === "COLUMN") {

                                const { source, destination, draggableId } = result;
                                if (!destination || destination.index === source.index) return;

                                const movedColumn = currentSprint.columns?.find((col) => col.id === draggableId);
                                if (!movedColumn) return;

                                const newColumns = [...currentSprint.columns!];
                                newColumns.splice(newColumns.indexOf(movedColumn), 1);
                                newColumns.splice(destination.index, 0, movedColumn);
                                newColumns.forEach((col, index) => (col.index = index));

                                handleColumnReorder(newColumns);
                            }
                        }}


                    >
                        <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{
                                        display: 'flex',
                                        gap: '10px',
                                    }}
                                >
                                    {currentSprint.columns?.map((col, index) => (
                                        <Draggable key={col.id} draggableId={col.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Column column={col} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <StyledAdd onClick={addColumn}>
                        <StyledAddSpan>
                            Add new column +
                        </StyledAddSpan>
                    </StyledAdd>
                </StyledContent>
            </StyledSprint>
            <StyledFooter>
                <IconButton size="small" >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <StyledSprintName>
                    {
                        !editingNameSprint &&
                        <StyledName style={{ textAlign: "center" }} onDoubleClick={openEditName} >{currentSprint.name}</StyledName>
                    }
                    {
                        editingNameSprint &&
                        <StyledForm onSubmit={editSprintName}>
                            <StyledNameInput maxLength={50} ref={inputRef} onBlur={() => setEditingNameSprint(false)} type="text" value={editingName} onChange={editInput} style={{ maxWidth: inputWidth }} required />
                        </StyledForm>
                    }
                    <StyledDescription style={{ textAlign: "center" }} >
                        {
                            (() => {

                                const day = Math.floor(Math.abs(new Date().getTime() - new Date(currentSprint.initialDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
                                if (day > currentSprint.duration)
                                    return "Sprint completed"

                                const suffix = day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";
                                return `${day}${suffix} day of ${currentSprint.duration} day${currentSprint.duration > 1 ? "s" : ""}`;
                            })()
                        }
                    </StyledDescription>
                </StyledSprintName>
                <IconButton size="small" >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </StyledFooter>


        </>
    )
}

export default Sprint;