import React, { useState } from 'react';
import './index.css';


// Tablica książek "przepisana" z books.txt, zgodnie z wymaganiem
const initialBooks = [
{ id: 1, title: 'Władca Pierścieni', author: 'J.R.R. Tolkien', genre: 1, rating: 5 },
{ id: 2, title: 'Hobbit', author: 'J.R.R. Tolkien', genre: 1, rating: 4 },
{ id: 3, title: 'Zaginiona Dziedzina', author: 'Anna Nowak', genre: 1, rating: 3 },
{ id: 4, title: 'Morderstwo w Orient Expressie', author: 'Agatha Christie', genre: 2, rating: 5 },
{ id: 5, title: 'Cisza przed burzą', author: 'Jan Kowalski', genre: 2, rating: 2 },
{ id: 6, title: 'Tajemnica starego młyna', author: 'Ewa Zielińska', genre: 2, rating: 3 },
{ id: 7, title: 'Krótka historia niemal wszystkiego', author: 'Bill Bryson', genre: 3, rating: 4 },
{ id: 8, title: 'Fizyka dla ciekawych', author: 'Piotr Malinowski', genre: 3, rating: 1 },
{ id: 9, title: 'Biologia w pigułce', author: 'Magdalena Bąk', genre: 3, rating: 0 }
];


const genreLabels = {
1: 'Fantastyka',
2: 'Kryminał',
3: 'Popularnonaukowa'
};


export default function App() {
// stan książek (modyfikowalny)
const [books, setBooks] = useState(initialBooks);


// stan filtrów (wszystkie domyślnie włączone)
const [filters, setFilters] = useState({ 1: true, 2: true, 3: true });


function toggleFilter(genreId) {
setFilters(prev => ({ ...prev, [genreId]: !prev[genreId] }));
}


function addStar(bookId) {
setBooks(prev => prev.map(b => b.id === bookId ? { ...b, rating: Math.min(5, b.rating + 1) } : b));
}


function renderStars(n) {
// n pełnych gwiazdek, reszta puste
const full = '★'.repeat(n);
const empty = '☆'.repeat(5 - n);
return full + empty;
}


const visibleBooks = books.filter(b => filters[b.genre]);


return (
<div className="container">
<h1>Biblioteka cyfrowa</h1>


<div className="controls">
<label className="switch">
<input type="checkbox" checked={!!filters[1]} onChange={() => toggleFilter(1)} />
<span>Fantastyka</span>
</label>
<label className="switch">
<input type="checkbox" checked={!!filters[2]} onChange={() => toggleFilter(2)} />
<span>Kryminał</span>
</label>
<label className="switch">
<input type="checkbox" checked={!!filters[3]} onChange={() => toggleFilter(3)} />
<span>Popularnonaukowa</span>
</label>
</div>


<div className="grid">
{visibleBooks.map(book => (
<article key={book.id} className="card">
<h3>{book.title}</h3>
<h4>{book.author}</h4>
<div className="rating">{renderStars(book.rating)}</div>
<button className="btn" onClick={() => addStar(book.id)} disabled={book.rating >= 5}>
Dodaj gwiazdkę
}
