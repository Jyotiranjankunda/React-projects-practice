import { useState } from "react";
import FallBackUI from "./components/FallBackUI";
import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
    const [projectsState, setProjectsState] = useState({
        // selectedProjectId will hold the id of any project that will be selected, or null if new project is created, or undefined if nothing is selected.
        // projects is an array, that will store the data of all projects.

        selectedProjectId: undefined,
        projects: [],
    });

    // When we start a new project, then selectedProjectId should be changed to null by either clicking add project or create new project button

    function handleStartAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: null,
            };
        });
    }

    function handleAddProject(projectData) {
        setProjectsState((prevState) => {
            const newProject = {
                ...projectData,
                id: Math.random(),
            };

            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject],
            };
        });
    }

    function handleCancelAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            };
        });
    }

    function handleSelectProject(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: id,
            };
        });
    }

    // if selectedProjectId is null, then show the new project component, else if undefined, then show the fallback ui
    const selectedProject = projectsState.projects.find(
        (project) => project.id === projectsState.selectedProjectId
    );
    let content = <SelectedProject project={selectedProject} />;
    if (projectsState.selectedProjectId === null) {
        content = (
            <NewProject
                onAdd={handleAddProject}
                onCancel={handleCancelAddProject}
            />
        );
    } else if (projectsState.selectedProjectId === undefined) {
        content = <FallBackUI onStartAddProject={handleStartAddProject} />;
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
            />
            {content}
        </main>
    );
}

export default App;
