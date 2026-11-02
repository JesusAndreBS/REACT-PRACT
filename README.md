# Sistema de Colores en React grupo 3

Pequeño proyecto para practicar React con un sistema de colores y botones funcionales.

## Qué hace mi sistema

-  Muestra en si una paleta de colores organizada
- Botones que funcionan de verdad (click, envío de formulario)
- Formulario simple de registro
- Estados de carga y mensajes de éxito/error

## Estructura

```
src/
├── colors.js       # Colores y función getColor()
├── ColorDemo.jsx   # Vista principal con todo
├── App.jsx         # Componente raíz
├── main.jsx        # Punto de entrada
└── index.css       # Estilos base
```

## Cómo correrlo

```bash
npm install
npm run dev
```

## Uso de colores

```js
import { colors, getColor } from './colors';

getColor('primary')        // '#2563eb'
getColor('success', 'light') // '#22c55e'
colors.neutral.gray500     // '#6b7280'
```

## Categorías

| Nombre | Para qué |
|--------|----------|
| primary | Botones principales |
| secondary | Botones secundarios |
| success | Éxitos, guardado OK |
| warning | Advertencias |
| error | Errores, borrar |
| neutral | Textos, fondos, bordes |

---

Hecho con React + Vite 
# Grupo 3
## - Jesus Andre Bautista Sanchez
## -Jesus Angel Pravia Purihuaman  