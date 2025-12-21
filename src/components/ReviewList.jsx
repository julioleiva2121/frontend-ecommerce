import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ReviewList = ({ reviews }) => {

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />);
        }
        return stars;
    };

    return (
        <div className="review-list">
            <h3>Opiniones de Clientes</h3>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review.id_key} className="review-item">
                        <div className="review-header">
                            <div className="review-rating">{renderStars(review.rating)}</div>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                    </div>
                ))
            ) : (
                <p>Todavía no hay opiniones para este producto. ¡Sé el primero en dejar una!</p>
            )}
        </div>
    );
};

export default ReviewList;