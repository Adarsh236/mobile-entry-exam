import React, { FC, useState, ReactElement } from 'react';
import { Dropdown, DropdownButton, FormControl } from 'react-bootstrap';

type propsType = {
    name: string,
    id: number,
    bio?: string,
}

let filters = [
    {
        "id": 1,
        "name": "fulfilled",
        "checked": false,
        "status": "fulfillmentStatus"
    }, {
        "id": 2,
        "name": "not-fulfilled",
        "checked": false,
        "status": "fulfillmentStatus"
    }
    , {
        "id": 3,
        "name": "canceled",
        "checked": false,
        "status": "billingInfo"

    }
    , {
        "id": 4,
        "name": "paid",
        "checked": false,
        "status": "billingInfo"
    }
    , {
        "id": 5,
        "name": "not-paid",
        "checked": false,
        "status": "billingInfo"
    }, {
        "id": 6,
        "name": "refunded",
        "checked": false,
        "status": "billingInfo"
    }
]

type FilterType = {
    id: number;
    name: string;
    checked: boolean;
    status: string;
}

function DropdownFilters(props: any) {
    const [showOrders, setShowOrders] = useState(false);

    const handleSelect = (e: any) => {
        let updateList = filters?.map((data) => {
            if (data.name === e) data.checked = !data.checked;
            return data;
        })
        console.log(props);
        /* this.setState({
             filter: updateList
         });*/
    }
    console.log(props);

    return (
        <DropdownButton
            alignRight
            title="Select Filter"
            id="dropdown-menu-align-right"
            onSelect={handleSelect}>
            {
                filters?.map((type, i) => (
                    <Dropdown.Item eventKey={type.name} active={type.checked}>
                        {type.name}
                    </Dropdown.Item>))
            }
        </DropdownButton>
    );
}
export default DropdownFilters;