import {render, screen} from '@testing-library/react';
import App from './App';
import React from "react";


describe('Main Page', () => {
    beforeEach(() => {
        render(<App/>);
    });

    it('should render the button "Add Retaurant"', () => {
        const addButton = screen.getByRole("button");
        expect(addButton).toBeInTheDocument();
        expect(addButton).toHaveTextContent("Add Restaurant")
    });

    it('should render the tabs', () => {
        const firstTab = screen.getByText(/personal list/i);
        const secondTab = screen.getByText(/public list/i);
        expect(firstTab).toBeInTheDocument();
        expect(secondTab).toBeInTheDocument();
    });

    it('should render restaurant list', () => {
        const list = screen.getByRole('list');
        expect(list).toBeInTheDocument();
    });
});

