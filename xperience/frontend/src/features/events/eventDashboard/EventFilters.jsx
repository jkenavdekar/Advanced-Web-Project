import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { Calendar } from 'react-calendar';
import { useDispatch } from 'react-redux';
import { loadEvents } from '../eventActions';

export default function EventFilters({filterEvent, setfilterEvent, loading}) {

        const dispatch = useDispatch();

        function handleAll() {
            setfilterEvent('filter', 'all')
            localStorage.setItem("eventFilter", filterEvent.get('filter'));
            dispatch(loadEvents());
        }

        function handleisGoing() {
            setfilterEvent('filter', 'isGoing')
            localStorage.setItem("eventFilter", filterEvent.get('filter'));
            dispatch(loadEvents());
        }

        function handleisHosting() {
            setfilterEvent('filter', 'isHosting')
            localStorage.setItem("eventFilter", filterEvent.get('filter'));
            dispatch(loadEvents());
        }

        return (
            <>
                <Menu vertical size='large' style={{ width: '100%' }}>

                    <Header icon='filter' attached color='teal' content='Filters' />

                    <Menu.Item content='All Events'
                        active={filterEvent.get('filter') === 'all'}
                        onClick={handleAll}
                        disabled={loading} />

                    <Menu.Item content="I'm going"
                        active={filterEvent.get('filter') === 'isGoing'}
                        onClick={handleisGoing}
                        disabled={loading} />

                    <Menu.Item content="I'm hosting"
                        active={filterEvent.get('filter') === 'isHosting'}
                        onClick={handleisHosting}
                        disabled={loading} />
                    
                </Menu>

                <Header icon='calendar' attached color='teal' content='Select date' />
                <Calendar 
                    onChange={date => setfilterEvent('startDate', date)} 
                    value={filterEvent.get('startDate') || new Date()}
                    tileDisable={() => loading} />
            </>
        )
}