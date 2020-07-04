// Única responsabilidade: tratar os dados

import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

interface createAppointmentDTO{
    provider: String;
    date: Date;
}

class AppointmentsRepository{

    private appointments: Appointment[] = [];

    public create({provider, date}: createAppointmentDTO): Appointment {
        const newAppointment = new Appointment({provider, date});

        this.appointments.push(newAppointment);

        return(newAppointment);
    }

    public all(): Appointment[]{
        return (this.appointments);
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date));

        return(findAppointment || null);
    }
}

export default AppointmentsRepository;
