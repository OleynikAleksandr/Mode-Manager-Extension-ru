import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Убираем расширение .tsx
import './index.css' // Раскомментируем импорт CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)