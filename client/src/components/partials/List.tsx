import React, { useContext } from 'react';
import { CustomFilter } from '../CustomFilter';
import { CustomFilterContext } from '../CustomFilterContext';


export const List: React.FC = ({ children }) => {
    const { isShown } = useContext(CustomFilterContext);
    return isShown ? <div> {children}</div> : null;
}