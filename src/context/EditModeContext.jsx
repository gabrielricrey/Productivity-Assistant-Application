import { createContext, useContext, useState } from 'react';

export const EditModeContext = createContext();

export const EditModeContextProvider = ({ children }) => {
    const [editMode, setEditMode] = useState(false);
    const [editingEventId, setEditingEventId] = useState("");
    const [editCounter, setEditCounter] = useState(0);

    return (
        <EditModeContext.Provider value={{ editMode, setEditMode, editingEventId, setEditingEventId, editCounter, setEditCounter }}>
            {children}
        </EditModeContext.Provider>
    );
};


// Create a custom hook to use the EditModeContext??
// export const useEditMode = () => {
//     return useContext(EditModeContext);
// };