import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      // Stato iniziale
      user: null,
      token: null,
      isAuthenticated: false,
      // Azione di Login: salva i dati ricevuti dal backend
      setAuth: ({ token, user }) => {
        // salva il token anche in localStorage con la chiave 'token' 
        // per sincronizzarlo con l'intercettore Axios
        localStorage.setItem('token', token);
        set({
          token,
          user,
          isAuthenticated: true,
        });
      },
      // Azione di Logout: azzera lo stato e pulisce il token
      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      // Azione per aggiornare i dati utente (es. modifica il proprio profilo ecc..)
      updateUser: (updatedUser) => {
        set((state) => ({
          user: { ...state.user, ...updatedUser },
        }));
      },
    }),
    {
      name: 'auth-storage', // Nome della chiave salvata nel localStorage
      storage: createJSONStorage(() => localStorage), // Utilizza il localStorage del browser
      //  stato persistente
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);