from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Allow the React dev server (localhost:3000) to call this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str


class Edge(BaseModel):
    source: str
    target: str


class PipelineData(BaseModel):
    nodes: List[Node] = []
    edges: List[Edge] = []


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


def is_directed_acyclic_graph(node_ids, edges):
    """
    Standard cycle-detection via DFS with a recursion-stack set.
    Returns True if the graph (nodes + directed edges) has no cycles.
    """
    adjacency = {node_id: [] for node_id in node_ids}
    for edge in edges:
        if edge.source in adjacency:
            adjacency[edge.source].append(edge.target)

    visited = set()
    in_stack = set()

    def dfs(node):
        visited.add(node)
        in_stack.add(node)
        for neighbor in adjacency.get(node, []):
            if neighbor not in visited:
                if not dfs(neighbor):
                    return False
            elif neighbor in in_stack:
                # Found a back-edge -> cycle
                return False
        in_stack.remove(node)
        return True

    for node_id in node_ids:
        if node_id not in visited:
            if not dfs(node_id):
                return False
    return True


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    node_ids = [node.id for node in pipeline.nodes]
    num_nodes = len(node_ids)
    num_edges = len(pipeline.edges)
    is_dag = is_directed_acyclic_graph(node_ids, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag,
    }
