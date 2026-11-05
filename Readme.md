# 🚚 Truck Weather Route Planner (Full Stack Assessment)

🎥 **[Ver video de demostración en Loom (5-10 min)]

https://www.loom.com/share/1605151895d04f97b87b36c59c228a99

plicación Full Stack desarrollada con **Django** (Backend) y **React + TypeScript** (Frontend) para la planificación y optimización de rutas de camiones según las condiciones meteorológicas en tiempo real y pronósticos a 48 horas.

## 🛠️ Tecnologías Utilizadas
* **Backend:** Python, Django, Django REST Framework (Motor de cálculo de riesgos y reglas de carga).
* **Frontend:** React, TypeScript, Vite / Create React App, React-Leaflet (Mapas interactivos).

## 🚀 Guía de Instalación y Ejecución local

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina local:

### 1. Clonar el repositorio

git clone https://github.com/elkinr/PruebaFullStack
cd PruebaFullStack

### 2. Configurar y ejecutar el Backend (Django)
cd backend
# Crear y activar el entorno virtual
python -m venv venv
source venv/bin/activate

# Ejecutar migraciones y levantar el servidor
python manage.py migrate
python manage.py runserver
*(El backend correrá por defecto en `http://127.0.0.1:8000/`)

### 3. Configurar y ejecutar el Frontend (React)
cd ../Frontend

# Instalar dependencias
npm install

# Instalar Leaflet para los mapas interactivos
npm install leaflet react-leaflet

# Iniciar el entorno de desarrollo
npm run dev  # o npm start según corresponda
*(El frontend correrá por defecto en `http://localhost:5173/` o el puerto indicado)*

## 📌 Características Principales Implementadas
1. **Motor de Riesgo Meteorológico:** Cálculo estricto basado en velocidad del viento, lluvia, nieve y el peso de la carga (`load_weight`)[cite: 7].
2. **Opciones de Rutas Múltiples:** Generación y evaluación de alternativas equilibrando riesgo y tiempo de viaje[cite: 7].
3. **Visualización Geoespacial Interactiva:** Integración con mapas (`React-Leaflet`) para mostrar el trazado de las rutas, los checkpoints y sus niveles de riesgo mediante popups[cite: 7].
4. **Deslizador de Pronóstico Temporal:** Selector interactivo de 0 a 48 horas para simular el avance del clima a lo largo del corredor de viaje[cite: 7].