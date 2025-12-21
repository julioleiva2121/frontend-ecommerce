import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { productService } from '../services/productService';

const ReviewForm = ({ productId, onReviewAdded }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 || comment.trim() === '') {
            alert('Por favor, selecciona una calificación y escribe un comentario.');
            return;
        }

        const reviewData = {
            product_id: productId,
            rating,
            comment,
        };

        try {
            const newReview = await productService.addReview(reviewData);
            onReviewAdded(newReview);
            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Failed to submit review:', error);
            alert('Hubo un error al enviar tu opinión. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h3>Escribe tu opinión</h3>
            <div className="form-group">
                <label>Calificación</label>
                <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                    style={{ display: 'none' }}
                                />
                                <FaStar
                                    className="star"
                                    color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                />
                            </label>
                        );
                    })}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="comment">Comentario</label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="¿Qué te pareció el producto?"
                    required
                />
            </div>
            <button type="submit">Enviar opinión</button>
        </form>
    );
};

export default ReviewForm;