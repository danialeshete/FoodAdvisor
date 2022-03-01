import {render, screen} from '@testing-library/react';
import React from "react";
import Modal from "./Modal";

describe('Modal Page', () => {

    beforeEach(() => {
        const activeItem = {
            title: "",
            description: "",
            completed: false
        };

        const handleSubmit = jest.fn();

        render(<Modal
            activeItem={activeItem}
            toggle={() => {
                this.setState({modal: true});
            }}
            onSave={handleSubmit}
        />);
    });

    it('should render modal header', () => {
        const headerText = screen.getByRole('heading', { name: /new restaurant/i })
        const closeButton = screen.getByRole('button', { name: /close/i });
        expect(headerText).toHaveTextContent("New Restaurant");
        expect(closeButton).toBeInTheDocument();
    });

    it('should render title form field', () => {
        const titelName = screen.getByText(/title/i);
        const titelInput = screen.getByRole('textbox', {name: /title/i});
        expect(titelName).toHaveTextContent("Title");
        expect(titelInput).toBeInTheDocument();
    });

    it('should render description form field', () => {
        const descriptionName = screen.getByText(/description/i);
        const descriptionInput = screen.getByRole('textbox', {name: /description/i});
        expect(descriptionName).toHaveTextContent("Description");
        expect(descriptionInput).toBeInTheDocument();
    });

    it('should render checkbox form field', () => {
        const checkboxName = screen.getByText(/in personal list\?/i);
        const checkboxInput = screen.getByRole('checkbox', {name: /in personal list\?/i});
        expect(checkboxName).toHaveTextContent("In Personal List?");
        expect(checkboxInput).toBeInTheDocument();
    });

    it('should render save button', () => {
        const saveButton = screen.getByRole('button', { name: /save/i });
        expect(saveButton).toBeInTheDocument();
        expect(saveButton).toHaveTextContent("Save");
    });

});