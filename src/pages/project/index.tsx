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

    const { id } = useParams<{ id: string }>();

    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<IProject>();

    const [currentSprint, setCurrentSprint] = useState<ISprint>();

    const navigate = useNavigate();

    const getProject = async () => {
        try {
            const response = await api.get(`/projects/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                }
            });
            
            const projectData: IProject = response.data;
            setProject(projectData);

            console.log(response.data)

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

            setCurrentSprint(sprint);

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

    if (loading) {
        return (
            <StyledMain style={{ paddingTop: "136px" }}>
                <Loading />
            </StyledMain>
        )
    }

    return (
        <>
            <StyledProject>
                <Sprint sprint={currentSprint} />
            </StyledProject>
        </>
    )
}

export default Project;