import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

// --- Íconos SVG ---
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;

// Hook para feedback háptico
const useHaptics = () => {
  const triggerImpact = async (style = ImpactStyle.Light) => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style });
      } catch (error) {
        console.log('Haptics not supported');
      }
    }
  };
  return { triggerImpact };
};

// Aplicación principal simplificada
function AppLocal() {
  const [currentView, setCurrentView] = useState('calendar');
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [familyInfo, setFamilyInfo] = useState({ dadName: 'PAPÁ', momName: 'MAMÁ' });
  const [showAddModal, setShowAddModal] = useState(false);
  const { triggerImpact } = useHaptics();

  // Cargar datos del localStorage al inicio
  useEffect(() => {
    const savedEvents = localStorage.getItem('alenia-events');
    const savedTasks = localStorage.getItem('alenia-tasks');
    const savedExpenses = localStorage.getItem('alenia-expenses');
    const savedNotes = localStorage.getItem('alenia-notes');
    const savedFamily = localStorage.getItem('alenia-family');

    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedFamily) setFamilyInfo(JSON.parse(savedFamily));
  }, []);

  // Guardar en localStorage cuando cambien los datos
  useEffect(() => {
    localStorage.setItem('alenia-events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('alenia-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('alenia-expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('alenia-notes', JSON.stringify(notes));
  }, [notes]);

  const addEvent = async (eventData) => {
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      createdAt: new Date()
    };
    setEvents(prev => [...prev, newEvent]);
    setShowAddModal(false);
    await triggerImpact();
  };

  const deleteEvent = async (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    await triggerImpact();
  };

  const renderContent = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarView events={events} onDelete={deleteEvent} />;
      case 'tasks':
        return <TasksView tasks={tasks} setTasks={setTasks} />;
      case 'expenses':
        return <ExpensesView expenses={expenses} setExpenses={setExpenses} />;
      case 'notes':
        return <NotesView notes={notes} setNotes={setNotes} />;
      default:
        return <CalendarView events={events} onDelete={deleteEvent} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm p-4 shadow-lg flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/images/logo-secondary.png" 
            alt="Alenia" 
            className="h-8 w-auto object-contain"
          />
          <div>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
              Familia {familyInfo.dadName} y {familyInfo.momName}
            </h1>
            <p className="text-xs text-gray-400">Modo Local - Sin conexión</p>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Footer de navegación */}
      <footer className="bg-gray-900/80 backdrop-blur-sm p-2 flex justify-around items-center border-t border-gray-700">
        {[
          { key: 'calendar', icon: CalendarIcon, label: 'Calendario' },
          { key: 'tasks', icon: ListIcon, label: 'Tareas' },
          { key: 'expenses', icon: BookOpenIcon, label: 'Gastos' },
          { key: 'notes', icon: BookOpenIcon, label: 'Notas' }
        ].map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={async () => {
              setCurrentView(key);
              await triggerImpact();
            }}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentView === key 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </footer>

      {/* Botón flotante para agregar */}
      <button
        onClick={async () => {
          setShowAddModal(true);
          await triggerImpact();
        }}
        className="fixed bottom-20 right-4 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-colors"
      >
        <PlusIcon />
      </button>

      {/* Modal de agregar (simplificado) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Agregar Evento</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400">✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              addEvent({
                title: formData.get('title'),
                description: formData.get('description'),
                date: formData.get('date') || new Date().toISOString().split('T')[0],
                time: formData.get('time') || '09:00',
                category: 'Evento'
              });
            }}>
              <input
                name="title"
                placeholder="Título del evento"
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 mb-3"
                required
              />
              <textarea
                name="description"
                placeholder="Descripción"
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 mb-3"
              />
              <input
                name="date"
                type="date"
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 mb-3"
              />
              <input
                name="time"
                type="time"
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 mb-4"
              />
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium"
              >
                Crear Evento
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente de vista de calendario simplificado
function CalendarView({ events, onDelete }) {
  const today = new Date().toISOString().split('T')[0];
  const todayEvents = events.filter(e => e.date === today);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Eventos de Hoy</h2>
      {todayEvents.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <CalendarIcon className="mx-auto mb-2" />
          <p>No hay eventos para hoy</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todayEvents.map(event => (
            <div key={event.id} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-400">{event.time}</p>
                {event.description && <p className="text-sm text-gray-300 mt-1">{event.description}</p>}
              </div>
              <button
                onClick={() => onDelete(event.id)}
                className="text-red-400 hover:text-red-300 p-2"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Componentes simplificados para otras vistas
function TasksView({ tasks, setTasks }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tareas</h2>
      <div className="text-center text-gray-400 py-8">
        <ListIcon className="mx-auto mb-2" />
        <p>Funcionalidad en desarrollo</p>
      </div>
    </div>
  );
}

function ExpensesView({ expenses, setExpenses }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gastos</h2>
      <div className="text-center text-gray-400 py-8">
        <BookOpenIcon className="mx-auto mb-2" />
        <p>Funcionalidad en desarrollo</p>
      </div>
    </div>
  );
}

function NotesView({ notes, setNotes }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notas</h2>
      <div className="text-center text-gray-400 py-8">
        <BookOpenIcon className="mx-auto mb-2" />
        <p>Funcionalidad en desarrollo</p>
      </div>
    </div>
  );
}

export default AppLocal;
