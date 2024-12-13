import { useNavigate, useParams } from "react-router-dom";
import { StyledProject } from "./components/style";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/loading";
import { StyledMain } from "../../components/style";
import Sprint from "./components/sprint";

export interface ICard {
    id: string;
    description: string;
    dueDate: Date;
    index: number;
    name: string;
    status: boolean;
    tags: [];
    users: [];
}

export interface IColumn {
    id: string;
    index: number;
    name: string;
    cards: ICard[]
}

export interface ISprint {
    id: string;
    name: string;
    initialDate: Date;
    duration: number;
    status: boolean;
    columns?: IColumn[];
}

export interface IProject {
    project: {
        id: string;
        name: string;
        description: string;
        status: boolean;
        sprints: ISprint[];
    };
    permission: "Owner" | "Viewer" | "Editor";
}

const Project = () => {

    const { id, sprintId, cardId } = useParams();

    const [loading, setLoading] = useState(true);
    const [currentProject, setCurrentProject] = useState<IProject>();

    const navigate = useNavigate();

    const getProject = async () => {
        try {
            const response = await api.get(`/projects/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                }
            });
            
            const projectData: IProject = response.data;
            setCurrentProject(projectData);

            const projectSprints = projectData.project.sprints;

            let sprint: ISprint | null = null;

            for (let s of projectSprints) {
                if (s.status === true) {
                    sprint = s;
                    break;
                }
            }

            if (!sprint)
                sprint = projectSprints[projectSprints.length - 1];

            navigate(`sprint/${sprint.id}`);

        } catch (error: any) {
            navigate("/home");
            
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProject();
    }, []);

    if (loading || !currentProject) {
        return (
            <StyledMain>
                <Loading />
            </StyledMain>
        )
    }

    return (
        <>
            <StyledProject>
                <Sprint projectSprints={currentProject.project.sprints} />
            </StyledProject>
        </>
    )
}

export default Project;