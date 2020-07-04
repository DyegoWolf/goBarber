// Única responsabilidade: criar um repositório

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import {getCustomRepository} from 'typeorm';

import { startOfHour } from 'date-fns';

interface RequestDTO{
    provider: String;
    date: Date;
}

class CreateAppointmentService{
    // Sempre que for uma função assíncrona, utilizar Promise no retorno
    public async execute({provider, date}: RequestDTO): Promise<Appointment>{

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw Error("This appointment is already booked!");
        }

        // Cria instância do objeto
        const newAppointment = appointmentsRepository.create({
            provider,
            date: appointmentDate});

        // Salva registro no banco de dados
        await appointmentsRepository.save(newAppointment);

        return(newAppointment);
    }
}

export default CreateAppointmentService;
