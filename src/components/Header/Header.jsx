import {useEffect, useState} from 'react';
import './Header.css'
import 'boxicons';

import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal.jsx";

Header.propTypes = {
    lives: PropTypes.number,
    setLives: PropTypes.func,
    data: PropTypes.array,
    info: PropTypes.number
}

export default function Header({lives, info, data}) {
    const [answerOpen, setAnswerOpen] = useState(false);
    const level = data.find(level => level.id == info);
    useEffect(() => {setAnswerOpen(false)}, [level])
    const [modalOpen, setModal] = useState(false);
    const [hints, setHints] = useState([
        { id: 1, name: 'question-mark' },
        { id: 2, name: 'question-mark' },
        { id: 3, name: 'question-mark' },
    ]);
    useEffect(() => {
        if (lives < 1) {
            setModal(true);
        }
    }, [lives]);

    const handleHintClick = (id) => {
        const arr = hints.filter(s => s.id !== id)
        setHints(JSON.parse(JSON.stringify(arr)))
        setAnswerOpen(true)
    };


    return (
        <>
            <header>
            <Modal modalOpen={modalOpen} setModal={setModal}>
                <div className="lose">
                    <h2>Вы проиграли<box-icon name='window-close' ></box-icon></h2>
                    <button onClick={() => {
                        window.location = "/";
                        // document.location.reload();
                    }}>ReStart
                    </button>
                </div>
            </Modal>
                <ul title='Жизни'>
                    {Array(lives).fill(null).map((_, index) => (
                        <box-icon key={index} type='solid' name='heart'></box-icon>
                    ))}
                </ul>
                <Link to='/' title='Главная страница'><img src="https://ithub.ru/design/images/courses/logoIThub.png"
                                                           alt="IThub logo"/></Link>
                <ul title="Подсказки">
                    {hints.map((hint) => (
                        <box-icon
                            key={hint.id}
                            name={hint.name}
                            onClick={() => handleHintClick(hint.id)}
                        ></box-icon>
                    ))}
                </ul>
                <p>{answerOpen && level.answer}</p>
            </header>
        </>
    );
}
