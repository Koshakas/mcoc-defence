import React from 'react';
import './Champ.css';
import {ChampDef} from '../data/Champs';

interface Props {
    champDef: ChampDef;
    selected: boolean;
    onChange: (selected: boolean) => void;
}

export const Champ: React.FC<Props> = (props: Props) => {
    return (
      <label className={'Champ' + (props.selected ? ' Champ--selected' : '')}>
          <input type='checkbox' checked={props.selected} onChange={event => props.onChange(event.target.checked)}/>
          <img src={props.champDef.img} alt={props.champDef.name}/>{props.champDef.name}
      </label>
    );
};
