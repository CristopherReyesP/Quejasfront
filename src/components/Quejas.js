import React from 'react';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';

export const Quejas = ({ quejas }) => {
    return (
        <div className="my-2 rounded bg-docs-transparent-grid ">
            <Card  outline color="success">
                <CardHeader>{quejas.nombre}</CardHeader>
                <CardBody>
                    <CardText>{quejas.queja}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

