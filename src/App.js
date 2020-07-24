import React, {useState} from 'react';
import styled from "@emotion/styled";
import Header from "./components/Header";
import Form from "./components/Form";
import Summary from "./components/Summary";
import Result from "./components/Result";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContainerForm = styled.div`
  background-color: #fff;
  padding: 3rem;
`;

function App() {

    const [summary, saveSummary] = useState({
        quotation: 0,
        data: {
            brand: '',
            year: '',
            plan: ''
        }
    });

    const [loading, saveLoading] = useState(false);

    const {quotation, data} = summary;


    return (
        <Container>
            <Header titulo={'cotizador de seguros'}/>
            <ContainerForm>
                <Form saveSummary={saveSummary} saveLoading={saveLoading}/>
                {loading ? <Spinner/> : null}
                {!loading ? <Summary data={data}/> : null}
                {!loading ? <Result quotation={quotation}/> : null}
            </ContainerForm>
        </Container>
    );
}

export default App;
