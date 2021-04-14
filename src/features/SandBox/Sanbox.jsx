import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import { decAmout, incAmout } from './testReducer';

export default function Sanbox() {

    const [target, setTarget] = useState(null);

    const dispatch = useDispatch();
    const data = useSelector(state => state.test.data);
    const { loading } = useSelector((state) => state.async);

    return(
        <>
        <h1>Testing 123!</h1>
        <h3>The data is:{data} </h3>

        <Button name='increment' 
        loading={loading && target === 'increment'} 
        onClick={(e) => { dispatch(incAmout(10)); setTarget(e.target.name)}} 
        content='Inc' color='green' />

        <Button name='decrement'
        loading={loading && target === 'decrement'} 
        onClick={(e) => dispatch(decAmout(5))} 
        content='Dec' color='red' />

        <Button 
        onClick={() => dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))} 
        content='Open Modal' color='teal' />

        </>
    )
}