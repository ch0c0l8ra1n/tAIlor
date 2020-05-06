import React, { useState } from "react"

import TailorLayout from '../components/layout';

import '../../static/css/index.css';
import { graphql } from "gatsby";

import Img from 'gatsby-image';
import { Row,Col, Button } from "antd";

import TexturePicker from '../components/texturepicker';
import ModelPicker from '../components/modelpicker';

const dummy = () => (<div/>)

const Stages = {
    TEXTURE_PICKER: {
        description: "Select Texture",
        app: TexturePicker
    },
    MODEL_PICKER: {
        description: "Select Model",
        app: ModelPicker
    },
    INTERACTOR: {
        description: "Interactive Demo",
        app: dummy
    }

}

export default ({data}) => {
    const designs = data.allFile.edges;

    const StagesOrder = [Stages.TEXTURE_PICKER, Stages.MODEL_PICKER, Stages.INTERACTOR];

    const [stage,setStage] = useState(0);

    const [texture,setTexture] = useState(designs[0].node.childImageSharp.fluid.src);
    const [model,setModel] = useState({});

    const SubApp = StagesOrder[stage].app;


    console.log(texture,designs[0]);

    return (<TailorLayout>
        <div className="mainScreen">
            <Row className="stageSelector">
                <Col xs={6} md={4}>
                    <Button type="primary" block  disabled={stage == 0} onClick={ () => {setStage(stage - 1 )}}>
                        Previous
                    </Button>
                </Col>
                <Col xs={12} md={16} className="stageInfo">
                    {StagesOrder[stage].description}
                </Col>
                <Col xs={6} md={4}>
                    <Button type="primary" block disabled={stage == (StagesOrder.length-1) } onClick={ () => {setStage(stage + 1 )}}>
                        Next
                    </Button>
                </Col>
            </Row>
            <Row className="appStage">
                <SubApp textureState={[texture,setTexture]} modelState={[model,setModel]}/>
            </Row>

            
        </div>
    </TailorLayout>)
}

export const Query = graphql`
    query {
        allFile {
            edges {
                node {
                    childImageSharp {
                        fluid {
                        ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }`