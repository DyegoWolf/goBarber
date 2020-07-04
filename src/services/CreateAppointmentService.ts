// Única responsabilidade: criar um repositório

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

interface RequestDTO{
    provider: String;
    date: Date;
}

class CreateAppointmentService{

    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({provider, date}: RequestDTO){

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw Error("This appointment is already booked!");
        }

        const newAppointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate});

        return(newAppointment);
    }
}

export default CreateAppointmentService;
