import Input from "./Input";
import React, { useRef } from "react";
import Modal from "./Modal";

const NewProject = ({ onAdd, onCancel }) => {
    // We can get the input entered by user using onChange prop, and storing them inside any state, but since, we want to only read the input values entered by user and not manipulate anything, therefore we go for useRef.
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    const modal = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        // validation
        if (
            enteredTitle.trim() === "" ||
            enteredDescription.trim() === "" ||
            enteredDueDate.trim() === ""
        ) {
            // Show the error modal
            modal.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
        });
    }

    return (
        <>
            <Modal ref={modal}>
                <h2 className="text-xl font-bold text-stone-700 my-4">
                    Invalid Input
                </h2>
                <p className="text-stone-600 mb-4">
                    Oops... looks like you forgot to enter a value.
                </p>
                <p className="text-stone-600 mb-4">
                    Please make sure you provide a valid value for every input
                    field.
                </p>
            </Modal>

            {/* w-[35rem] : In this way, we can set our custom values in tailwind by using square brackets */}

            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" ref={title} text="Title" />
                    <Input ref={description} text="Description" isTextArea />
                    <Input type="date" ref={dueDate} text="Due Date" />
                </div>
            </div>
        </>
    );
};

export default NewProject;
