import { useCallback, useContext, useState } from 'react';
import { ModalQueja } from '../components/Modal';
import { Quejas } from '../components/Quejas';
import { SocketContext } from '../context/SocketContext';
import { Col } from 'reactstrap';
import { Pagination } from '../components/Pagination';


export const QuejasPage = () => {
    const { online, quejas, nuevaQueja } = useContext(SocketContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = quejas.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const mostrarNuevaQueja = useCallback(() => {
        return (
            <>
                <hr />
                <h5>Gracias por tu opinión</h5>
                <Quejas quejas={nuevaQueja} />
                <hr />
            </>
        )
    }, [nuevaQueja],
    );

    return (

        <div className="App">
            <p>
                Service status:
                    {
                    online
                        ? <span className="text-success"> Online</span>
                        : <span className="text-danger"> Offline</span>
                }
            </p>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <h2>Quejas y Reclamos</h2>
                <ModalQueja />
                {(nuevaQueja != null) && mostrarNuevaQueja()}
                {
                    currentPosts.map(q => (
                        <Quejas quejas={q} key={q._id} />
                    ))
                }
                <Pagination postsPerPage={postsPerPage} totalPosts={quejas.length} paginate={paginate} />
            </Col>

        </div>

    )
}