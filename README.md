# Mangia e Basta — Food Delivery App (React Native + Expo)

Applicazione mobile completa sviluppata con **React Native (Expo)** e **TypeScript**, progettata per simulare un flusso di food delivery moderno: navigazione tra ristoranti, visualizzazione dei menù, gestione del carrello e checkout.

L’obiettivo del progetto è mostrare un’architettura pulita, scalabile e orientata alla produzione.

---

## ✨ Funzionalità principali

- Home con lista ristoranti (nome, categoria, rating, tempi di consegna)
- Dettaglio ristorante con menù dinamico
- Aggiunta/rimozione prodotti dal carrello
- Gestione quantità + subtotale/totale
- Checkout con riepilogo ordine
- Navigazione multilivello (stack/tab)
- Stato globale con Context API / custom hooks
- Supporto per font custom e UI responsive

---

## 🧱 Architettura

Il progetto è strutturato secondo principi modulari e domain-driven:

Mangia_e_Basta_2.0/
│
├── app/ # Entry point e root navigation
├── assets/
│ └── fonts/ # Font custom importati in Expo
│
├── components/ # UI components riutilizzabili (Card, Button, Header...)
│
├── constants/ # Costanti di progetto: colori, dimensioni, API endpoints
│
├── hooks/ # Custom hooks (useCart, useRestaurants, ecc.)
│
├── lib/ # Moduli standalone (formatter, helpers, storage utils)
│
├── scripts/ # Script di build / utilities / mock seed
│
├── utils/ # Funzioni pure e helper (formatter, validators)
│
├── app.json # Configurazione Expo
├── package.json
├── tsconfig.json
└── expo-env.d.ts

Questa struttura permette di mantenere separati:

- **UI**  
- **logica di business**  
- **configurazioni**  
- **stato globale**  
- **risorse condivise**

---

## 🛠 Tecnologie utilizzate

- **React Native (Expo)**
- **TypeScript**
- **React Navigation**
- **Context API + Reducer**
- **Expo Fonts**
- **AsyncStorage** (opzionale, se usato)
- **ES6 modules & clean architecture**
