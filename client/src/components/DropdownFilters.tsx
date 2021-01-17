import React, { FC, useState, useEffect } from 'react';
import { Col, Row, Container, Dropdown, DropdownButton, ButtonGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import { getFilteredData } from '../utils';
import { filterList } from '../utils/constants';
import { OrderType, getOrders } from '../redux/actions/orders'

export type FilterType = {
    id: number;
    name: string;
    checked: boolean;
    status: string;
}

function DropdownFilters(props: any) {
    const [search, setSearch] = useState<string>('');
    const [dropdownFilters, setDropdownFilters] = useState<FilterType[]>(filterList);

    let searchDebounce: any = null;

    const onSearch = async (value: string) => {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(async () => {
            setSearch(value)
        }, 300);
    };

    const handleSelect = (e: any) => {
        let updateList = dropdownFilters?.map((data) => {
            if (data.name === e) data.checked = !data.checked;
            return data;
        })
        setDropdownFilters(updateList);
        updateFilterOrderList();
    }

    const handleClick = (e: any) => {
        updateFilterOrderList();
    }

    const updateFilterOrderList = () => {
        const updateList = getFilteredData(props.orderList, dropdownFilters, search);
        props.onUpdate(updateList);
    }

    const renderDropdownItems = () => (
        dropdownFilters?.map((type, i) => (
            <Dropdown.Item eventKey={type.name} active={type.checked}>
                {type.name}
            </Dropdown.Item>))
    )

    return (
        <Container fluid className="p-0">
            <Row noGutters>
                <Col sm="auto" md={2}>
                    <DropdownButton
                        as={ButtonGroup}
                        title="Select Filter"
                        menuAlign={{ lg: 'right' }}
                        id="dropdown-button-right-responsive-1"
                        onSelect={handleSelect}>
                        {renderDropdownItems()}
                    </DropdownButton>
                </Col>

                <Col sm="auto" md={10}>
                    <InputGroup>
                        <FormControl
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => onSearch(e.target.value)}
                            aria-describedby="basic-addon1"
                            type="search"
                        />
                        <Button variant="outline-primary" onClick={(e) => handleClick(e)}>Search</Button>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default DropdownFilters;