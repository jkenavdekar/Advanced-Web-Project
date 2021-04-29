import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { Calendar } from 'react-calendar';

export default function EventFilters({filterEvent, setfilterEvent, loading}) {

        return (
            <>
                <Menu vertical size='large' style={{ width: '100%' }}>

                    <Header icon='filter' attached color='teal' content='Filters' />

                    <Menu.Item content='All Events'
                        active={filterEvent.get('filter') === 'all'}
                        onClick={() => setfilterEvent('filter', 'all')}
                        disabled={loading} />

                    <Menu.Item content="I'm going"
                        active={filterEvent.get('filter') === 'isGoing'}
                        onClick={() => setfilterEvent('filter', 'isGoing')}
                        disabled={loading} />

                    <Menu.Item content="I'm hosting"
                        active={filterEvent.get('filter') === 'isHosting'}
                        onClick={() => setfilterEvent('filter', 'isHosting')}
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