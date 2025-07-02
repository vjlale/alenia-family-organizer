import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, query, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Device } from '@capacitor/device';

// --- Íconos SVG ---
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const AiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect x="4" y="12" width="16" height="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L9.5 8.5 4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5z"/></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const BellRingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/><path d="M2 8c0-2.2.7-4.3 2-6"/><path d="M22 8c0-2.2-.7-4.3-2-6"/></svg>;
const BulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 8A6 6 0 0 0 6 8c0 1 .3 2.2 1.5 3.5.7.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const LogOutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const CircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>;
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const WandIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4V2"/><path d="M15 10V8"/><path d="M12.5 6.5L14 5"/><path d="M12.5 11.5L14 13"/><path d="M5 4v2.5"/><path d="M5 10V8"/><path d="M7.5 6.5L6 5"/><path d="M7.5 11.5L6 13"/><path d="M10 15h.01"/><path d="M10 20h.01"/><path d="M8.5 17.5L7 19"/><path d="M12.5 17.5L14 19"/><path d="M22 15h-2.5"/><path d="M17 15h-1.5"/><path d="M19.5 12.5L21 14"/><path d="M16.5 12.5L15 14"/><path d="m9 12 2-2 2 2 2-2-2-2-2 2-2-2 2 2z"/></svg>;

// --- Configuración de Firebase ---
const firebaseConfig = {
  // Configuración de Firebase aquí
  apiKey: "tu-api-key",
  authDomain: "tu-auth-domain",
  projectId: "tu-project-id",
  storageBucket: "tu-storage-bucket",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id"
};

const appId = 'alenia-family-organizer';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

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

