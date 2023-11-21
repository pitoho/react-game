import {useEffect, useState} from 'react';
import Header from "./components/Header/Header.jsx";
import Cards from "./components/Cards/Cards.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NotFound from "./components/Levels/NotFound.jsx";
import Levels from "./components/Levels/Levels.jsx";
import Modal from "./components/Modal/Modal.jsx";

export default function App() {
    const [lives, setLives] = useState(3)
    const [modalOpen, setModal] = useState(false)
    const [data, setData] = useState(
        [
            {
                id: 1,
                text: 'Я змея, но не ядовитая,\n' +
                    'В программировании много знатная.\n' +
                    'Синтаксис мой чистый и прекрасный,\n' +
                    'Имя мое - начинается на "П".\n' +
                    'Как меня зовут, угадай,\n' +
                    'программиста поможешь отлично играть',
                status: false,
                photos: [
                    '../src/assets/python.png',
                    '../src/assets/dart.png',
                    '../src/assets/go.png',
                ],
                answer: "python"
            },
            {
                id: 2,
                text: 'Сам я не стрела и никак не летаю,\n' +
                    'Но в программировании, мой друг, слава.\n' +
                    'Мне типы данных явные нужны,\n' +
                    'Веб, мобильность – во мне утверждение рубится.\n' +
                    'Тебе нужна метка, чтобы эту загадку разгадать,\n' +
                    'Имя моё, как игра со стрелками, ребят',
                status: false,
                photos: [
                    '../src/assets/dart.png',
                    '../src/assets/java.png',
                    '../src/assets/kotlin.png',
                ],
                answer: "dart"

            },
            {
                id: 3,
                text: 'На логотипе я – символ энергии и чая.\n' +
                    'Рядом с надписью иконка кофейной чашки,\n' +
                    'Этот язык программирования зовется как-то.\n' +
                    'Смог угадать ты, как мне прозваться',
                status: false,
                photos: [
                    '../src/assets/swift.svg',
                    '../src/assets/java.png',
                    '../src/assets/rust.svg',
                ],
                answer: "java"


            },
            {
                id: 4,
                text: 'В мире программ, я шик и стиль,\n' +
                    'Конечно, знаешь - я из мира блиллиант, друг мил!\n' +
                    'Камнем изумрудным прозван красиво,\n' +
                    'Загадка для тебя: как я зовусь?',
                status: false,
                photos: [
                    '../src/assets/go.png',
                    '../src/assets/typescript.svg',
                    '../src/assets/ruby.svg',
                ],
                answer: "ruby"


            },
            {
                id: 5,
                text: 'Скажи мне, дружок, имя какое-то простое.\n' +
                    'Шесть букв в слове, но сила огромна,\n' +
                    'На платформе Java и Android сводим в кучу знания.\n' +
                    'Ответь быстро, мой друг, кто же это такой?',
                status: false,
                photos: [
                    '../src/assets/go.png',
                    '../src/assets/kotlin.png',
                    '../src/assets/java.png',
                ],
                answer: "kotlin"


            },
            {
                id: 6,
                text: 'У языка программирования величественного,\n' +
                    'Стоит имя, и оно легкое, как пушинка.\n' +
                    'На iOS и macOS сияет оно ярко,\n' +
                    'Создает приложения великолепно и мастерски.',
                status: false,
                photos: [
                    '../src/assets/dart.png',
                    '../src/assets/swift.svg',
                    '../src/assets/rust.svg',
                ],
                answer: "swift"
            }
        ]
)

    const present = "../src/assets/present.png";

    const handleDataUpdate = (updatedData) => {
        setData(updatedData);
    };

    const checkAllStatuses = () => {
        return data.every(item => item.status === true);
    };


    useEffect(() => {
        if (checkAllStatuses()) {
            setModal(true);
        }
    }, [data]);

    const [info, setInfo] = useState(0);

    return (
        <Router>
            <Header lives={lives} setLives={setLives} data={data} info={info}/>
            <Modal modalOpen={modalOpen} setModal={setModal}>
                <div className="win">
                    <h2>Поздравляем вы выйграли!</h2>
                    <img id="present" src={present}></img>
                    <h4>ITHUB</h4>
                </div>
            </Modal>
            <Routes>
                <Route exact path="/" element={<Cards data={data}/>}/>
                <Route path="/level/:id"
                       element={<Levels lives={lives} setLives={setLives} setInfo={setInfo} data={data} setData={handleDataUpdate}/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}
