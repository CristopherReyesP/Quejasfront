import React, { useContext, useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Input, Label, Col } from 'reactstrap';
import { SocketContext } from '../context/SocketContext';
import Swal from 'sweetalert2';

export const ModalQueja = () => {

    const { socket, sinGuardar} = useContext(SocketContext);
    const [abierto, setAbierto] = useState(false);
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        queja: ''
    });

    const modalStyles = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '80%'
    }

    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }
//Abre o cierra la ventana modal, cambiando el estado
    const abrirModal = () => {
        setAbierto(!abierto);
    }

    const enviarQueja = () => {
        socket.emit('Queja', {
            nombre: form.nombre,
            email: form.email,
            queja: form.queja
        });
        if (sinGuardar) {
            Swal.fire('Error', 'No se guardo su queja, intentelo de nuevo', 'error');
        } else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Guardado',
                showConfirmButton: true,
                timer: 1500
            })
            setForm({
                nombre: '',
                email: '',
                queja: ''
            });
            setAbierto(!abierto);     
        }
    }

    const todoOk = () => {
        return (
            form.email.length > 0 &&
            form.nombre.length > 0 &&
            form.queja.length > 0
        ) ? true : false;
    }

    return (
        <div>
            <>
                {/* Boton para mostrar modal */}
                <Button
                    title='Nueva queja'
                    color='primary ms-1'
                    onClick={() => abrirModal()}
                >Nueva Queja</Button>
                {/* Inicia Modal */}
                <Modal isOpen={abierto} style={modalStyles}>
                    <ModalHeader>
                        Nueva Queja
                </ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Label for="Nombre" sm={2}>Nombre</Label>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    name="nombre"
                                    id="Nombre"
                                    placeholder="Nombre"
                                    value={form.nombre}
                                    onChange={onChange}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="Email@email.com"
                                    value={form.email}
                                    onChange={onChange}
                                    required 
                                    />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Text" sm={2}>Queja:</Label>
                            <Col sm={10}>
                                <Input 
                                type="textarea" 
                                name="queja" 
                                id="Text"
                                value={form.queja}
                                onChange={onChange} 
                                required 
                                />
                            </Col>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            title='Cerrar'
                            color='secondary ms-1'
                            onClick={() => abrirModal()}
                        >
                            Cerrar
                     </Button>
                        <Button
                            title='Enviar'
                            color='primary ms-1'
                            disabled={!todoOk()}
                            onClick={() => enviarQueja()}
                        >Enviar</Button>
                    </ModalFooter>
                </Modal>
            </>

        </div>
    )
}
