import React, {useState} from "react";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import {getDifferenceYear, fullPaymentForBrand, getPlan} from "../Helpers";

const Field = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;  
`;

const Button = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color .3s ease;
  margin-top: 2rem;
  
  &:hover{
  background-color: #26c6da;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;  
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = ({saveSummary, saveLoading}) => {

    const [data, saveData] = useState({
        brand: '',
        year: '',
        plan: ''
    });

    const [error, saveError] = useState(false);

    // extract values
    const {brand, year, plan} = data;

    // read form's data
    const obtainInformation = e => {
        saveData({
            ...data,
            [e.target.name]: e.target.value
        })
    };

    // when use press submit
    const quoteInsurance = e => {
        e.preventDefault();
        if (brand.trim() === '' || year.trim() === '' || plan === '') {
            saveError(true);
            return;
        }
        saveError(false);

        //  basic mont 2000
        let result = 2000;

        // get difference of years
        const diff = getDifferenceYear(year);

        // for each year you have to subtract 3%
        result -= ((diff * 3) * result) / 100;

        // American 15%  // Asiatic 5% // European
        result = fullPaymentForBrand(brand) * result;

        // basic + 20%  // complete 50%
        const increasePlan = getPlan(plan);
        result = parseFloat(increasePlan * result).toFixed(2)

        saveLoading(true);

        setTimeout(() => {
            // total
            saveLoading(false);
            saveSummary({
                quotation: Number(result),
                data
            })
        }, 3000);
    };


    return (
        <form onSubmit={quoteInsurance}>
            {error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Field>
                <Label>Marca</Label>
                <Select name="brand" value={brand} onChange={obtainInformation}>
                    <option value="">-- seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiático</option>
                </Select>
            </Field>
            <Field>
                <Label>Año</Label>
                <Select name="year" value={year} onChange={obtainInformation}>
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Field>
            <Field>
                <Label htmlFor="">Plan</Label>
                <InputRadio type="radio" name="plan" value="basico" checked={plan === "basico"}
                            onChange={obtainInformation}/> Básico
                <InputRadio type="radio" name="plan" value="completo" checked={plan === "completo"}
                            onChange={obtainInformation}/> Completo
            </Field>

            <Button type="submit">Cotizar</Button>
        </form>
    )
};

Form.protoTypes = {
    saveSummary: PropTypes.func.isRequired,
    saveLoading: PropTypes.func.isRequired
};

export default Form;