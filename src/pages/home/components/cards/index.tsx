import { StyledCardContent, StyledContainer, StyledDescription, StyledGrid, StyledName, StyledTagName } from "./style";
import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import toast from "react-hot-toast";

import { Grid, CardMedia, Card } from '@mui/material';

interface IProject {
    project: {
        id: string;
        name: string;
        description: string;
        status: boolean;
        tag: {
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
                Looks like you’re the first one here. Start a project and make it yours!
            </StyledContainer>
        )
    }

    return (
        <>
            <Grid container spacing={2} justifyContent="left">
                {
                    projects.length > 0 ?
                        projects.map((project, index) => (
                            <>
                                <StyledGrid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Card>
                                        <CardMedia
                                            component="div"
                                            style={{ backgroundColor: project.project.tag.color, height: 40, position: "relative" }}
                                        >
                                            <StyledTagName bgcolor={project.project.tag.color}>{ project.project.tag.name }</StyledTagName>
                                        </CardMedia>
                                        <StyledCardContent>
                                            <StyledName>
                                                {project.project.name}
                                            </StyledName>
                                            <StyledDescription>
                                                {project.project.description}
                                            </StyledDescription>
                                        </StyledCardContent>
                                    </Card>
                                </StyledGrid>
                            </>
                        ))
                        : "Looks like you’re the first one here. Start a project and make it yours!"
                }
            </Grid >
        </>
    )
}

export default Cards;