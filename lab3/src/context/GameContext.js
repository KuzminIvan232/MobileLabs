import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  // Список завдань (id, опис, мета, поточний прогрес, чи виконано)
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Зробити 10 кліків', target: 10, current: 0, completed: false, type: 'tap' },
    { id: '2', title: 'Подвійний клік 5 разів', target: 5, current: 0, completed: false, type: 'doubleTap' },
    { id: '3', title: 'Утримувати 3 секунди', target: 1, current: 0, completed: false, type: 'longPress' },
    { id: '4', title: 'Перетягнути об\'єкт', target: 1, current: 0, completed: false, type: 'pan' },
    { id: '5', title: 'Свайп вправо', target: 1, current: 0, completed: false, type: 'swipeRight' },
    { id: '6', title: 'Свайп вліво', target: 1, current: 0, completed: false, type: 'swipeLeft' },
    { id: '7', title: 'Змінити розмір', target: 1, current: 0, completed: false, type: 'pinch' },
    { id: '8', title: 'Отримати 100 очок', target: 100, current: 0, completed: false, type: 'score' },
  ]);

  const updateTask = (type, value = 1) => {
    setTasks(prev => prev.map(task => {
      if (task.completed) return task;

      // Логіка для звичайних завдань
      if (task.type === type) {
        const newCurrent = task.current + value;
        return { ...task, current: newCurrent, completed: newCurrent >= task.target };
      }

      // Логіка для завдання "100 очок"
      if (task.type === 'score' && type === 'addScore') {
         const currentScore = score + value; // score state оновлюється асинхронно, тому рахуємо вручну
         return { ...task, current: currentScore, completed: currentScore >= task.target };
      }

      return task;
    }));
  };

  const addScore = (amount) => {
    setScore(prev => prev + amount);
    updateTask('score', amount);
  };

  const triggerTask = (type) => {
    updateTask(type, 1);
  };

  return (
    <GameContext.Provider value={{ score, tasks, addScore, triggerTask }}>
      {children}
    </GameContext.Provider>
  );
};