import React, { FC, useState, ReactElement } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

type propsType = {
    name: string,
    id: number,
    bio?: string,
}

function SearchBox(props: any) {
    const [search, setSearch] = useState('');

    let searchDebounce: any = null;

    const onSearch = async (value: string) => {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(async () => {
            setSearch(value)
        }, 300);
    };

    const handleClick = (e: any) => {
        console.log(search);
    }

    return (
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
    );
}

export default SearchBox;