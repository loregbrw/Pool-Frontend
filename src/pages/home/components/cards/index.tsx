import { StyledCard, StyledContainer, StyledContent, StyledDescription, StyledDiv, StyledGrid, StyledImg, StyledName, StyledTag, StyledTagName } from "./style";
import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import toast from "react-hot-toast";

import { Grid, Card } from '@mui/material';
import EColorPalette from "../../../../enums/EColorPalette";

interface IProject {
    project: {
        id: string;
        name: string;
        description: string;
        status: boolean;
        tag?: {
            id: string;
            name: string;
            color: string;
        }
    };
    status: "Own" | "Viewer" | "Editor";
}

interface ICardsProps {
    reload: boolean;
    search: string;
}

const Cards = ({ reload, search }: ICardsProps) => {

    const [projects, setProjects] = useState<IProject[]>([]);

    useEffect(() => {

        const getProjects = async () => {
            try {
                const response = await api.get(`/projects?search=${search}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                    }
                });

                setProjects(response.data.projects);
            } catch (error: any) {
                console.log(error);
                toast.error(error.response?.data?.message || error.message);
            }
        };

        getProjects();

    }, [reload, search]);

    if (!projects.length) {
        return (
            <StyledContainer>
                Looks like you’re the first one here!
            </StyledContainer>
        )
    }

    return (
        <>
            <Grid container spacing={4} justifyContent="left">
                {
                    projects.length > 0 ?
                        projects.map((project, index) => (
                            <StyledGrid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <StyledCard elevation={3}>
                                    <StyledTag elevation={0} style={{ backgroundColor: project.project.tag?.color || EColorPalette.COOLGRAY }} >
                                        <StyledTagName color={project.project.tag?.color || EColorPalette.ENGINEERINGORANGE}>{project.project.tag?.name}</StyledTagName>
                                    </StyledTag>
                                    <StyledContent>
                                        <StyledName>{project.project.name}</StyledName>
                                        <StyledDescription>{project.project.description}</StyledDescription>
                                        <StyledDiv>
                                            <StyledImg src="/User.png" />
                                            <StyledImg src="/User.png" />
                                            <StyledImg src="/User.png" />
                                            <StyledName>+</StyledName>
                                        </StyledDiv>
                                    </StyledContent>
                                </StyledCard>
                            </StyledGrid>
                        ))
                        : "Looks like you’re the first one here!"
                }
            </Grid >
        </>
    )
}

export default Cards;