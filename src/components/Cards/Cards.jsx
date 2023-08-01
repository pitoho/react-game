import PropTypes from 'prop-types';
import './Cards.css';
import {Link} from "react-router-dom";
Cards.propTypes = {
    data: PropTypes.array
}


export default function Cards({data}) {
    return (
        <main>
            <div className="card-wrapper">
                {data.map(
                    (card, index) =>
                        <Link to={card.status === true ? '/' : `/Level/${card.id}`} key={index}>
                            <div className={card.status === true ? 'card completed' : 'card'}>
                                <h1>Level {card.id}</h1>
                            </div>
                        </Link>
                )
                }
            </div>
        </main>
    );
}
