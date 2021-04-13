import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import { decAmout, incAmout } from './testReducer';

export default function Sanbox() {

    const dispatch = useDispatch();
    const data = useSelector(state => state.test.data);

    return(
        <>
        <h1>Testing 123!</h1>
        <h3>The data is:{data} </h3>
        <Button onClick={() => dispatch(incAmout(10))} content='Inc' color='green' />
        <Button onClick={() => dispatch(decAmout(5))} content='Dec' color='red' />
        <Button 
        onClick={() => dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))} 
        content='Open Modal' color='teal' />
        </>
    )
}