// --- Componente Raíz ---
export default function App() {
    const [familyId, setFamilyId] = useState(localStorage.getItem('familyId'));
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState(null);

    useEffect(() => {
        const getDeviceInfo = async () => {
            if (Capacitor.isNativePlatform()) {
                const info = await Device.getInfo();
                setDeviceInfo(info);
            }
        };

        getDeviceInfo();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                try {
                    await signInAnonymously(auth);
                } catch (error) { 
                    console.error("Error en el inicio de sesión anónimo:", error); 
                }
            }
            setIsAuthReady(true);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = (id) => {
        localStorage.setItem('familyId', id);
        setFamilyId(id);
    };

    const handleLogout = () => {
        localStorage.removeItem('familyId');
        setFamilyId(null);
    };

    if (!isAuthReady) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-lg">Iniciando aplicación...</p>
                    {deviceInfo && (
                        <p className="text-xs text-gray-400 mt-2">
                            {deviceInfo.platform} {deviceInfo.osVersion}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return familyId ? (
        <MainApp familyId={familyId} onLogout={handleLogout} />
    ) : (
        <AuthScreen onLogin={handleLogin} />
    );
}

// --- Pantalla de Autenticación / Acceso (Optimizada para móvil) ---
function AuthScreen({ onLogin }) {
    const [mode, setMode] = useState('join');
    const [inputCode, setInputCode] = useState('');
    const [momName, setMomName] = useState('');
    const [dadName, setDadName] = useState('');
    const [customFamilyCode, setCustomFamilyCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { triggerImpact } = useHaptics();

    const handleCreateFamily = async (e) => {
        e.preventDefault();
        if (!momName || !dadName || !customFamilyCode) {
            setError("Por favor, completa todos los campos.");
            await triggerImpact(ImpactStyle.Medium);
            return;
        }
        setIsLoading(true);
        setError('');
        const familyId = customFamilyCode.toUpperCase();
        try {
            const familyDocRef = doc(db, `artifacts/${appId}/public/data/families`, familyId);
            const docSnap = await getDoc(familyDocRef);
            
            if (docSnap.exists()) {
                setError("Este código ya está en uso. Elige otro.");
                await triggerImpact(ImpactStyle.Medium);
            } else {
                await setDoc(familyDocRef, { momName, dadName, createdAt: new Date() });
                await triggerImpact(ImpactStyle.Heavy);
                onLogin(familyId);
            }
        } catch (error) {
            console.error("Error al crear familia:", error);
            setError("Error al crear la familia. Inténtalo de nuevo.");
            await triggerImpact(ImpactStyle.Medium);
        }
        setIsLoading(false);
    };

    const handleJoinFamily = async (e) => {
        e.preventDefault();
        if (!inputCode) {
            setError("Por favor, ingresa un código de familia.");
            await triggerImpact(ImpactStyle.Medium);
            return;
        }
        setIsLoading(true);
        setError('');
        const familyId = inputCode.toUpperCase();
        try {
            const familyDocRef = doc(db, `artifacts/${appId}/public/data/families`, familyId);
            const docSnap = await getDoc(familyDocRef);
            
            if (docSnap.exists()) {
                await triggerImpact(ImpactStyle.Heavy);
                onLogin(familyId);
            } else {
                setError("Código de familia no encontrado.");
                await triggerImpact(ImpactStyle.Medium);
            }
        } catch (error) {
            console.error("Error al unirse a la familia:", error);
            setError("Error al unirse a la familia. Inténtalo de nuevo.");
            await triggerImpact(ImpactStyle.Medium);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 safe-area-top safe-area-bottom">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img 
                            src="/assets/images/logo-main.png" 
                            alt="Alenia Family Organizer" 
                            className="h-16 w-auto object-contain"
                        />
                    </div>
                    <p className="text-gray-300">Organiza tu familia de manera inteligente</p>
                </div>

                <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-700">
                    <div className="flex mb-6 bg-gray-700 rounded-lg p-1">
                        <button
                            onClick={() => { setMode('join'); triggerImpact(); }}
                            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${mode === 'join' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-300 hover:text-white'}`}
                        >
                            Unirse a Familia
                        </button>
                        <button
                            onClick={() => { setMode('create'); triggerImpact(); }}
                            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${mode === 'create' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-300 hover:text-white'}`}
                        >
                            Crear Familia
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    {mode === 'join' ? (
                        <form onSubmit={handleJoinFamily} className="space-y-4">
                            <input
                                type="text"
                                value={inputCode}
                                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                                placeholder="Código de familia"
                                className="w-full p-4 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-center text-lg font-mono tracking-wider"
                                maxLength={10}
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg hover:opacity-90 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                        Uniéndose...
                                    </div>
                                ) : (
                                    'Unirse a Familia'
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleCreateFamily} className="space-y-4">
                            <input
                                type="text"
                                value={momName}
                                onChange={(e) => setMomName(e.target.value)}
                                placeholder="Nombre de mamá"
                                className="w-full p-4 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            />
                            <input
                                type="text"
                                value={dadName}
                                onChange={(e) => setDadName(e.target.value)}
                                placeholder="Nombre de papá"
                                className="w-full p-4 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            />
                            <input
                                type="text"
                                value={customFamilyCode}
                                onChange={(e) => setCustomFamilyCode(e.target.value.toUpperCase())}
                                placeholder="Código personalizado"
                                className="w-full p-4 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-center font-mono tracking-wider"
                                maxLength={10}
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:opacity-90 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                        Creando...
                                    </div>
                                ) : (
                                    'Crear Familia'
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">
                        v1.0.0 - Aplicación móvil para organización familiar
                    </p>
                </div>
            </div>
        </div>
    );
}

// Continúo con el resto de los componentes adaptados para móvil...
// [El resto del código será similar pero con optimizaciones para móvil]

// --- Aplicación Principal ---
function MainApp({ familyId, onLogout }) {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('calendar');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [familyInfo, setFamilyInfo] = useState(null);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [deleteScope, setDeleteScope] = useState('all');
    const { triggerImpact } = useHaptics();

    useEffect(() => {
        const familyDocPath = `artifacts/${appId}/public/data/families/${familyId}`;
        const unsubFamily = onSnapshot(doc(db, familyDocPath), (doc) => {
            if (doc.exists()) {
                setFamilyInfo(doc.data());
            }
        });

        const eventsCollectionPath = `artifacts/${appId}/public/data/families/${familyId}/events`;
        const q = query(collection(db, eventsCollectionPath));
        const unsubEvents = onSnapshot(q, (querySnapshot) => {
            const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventsData);
        });

        return () => {
            unsubFamily();
            unsubEvents();
        };
    }, [familyId]);

    const handleAddEvent = async (event) => {
        try {
            const eventsCollectionPath = `artifacts/${appId}/public/data/families/${familyId}/events`;
            await addDoc(collection(db, eventsCollectionPath), { ...event, createdAt: new Date(), creatorId: auth.currentUser.uid });
            setIsModalOpen(false);
            await triggerImpact();
        } catch (error) { 
            console.error("Error al agregar evento: ", error); 
            await triggerImpact(ImpactStyle.Medium);
        }
    };

    const handleDeleteRequest = async (event, date) => {
        await triggerImpact(ImpactStyle.Light);
        setDeleteScope(event.recurrence === 'none' ? 'all' : 'one');
        setEventToDelete({ ...event, occurrenceDate: date.toISOString().split('T')[0] });
    };

    const confirmDelete = async () => {
        if (!eventToDelete) return;

        const eventDocRef = doc(db, `artifacts/${appId}/public/data/families/${familyId}/events`, eventToDelete.id);

        try {
            if (deleteScope === 'all') {
                await deleteDoc(eventDocRef);
            } else if (deleteScope === 'one') {
                await updateDoc(eventDocRef, {
                    exceptions: arrayUnion(eventToDelete.occurrenceDate)
                });
            }
            await triggerImpact();
        } catch (error) {
            console.error("Error al eliminar evento:", error);
            await triggerImpact(ImpactStyle.Medium);
        }
        setEventToDelete(null);
    };

    return (
        <div className="h-screen w-screen bg-gray-900 text-white font-sans flex flex-col safe-area-top safe-area-bottom">
            <Header familyId={familyId} familyInfo={familyInfo} onLogout={onLogout} />
            <main className="flex-grow p-3 sm:p-4 overflow-y-auto scroll-container">
                {currentView === 'calendar' ? (
                    <CalendarView 
                        events={events} 
                        selectedDate={selectedDate} 
                        setSelectedDate={setSelectedDate} 
                        onDeleteRequest={handleDeleteRequest} 
                    />
                ) : (
                    <AiAssistantView familyId={familyId} />
                )}
            </main>
            <Footer 
                currentView={currentView} 
                setCurrentView={setCurrentView} 
                onAddEventClick={() => {
                    setIsModalOpen(true);
                    triggerImpact(ImpactStyle.Light);
                }} 
            />
            {isModalOpen && (
                <EventFormModal 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={handleAddEvent} 
                    selectedDate={selectedDate} 
                    familyInfo={familyInfo} 
                />
            )}
            {eventToDelete && (
                <ConfirmationModal 
                    title="Eliminar Evento"
                    message={`¿Qué quieres eliminar para "${eventToDelete.title}"?`}
                    onConfirm={confirmDelete}
                    onCancel={() => setEventToDelete(null)}
                    scope={deleteScope}
                    setScope={setDeleteScope}
                    isRecurring={eventToDelete.recurrence !== 'none'}
                />
            )}
        </div>
    );
}

// --- Header Component ---
function Header({ familyId, familyInfo, onLogout }) {
    const [copied, setCopied] = useState(false);
    const { triggerImpact } = useHaptics();

    const handleCopy = async () => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(familyId);
            } else {
                // Fallback para dispositivos que no soportan la API moderna
                const textArea = document.createElement("textarea");
                textArea.value = familyId;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            setCopied(true);
            await triggerImpact();
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
            await triggerImpact(ImpactStyle.Medium);
        }
    };

    return (
        <header className="bg-gray-900/80 backdrop-blur-sm p-4 shadow-lg flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-3">
                <img 
                    src="/assets/images/logo-secondary.png" 
                    alt="Alenia" 
                    className="h-8 w-auto object-contain"
                />
                <div>
                    <h1 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
                        {familyInfo ? `Familia ${familyInfo.dadName} y ${familyInfo.momName}` : 'Cargando...'}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-400">Código: {familyId}</p>
                        <button onClick={handleCopy} title="Copiar código" className="touch-manipulation">
                            {copied ? (
                                <span className="text-green-400 text-xs">¡Copiado!</span>
                            ) : (
                                <CopyIcon className="h-4 w-4 text-gray-500 hover:text-white transition-colors"/>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <button 
                onClick={onLogout} 
                className="flex items-center gap-2 text-xs sm:text-sm bg-gray-700 hover:bg-red-500/80 px-3 py-1.5 rounded-lg transition-colors touch-manipulation"
            >
                <LogOutIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Salir</span>
            </button>
        </header>
    );
}

// --- Calendar View Component ---
function CalendarView({ events, selectedDate, setSelectedDate, onDeleteRequest }) {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const { triggerImpact } = useHaptics();
    
    const monthName = new Date(currentYear, currentMonth).toLocaleString('es-ES', { month: 'long' });

    const changeMonth = async (offset) => {
        const newDate = new Date(currentYear, currentMonth + offset, 1);
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
        await triggerImpact(ImpactStyle.Light);
    };

    const eventsForSelectedDate = useMemo(() => {
        return events.flatMap(event => getOccurrencesOnDay(event, selectedDate))
                     .sort((a, b) => a.time.localeCompare(b.time));
    }, [events, selectedDate]);
    
    const eventCategories = {
        'Comida': 'bg-green-500', 'Leche': 'bg-blue-300', 'Baño': 'bg-sky-400',
        'Vacunas': 'bg-red-500', 'Colegio': 'bg-yellow-500', 'Guardería': 'bg-orange-500', 
        'Actividad Extra': 'bg-purple-500', 'Reunión': 'bg-indigo-500', 'Remedios': 'bg-pink-500', 
        'Otro': 'bg-gray-500'
    };
    
    const CalendarGrid = () => {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const grid = [];
        
        for (let i = 0; i < firstDayOfMonth; i++) {
            grid.push(<div key={`empty-${i}`}></div>);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const eventsOnDay = events.flatMap(e => getOccurrencesOnDay(e, date));
            const isSelected = selectedDate.toISOString().split('T')[0] === date.toISOString().split('T')[0];
            
            grid.push(
                <div 
                    key={day} 
                    onClick={async () => {
                        setSelectedDate(date);
                        await triggerImpact(ImpactStyle.Light);
                    }}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${eventsOnDay.length > 0 ? 'has-events' : ''}`}
                >
                    <span className={`text-sm ${isSelected ? 'font-bold' : ''}`}>{day}</span>
                </div>
            );
        }
        return grid;
    };

    return (
        <div className="flex flex-col h-full">
            <div className="bg-gray-800 p-3 rounded-lg shadow-md mb-4 flex-shrink-0">
                <div className="flex justify-between items-center mb-3">
                    <button 
                        onClick={() => changeMonth(-1)} 
                        className="p-2 rounded-full hover:bg-gray-700 transition-colors touch-manipulation"
                    >
                        &lt;
                    </button>
                    <h2 className="text-lg font-bold capitalize">{monthName} {currentYear}</h2>
                    <button 
                        onClick={() => changeMonth(1)} 
                        className="p-2 rounded-full hover:bg-gray-700 transition-colors touch-manipulation"
                    >
                        &gt;
                    </button>
                </div>
                <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-2">
                    {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, index) => (
                        <div key={`day-header-${index}`}>{d}</div>
                    ))}
                </div>
                <div className="calendar-grid">
                    <CalendarGrid />
                </div>
            </div>

            <div className="flex-grow bg-gray-800 p-3 rounded-lg shadow-md overflow-y-auto scroll-container">
                <h3 className="text-lg font-bold mb-3">
                    Eventos - {selectedDate.toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </h3>
                {eventsForSelectedDate.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No hay eventos para este día</p>
                ) : (
                    <div className="space-y-2">
                        {eventsForSelectedDate.map((event, index) => (
                            <div 
                                key={`${event.id}-${index}`} 
                                className="bg-gray-700 p-3 rounded-lg flex justify-between items-center"
                            >
                                <div className="flex items-center gap-3 flex-grow">
                                    <div className={`w-3 h-3 rounded-full ${eventCategories[event.category] || 'bg-gray-500'}`}></div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{event.title}</p>
                                        <p className="text-sm text-gray-300">{event.time} - {event.category}</p>
                                        {event.description && (
                                            <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={async () => {
                                        await onDeleteRequest(event, selectedDate);
                                    }}
                                    className="p-2 text-red-400 hover:text-red-300 transition-colors touch-manipulation"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// --- AI Assistant View Component ---
function AiAssistantView({ familyId }) {
    const [messages, setMessages] = useState([
        { 
            type: 'assistant', 
            content: '¡Hola! Soy tu asistente familiar. ¿En qué puedo ayudarte hoy?' 
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const { triggerImpact } = useHaptics();

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = { type: 'user', content: inputMessage };
        setMessages(prev => [...prev, userMessage]);
        
        await triggerImpact(ImpactStyle.Light);
        
        // Simulación de respuesta del asistente
        setTimeout(() => {
            const assistantResponse = {
                type: 'assistant',
                content: 'Entiendo tu consulta. Por ahora estoy en desarrollo, pero pronto podré ayudarte con organización familiar, recordatorios y sugerencias personalizadas.'
            };
            setMessages(prev => [...prev, assistantResponse]);
        }, 1000);

        setInputMessage('');
    };

    return (
        <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-md">
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <AiIcon />
                    Asistente Familiar
                </h3>
            </div>
            
            <div className="flex-grow p-4 overflow-y-auto scroll-container space-y-3">
                {messages.map((message, index) => (
                    <div 
                        key={index}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div 
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.type === 'user' 
                                    ? 'bg-purple-600 text-white' 
                                    : 'bg-gray-700 text-gray-100'
                            }`}
                        >
                            <p className="text-sm">{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Escribe tu mensaje..."
                        className="flex-grow p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors touch-manipulation"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Event Form Modal ---
function EventFormModal({ onClose, onSave, selectedDate, familyInfo }) {
    const [formData, setFormData] = useState({
        title: '', description: '', date: selectedDate.toISOString().split('T')[0],
        time: '09:00', category: 'Otro', recurrence: 'none', repetitionInterval: 1,
        weeklyDays: [], assignedToDropOff: familyInfo?.momName || 'MAMÁ',
        assignedToPickUp: familyInfo?.dadName || 'PAPÁ'
    });
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const { triggerImpact } = useHaptics();
    
    const categories = ['Comida', 'Leche', 'Baño', 'Vacunas', 'Colegio', 'Guardería', 'Actividad Extra', 'Reunión', 'Remedios', 'Otro'];
    const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title) {
            await triggerImpact(ImpactStyle.Medium);
            return;
        }
        onSave(formData);
        await triggerImpact();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-end sm:items-center z-50 modal-backdrop">
            <div className="bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:w-full sm:max-w-md mx-0 sm:mx-4 max-h-[90vh] overflow-y-auto scroll-container">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <img 
                                src="/assets/images/logo-secondary.png" 
                                alt="Alenia" 
                                className="h-6 w-auto object-contain"
                            />
                            <h2 className="text-xl font-bold">Nuevo Evento</h2>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="text-gray-400 hover:text-white transition-colors touch-manipulation"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="Título del evento"
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                            required
                        />
                        
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder="Descripción (opcional)"
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                            rows="3"
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500"
                            />
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({...formData, time: e.target.value})}
                                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500"
                            />
                        </div>
                        
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        
                        <select
                            value={formData.recurrence}
                            onChange={(e) => setFormData({...formData, recurrence: e.target.value})}
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500"
                        >
                            <option value="none">Sin repetir</option>
                            <option value="daily">Diario</option>
                            <option value="weekly">Semanal</option>
                            <option value="monthly">Mensual</option>
                            <option value="hourly">Por horas</option>
                        </select>

                        {formData.recurrence === 'weekly' && (
                            <div>
                                <p className="mb-2 text-sm text-gray-300">Repetir los días:</p>
                                <div className="flex justify-between gap-1">
                                    {weekDays.map((day, index) => (
                                        <button 
                                            type="button" 
                                            key={index} 
                                            onClick={async () => {
                                                setFormData(prev => ({
                                                    ...prev, 
                                                    weeklyDays: prev.weeklyDays.includes(index) 
                                                        ? prev.weeklyDays.filter(d => d !== index) 
                                                        : [...prev.weeklyDays, index]
                                                }));
                                                await triggerImpact(ImpactStyle.Light);
                                            }} 
                                            className={`w-10 h-10 rounded-full font-semibold transition-colors touch-manipulation ${
                                                formData.weeklyDays.includes(index) 
                                                    ? 'bg-purple-600 text-white' 
                                                    : 'bg-gray-700'
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-4 pt-4">
                            <button 
                                type="button" 
                                onClick={onClose} 
                                className="py-2 px-6 bg-gray-600 rounded-lg hover:bg-gray-500 transition font-semibold touch-manipulation"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className="py-2 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg hover:opacity-90 transition font-semibold touch-manipulation"
                            >
                                Guardar Evento
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// --- Confirmation Modal ---
function ConfirmationModal({ title, message, onConfirm, onCancel, scope, setScope, isRecurring }) {
    const { triggerImpact } = useHaptics();
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 modal-backdrop">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6">
                <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
                <p className="text-gray-300 mb-6">{message}</p>
                {isRecurring && (
                    <div className="space-y-2 mb-6">
                        <label className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                            <input 
                                type="radio" 
                                name="deleteScope" 
                                value="one" 
                                checked={scope === 'one'} 
                                onChange={(e) => {
                                    setScope(e.target.value);
                                    triggerImpact(ImpactStyle.Light);
                                }} 
                                className="h-4 w-4 text-purple-500 bg-gray-900 border-gray-600 focus:ring-purple-600"
                            />
                            <span>Solo este día</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                            <input 
                                type="radio" 
                                name="deleteScope" 
                                value="all" 
                                checked={scope === 'all'} 
                                onChange={(e) => {
                                    setScope(e.target.value);
                                    triggerImpact(ImpactStyle.Light);
                                }} 
                                className="h-4 w-4 text-purple-500 bg-gray-900 border-gray-600 focus:ring-purple-600"
                            />
                             <span>Toda la serie</span>
                        </label>
                    </div>
                )}
                <div className="flex justify-end gap-4">
                    <button 
                        onClick={onCancel} 
                        className="py-2 px-6 bg-gray-600 rounded-lg hover:bg-gray-500 transition font-semibold touch-manipulation"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={async () => {
                            await onConfirm();
                            await triggerImpact();
                        }} 
                        className="py-2 px-6 bg-red-600 rounded-lg hover:bg-red-700 transition font-semibold touch-manipulation"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Footer Component ---
function Footer({ currentView, setCurrentView, onAddEventClick }) {
    const { triggerImpact } = useHaptics();
    const baseStyle = "flex flex-col items-center justify-center p-2 transition-colors duration-300 w-full h-full touch-manipulation";
    const activeStyle = "text-purple-400";
    const inactiveStyle = "text-gray-400 hover:text-white";

    return (
        <footer className="bg-gray-800/90 backdrop-blur-sm shadow-top grid grid-cols-3 items-center flex-shrink-0 h-16">
            <button 
                onClick={async () => {
                    setCurrentView('calendar');
                    await triggerImpact(ImpactStyle.Light);
                }} 
                className={`${baseStyle} ${currentView === 'calendar' ? activeStyle : inactiveStyle}`}
            >
                <CalendarIcon />
                <span className="text-xs mt-1">Calendario</span>
            </button>
            <div className="flex justify-center">
                 <button 
                    onClick={onAddEventClick} 
                    className="relative -top-5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full h-16 w-16 flex items-center justify-center shadow-lg hover:scale-105 transition-transform touch-manipulation"
                >
                    <PlusIcon />
                </button>
            </div>
            <button 
                onClick={async () => {
                    setCurrentView('ai');
                    await triggerImpact(ImpactStyle.Light);
                }} 
                className={`${baseStyle} ${currentView === 'ai' ? activeStyle : inactiveStyle}`}
            >
                <AiIcon />
                <span className="text-xs mt-1">Asistente</span>
            </button>
        </footer>
    );
}

// --- Utility Functions ---
const getOccurrencesOnDay = (event, date) => {
    const occurrences = [];
    const currentDateStr = date.toISOString().split('T')[0];
    const eventStartDate = new Date(event.date + 'T00:00:00');
    
    if (date < eventStartDate) return [];
    if (event.exceptions?.includes(currentDateStr)) return [];

    if (event.recurrence === 'hourly' && event.repetitionInterval > 0) {
        const startDateTime = new Date(event.date + 'T' + event.time);
        let occurrenceTime = new Date(startDateTime);
        
        while(occurrenceTime.toISOString().split('T')[0] <= currentDateStr) {
            if (occurrenceTime.toISOString().split('T')[0] === currentDateStr) {
                 occurrences.push({
                    ...event,
                    time: occurrenceTime.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
                });
            }
            occurrenceTime.setHours(occurrenceTime.getHours() + parseInt(event.repetitionInterval));
        }
    } else {
         const eventDate = new Date(event.date + 'T00:00:00');
         const currentDate = new Date(date.toISOString().split('T')[0] + 'T00:00:00');
         let isOnDay = false;
         switch (event.recurrence) {
            case 'daily': isOnDay = true; break;
            case 'weekly': isOnDay = event.weeklyDays?.includes(currentDate.getDay()); break;
            case 'monthly': isOnDay = currentDate.getDate() === eventDate.getDate(); break;
            case 'none': default: isOnDay = currentDate.getTime() === eventDate.getTime(); break;
         }
         if (isOnDay) occurrences.push(event);
    }

    return occurrences;
};
