import React from "react";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import {capitalized} from "../Helpers";
import Header from "./Header";

const SummaryContainer = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00828f;
  color: #ffffff;
  margin-top: 1rem;
`;

const Summary = ({data}) => {
// extract data
    const {brand, year, plan} = data;

    if (brand === '' || year === '' || plan === '') return null;
    return (
        <SummaryContainer>
            <h2>Resumen de Cotización</h2>
            <ul>
                <li>Marca: {capitalized(brand)}</li>
                <li>Plan: {capitalized(plan)}</li>
                <li>Año del Auto: {year}</li>
            </ul>
        </SummaryContainer>
    );
};
Summary.protoTypes = {
    data: PropTypes.object.isRequired
};


export default Summary;