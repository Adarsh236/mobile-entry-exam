import React, { useState } from 'react';
import { Toggle } from './partials/Toggle'
import { List } from './partials/List'
import { Item } from './partials/Item'
import { CustomFilterContext } from './CustomFilterContext'

export const CustomFilter: React.FC & {
    Toggle: typeof Toggle;
    List: typeof List;
    Item: typeof Item;
} = ({ children }) => {
    const [isShown, setIsShown] = useState(false);
    return (
        <div>
            <CustomFilterContext.Provider value={{ isShown, setIsShown }}>
                {children}
            </CustomFilterContext.Provider>

        </div>
    );
}

CustomFilter.Toggle = Toggle;
CustomFilter.List = List;
CustomFilter.Item = Item;