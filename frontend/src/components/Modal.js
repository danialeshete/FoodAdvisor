import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const activeItem = { ...this.state.activeItem, [name]: value };

        this.setState({ activeItem });
    };

    render() {
        const { toggle, onSave } = this.props;

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>New Restaurant</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="restaurant-title">Title</Label>
                            <Input
                                type="text"
                                id="restaurant-title"
                                name="title"
                                value={this.state.activeItem.title}
                                onChange={this.handleChange}
                                placeholder="Enter restaurant Title"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="restaurant-description">Description</Label>
                            <Input
                                type="text"
                                id="restaurant-description"
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Enter restaurant description"
                            />
                        </FormGroup>
                        <FormGroup ratings>
                            <Label for="restaurant-rating">Ratings</Label>
                                <Input
                                    type="number"
                                    name="ratings"
                                    placeholder="Enter your restaurant rating"
                                    value={this.state.activeItem.ratings}
                                    onChange={this.handleChange}
                                />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    name="personalList"
                                    checked={this.state.activeItem.personalList}
                                    onChange={this.handleChange}
                                />
                                In Personal List?
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => onSave(this.state.activeItem)}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}