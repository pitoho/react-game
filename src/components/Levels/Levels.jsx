import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {Link, useParams} from "react-router-dom";
import './level.css'

Levels.propTypes = {
    data: PropTypes.array,
    lives: PropTypes.number,
    setLives: PropTypes.func,
    setHints: PropTypes.func,
};


export default function Levels({ data, lives, setLives, setData, setHints, setInfo}) {
    const { id } = useParams();
    const level = data.find((item) => item.id === parseInt(id));
    useEffect(() => setInfo(level.id), [level])
    const text = level ? level.text : "";
    const answ = level ? level.answer : "";
    const photoOne = level ? level.photos[0] : "";
    const photoTwo = level ? level.photos[1] : "";
    const photoThree = level ? level.photos[2] : "";

    const [answer, setAnswer] = useState();
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [isNOTAnswerCorrect, setIsNOTAnswerCorrect] = useState(false);

    const handleInputChange = (event) => {
        setAnswer(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        if (answer === answ) {
            let success = new Audio("/success.mp3");
            success.play();
            setIsAnswerCorrect(true);
            setIsNOTAnswerCorrect(false);

            level.status = true;
            const updatedData = data.map((item) =>
                item.id === level.id ? { ...item, status: true } : item
            );
            setData(updatedData);

            // Обновление списка подсказок
            setHints((prevHints) =>
                prevHints.map((hint) => {
                    if (hint.id === parseInt(id)) {
                        return { ...hint, name: "used-hint" };
                    }
                    return hint;
                })
            );
        } else {
            let err = new Audio("/error.mp3");
            err.play();
            setLives(lives - 1);
            setIsNOTAnswerCorrect(true);
            setIsAnswerCorrect(false);
        }
    };
    return (
        <div className={'level'}>
            {
                isAnswerCorrect
                    ?
                    <>
                        <h1>Вы прошли <del>Level {id}</del></h1>
                        <Link to='/'>
                            <button>Назад</button>
                        </Link>
                    </>
                    :
                    <>
                        <h1>Level {id}</h1>
                        <div>
                            <p>Загадка: {text}?</p>
                        </div>
                        <div className={'img-language'}>
                            <img src={photoOne}></img>
                            <img src={photoTwo}></img>
                            <img src={photoThree}></img>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                required
                                type="text"
                                onChange={handleInputChange}
                                value={answer}
                                className={isNOTAnswerCorrect ? "error": null }
                                placeholder="Введите название языка"
                            />
                            <input type="submit" value='Ответить'/>
                        </form>
                    </>
            }
        </div>
    );
}
