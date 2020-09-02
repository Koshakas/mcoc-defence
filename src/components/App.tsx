import React from 'react';
import './App.css';
import {Node} from './Node';
import {allChamps, ChampDef} from '../data/Champs';
import {Champ} from './Champ';
import {allNodes} from '../data/Nodes';

function App() {
    const [selectedChamps, setSelectedChamps] = React.useState<string[]>([]);
    const [currentNodes, setCurrentNodes] = React.useState(allNodes);
    const [editMode, setEditMode] = React.useState(true);
    const nodes: React.ReactNode[] = [];
    for (let i = 0; i < currentNodes.length; i++) {
        const nodeDef = currentNodes[i];
        const nodeChamps: ChampDef[] = [];
        for (const selectedChamp of selectedChamps) {
            const champ = allChamps.filter(c => c.name === selectedChamp)[0];
            if (champ.nodes.indexOf(nodeDef.name) !== -1) {
                nodeChamps.push(champ);
            }
        }
        nodes.push(
            <Node
                key={'node-' + nodeDef.name}
                nodeDef={nodeDef}
                champs={nodeChamps}
                editMode={editMode}
                onEditNode={(dx, dy) => {
                    const newNodes = [...currentNodes];
                    newNodes[i] = {...nodeDef, x: nodeDef.x + dx, y: nodeDef.y + dy};
                    setCurrentNodes(newNodes);
                }}
            />)
    }
    const champs: React.ReactNode[] = [];
    for (const champDef of allChamps) {
        champs.push(<Champ
            key={'champ-' + champDef.name}
            champDef={champDef}
            selected={selectedChamps.indexOf(champDef.name) !== -1}
            onChange={selected => {
                if (selected) {
                    setSelectedChamps([...selectedChamps, champDef.name]);
                } else {
                    setSelectedChamps(selectedChamps.filter(c => c !== champDef.name));
                }
            }
            }/>);
    }
    return (
        <>
            <div className='App'>
                <div className='App-Map'>
                    {nodes}
                    <img src='/map.png' alt='Map'/>
                </div>
                <div className='App-Champs'>
                    {champs}
                </div>
            </div>
            <label className='App-EditMode'>
                <input type='checkbox' checked={editMode} onChange={event => setEditMode(event.target.checked)}/>
                Edit Mode
            </label>
        </>
    );
}

export default App;
