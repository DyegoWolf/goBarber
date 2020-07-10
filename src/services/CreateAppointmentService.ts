// Única responsabilidade: criar um repositório

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import {getCustomRepository} from 'typeorm';
import { startOfHour } from 'date-fns';
import AppError from '../errors/AppError';

interface RequestDTO{
    provider_id: string;
    date: Date;
}

class CreateAppointmentService{
    // Sempre que for uma função assíncrona, utilizar Promise no retorno
    public async execute({provider_id, date}: RequestDTO): Promise<Appointment>{

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw new AppError('This appointment is already booked!', 400);
        }

        // Cria instância do objeto
        const newAppointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate});

        // Salva registro no banco de dados
        await appointmentsRepository.save(newAppointment);

        return(newAppointment);
    }
}

export default CreateAppointmentService;
