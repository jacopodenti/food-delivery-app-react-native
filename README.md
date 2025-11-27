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
## 🧱 Architettura

La struttura del progetto è organizzata in moduli indipendenti e facilmente estendibili:

### `app/`
Entry point dell’applicazione e definizione della navigazione principale (stack/tab).

### `assets/`
Font e risorse statiche utilizzate nell’interfaccia.

### `components/`
Componenti UI riutilizzabili (card, list item, header, pulsanti).  
Riduce duplicazione e semplifica la manutenzione.

### `constants/`
Definizioni centralizzate: colori, spaziature, configurazioni globali, endpoint mock.

### `hooks/`
Custom hooks che incapsulano logiche riutilizzabili  
(es. gestione carrello, fetch dei ristoranti).

### `lib/`
Funzioni e moduli indipendenti dalla UI  
(formatter, funzioni di storage, helpers).

### `scripts/`
Script di supporto (mock data, utility di sviluppo).

### `utils/`
Funzioni pure e helper generali non legate a un dominio specifico.
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
