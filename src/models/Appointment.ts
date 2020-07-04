import { uuid } from 'uuidv4';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

class Appointment {
    id: String;
    provider: String;
    date: Date;

    constructor({provider, date}: Omit<Appointment, 'id'>){
        this.id = uuid(),
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;
