import React from 'react';
import {Link} from "react-router-dom";
import './404.css'

export default function NotFound() {
    return (
        <div className='notfound'>
            <h2>Ошибка: 404, Такой страницы не существует =(</h2>
            <Link to='/'>
                <button>
                    Назад
                </button>
            </Link>
        </div>
    );
}
