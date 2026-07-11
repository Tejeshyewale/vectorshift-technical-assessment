# VectorShift Technical Assessment

This repository contains my submission for the **VectorShift Frontend Technical Assessment**. It includes a **React** frontend (pipeline/node editor) and a **Python/FastAPI** backend that validates whether the constructed pipeline forms a valid Directed Acyclic Graph (DAG).

## 🧱 Project Structure

```
vectorshift-technical-assessment/
├── frontend/          # React application (node-based pipeline editor)
│   └── src/
│       ├── nodes/     # Node type components (Input, Output, LLM, Text, etc.)
│       └── ...
├── backend/           # FastAPI application
│   └── main.py        # /pipelines/parse endpoint
├── package-lock.json
└── .gitignore
```

## ✨ Features

The assessment is split into four parts, all implemented in this repo:

1. **Node Abstraction** – A shared/generic base component used to create new node types (Input, Output, LLM, Text) without duplicating boilerplate code.
2. **Component Styling** – A unified, polished visual design applied across all nodes, handles, and toolbar components.
3. **Text Node Enhancements** –
   - The Text node dynamically resizes (width/height) based on its content.
   - Supports variable interpolation: typing `{{ variable_name }}` inside the text automatically creates a new input Handle on the node.
4. **Backend Integration** –
   - The frontend sends the current pipeline's nodes and edges to the backend via the `/pipelines/parse` endpoint when the **Submit** button is clicked.
   - The backend computes:
     - `num_nodes`: total number of nodes in the pipeline
     - `num_edges`: total number of edges in the pipeline
     - `is_dag`: whether the graph is a valid Directed Acyclic Graph
   - The frontend displays this result via an alert.

## 🚀 Getting Started

### Prerequisites
- Node.js and npm
- Python 3.8+

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will run at `http://localhost:3000`.

### Backend Setup

```bash
cd backend
pip install -r requirements.txt   # or manually install fastapi & uvicorn
uvicorn main:app --reload
```

The API will run at `http://localhost:8000`.

> Make sure the backend is running before submitting a pipeline from the frontend, since the frontend calls `POST /pipelines/parse`.

## 🔌 API Reference

### `POST /pipelines/parse`

**Request Body**
```json
{
  "nodes": [ /* array of pipeline nodes */ ],
  "edges": [ /* array of pipeline edges */ ]
}
```

**Response**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## 🛠️ Tech Stack

- **Frontend:** JavaScript, React, React Flow, CSS
- **Backend:** Python, FastAPI, Uvicorn

## 📄 License

This project was built as part of a technical interview assessment and is provided for demonstration purposes.
