import React from "react";
import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import Turn from "../components/turn/Turn";
import userEvent from "@testing-library/user-event";

describe('Turn', () => {

  test("First step to take a date is choose a service", () => {
    render(<Turn/>)
    const services = screen.getByLabelText("Choose service")
    expect(services).toHaveTextContent("Elegir Servicio");
  })

  test("Al seleccionar un servicio se elije fecha para ese servicio", () => {
    render(<Turn/>)
    const botonService = screen.getByLabelText("Masaje Reductor")
    userEvent.click(botonService)
    const selectedService = screen.getByTestId("Service selected")
    expect(selectedService).toHaveTextContent("Masaje Reductor");
  })
})
