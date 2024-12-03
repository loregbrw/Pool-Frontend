import toast from 'react-hot-toast';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { ISprint } from "../..";
import { IconButton } from "@mui/material";
import { api } from '../../../../services/api';
import { useEffect, useRef, useState } from "react";
import { StyledDescription, StyledName } from "../style";
import { StyledFooter, StyledForm, StyledNameInput, StyledSprint, StyledSprintName } from "./style";
import HeaderSprint from './components/header-sprint';
import { StyledContent } from './components/content/style';
import Column from './components/content/column';

interface ISprintProps {
    sprint: ISprint | undefined;
}

const Sprint = ({ sprint }: ISprintProps) => {

    if (!sprint) {
        return null;
    }

    const [currentSprint, setCurrentSprint] = useState<ISprint>(sprint);

    const inputRef = useRef<HTMLInputElement>(null);
    const [editingNameSprint, setEditingNameSprint] = useState(false);

    const [progress, setProgress] = useState(0);
    const [inputWidth, setInputWidth] = useState("");
    const [editingName, setEditingName] = useState("");

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

    const openEditName = () => {
        setEditingName(currentSprint.name);
        setEditingNameSprint(true);

        calculateWidth(currentSprint.name);
    }

    const getData = async () => {
        try {
            const response = await api.get(`/columns/sprint/${sprint.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });

            setCurrentSprint({ ...currentSprint, columns: response.data.columns });
            setProgress(response.data.progress / 100)

        } catch (error) {
            console.log(error);
        }
    }

    const apiRequest = async () => {
        const response = await api.patch(`/sprints/${sprint?.id}`,
            {
                name: editingName
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });

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

    useEffect(() => {
        if (editingNameSprint && inputRef.current)
            inputRef.current.focus();

    }, [editingNameSprint]);

    useEffect(() => {
        getData();
    })

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
                    tasksProgress={progress}
                />
                <StyledContent>
                    {
                        currentSprint.columns?.map((col, index) => (
                            <Column key={index} column={col} />
                        ))
                    }
                </StyledContent>
            </StyledSprint>
            <StyledFooter>
                <IconButton size="small" aria-label="notifications" >
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

                                const day = Math.floor(Math.abs(new Date().getTime() - new Date(sprint.initialDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
                                if (day > currentSprint.duration)
                                    return "Sprint completed"

                                const suffix = day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";
                                return `${day}${suffix} day of ${sprint.duration} day${sprint.duration > 1 ? "s" : ""}`;
                            })()
                        }
                    </StyledDescription>
                </StyledSprintName>
                <IconButton size="small" aria-label="notifications" >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </StyledFooter>
        </>
    )
}

export default Sprint;