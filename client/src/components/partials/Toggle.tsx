import React, { useContext } from 'react';
import { CustomFilterContext } from '../CustomFilterContext';

export const Toggle: React.FC = ({ children }) => {
    const { isShown, setIsShown } = useContext(CustomFilterContext);
    return (
        <div onClick={() => setIsShown(!isShown)}>
            {children}
        </div>
    );

}