import React from 'react';
import './Node.css';
import {ChampDef} from '../data/Champs';
import {NodeDef} from '../data/Nodes';

interface Props {
    nodeDef: NodeDef;
    champs: ChampDef[];
    editMode: boolean;
    onEditNode: (dx: number, dy: number) => void;
}

const nodeSize = 128;

export const Node: React.FC<Props> = (props: Props) => {
    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.key) {
            case 'ArrowUp': {
                props.onEditNode(0, -1 * (event.ctrlKey ? 10 : 1));
                event.preventDefault();
                break;
            }
            case 'ArrowDown': {
                props.onEditNode(0, 1 * (event.ctrlKey ? 10 : 1));
                event.preventDefault();
                break;
            }
            case 'ArrowLeft': {
                props.onEditNode(-1 * (event.ctrlKey ? 10 : 1), 0);
                event.preventDefault();
                break;
            }
            case 'ArrowRight': {
                props.onEditNode(1 * (event.ctrlKey ? 10 : 1), 0);
                event.preventDefault();
                break;
            }
        }
    };
    return (
        <div
            onKeyDown={props.editMode ? onKeyDown : undefined}
            className={'Node' + (props.editMode ? ' Node--edit' : '')}
            tabIndex={-1}
            style={{
                left: props.nodeDef.x - nodeSize / 2,
                top: props.nodeDef.y - nodeSize / 2,
                width: nodeSize,
                height: nodeSize,
            }}>
            {props.editMode && (
                <>
                    {props.champs.length === 0 && <div className='Node-Circle'/>}
                    <pre className='Node-Json'>{`${props.nodeDef.name}   x: ${props.nodeDef.x}, y: ${props.nodeDef.y}`}</pre>
                </>
            )}
            {props.champs.map(champ => (
                <img key={champ.name} src={champ.img} alt={champ.name} className='Node-Champ'/>
            ))}
        </div>
    );
};
